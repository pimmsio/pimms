"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useTransition } from "react";

const localeLabels: Record<string, string> = {
  en: "EN",
  fr: "FR"
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const otherLocale = locale === "en" ? "fr" : "en";

  function switchLocale() {
    startTransition(() => {
      router.replace(pathname, { locale: otherLocale });
    });
  }

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-50"
      aria-label={`Switch to ${localeLabels[otherLocale]}`}
    >
      <span className="text-foreground font-semibold">{localeLabels[locale]}</span>
      <span className="text-muted-foreground">/</span>
      <span>{localeLabels[otherLocale]}</span>
    </button>
  );
}
