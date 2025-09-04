"use client";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/tracking";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { APP_URL } from "../../app/constants";

export default function CtaButtonBig({
  type,
  className,
  value,
  variant = "default",
  size = "lg",
  href
}: {
  type: string;
  className?: string;
  value?: string | React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "inverse";
  size?: "default" | "sm" | "lg" | "xl";
  href?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await trackEvent("click_cta", {
      funnel: type
    });

    setTimeout(() => {
      setIsLoading(false);

      window.location.href = href || `${APP_URL}/register`;
    }, 300);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={twMerge(
        "font-bold relative overflow-hidden min-w-[130px]",
        variant === "inverse"
          ? ""
          : "rounded-full text-white bg-linear-to-r from-brand-secondary to-brand-primary hover:to-brand-primary-700 shadow-sm hover:shadow-sm shadow-brand-primary-600 hover:shadow-brand-primary-900",
        className
      )}
      disabled={isLoading}
    >
      {variant !== "inverse" && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-28 h-8 bg-white/20 blur-[6px] rotate-[-30deg] opacity-100 shadow-[0_1px_2px_rgba(0,0,0,0.25)]" />
          <div className="absolute left-12 top-1/2 -translate-y-1/2 w-36 h-8 bg-white/20 blur-[10px] rotate-[-30deg] opacity-90" />
        </div>
      )}
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : value}
    </Button>
  );
}
