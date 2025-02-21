import { Pathnames } from "next-intl/navigation";

export const locales = ["en", "fr"] as const;

export const pathnames: Pathnames<typeof locales> = {
  "/abuse": {
    en: "/report-abuse",
    fr: "/signaler-un-abus",
  },
};

export const localePrefix = "always";

export type AppPathnames = keyof typeof pathnames;
