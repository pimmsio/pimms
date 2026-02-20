"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import type { PaidPlanId } from "@/lib/pricing";

const ALL_PAID_PLANS: PaidPlanId[] = ["tiny", "solo", "pro", "business"];

export function InlinePricingSwitch({
  rootId,
  defaultPlan,
  selectAriaLabel,
  planOptions
}: {
  rootId: string;
  defaultPlan: PaidPlanId;
  selectAriaLabel: string;
  planOptions: Record<PaidPlanId, { label: React.ReactNode }>;
}) {
  const [plan, setPlan] = React.useState<PaidPlanId>(defaultPlan);

  const show = React.useCallback(
    (next: PaidPlanId) => {
      setPlan(next);
      for (const id of ALL_PAID_PLANS) {
        const el = document.getElementById(`${rootId}-panel-${id}`);
        if (el) el.classList.toggle("hidden", id !== next);
      }
    },
    [rootId]
  );

  React.useEffect(() => {
    show(defaultPlan);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultPlan]);

  return (
    <div aria-label={selectAriaLabel} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {ALL_PAID_PLANS.map((id) => (
        <button
          key={id}
          type="button"
          aria-controls={`${rootId}-panel-${id}`}
          aria-selected={plan === id}
          onClick={() => show(id)}
          className={cn(
            "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap font-semibold leading-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-full px-4 py-3 text-sm",
            plan === id
              ? "bg-card text-foreground"
              : "bg-muted/60 text-muted-foreground hover:text-foreground"
          )}
        >
          {planOptions[id].label}
        </button>
      ))}
    </div>
  );
}
