/**
 * Anti-spam helpers for public, unauthenticated forms.
 *
 * Layered on purpose — no single check is a silver bullet:
 *   1. Honeypot        : a hidden field real users never fill.
 *   2. Signed token    : proves the payload came from a rendered form, and
 *                        that a human spent a plausible amount of time on it.
 *   3. Strict schema   : enums, lengths and types instead of truthiness.
 *   4. Heuristic score : gibberish / disposable-domain detection as a backstop.
 *   5. Rate limit      : per-IP burst protection.
 *
 * Only 1-3 ever hard-block. The heuristic score needs several independent
 * signals to fire, because a false positive here costs a real sales lead.
 */

const encoder = new TextEncoder();

/* -------------------------------------------------------------------------- */
/*  Signed form token                                                          */
/* -------------------------------------------------------------------------- */

/**
 * The token secret. Reuses `CRON_SECRET` rather than introducing a dedicated
 * variable, falling back to the Resend key so the protection still works in any
 * environment that can send mail at all.
 *
 * Rotating whichever value is in play invalidates the tokens already sitting in
 * open browser tabs, so submissions from those pages are dropped until the
 * visitor reloads — at most a two-hour window, bounded by MAX_TOKEN_AGE_MS.
 */
const getSecret = () => process.env.CRON_SECRET || process.env.RESEND_API_KEY || "";

const toHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

const sign = async (payload: string) => {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)));
};

/** Constant-time comparison, so signatures can't be brute-forced by timing. */
const safeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

/** Issued when a form mounts; required back on submit. */
export const createFormToken = async () => {
  const issuedAt = Date.now().toString(36);
  return `${issuedAt}.${await sign(issuedAt)}`;
};

export type TokenResult = { ok: true } | { ok: false; reason: string };

const MAX_TOKEN_AGE_MS = 2 * 60 * 60 * 1000; // stale tab / replay window

/**
 * @param minFillMs how long a human plausibly needs to fill this form. Bots
 *                  submit within milliseconds of loading the page.
 */
export const verifyFormToken = async (
  token: unknown,
  minFillMs: number,
): Promise<TokenResult> => {
  // Fail open when no secret exists at all (e.g. a bare local checkout),
  // rather than making the form unusable in development.
  if (!getSecret()) {
    console.warn("[anti-spam] No CRON_SECRET/RESEND_API_KEY set — skipping token check.");
    return { ok: true };
  }

  if (typeof token !== "string" || !token.includes(".")) {
    return { ok: false, reason: "missing-token" };
  }

  const [issuedAt, signature] = token.split(".");
  const expected = await sign(issuedAt);
  if (!safeEqual(signature, expected)) return { ok: false, reason: "bad-signature" };

  const age = Date.now() - parseInt(issuedAt, 36);
  if (Number.isNaN(age)) return { ok: false, reason: "bad-timestamp" };
  if (age < minFillMs) return { ok: false, reason: "submitted-too-fast" };
  if (age > MAX_TOKEN_AGE_MS) return { ok: false, reason: "expired-token" };

  return { ok: true };
};

/* -------------------------------------------------------------------------- */
/*  Rate limiting                                                              */
/* -------------------------------------------------------------------------- */

const hits = new Map<string, number[]>();

export const getClientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip") ||
  "unknown";

/**
 * In-memory sliding window. Serverless instances don't share memory, so this
 * throttles rather than strictly enforces — enough to stop one bot hammering a
 * warm instance, without taking on a Redis dependency.
 */
export const rateLimit = (key: string, limit: number, windowMs: number) => {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (hits.size > 5_000) hits.clear(); // crude ceiling on memory growth

  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }

  recent.push(now);
  hits.set(key, recent);
  return true;
};

/* -------------------------------------------------------------------------- */
/*  Field validation                                                           */
/* -------------------------------------------------------------------------- */


export const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"] as const;
export const CONTACT_REASONS = [
  "demo",
  "pricing",
  "enterprise",
  "partnership",
  "support",
  "other",
] as const;

/** Rejects non-strings and over-long values instead of coercing them. */
export const asString = (value: unknown, maxLength: number) => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length === 0 || trimmed.length > maxLength ? null : trimmed;
};

// Deliberately pragmatic: rejects the obviously-broken, accepts anything a real
// provider would deliver to. Header injection (\r\n) is excluded by \S.
const EMAIL_RE = /^[^\s@,;:<>()[\]\\]+@[^\s@.,;:<>()[\]\\]+(\.[^\s@.,;:<>()[\]\\]+)+$/;

export const isValidEmail = (value: unknown): value is string =>
  typeof value === "string" && value.length <= 254 && EMAIL_RE.test(value.trim());

/* -------------------------------------------------------------------------- */
/*  Heuristic spam scoring                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Consonant pairs that actually occur in names and words across the languages
 * we see traffic from. Anything outside this set ("xb", "wg", "zf", "jn", …)
 * is a strong signal of machine-generated text.
 *
 * Kept generous on purpose: "dv" (Dvorak), "mb" (Mbeki), "sz"/"cz" (Polish),
 * "ng" (Nguyen) are all legitimate.
 */
const VALID_CLUSTERS = new Set(
  (// English
    "bl br by ch ck cl cr ct dd dg dr dt ff fl fr ft gg gh gl gn gr gs ht kl kn kr " +
    "ks kt lb lc ld lf lg lk ll lm ln lp ls lt lv mb mm mn mp ms mt nc nd ng nk nn " +
    "ns nt nv pf ph pl pr ps pt rb rc rd rf rg rk rl rm rn rp rr rs rt rv sc sh sk " +
    "sl sm sn sp sq ss st sw tc th tr ts tt tw wh wl wn wr ws xc xp xt qu wt ngth " +
    // Slavic (Krzysztof, Szczepański, Dvorak, Wójcik)
    "cz sz rz zc zt zd zk zl zn zs zw cv dv dz jc jw kv nq pk tk vl vr wj zb sv " +
    // Nordic (Ljungqvist, Björn, Hjalmar)
    "lj hj bj fj gj kj mj nj sj tj qv gq nsk kv hv " +
    // Celtic / Gaelic lenition (Bhraonáin, Siobhán, Mhic)
    "bh ch dh fh gh mh ph sh th " +
    // Transliterations (Zhang, Nguyen, Tsvetkov, Mbeki, Nkosi)
    "zh kh gh ng nh ny lh mb nd nk nz mt tz ts dj tch shch")
    .split(" "),
);

const VOWELS = new Set(["a", "e", "i", "o", "u", "y"]);

/**
 * True when a word contains consonant pairs that essentially never appear in
 * real names — the signature of randomly generated strings like "Zawgodajg".
 *
 * Requires *two* implausible clusters before firing. A single odd pair shows up
 * in plenty of legitimate names, and this signal costs a sales lead when wrong.
 */
const looksGenerated = (word: string) => {
  const letters = word
    .normalize("NFD") // decompose "ó" into "o" + accent…
    .replace(/[\u0300-\u036f]/g, "") // …then drop the accent, keeping the letter
    .toLowerCase()
    .replace(/[^a-z]/g, "");
  if (letters.length < 4) return false;

  // 'q' not followed by 'u' (or 'v', as in Ljungqvist) is effectively
  // impossible outside random strings.
  if (/q(?![uv])/.test(letters)) return true;

  // Every real word carries a vowel — 'y' included, which covers Welsh ("Llyn")
  // and Slavic ("Brno" is 4 letters, hence the length floor above).
  if (letters.length >= 5 && ![...letters].some((c) => VOWELS.has(c))) return true;

  let implausible = 0;
  for (let i = 0; i < letters.length - 1; i++) {
    const [a, b] = [letters[i], letters[i + 1]];
    if (VOWELS.has(a) || VOWELS.has(b)) continue;
    if (!VALID_CLUSTERS.has(a + b) && ++implausible >= 2) return true;
  }
  return false;
};

/** Any word in the string looks machine-generated. */
const hasGeneratedWord = (value: string | null | undefined) =>
  !!value && value.split(/[\s.,\-_/]+/).some(looksGenerated);

/** Throwaway inbox providers — abbreviated list of the most abused domains. */
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "10minutemail.com", "tempmail.com",
  "temp-mail.org", "throwawaymail.com", "yopmail.com", "trashmail.com",
  "sharklasers.com", "getnada.com", "dispostable.com", "maildrop.cc",
  "fakeinbox.com", "mailnesia.com", "tempinbox.com", "spamgourmet.com",
  "mytemp.email", "moakt.com", "emailondeck.com", "tempr.email",
]);

export const isDisposableEmail = (email: string) =>
  DISPOSABLE_DOMAINS.has(email.toLowerCase().split("@")[1] ?? "");

export type SpamAssessment = { score: number; reasons: string[]; isLikelySpam: boolean };

/**
 * Multiple independent signals must agree before we flag a submission.
 *
 * Flagged mail is still delivered, just subject-tagged so it can be filtered —
 * these heuristics never discard anything. Dropping is reserved for the
 * deterministic checks (honeypot, token, enum), where a false positive is
 * essentially impossible.
 */
const SPAM_THRESHOLD = 6;

export const assessSpam = (fields: {
  fullName?: string | null;
  company?: string | null;
  email?: string | null;
  website?: string | null;
  message?: string | null;
}): SpamAssessment => {
  const reasons: string[] = [];
  let score = 0;

  const add = (points: number, reason: string) => {
    score += points;
    reasons.push(reason);
  };

  const { fullName, company, email, website, message } = fields;

  if (hasGeneratedWord(fullName)) add(3, "generated-name");

  // Strip the legal suffix first: "Zawgodajg LLC" should be judged on the name.
  if (company && hasGeneratedWord(company.replace(/\b(llc|inc|ltd|gmbh|sarl|sas|bv|corp|co)\b\.?/gi, "")))
    add(3, "generated-company");

  if (email) {
    const [local, domain] = email.toLowerCase().split("@");
    if (domain && DISPOSABLE_DOMAINS.has(domain)) add(4, "disposable-email");
    if (hasGeneratedWord(local)) add(2, "generated-email-local");
    if (domain && hasGeneratedWord(domain.split(".")[0])) add(2, "generated-email-domain");
  }

  if (website) {
    const host = website.replace(/^https?:\/\//i, "").split("/")[0];
    if (hasGeneratedWord(host.replace(/^www\./i, "").split(".")[0])) add(2, "generated-website");
  }

  if (message) {
    // Real messages contain spaces. Random payloads like "OWtrfCVgKCIkkcFZa"
    // are a single high-entropy token with mixed casing.
    if (message.length >= 12 && !/\s/.test(message) && /[a-z]/.test(message) && /[A-Z]/.test(message))
      add(4, "entropy-blob-message");
    if (hasGeneratedWord(message)) add(2, "generated-message");
    if (/\[url[=\]]|\[link[=\]]/i.test(message)) add(4, "bbcode-links");

    const links = message.match(/https?:\/\//gi)?.length ?? 0;
    if (links >= 2) add(3, "multiple-links");
  }

  return { score, reasons, isLikelySpam: score >= SPAM_THRESHOLD };
};
