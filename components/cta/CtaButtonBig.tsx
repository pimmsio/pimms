"use client";

import { Button } from "@/components/ui/button";
import { APP_URL } from "../../app/constants";
import { trackEvent } from "@/lib/tracking";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function CtaButtonBig({
  type,
  className,
  value,
  variant = "default",
}: {
  type: string;
  className?: string;
  value?: string | React.ReactNode;
  variant?: "default" | "secondary";
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await trackEvent("click_cta", {
      funnel: type,
    });

    setIsLoading(false);
    window.location.href = `${APP_URL}/register`;
  };

  if (variant === "secondary") {
    return (
      <div className="flex flex-col md:flex-row w-full">
        <Button
          variant="secondary"
          type="submit"
          size="lg"
          onClick={handleClick}
          className={twMerge(
            "py-[0.25em] text-xl md:min-w-44 w-fit hover:scale-105",
            className
          )}
          disabled={isLoading}
        >
          <span className="flex items-center gap-2 justify-center w-full tracking-tight">
            {isLoading && <Loader2 size={32} className="animate-spin" />}
            {value}
          </span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
      <Button
        variant="default"
        type="submit"
        size="lg"
        onClick={handleClick}
        className={twMerge("block px-6 min-w-full sm:min-w-[21rem]", className)}
        disabled={isLoading}
      >
        <span className="flex items-center gap-2 justify-center w-full tracking-tight">
          {isLoading && <Loader2 size={32} className="animate-spin" />}
          {value}
        </span>
      </Button>
    </div>
  );
}
