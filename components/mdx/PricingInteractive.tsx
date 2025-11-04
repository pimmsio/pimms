"use client";

import { ReactNode, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "../../lib/utils";
import { usePricingContext } from "./PricingWrapper";
import { PricingPrice, PricingSuffix, PriceDisplay } from "./PricingComponents";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import CtaButtonBig from "@/components/cta/CtaButtonBig";

// Stripe payment IDs for lifetime plans (used with /api/pay endpoint)
export const STRIPE_LIFETIME_PAYMENT_IDS = [
  "14A00igMlcYqfBB3dUc7u0p", // 5k - €99
  "14A00igMlcYqfBB3dUc7u0p", // 20k - €299
  "14A00igMlcYqfBB3dUc7u0p", // 40k - €399
  "14A00igMlcYqfBB3dUc7u0p" // 100k - €599
];

// Pricing Slider Component for tier selection
export const PricingSlider = () => {
  const { tier, setTier } = usePricingContext();
  const t = useTranslations("general.pricing.slider");

  const tiers = [
    { value: 0, label: "0k", fullLabel: "Free" },
    { value: 1, label: "5k", fullLabel: t("label_5k") },
    { value: 2, label: "20k", fullLabel: t("label_20k") },
    { value: 3, label: "40k", fullLabel: t("label_40k") },
    { value: 4, label: "100k", fullLabel: t("label_100k") }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="bg-gray-900 text-white px-4 py-2 rounded-lg inline-block mb-4">
        <span className="text-sm font-medium">{tiers[tier].fullLabel}</span>
      </div>

      <div className="relative">
        <Slider
          value={[tier]}
          onValueChange={(value) => {
            if (value[0] === 0) {
              setTier(1);
            } else {
              setTier(value[0]);
            }
          }}
          min={0}
          max={4}
          step={1}
          className="w-full cursor-pointer"
        />
      </div>
    </div>
  );
};

// Billing Toggle Component (Monthly/Yearly)
export const BillingToggle = () => {
  const { billing, setBilling } = usePricingContext();
  const t = useTranslations("general.pricing.billing");

  return (
    <ToggleGroup
      type="single"
      value={billing}
      onValueChange={(value) => value && setBilling(value as "monthly" | "yearly")}
      className="bg-gray-100 rounded-lg h-14 sm:h-auto px-1 sm:p-1 flex-shrink-0 cursor-pointer"
    >
      <ToggleGroupItem
        value="monthly"
        className="text-base h-12 sm:h-auto font-semibold data-[state=on]:bg-white data-[state=on]:text-foreground cursor-pointer"
      >
        {t("monthly")}
      </ToggleGroupItem>
      <ToggleGroupItem
        value="yearly"
        className="flex flex-col sm:flex-row h-12 sm:h-auto gap-0 text-base font-semibold data-[state=on]:bg-white data-[state=on]:text-foreground cursor-pointer"
      >
        {t("yearly")}
        <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">{t("yearly_badge")}</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

// Event Tooltip Component
interface EventTooltipProps {
  children: ReactNode;
}

export const EventTooltip = ({ children }: EventTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("general.pricing.tooltip");

  return (
    <span className="relative inline-block w-full">
      <span
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help border-b border-dashed border-gray-400 w-full inline-block"
      >
        {children}
      </span>
      {isVisible && (
        <span className="absolute z-10 w-64 p-3 text-xs text-white bg-gray-900 rounded-lg shadow-lg bottom-full left-0 mb-2 whitespace-normal">
          {t("events")}
          <span className="absolute -bottom-1 left-4 w-2 h-2 bg-gray-900 transform rotate-45" />
        </span>
      )}
    </span>
  );
};

// DynamicPrice - displays price based on selected tier and billing mode
interface DynamicPriceProps {
  prices: number[];
  variant?: "starter" | "pro" | "business";
  mode?: "monthly" | "yearly" | "lifetime";
  suffix?: string;
}

export const DynamicPrice = ({ prices, variant = "pro", mode, suffix }: DynamicPriceProps) => {
  const { index, billing } = usePricingContext();
  const finalMode = mode || billing;
  const monthlyPrice = prices[index];
  const yearlyPrice = monthlyPrice * 9;
  const displayPrice = finalMode === "lifetime" ? prices[index] : finalMode === "monthly" ? monthlyPrice : yearlyPrice;

  const defaultSuffix = finalMode === "yearly" ? "/year" : finalMode === "monthly" ? "/month" : "HT";
  const finalSuffix = suffix !== undefined ? suffix : defaultSuffix;

  return (
    <PriceDisplay>
      <PricingPrice variant={variant}>€{displayPrice}</PricingPrice>
      {finalSuffix && <PricingSuffix variant={variant}>{finalSuffix}</PricingSuffix>}
    </PriceDisplay>
  );
};

// DynamicValue - displays a value based on selected tier
interface DynamicValueProps {
  values: any[];
}

export const DynamicValue = ({ values }: DynamicValueProps) => {
  const { index } = usePricingContext();
  return <>{values[index]}</>;
};

// DynamicDomains - displays domain count or "Unlimited" from tier 2 (€29)
interface DynamicDomainsProps {
  values?: any[];
}

export const DynamicDomains = ({ values = [3, 6, "Unlimited", "Unlimited", "Unlimited"] }: DynamicDomainsProps) => {
  const { index } = usePricingContext();
  return <>{values[index]}</>;
};

// DynamicPricingCta - CTA button that uses dynamic Stripe payment link based on tier
interface DynamicPricingCtaProps {
  variant?: "starter" | "pro" | "business";
  children: ReactNode;
}

export const DynamicPricingCta = ({ variant = "business", children }: DynamicPricingCtaProps) => {
  const { index } = usePricingContext();
  // tier starts at 1, array indices start at 0
  const paymentId = STRIPE_LIFETIME_PAYMENT_IDS[index];
  const paymentUrl = `/api/pay?id=${paymentId}`;

  return (
    <a
      href={paymentUrl}
      className={cn(
        "inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-200",
        variant === "business" ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-gray-900 text-white hover:bg-gray-800"
      )}
    >
      {children}
    </a>
  );
};

// PricingCta - CTA button that uses tier-based payment link (for MDX usage)
interface PricingCtaProps {
  href?: string;
  variant?: "starter" | "pro" | "business";
  children: ReactNode;
}

export const PricingCta = ({ href, variant = "starter", children }: PricingCtaProps) => {
  const { index } = usePricingContext();

  // If href is not provided or is "lifetime", use tier-based payment ID
  let finalHref = href;
  if (!href || href === "/api/pay?id=lifetime") {
    const paymentId = STRIPE_LIFETIME_PAYMENT_IDS[index];
    finalHref = `/api/pay?id=${paymentId}`;
  }

  if (variant === "business") {
    return (
      <CtaButtonBig type="pricing" variant="inverse" value={children} href={finalHref} className="w-full" size="lg" />
    );
  }

  return <CtaButtonBig type="pricing" value={children} href={finalHref} className="w-full" size="lg" />;
};
