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
  "/solutions/linkedin": {
    en: "/solutions/deep-links-grow-with-linkedin",
    fr: "/solutions/deep-links-convertir-sur-linkedin",
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
};

export type AppPathnames = keyof typeof pathnames;
