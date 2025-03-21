"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { APP_URL } from "../../app/constants";
import { trackEvent } from "@/lib/tracking";
import { twMerge } from "tailwind-merge";

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

  const handleClick = () => {
    trackEvent("click_cta", {
      funnel: type,
    });

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
      >
        {t("form.button")}
        {showFree && (
          <span className="inline text-sm">{t("form.button_free")}</span>
        )}
      </Button>
    </div>
  );
}
