"use client";

import { Button } from "@/components/ui/button";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

export default function CtaDemo({
  children,
  variant = "secondary",
  size = "lg",
  className
}: {
  children?: string | React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "inverse";
  size?: "default" | "sm" | "lg" | "xl";
  className?: string;
}) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: {
          branding: { brandColor: "var(--color-brand-primary)" }
        }
      });
    })();
  }, []);

  return (
    <Button
      variant={variant}
      size={size}
      className={twMerge(
        "w-full sm:w-fit mx-auto xl:my-0 rounded-2xl px-5 h-10 text-sm font-semibold text-white bg-primary hover:bg-primary/90 shadow-none hover:shadow-none my-0",
        className
      )}
      data-cal-link="alexandre-sarfati/30-minutes-demo?pimms_id=1"
    >
      {children}
    </Button>
  );
}
