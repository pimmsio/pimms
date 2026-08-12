/**
 * Constants shared by the public forms and the API routes that receive them.
 *
 * Kept in its own module so the client bundle doesn't pull in `lib/anti-spam`,
 * which is server-side logic (token signing, spam scoring) that has no business
 * being shipped to the browser.
 */

/**
 * Name of the decoy field rendered by `<HoneypotField />`. Deliberately *not*
 * an HTML autofill token — a field called "nickname" or "email" can be
 * auto-populated by the browser, which would silently discard a real
 * submission. Also avoids the giveaway names ("honeypot", "hp_") that better
 * bots know to skip.
 */
export const HONEYPOT_FIELD = "company_fax";

/**
 * How long a human plausibly needs before submitting. The API rejects tokens
 * younger than this, and the client waits it out on the rare path where it had
 * to mint a token late.
 */
export const MIN_FILL_MS = {
  contactSales: 3_000,
  leadMagnet: 1_500, // a single field, so the floor is lower
} as const;
