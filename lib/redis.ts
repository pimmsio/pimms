import { Redis } from "@upstash/redis";

/**
 * Shared Upstash client. Null when the environment isn't configured, so every
 * caller has to decide how to degrade — nothing here is allowed to take a form
 * submission down with it.
 */
export const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;
