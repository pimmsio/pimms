/**
 * Records submissions the anti-spam layers discarded, so the weekly digest can
 * prove we aren't quietly binning real leads.
 *
 * Counts are exact; samples are capped *per reason* rather than globally, so a
 * flood of one kind (usually `missing-token`) can't crowd out the rare drop
 * that's actually worth eyeballing.
 */

import { redis } from "@/lib/redis";

const COUNTS_KEY = "spam:counts";
const samplesKey = (bucket: string) => `spam:samples:${bucket}`;

const SAMPLES_PER_REASON = 8;
/** Outlives the weekly digest, so one failed cron run doesn't lose the data. */
const TTL_SECONDS = 21 * 24 * 60 * 60;

export type DroppedForm = "contact-sales" | "lead-magnet";

export type DroppedSubmission = {
  form: DroppedForm;
  reason: string;
  ip: string;
  at: string;
  fields: Record<string, string>;
};

/** Keeps the payload small and avoids storing junk we'd never read. */
const trim = (value: unknown, max = 160) =>
  typeof value === "string" ? value.slice(0, max) : "";

export const summariseFields = (body: Record<string, unknown>) => {
  const fields: Record<string, string> = {};
  for (const key of ["fullName", "email", "company", "companySize", "reason", "website", "message", "phone", "locale"]) {
    const value = trim(body[key]);
    if (value) fields[key] = value;
  }
  return fields;
};

/**
 * Never throws and never blocks the response on failure — a logging outage must
 * not turn into a broken form.
 */
export const recordDrop = async (entry: DroppedSubmission) => {
  if (!redis) return;

  const bucket = `${entry.form}:${entry.reason}`;
  try {
    const pipeline = redis.pipeline();
    pipeline.hincrby(COUNTS_KEY, bucket, 1);
    pipeline.lpush(samplesKey(bucket), JSON.stringify(entry));
    pipeline.ltrim(samplesKey(bucket), 0, SAMPLES_PER_REASON - 1);
    pipeline.expire(COUNTS_KEY, TTL_SECONDS);
    pipeline.expire(samplesKey(bucket), TTL_SECONDS);
    await pipeline.exec();
  } catch (error) {
    console.error("[spam-log] failed to record drop:", error);
  }
};

export type DropReport = {
  total: number;
  buckets: { form: string; reason: string; count: number; samples: DroppedSubmission[] }[];
};

/**
 * Reads everything accumulated since the last run and clears it.
 *
 * Read-then-delete rather than a transaction: losing a handful of drops that
 * land mid-run is preferable to reporting them twice, and this is a monitoring
 * aid, not an audit log.
 */
export const drainDrops = async (): Promise<DropReport | null> => {
  // Bound to a local so the null check still narrows inside the callbacks below.
  const db = redis;
  if (!db) return null;

  const counts = await db.hgetall<Record<string, string>>(COUNTS_KEY);
  if (!counts || Object.keys(counts).length === 0) return { total: 0, buckets: [] };

  const buckets = await Promise.all(
    Object.entries(counts).map(async ([bucket, rawCount]) => {
      const [form, ...rest] = bucket.split(":");
      const raw = await db.lrange<string | DroppedSubmission>(samplesKey(bucket), 0, -1);

      return {
        form,
        reason: rest.join(":"),
        count: Number(rawCount) || 0,
        // Upstash auto-parses JSON strings, so entries arrive already decoded.
        samples: raw.map((item) => (typeof item === "string" ? JSON.parse(item) : item)) as DroppedSubmission[],
      };
    }),
  );

  await db.del(COUNTS_KEY, ...Object.keys(counts).map(samplesKey));

  buckets.sort((a, b) => b.count - a.count);
  return { total: buckets.reduce((sum, b) => sum + b.count, 0), buckets };
};
