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
  variant?: "default" | "secondary" | "outline";
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
        "w-full sm:w-fit min-w-[130px] mx-auto xl:my-0 rounded-full h-10 text-sm font-semibold text-white bg-gradient-to-r from-gray-600 to-gray-800 hover:to-gray-900 my-0 border-0 shadow-sm hover:shadow-sm shadow-gray-400 hover:shadow-gray-500",
        className
      )}
      data-cal-link="alexandre-sarfati/30-minutes-demo?pimms_id=1"
    >
      {children}
    </Button>
  );
}
