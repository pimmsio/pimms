"use client";

import { useCallback, useEffect, useRef } from "react";
import { HONEYPOT_FIELD } from "@/lib/forms";

/**
 * Decoy field. Hidden from people, filled in by form-stuffing bots — the server
 * drops any submission where it has a value.
 *
 * Positioned off-screen rather than `display: none`, since some bots skip
 * fields they can tell are undisplayed. `aria-hidden` keeps it away from screen
 * readers, and the parent form needs `position: relative` to anchor it.
 */
export function HoneypotField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden opacity-0"
    >
      <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
      <input
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}

type Minted = { token: string; mintedAt: number };

/**
 * Fetches the signed token that proves a submission came from a rendered form.
 *
 * Returns a resolver rather than the token itself: the server also rejects
 * tokens younger than `minFillMs`, so on the rare path where the initial fetch
 * failed and we have to mint one at submit time, the resolver waits out the
 * remainder instead of letting a real submission get silently dropped.
 */
export function useFormToken() {
  const pending = useRef<Promise<Minted | null> | null>(null);

  const mint = useCallback(() => {
    const request = fetch("/api/form-token", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => (d?.token ? { token: d.token as string, mintedAt: Date.now() } : null))
      .catch(() => null);

    pending.current = request;
    return request;
  }, []);

  useEffect(() => {
    mint();
  }, [mint]);

  return useCallback(
    async (minFillMs: number) => {
      const minted = (await (pending.current ?? mint())) ?? (await mint());
      if (!minted) return null;

      // `mintedAt` is when the response landed, so it always trails the
      // server's issue time — waiting on it can only overshoot, never undershoot.
      const remaining = minFillMs - (Date.now() - minted.mintedAt);
      if (remaining > 0) await new Promise((resolve) => setTimeout(resolve, remaining));

      return minted.token;
    },
    [mint],
  );
}
