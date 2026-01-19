"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type PaidPlanId = "pro" | "business";

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
      const pro = document.getElementById(`${rootId}-panel-pro`);
      const business = document.getElementById(`${rootId}-panel-business`);
      if (pro) pro.classList.toggle("hidden", next !== "pro");
      if (business) business.classList.toggle("hidden", next !== "business");
    },
    [rootId]
  );

  React.useEffect(() => {
    show(defaultPlan);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultPlan]);

  return (
    <div aria-label={selectAriaLabel} className="grid grid-cols-2 gap-3">
      <button
        type="button"
        aria-controls={`${rootId}-panel-pro`}
        aria-selected={plan === "pro"}
        onClick={() => show("pro")}
        className={cn(
          "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap font-semibold leading-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-full px-4 py-3",
          plan === "pro"
            ? "bg-card text-foreground"
            : "bg-muted/60 text-muted-foreground hover:text-foreground"
        )}
      >
        {planOptions.pro.label}
      </button>

      <button
        type="button"
        aria-controls={`${rootId}-panel-business`}
        aria-selected={plan === "business"}
        onClick={() => show("business")}
        className={cn(
          "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap font-semibold leading-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-full px-4 py-3",
          plan === "business"
            ? "bg-card text-foreground"
            : "bg-muted/60 text-muted-foreground hover:text-foreground"
        )}
      >
        {planOptions.business.label}
      </button>
    </div>
  );
}

