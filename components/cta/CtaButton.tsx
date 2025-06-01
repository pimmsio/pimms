import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

export default function CtaButton({ tkey, show = false }: { tkey: string; show?: boolean }) {
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

    setTimeout(triggerFocus, 1000);
  };

  return (
    <Button
      variant="default"
      onClick={handleClickFocus}
      className={`min-w-52 transition-transform hover:scale-105 tracking-tight ${show ? "block" : "hidden md:block"}`}
      size="lg"
    >
      {t("cta.button")}
    </Button>
  );
}
