"use client";

import * as React from "react";
import { Check } from "@/components/icons/custom-icons";
import { cn } from "@/lib/utils";
import {
  PLANS,
  getPlanDisplayName,
  getPlanPrice,
  type BillingCurrency,
  type Plan,
} from "@/lib/pricing";
import { useCurrency } from "@/components/pricing/CurrencyToggle";

const CompareStringsContext = React.createContext<{ atATime: string; unlimited: string }>({
  atATime: "at a time",
  unlimited: "Unlimited",
});

const INFINITY_NUMBER = 1_000_000_000;
const PLAN_SLUGS = ["free", "tiny", "solo", "pro", "business"] as const;
type PlanSlug = (typeof PLAN_SLUGS)[number];

function getPlan(slug: PlanSlug): Plan {
  return PLANS.find((p) => p.name.toLowerCase() === slug)!;
}

function nFormat(n: number): string {
  if (n >= INFINITY_NUMBER) return "Unlimited";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
  return n.toString();
}

function Minus({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 7v4" />
      <circle cx="8" cy="5.25" r="0.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FeatureTooltip({ text }: { text: string }) {
  return (
    <span className="group/tip relative inline-flex cursor-help">
      <InfoIcon className="size-3.5 text-muted-foreground/60 transition-colors group-hover/tip:text-muted-foreground" />
      <span className="pointer-events-none invisible absolute bottom-full left-1/2 z-20 mb-2 w-52 -translate-x-1/2 rounded-lg border border-border bg-card px-3 py-2 text-xs leading-relaxed text-foreground shadow-lg transition-all group-hover/tip:pointer-events-auto group-hover/tip:visible">
        {text}
      </span>
    </span>
  );
}

function CheckIcon({ value }: { value: boolean }) {
  return value ? (
    <Check className="mx-auto size-4 text-green-600" />
  ) : (
    <Minus className="mx-auto size-4 text-muted-foreground/40" />
  );
}

type LimitKey = keyof Plan["limits"];

function formatLimit(
  value: number | string,
  limitKey: LimitKey,
  t: { atATime: string; unlimited: string }
): React.ReactNode {
  if (typeof value === "string") return value; // retention
  if (value >= INFINITY_NUMBER) return t.unlimited;
  if (limitKey === "bulkLinks") return `${value} ${t.atATime}`;
  if (limitKey === "api") return `${nFormat(value)}/min`;
  return limitKey === "links" || limitKey === "clicks" ? nFormat(value) : value.toString();
}

export function CompareTable({
  locale = "en",
  featuresHeader,
  freeLabel = "Free",
  atATime = "at a time",
  unlimited = "Unlimited",
  className,
  children,
}: {
  locale?: string;
  featuresHeader: React.ReactNode;
  freeLabel?: string;
  atATime?: string;
  unlimited?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const currency = useCurrency();
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
  const strings = React.useMemo(() => ({ atATime, unlimited }), [atATime, unlimited]);

  return (
    <CompareStringsContext.Provider value={strings}>
      <div className={cn("w-full overflow-x-auto rounded-2xl border border-border bg-card", className)}>
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
            <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground sm:px-4">
              {featuresHeader}
            </th>
            {PLAN_SLUGS.map((slug) => {
              const plan = getPlan(slug);
              const monthly = getPlanPrice(slug, "monthly", currency);
              return (
                <th key={slug} className="px-1 text-center sm:px-2">
                  <div className="flex flex-col items-center gap-0.5 px-1 py-3 text-center">
                    <span className="text-xs font-bold text-foreground sm:text-sm">
                      {getPlanDisplayName(plan)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {monthly > 0 ? `${formatter.format(monthly)}/mo` : freeLabel}
                    </span>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      </div>
    </CompareStringsContext.Provider>
  );
}

export function CompareCategory({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <tr className="border-b border-border bg-muted/40">
      <td
        colSpan={PLAN_SLUGS.length + 1}
        className="px-3 py-2 text-xs font-bold text-foreground sm:px-4"
      >
        {children}
      </td>
    </tr>
  );
}

export function CompareFeatureValue({
  limitKey,
  tooltip,
  children,
}: {
  limitKey: LimitKey;
  tooltip?: string;
  children: React.ReactNode;
}) {
  const t = React.useContext(CompareStringsContext);
  return (
    <tr className="border-b border-border/50">
      <td className="px-3 py-2.5 text-xs text-muted-foreground sm:px-4 sm:text-sm">
        <span className="inline-flex items-center gap-1.5">
          {children}
          {tooltip && <FeatureTooltip text={tooltip} />}
        </span>
      </td>
      {PLAN_SLUGS.map((slug) => {
        const plan = getPlan(slug);
        const value = plan.limits[limitKey];
        return (
          <td
            key={slug}
            className="px-1 py-2.5 text-center text-xs text-foreground sm:px-2 sm:text-sm"
          >
            {formatLimit(value as number, limitKey, t)}
          </td>
        );
      })}
    </tr>
  );
}

export function CompareFeatureCheck({
  free,
  tiny,
  solo,
  pro,
  business,
  tooltip,
  children,
}: {
  free?: boolean;
  tiny?: boolean;
  solo?: boolean;
  pro?: boolean;
  business?: boolean;
  tooltip?: string;
  children: React.ReactNode;
}) {
  const checks = { free: !!free, tiny: !!tiny, solo: !!solo, pro: !!pro, business: !!business };
  return (
    <tr className="border-b border-border/50">
      <td className="px-3 py-2.5 text-xs text-muted-foreground sm:px-4 sm:text-sm">
        <span className="inline-flex items-center gap-1.5">
          {children}
          {tooltip && <FeatureTooltip text={tooltip} />}
        </span>
      </td>
      {PLAN_SLUGS.map((slug) => (
        <td key={slug} className="px-1 py-2.5 text-center sm:px-2">
          <CheckIcon value={checks[slug]} />
        </td>
      ))}
    </tr>
  );
}

export function CompareFeatureSupport({
  free,
  tiny,
  solo,
  pro,
  business,
  children,
}: {
  free: string;
  tiny: string;
  solo: string;
  pro: string;
  business: string;
  children: React.ReactNode;
}) {
  const values = { free, tiny, solo, pro, business };
  return (
    <tr className="border-b border-border/50">
      <td className="px-3 py-2.5 text-xs text-muted-foreground sm:px-4 sm:text-sm">
        {children}
      </td>
      {PLAN_SLUGS.map((slug) => (
        <td
          key={slug}
          className="px-1 py-2.5 text-center text-xs text-foreground sm:px-2 sm:text-sm"
        >
          {values[slug]}
        </td>
      ))}
    </tr>
  );
}
