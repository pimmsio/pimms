"use client";

import * as React from "react";

import type { BillingCurrency } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const CURRENCY_COOKIE = "pimms_currency";
const CURRENCY_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const CURRENCY_EVENT = "pimms:currency";

function getCurrencyFromCookie(): BillingCurrency | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CURRENCY_COOKIE}=([^;]*)`));
  const val = match?.[1]?.toUpperCase();
  return val === "EUR" || val === "USD" ? val : null;
}

function setCurrencyCookie(currency: BillingCurrency) {
  if (typeof document === "undefined") return;
  document.cookie = `${CURRENCY_COOKIE}=${currency}; path=/; max-age=${CURRENCY_COOKIE_MAX_AGE}; SameSite=Lax`;
}

function broadcastCurrency(currency: BillingCurrency) {
  document.dispatchEvent(new CustomEvent(CURRENCY_EVENT, { detail: currency }));
}

/**
 * Reactive hook — returns the active currency and stays in sync with the
 * CurrencyToggle (via cookie + custom event).  On first mount it also
 * auto-detects via /api/geo when no cookie exists.
 */
export function useCurrency(): BillingCurrency {
  const [currency, setCurrency] = React.useState<BillingCurrency>("EUR");

  React.useEffect(() => {
    const saved = getCurrencyFromCookie();
    if (saved) {
      setCurrency(saved);
    } else {
      fetch("/api/geo")
        .then((r) => r.json())
        .then((data: { currency?: string }) => {
          const c = data.currency === "USD" ? "USD" : "EUR";
          setCurrency(c);
          setCurrencyCookie(c);
          broadcastCurrency(c);
        })
        .catch(() => {});
    }

    function handler(e: Event) {
      const next = (e as CustomEvent<BillingCurrency>).detail;
      if (next) setCurrency(next);
    }
    document.addEventListener(CURRENCY_EVENT, handler);
    return () => document.removeEventListener(CURRENCY_EVENT, handler);
  }, []);

  return currency;
}

export function CurrencyToggle({ className }: { className?: string }) {
  const currency = useCurrency();

  const toggle = React.useCallback((next: BillingCurrency) => {
    setCurrencyCookie(next);
    broadcastCurrency(next);
  }, []);

  return (
    <div
      className={cn("inline-flex rounded-lg border border-border bg-muted/60 p-0.5", className)}
      role="group"
      aria-label="Select currency"
    >
      {(["EUR", "USD"] as const).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => toggle(c)}
          className={cn(
            "cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
            currency === c ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
