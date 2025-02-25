export const locales = ["en", "fr"] as const;

export const pathnames = {
  "/youtube": {
    en: "/youtube",
    fr: "/youtube",
  },
  // "/abuse": {
  //   en: "/report-abuse",
  //   fr: "/signaler-un-abus",
  // },
};

export type AppPathnames = keyof typeof pathnames;
