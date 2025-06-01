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
  variant?: "default" | "secondary" | "outline";
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
      className={twMerge("font-bold", className)}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : value}
    </Button>
  );
}
