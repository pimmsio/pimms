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
    en: "/legal/terms-of-service",
    fr: "/legal/conditions-generales-utilisation",
  },
  "/legal/privacy": {
    en: "/legal/privacy-policy",
    fr: "/legal/politique-de-confidentialite",
  },
  "/legal/imprint": {
    en: "/legal/imprint",
    fr: "/legal/mentions-legales",
  },
  "/legal/abuse": {
    en: "/legal/report-abuse",
    fr: "/legal/signaler-abus",
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
    en: "/blog/category/company-news",
    fr: "/blog/category/actualites-entreprise",
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
    fr: "/blog/quest-ce-que-pimms",
  },
  // Guides
  "/blog/category/guides": {
    en: "/guides",
    fr: "/guides",
  },
  "/blog/how-to-track-webflow-leads": {
    en: "/guides/how-to-track-webflow-form-submissions",
    fr: "/guides/comment-suivre-formulaires-lead-webflow",
  },
  "/blog/how-to-track-systemeio-sales-and-leads": {
    en: "/guides/how-to-track-systemeio-sales-and-leads",
    fr: "/guides/comment-suivre-ventes-et-leads-systemeio",
  },
  "/blog/start-with-cal-com-and-zapier": {
    en: "/guides/how-to-track-cal-com-bookings",
    fr: "/guides/comment-suivre-reservations-cal-com",
  },
  "/blog/no-code-guide-for-website": {
    en: "/guides/how-to-track-conversions-on-vibe-coding-ai-no-code-sites",
    fr: "/guides/comment-suivre-conversions-sites-vibe-coding-no-code-ai",
  },
  // Tutorials
  "/blog/category/tutorials": {
    en: "/tutorials",
    fr: "/tutoriels",
  },
  "/blog/start-with-zapier": {
    en: "/tutorials/zapier-getting-started",
    fr: "/tutoriels/demarrer-avec-zapier",
  },
  "/blog/utm-guide": {
    en: "/tutorials/utm-builder-guide",
    fr: "/tutoriels/guide-balises-utm",
  },
  // Blog posts
  "/blog/introducing-conversion": {
    en: "/blog/conversion-tracking-introduction",
    fr: "/blog/introduction-suivi-conversion",
  },
  "/blog/start-with-iclosed-and-zapier": {
    en: "/blog/setup-iclosed-zapier",
    fr: "/blog/configurer-iclosed-zapier",
  },
  "/blog/setup-stripe-for-website": {
    en: "/blog/stripe-payment-tracking-website",
    fr: "/blog/suivi-paiements-stripe-site-web",
  },
  "/blog/how-to-track-link-performance-across-multiple-channels": {
    en: "/blog/track-link-performance-multiple-channels",
    fr: "/blog/suivre-performances-liens-canaux",
  },
  "/blog/deep-links-vs-universal-links-whats-the-difference": {
    en: "/blog/deep-links-vs-universal-links",
    fr: "/blog/deeplink-vs-universal-links",
  },
  "/blog/7-ways-to-boost-mobile-app-conversion-rates-in-2025": {
    en: "/blog/boost-mobile-conversions-2025",
    fr: "/blog/ameliorer-conversions-apps-2025",
  },
  "/blog/how-to-track-email-campaign-revenue": {
    en: "/blog/track-email-campaign-revenue",
    fr: "/blog/suivre-revenus-campagnes-email",
  },
  "/blog/how-to-track-revenue-per-click": {
    en: "/blog/revenue-per-click-tracking",
    fr: "/blog/suivre-revenu-par-clic",
  },
  "/blog/ab-testing-steps-for-funnel-optimization": {
    en: "/blog/ab-test-funnel-optimization",
    fr: "/blog/optimisation-funnel-test-ab",
  },
  "/blog/how-deep-links-improve-conversion-paths": {
    en: "/blog/deep-links-conversion-paths",
    fr: "/blog/deeplink-chemins-conversion",
  },
  "/blog/deep-linking-for-influencer-campaigns-basics": {
    en: "/blog/deep-links-influencer-campaigns",
    fr: "/blog/deeplink-campagnes-influence",
  },
  "/blog/referrer-vs-utm-vs-fingerprinting-what-really-tells-you-where-a-click-came-from":
    {
      en: "/blog/referrer-vs-utm-vs-fingerprinting",
      fr: "/blog/origine-clic-referrer-utm-fingerprint",
    },
  "/blog/unlock-systemeio-attribution-with-pimms": {
    en: "/blog/systemeio-attribution-pimms",
    fr: "/blog/debloquer-attribution-systemeio-pimms",
  },
  "/blog/5-dynamic-link-personalization-tips-for-higher-conversions": {
    en: "/blog/dynamic-link-personalization-tips",
    fr: "/blog/liens-dynamiques-meilleures-conversions",
  },
  "/blog/from-first-click-to-conversion-understand-exactly-how-your-marketing-drives-revenue":
    {
      en: "/blog/track-marketing-roi-click-to-conversion",
      fr: "/blog/roi-marketing-du-clic-a-la-conversion",
    },
  "/blog/utm-tracking-for-organic-social-media-posts": {
    en: "/blog/utm-tracking-social-media",
    fr: "/blog/suivi-utm-reseaux-sociaux",
  },
  "/blog/5-funnel-tracking-errors-that-skew-data": {
    en: "/blog/funnel-tracking-errors",
    fr: "/blog/erreurs-suivi-funnel",
  },
  "/blog/how-utm-parameters-impact-conversion-paths": {
    en: "/blog/utm-impact-conversion-paths",
    fr: "/blog/effet-parametres-utm-conversions",
  },
};

export type AppPathnames = keyof typeof pathnames;
