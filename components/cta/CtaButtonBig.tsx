"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { APP_URL } from "../../app/constants";
import { trackEvent } from "@/lib/tracking";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function CtaButtonBig({
  tkey,
  type,
  showFree = false,
  className,
}: {
  tkey: string;
  type: string;
  showFree?: boolean;
  className?: string;
}) {
  const t = useTranslations(tkey);

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await trackEvent("click_cta", {
      funnel: type,
    });

    setIsLoading(true);
    window.location.href = `${APP_URL}/register`;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
      <Button
        variant="default"
        type="submit"
        size="lg"
        onClick={handleClick}
        className={twMerge("block px-8", className)}
        disabled={isLoading}
      >
        <span className="flex items-center gap-2">
          {isLoading && <Loader2 size={32} className="animate-spin" />}
          {t("form.button")}
        </span>
        {showFree && (
          <span className="inline text-sm">{t("form.button_free")}</span>
        )}
      </Button>
    </div>
  );
}
