"use client";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

export default function CtaLink({ tkey }: { tkey: string }) {
  const t = useTranslations(tkey);

  const triggerFocus = () => {
    const input = document.getElementById("waitlist-form-input");
    if (input) {
      input.focus();
    }
  };

  const handleClickFocus = () => {
    const waitlistSection = document.getElementById("waitlist");
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: "smooth" });
    }

    triggerFocus();
  };

  return (
    <Button
      onClick={handleClickFocus}
      variant="link"
      className="text-sm md:text-base font-bold hidden md:block"
    >
      {t("cta.button")}
    </Button>
  );
}
