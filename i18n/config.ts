export const locales = ["en", "fr"] as const;

export const pathnames: Record<string, Record<string, string>> = {
  "/": {
    en: "/",
    fr: "/",
  },
  "/solutions/youtube": {
    en: "/solutions/deep-links-youtube-channel",
    fr: "/solutions/deep-links-chaine-youtube",
  },
  // "/abuse": {
  //   en: "/report-abuse",
  //   fr: "/signaler-un-abus",
  // },
};

export type AppPathnames = keyof typeof pathnames;
