export const locales = ["en", "fr"] as const;

export const pathnames = {
  "/solutions/youtube": {
    en: "/solutions/youtube",
    fr: "/solutions/youtube",
  },
  // "/abuse": {
  //   en: "/report-abuse",
  //   fr: "/signaler-un-abus",
  // },
};

export type AppPathnames = keyof typeof pathnames;
