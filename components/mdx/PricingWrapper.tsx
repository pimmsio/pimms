"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PricingContextType {
  tier: number;
  index: number;
  setTier: (tier: number) => void;
  billing: "monthly" | "yearly";
  setBilling: (billing: "monthly" | "yearly") => void;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const usePricingContext = () => {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error("usePricingContext must be used within PricingWrapper");
  }
  return context;
};

interface PricingWrapperProps {
  children: ReactNode;
}

export const PricingWrapper = ({ children }: PricingWrapperProps) => {
  const [tier, setTier] = useState(1);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  
  // index is used for pricing arrays (0-3 for paid tiers 5k, 20k, 40k, 100k)
  // when tier is 0 (Free), show tier 1 (5k) pricing
  const index = tier === 0 ? 0 : tier - 1;

  return (
    <PricingContext.Provider value={{ tier, index, setTier, billing, setBilling }}>
      {children}
    </PricingContext.Provider>
  );
};
