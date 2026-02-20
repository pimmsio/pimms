import * as React from "react";

import { Check, X as XIcon } from "@/components/icons/custom-icons";
import { buttonVariants } from "@/components/ui/button";
import { getPlanDetails, getPlanDisplayName, type BillingPeriod, type PaidPlanId } from "@/lib/pricing";
import { cn, getCanonicalLink } from "@/lib/utils";

import { InlinePricingSwitch } from "./InlinePricingSwitch";

const ALL_PAID_PLANS: PaidPlanId[] = ["tiny", "solo", "pro", "business"];

type OptionCopy = {
  title: React.ReactNode;
  badge?: React.ReactNode;
  helperTop?: React.ReactNode;
  helperBottom?: React.ReactNode;
  ctaLabel: React.ReactNode;
  periodLabel: React.ReactNode;
  ctaVariant?: "default" | "secondary" | "outline";
};

type PlanCopy = {
  left: OptionCopy & { period: BillingPeriod };
  right: OptionCopy & { period: BillingPeriod };
};

type InlinePricingInjectedPlanProps = { planId?: PaidPlanId };

function injectPlanIdIntoNode(node: React.ReactNode, planId: PaidPlanId): React.ReactNode {
  if (node == null) return node;

  const walk = (child: React.ReactNode): React.ReactNode => {
    if (child == null) return child;

    if (Array.isArray(child)) {
      return child.map((c, idx) => {
        const next = walk(c);
        if (React.isValidElement(next) && next.key == null) {
          return React.cloneElement(next, { key: `inline-pricing-${planId}-${idx}` });
        }
        return next;
      });
    }

    if (!React.isValidElement(child)) return child;

    const el = child as React.ReactElement<any>;
    const shouldInject =
      el.type === InlinePricingPlanName || el.type === InlinePricingPlanLimit || el.type === InlinePricingPlanRetention || el.type === InlinePricingFeatureItem;

    const nextProps: Record<string, unknown> = {};
    if (shouldInject && el.props?.planId == null) nextProps.planId = planId;

    const hasChildrenProp = el.props && "children" in el.props;
    if (hasChildrenProp) {
      nextProps.children = walk(el.props.children);
    }

    if (Object.keys(nextProps).length === 0) return el;
    return React.cloneElement(el, nextProps);
  };

  return walk(node);
}

function PricingCtaLink({
  href,
  variant,
  label,
  eventFunnel
}: {
  href: string;
  variant: "default" | "secondary" | "outline";
  label: React.ReactNode;
  eventFunnel: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        buttonVariants({ variant, size: "lg" }),
        "w-full"
      )}
      data-cta-funnel={eventFunnel}
    >
      {label}
    </a>
  );
}

function PricingOptionCard({
  title,
  price,
  periodLabel,
  helperTop,
  helperBottom,
  badge,
  cta,
  className
}: {
  title: React.ReactNode;
  price: React.ReactNode;
  periodLabel: React.ReactNode;
  helperTop?: React.ReactNode;
  helperBottom?: React.ReactNode;
  badge?: React.ReactNode;
  cta: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex h-full flex-col rounded-2xl bg-card p-5", className)}>
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
          <span className="tabular-nums text-3xl font-semibold text-foreground">{price}</span>
          <div className="text-base font-medium text-muted-foreground">{periodLabel}</div>
        </div>

        <div className="min-h-[20px] text-sm text-muted-foreground">{helperTop ?? null}</div>
      </div>

      <div className="mt-auto pt-4">{cta}</div>

      {helperBottom ? <div className="mt-3 text-sm text-muted-foreground">{helperBottom}</div> : null}
    </div>
  );
}

export function InlinePricing({
  defaultPlan = "tiny",
  className,
  currency = "EUR",
  locale = "en",
  selectAriaLabel,
  planOptions,
  optionsCopy,
  includedInPlanTitle,
  includedInAllPaidTitle,
  includedInPlan,
  includedInAllPaid,
  ctaType = "pricing",
  comparePlansLabel,
}: {
  defaultPlan?: PaidPlanId;
  className?: string;
  currency?: string;
  locale?: string;
  selectAriaLabel: string;
  planOptions: Record<PaidPlanId, { label: React.ReactNode; description?: React.ReactNode }>;
  optionsCopy: Record<PaidPlanId, PlanCopy>;
  includedInPlanTitle?: React.ReactNode;
  includedInAllPaidTitle?: React.ReactNode;
  includedInPlan?: React.ReactNode;
  includedInAllPaid?: React.ReactNode;
  ctaType?: string;
  comparePlansLabel?: React.ReactNode;
}) {
  if (!planOptions || !optionsCopy) {
    return null;
  }
  const rootId = React.useId();
  const currencyCode = currency || "EUR";
  const formatter = new Intl.NumberFormat(locale || "en", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0
  });

  return (
    <section className={cn("rounded-2xl", className)}>
      <InlinePricingSwitch
        rootId={rootId}
        defaultPlan={defaultPlan}
        selectAriaLabel={selectAriaLabel}
        planOptions={planOptions}
      />

      {ALL_PAID_PLANS.map((planId) => {
        const plan = getPlanDetails(planId);
        const copy = optionsCopy[planId];
        const meta = planOptions[planId];
        const optionPrices = {
          left: plan.price.monthly!,
          right: copy.right.period === "lifetime" ? plan.price.lifetime! : plan.price.yearly!
        };

        return (
          <div
            key={planId}
            id={`${rootId}-panel-${planId}`}
            className={cn("mt-6", planId === defaultPlan ? "" : "hidden")}
          >
            <h3 className="sr-only">{meta.label}</h3>
            {meta?.description ? <div className="mt-2 text-sm text-muted-foreground">{meta.description}</div> : null}

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <PricingOptionCard
                title={injectPlanIdIntoNode(copy.left.title, planId)}
                price={formatter.format(optionPrices.left)}
                periodLabel={injectPlanIdIntoNode(copy.left.periodLabel, planId)}
                badge={injectPlanIdIntoNode(copy.left.badge, planId)}
                helperTop={injectPlanIdIntoNode(copy.left.helperTop, planId)}
                helperBottom={injectPlanIdIntoNode(copy.left.helperBottom, planId)}
                cta={
                  <PricingCtaLink
                    href={`/api/pay?plan=${planId}&period=${copy.left.period}`}
                    variant={copy.left.ctaVariant ?? "outline"}
                    label={injectPlanIdIntoNode(copy.left.ctaLabel, planId)}
                    eventFunnel={ctaType}
                  />
                }
              />

              <PricingOptionCard
                title={injectPlanIdIntoNode(copy.right.title, planId)}
                price={formatter.format(optionPrices.right)}
                periodLabel={injectPlanIdIntoNode(copy.right.periodLabel, planId)}
                badge={injectPlanIdIntoNode(copy.right.badge, planId)}
                helperTop={injectPlanIdIntoNode(copy.right.helperTop, planId)}
                helperBottom={injectPlanIdIntoNode(copy.right.helperBottom, planId)}
                cta={
                  <PricingCtaLink
                    href={`/api/pay?plan=${planId}&period=${copy.right.period}`}
                    variant={copy.right.ctaVariant ?? "default"}
                    label={injectPlanIdIntoNode(copy.right.ctaLabel, planId)}
                    eventFunnel={ctaType}
                  />
                }
              />
            </div>

            {includedInPlan || includedInAllPaid ? (
              <div className="mt-6 space-y-6">
                {includedInPlan ? (
                  <div>
                    {includedInPlanTitle ? (
                      <div className="text-sm font-semibold text-foreground">
                        {injectPlanIdIntoNode(includedInPlanTitle, planId)}
                      </div>
                    ) : null}
                    <div className={includedInPlanTitle ? "mt-3" : ""}>
                      {injectPlanIdIntoNode(includedInPlan, planId)}
                    </div>
                  </div>
                ) : null}

                {includedInAllPaid ? (
                  <div>
                    {includedInAllPaidTitle ? (
                      <div className="text-sm font-semibold text-foreground">
                        {injectPlanIdIntoNode(includedInAllPaidTitle, planId)}
                      </div>
                    ) : null}
                    <div className={includedInAllPaidTitle ? "mt-3" : ""}>
                      {injectPlanIdIntoNode(includedInAllPaid, planId)}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}

      {comparePlansLabel ? (
        <div className="mt-8 text-center">
          <a
            href={getCanonicalLink(locale, "/landings/pricing")}
            className="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
          >
            {comparePlansLabel}
          </a>
        </div>
      ) : null}
    </section>
  );
}

export function InlinePricingFeatureList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-2 lg:grid-cols-3", className)}>{children}</ul>
  );
}

export function InlinePricingFeatureItem({
  children,
  className,
  planId,
  limitKey
}: {
  children: React.ReactNode;
  className?: string;
  planId?: PaidPlanId;
  limitKey?: keyof ReturnType<typeof getPlanDetails>["limits"];
}) {
  const isZero = limitKey && planId ? getPlanDetails(planId).limits[limitKey] === 0 : false;
  return (
    <li className={cn("flex items-start gap-2 text-sm text-muted-foreground", className)}>
      {isZero ? (
        <XIcon className="mt-0.5 size-4 text-muted-foreground/50" />
      ) : (
        <Check className="mt-0.5 size-4 text-brand-primary" />
      )}
      <span>{children}</span>
    </li>
  );
}

export function InlinePricingPlanName({
  planId,
  businessLabel,
  className
}: InlinePricingInjectedPlanProps & { businessLabel?: string; className?: string }) {
  if (!planId) {
    throw new Error("InlinePricingPlanName is missing `planId`. Use it inside <InlinePricing />.");
  }
  const plan = getPlanDetails(planId);
  const text = getPlanDisplayName(plan);
  return <span className={className}>{text}</span>;
}

export function InlinePricingPlanLimit({
  planId,
  limit,
  zeroLabel
}: InlinePricingInjectedPlanProps & { limit: keyof ReturnType<typeof getPlanDetails>["limits"]; zeroLabel?: string }) {
  if (!planId) {
    throw new Error("InlinePricingPlanLimit is missing `planId`. Use it inside <InlinePricing />.");
  }
  const plan = getPlanDetails(planId);
  const value = plan.limits[limit];
  if (value === 0 && zeroLabel) return <>{zeroLabel}</>;
  return <>{value}</>;
}

export function InlinePricingPlanRetention({
  planId,
  map
}: InlinePricingInjectedPlanProps & { map?: Record<string, string> }) {
  if (!planId) {
    throw new Error("InlinePricingPlanRetention is missing `planId`. Use it inside <InlinePricing />.");
  }
  const plan = getPlanDetails(planId);
  const val = plan.limits.retention;
  return <>{map?.[val] ?? val}</>;
}
