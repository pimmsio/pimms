"use client";

import { Button } from "@/components/ui/button";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function CtaDemo({ children }: { children?: string | React.ReactNode }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: {
          branding: { brandColor: "#FF6B35" }
        }
      });
    })();
  }, []);

  return (
    <Button
      variant="secondary"
      className="w-full sm:w-fit mx-auto my-3 sm:min-w-[380px]"
      data-cal-link="alexandre-sarfati/30-minutes-demo?pimms_id=1"
    >
      {children}
    </Button>
  );
}
