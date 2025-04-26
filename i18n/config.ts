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
  "/solutions/amazon": {
    en: "/solutions/deep-links-amazon",
    fr: "/solutions/deep-links-amazon",
  },
  "/legal/terms": {
    en: "/legal/terms",
    fr: "/legal/conditions-dutilisation",
  },
  "/legal/privacy": {
    en: "/legal/privacy",
    fr: "/legal/politique-de-confidentialite",
  },
  "/legal/imprint": {
    en: "/legal/imprint",
    fr: "/legal/mentions-legales",
  },
  "/legal/abuse": {
    en: "/legal/report-abuse",
    fr: "/legal/signaler-un-abus",
  },
  "/changelog": {
    en: "/changelog",
    fr: "/changelog",
  },
  "/blog": {
    en: "/blog",
    fr: "/blog",
  },
  "/blog/category/company": {
    en: "/blog/category/company",
    fr: "/blog/category/entreprise",
  },
  "/blog/category/education": {
    en: "/blog/category/education",
    fr: "/blog/category/education",
  },
  "/blog/author/alexandre": {
    en: "/blog/author/alexandre",
    fr: "/blog/auteur/alexandre",
  },
  "/blog/first-article": {
    en: "/blog/what-is-pimms",
    fr: "/blog/pourquoi-pimms",
  },
  "/blog/utm-guide": {
    en: "/blog/utm-builder-guide",
    fr: "/blog/guide-balise-et-template-utm",
  },
  "/blog/introducing-conversion": {
    en: "/blog/introducing-conversion-tracking",
    fr: "/blog/lancement-suivi-des-conversions",
  },
  "/blog/start-with-zapier": {
    en: "/blog/start-with-zapier",
    fr: "/blog/demarrer-avec-zapier",
  },
  "/blog/start-with-cal-com-and-zapier": {
    en: "/blog/start-with-cal-com-and-zapier",
    fr: "/blog/demarrer-avec-cal-com-et-zapier",
  },
};

export type AppPathnames = keyof typeof pathnames;
