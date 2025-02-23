"use client";
import { useTranslations } from "next-intl";

export default function CtaButton({
  tkey,
  show = false,
}: {
  tkey: string;
  show?: boolean;
}) {
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
    <a
      onClick={handleClickFocus}
      className={`w-full md:w-fit px-5 py-2 bg-primary text-primary-foreground font-semibold rounded-md outline outline-4 transition hover:outline-[#F0A8BF] cursor-pointer ${
        show ? "block" : "hidden md:block"
      }`}
    >
      {t("cta.button")}
    </a>
  );
}
