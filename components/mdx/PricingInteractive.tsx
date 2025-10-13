"use client";

import { ReactNode, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "../../lib/utils";
import { usePricingContext } from "./PricingWrapper";
import { PricingPrice, PricingSuffix, PriceDisplay } from "./PricingComponents";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Pricing Slider Component for tier selection
export const PricingSlider = () => {
  const { tier, setTier } = usePricingContext();
  const t = useTranslations("general.pricing.slider");

  const tiers = [
    { value: 0, label: "5k", fullLabel: t("label_5k") },
    { value: 1, label: "20k", fullLabel: t("label_20k") },
    { value: 2, label: "40k", fullLabel: t("label_40k") },
    { value: 3, label: "100k", fullLabel: t("label_100k") },
    { value: 4, label: "200k+", fullLabel: t("label_200k") }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="bg-gray-900 text-white px-4 py-2 rounded-lg inline-block mb-4">
        <span className="text-sm font-medium">{tiers[tier].fullLabel}</span>
      </div>

      <div className="relative">
        <Slider
          value={[tier]}
          onValueChange={(value) => setTier(value[0])}
          min={0}
          max={4}
          step={1}
          className="w-full mb-4 cursor-pointer"
        />

        <div className="flex justify-between px-1">
          {tiers.map((t) => (
            <button
              key={t.value}
              onClick={() => setTier(t.value)}
              className={cn(
                "text-sm transition-colors cursor-pointer",
                tier === t.value ? "text-foreground font-semibold" : "text-muted-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
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
  const { tier, billing } = usePricingContext();
  const finalMode = mode || billing;
  const monthlyPrice = prices[tier];
  const yearlyPrice = monthlyPrice * 10;
  const displayPrice = finalMode === "lifetime" ? prices[tier] : finalMode === "monthly" ? monthlyPrice : yearlyPrice;

  const defaultSuffix = finalMode === "monthly" || finalMode === "yearly" ? "/month" : "HT";
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
  const { tier } = usePricingContext();
  return <>{values[tier]}</>;
};

// DynamicDomains - displays domain count or "Unlimited" from tier 2 (€29)
interface DynamicDomainsProps {
  values?: any[];
}

export const DynamicDomains = ({ values = [3, 6, "Unlimited", "Unlimited", "Unlimited"] }: DynamicDomainsProps) => {
  const { tier } = usePricingContext();
  return <>{values[tier]}</>;
};
