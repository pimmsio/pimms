"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  SELF_SERVE_PAID_PLANS,
  getPlanPrice,
  type PaidPlanId,
  type BillingCurrency,
} from "@/lib/pricing";
import { useCurrency } from "@/components/pricing/CurrencyToggle";

const ALL_PAID_PLANS: PaidPlanId[] = ["tiny", "solo", "pro", "business"];
const LIFETIME_PLANS: PaidPlanId[] = ["tiny", "solo"];

function hasLifetime(slug: PaidPlanId) {
  return LIFETIME_PLANS.includes(slug);
}

export type PricingHeroLabels = {
  monthlyLabel: string;
  perMonthLabel: string;
  perYearLabel: string;
  cancelAnytimeLabel: string;
  subscribeLabel: string;
  lifetimeLabel: string;
  mostPopularLabel: string;
  oneTimePaymentLabel: string;
  unlockLifetimeLabel: string;
  yearlyLabel: string;
  twoMonthsFreeLabel: string;
  subscribeYearlyLabel: string;
};

const PricingHeroContext = React.createContext<{
  selected: PaidPlanId;
  setSelected: (id: PaidPlanId) => void;
  labels: PricingHeroLabels;
  locale: string;
} | null>(null);

const PlanIdContext = React.createContext<PaidPlanId | null>(null);

function usePricingHero() {
  const ctx = React.useContext(PricingHeroContext);
  if (!ctx) throw new Error("PricingHero components must be used inside PricingHero");
  return ctx;
}

function usePlanId() {
  const planId = React.useContext(PlanIdContext);
  if (!planId) throw new Error("PricingPlanCards/Features must be used inside PricingPlanPanel");
  return planId;
}

function PricingOptionCard({
  title,
  price,
  periodLabel,
  helperTop,
  badge,
  cta,
  className,
}: {
  title: React.ReactNode;
  price: React.ReactNode;
  periodLabel: React.ReactNode;
  helperTop?: React.ReactNode;
  badge?: React.ReactNode;
  cta: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl bg-card p-5",
        className,
      )}
    >
      <div className="grid min-h-[120px] grid-rows-[auto_auto_auto] gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="text-base font-semibold text-foreground">{title}</div>
          {badge ? (
            <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-foreground">
              {badge}
            </span>
          ) : null}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="tabular-nums text-3xl font-semibold text-foreground">
            {price}
          </span>
          <div className="text-base font-medium text-muted-foreground">
            {periodLabel}
          </div>
        </div>
        <div className="min-h-[20px] text-sm text-muted-foreground">
          {helperTop ?? null}
        </div>
      </div>
      <div className="mt-auto pt-4">{cta}</div>
    </div>
  );
}

export function PricingHero({
  locale = "en",
  monthlyLabel,
  perMonthLabel,
  perYearLabel,
  cancelAnytimeLabel,
  subscribeLabel,
  lifetimeLabel,
  mostPopularLabel,
  oneTimePaymentLabel,
  unlockLifetimeLabel,
  yearlyLabel,
  twoMonthsFreeLabel,
  subscribeYearlyLabel,
  children,
}: PricingHeroLabels & {
  locale?: string;
  children: React.ReactNode;
}) {
  const [selected, setSelected] = React.useState<PaidPlanId>("tiny");
  const labels: PricingHeroLabels = {
    monthlyLabel,
    perMonthLabel,
    perYearLabel,
    cancelAnytimeLabel,
    subscribeLabel,
    lifetimeLabel,
    mostPopularLabel,
    oneTimePaymentLabel,
    unlockLifetimeLabel,
    yearlyLabel,
    twoMonthsFreeLabel,
    subscribeYearlyLabel,
  };

  return (
    <PricingHeroContext.Provider
      value={{ selected, setSelected, labels, locale }}
    >
      <div className="space-y-6">{children}</div>
    </PricingHeroContext.Provider>
  );
}

type TabChild = React.ReactElement<{ planId: PaidPlanId; children: React.ReactNode }>;

export function PricingPlanTabs({ children }: { children: React.ReactNode }) {
  const { selected, setSelected } = usePricingHero();
  const tabs = React.Children.toArray(children).filter(
    (c): c is TabChild =>
      React.isValidElement(c) && "planId" in (c.props as object)
  );
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {tabs.map((tab) => {
        const { planId } = tab.props;
        const isSelected = selected === planId;
        return (
          <button
            key={planId}
            type="button"
            onClick={() => setSelected(planId)}
            className={cn(
              "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-4 py-3 text-sm font-semibold leading-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
              isSelected
                ? "bg-card text-foreground"
                : "bg-muted/60 text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.props.children}
          </button>
        );
      })}
    </div>
  );
}

export function PricingPlanTab({
  planId,
  children,
}: {
  planId: PaidPlanId;
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export function PricingPlanPanel({
  planId,
  children,
}: {
  planId: PaidPlanId;
  children: React.ReactNode;
}) {
  const { selected } = usePricingHero();
  if (selected !== planId) return null;
  return (
    <PlanIdContext.Provider value={planId}>
      <div className="space-y-6">{children}</div>
    </PlanIdContext.Provider>
  );
}

export function PricingPlanDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="mb-4 text-sm text-muted-foreground">
      {children}
    </p>
  );
}

export function PricingPlanCards() {
  const planId = usePlanId();
  const { labels, locale } = usePricingHero();
  const currency = useCurrency();
  const formatter = new Intl.NumberFormat(locale || "en", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  const monthly = getPlanPrice(planId, "monthly", currency);

  if (hasLifetime(planId)) {
    const lifetime = getPlanPrice(planId, "lifetime", currency);
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <PricingOptionCard
          title={labels.monthlyLabel}
          price={formatter.format(monthly)}
          periodLabel={labels.perMonthLabel}
          helperTop={labels.cancelAnytimeLabel}
          cta={
            <a
              href={`/api/pay?plan=${planId}&period=monthly&currency=${currency.toLowerCase()}`}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}
            >
              {labels.subscribeLabel}
            </a>
          }
        />
        <PricingOptionCard
          title={labels.lifetimeLabel}
          price={formatter.format(lifetime)}
          periodLabel=""
          badge={labels.mostPopularLabel}
          helperTop={labels.oneTimePaymentLabel}
          cta={
            <a
              href={`/api/pay?plan=${planId}&period=lifetime&currency=${currency.toLowerCase()}`}
              className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full")}
            >
              {labels.unlockLifetimeLabel}
            </a>
          }
        />
      </div>
    );
  }

  const yearly = getPlanPrice(planId, "yearly", currency);
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <PricingOptionCard
        title={labels.monthlyLabel}
        price={formatter.format(monthly)}
        periodLabel={labels.perMonthLabel}
        helperTop={labels.cancelAnytimeLabel}
        cta={
          <a
            href={`/api/pay?plan=${planId}&period=monthly&currency=${currency.toLowerCase()}`}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}
          >
            {labels.subscribeLabel}
          </a>
        }
      />
      <PricingOptionCard
        title={labels.yearlyLabel}
        price={formatter.format(yearly)}
        periodLabel={labels.perYearLabel}
        badge={labels.twoMonthsFreeLabel}
        helperTop={
          <span className="text-muted-foreground">
            <span className="line-through">
              {formatter.format(monthly)}{labels.perMonthLabel}
            </span>{" "}
            <span className="text-blue-600">{labels.twoMonthsFreeLabel}</span>
          </span>
        }
        cta={
          <a
            href={`/api/pay?plan=${planId}&period=yearly&currency=${currency.toLowerCase()}`}
            className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full")}
          >
            {labels.subscribeYearlyLabel}
          </a>
        }
      />
    </div>
  );
}

export function PricingPlanFeatureListTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-sm font-semibold text-foreground mt-6">
      {children}
    </div>
  );
}

export function PricingPlanFeatureList({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </ul>
  );
}

export function PricingPlanFeature({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-2 text-sm text-muted-foreground">
      <svg
        className="mt-0.5 size-4 shrink-0 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span>{children}</span>
    </li>
  );
}
