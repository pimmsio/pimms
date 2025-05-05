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
  "/blog/category/digital-marketing": {
    en: "/blog/category/digital-marketing",
    fr: "/blog/category/marketing-digital",
  },
  "/blog/author/alexandre": {
    en: "/blog/author/alexandre",
    fr: "/blog/auteur/alexandre",
  },
  "/blog/author/emma": {
    en: "/blog/author/emma",
    fr: "/blog/auteur/emma",
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
  "/blog/start-with-iclosed-and-zapier": {
    en: "/blog/start-with-iclosed-and-zapier",
    fr: "/blog/demarrer-avec-iclosed-et-zapier",
  },
  "/blog/setup-stripe-for-website": {
    en: "/blog/setup-stripe-payments-tracking-with-pimms-on-any-website",
    fr: "/blog/configurer-stripe-tracking-paiements-avec-pimms-pour-site-web",
  },
  "/blog/no-code-guide-for-website": {
    en: "/blog/complete-no-code-guide-to-track-conversions-and-sales-on-your-website",
    fr: "/blog/guide-no-code-complet-pour-suivre-vos-conversions-et-ventes-sur-votre-site-web",
  },
  "/blog/embed-tracking-cal-com": {
    en: "/blog/no-code-guide-to-embed-tracking-cal-com",
    fr: "/blog/guide-no-code-pour-embed-tracking-cal-com",
  },
  "/blog/how-to-track-link-performance-across-multiple-channels": {
    en: "/blog/how-to-track-link-performance-across-multiple-channels",
    fr: "/blog/comment-suivre-les-performances-des-liens-sur-plusieurs-canaux",
  },
  "/blog/deep-links-vs-universal-links-whats-the-difference": {
    en: "/blog/deep-links-vs-universal-links-whats-the-difference",
    fr: "/blog/deep-links-vs-universal-links-quelle-difference",
  },
  "/blog/7-ways-to-boost-mobile-app-conversion-rates-in-2025": {
    en: "/blog/7-ways-to-boost-mobile-app-conversion-rates-in-2025",
    fr: "/blog/7-facons-pour-ameliorer-les-taux-de-conversion-de-vos-applications-mobiles-en-2025",
  },
  "/blog/how-to-track-email-campaign-revenue": {
    en: "/blog/how-to-track-email-campaign-revenue",
    fr: "/blog/comment-suivre-le-revenu-des-campagnes-email",
  },
  "/blog/how-to-track-revenue-per-click": {
    en: "/blog/how-to-track-revenue-per-click",
    fr: "/blog/comment-suivre-le-revenu-par-clic",
  },
  "/blog/ab-testing-steps-for-funnel-optimization": {
    en: "/blog/ab-testing-steps-for-funnel-optimization",
    fr: "/blog/comment-optimiser-votre-funnel-avec-le-test-a-b",
  },
  "/blog/how-deep-links-improve-conversion-paths": {
    en: "/blog/how-deep-links-improve-conversion-paths",
    fr: "/blog/comment-les-deep-links-ameliorent-les-chemins-de-conversion",
  },
};

export type AppPathnames = keyof typeof pathnames;
