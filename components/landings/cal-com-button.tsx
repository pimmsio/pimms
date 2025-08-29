"use client";

import { Button } from "@/components/ui/button";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function CalComButton({
  children,
  variant = "default",
  size = "lg",
  className = ""
}: {
  children: React.ReactNode;
  variant?: "default" | "inverse";
  size?: "default" | "sm" | "lg";
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
      className={(className || "") + " w-full sm:w-auto transition-transform shadow-sm shadow-gray-200/60"}
      data-cal-link="alexandre-sarfati/30-minutes-demo?pimms_id=1"
    >
      {children}
    </Button>
  );
}
