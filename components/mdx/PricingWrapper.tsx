"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PricingContextType {
  tier: number;
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
  const [tier, setTier] = useState(0);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return <PricingContext.Provider value={{ tier, setTier, billing, setBilling }}>{children}</PricingContext.Provider>;
};
