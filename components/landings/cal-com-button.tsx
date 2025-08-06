"use client";

import { Button } from "@/components/ui/button";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function CalComButton({ children }: { children: React.ReactNode }) {
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
      size="lg"
      className="w-full md:w-auto md:px-12 bg-[#FF6B35] hover:bg-[#e55a2b] text-white"
      data-cal-link="alexandre-sarfati-pidjvv/30-minutes-with-alexandre-pimms?pimms_id=1"
    >
      {children}
    </Button>
  );
}
