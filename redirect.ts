const redirects = [
  { source: "/blog", destination: "/articles", permanent: true },
  {
    source: "/blog/author/emma",
    destination: "/articles/author/emma",
    permanent: true,
  },
  {
    source: "/blog/category/digital-marketing",
    destination: "/blog/marketing",
    permanent: true,
  },
  {
    source:
      "/blog/complete-no-code-guide-to-track-conversions-and-sales-on-your-website",
    destination:
      "/guides/how-to-track-conversions-on-vibe-coding-ai-no-code-sites",
    permanent: true,
  },
  {
    source: "/blog/how-to-track-systemeio-sales-and-leads",
    destination:
      "/guides/how-to-track-systemeio-sales-and-leads-marketing-attribution",
    permanent: true,
  },
  {
    source: "/guides/how-to-track-systemeio-sales-and-leads",
    destination:
      "/guides/how-to-track-systemeio-sales-and-leads-marketing-attribution",
    permanent: true,
  },
  {
    source: "/blog/introducing-conversion-tracking",
    destination: "/blog/introducing-pimms-conversion-tracking",
    permanent: true,
  },
  {
    source: "/blog/conversion-tracking-introduction",
    destination: "/blog/introducing-pimms-conversion-tracking",
    permanent: true,
  },
  {
    source: "/blog/no-code-guide-to-embed-tracking-cal-com",
    destination: "/guides/how-to-track-cal-com-bookings-marketing-attribution",
    permanent: true,
  },
  {
    source: "/guides/how-to-track-cal-com-bookings",
    destination: "/guides/how-to-track-cal-com-bookings-marketing-attribution",
    permanent: true,
  },
  {
    source:
      "/blog/referrer-vs-utm-vs-fingerprinting-where-clicks-really-come-from",
    destination:
      "/blog/referrer-vs-utm-vs-fingerprinting-where-a-click-came-from",
    permanent: true,
  },
  {
    source: "/blog/referrer-vs-utm-vs-fingerprinting",
    destination:
      "/blog/referrer-vs-utm-vs-fingerprinting-where-a-click-came-from",
    permanent: true,
  },
  {
    source: "/blog/setup-stripe-payments-tracking-with-pimms-on-any-website",
    destination: "/guides/how-to-track-stripe-sales-marketing-attribution",
    permanent: true,
  },
  {
    source: "/guides/how-to-track-stripe-sales",
    destination: "/guides/how-to-track-stripe-sales-marketing-attribution",
    permanent: true,
  },
  {
    source: "/blog/start-with-cal-com-and-zapier",
    destination: "/guides/how-to-track-cal-com-bookings-marketing-attribution",
    permanent: true,
  },
  {
    source: "/blog/start-with-iclosed-and-zapier",
    destination: "/guides/how-to-track-iclosed-bookings-marketing-attribution",
    permanent: true,
  },
  {
    source: "/guides/how-to-track-iclosed-bookings",
    destination: "/guides/how-to-track-iclosed-bookings-marketing-attribution",
    permanent: true,
  },
  {
    source: "/blog/start-with-zapier",
    destination: "/tutorials/how-to-track-conversions-with-zapier-and-pimms",
    permanent: true,
  },
  {
    source: "/blog/utm-builder-guide",
    destination: "/tutorials/mastering-utm-tracking-with-deep-linking",
    permanent: true,
  },
  { source: "/fr/", destination: "/fr", permanent: true },
  { source: "/fr/blog", destination: "/fr/articles", permanent: true },
  {
    source:
      "/fr/blog/7-facons-pour-ameliorer-les-taux-de-conversion-de-vos-applications-mobiles-en-2025",
    destination:
      "/fr/blog/7-moyens-pour-booster-les-conversions-des-apps-mobiles-en-2025",
    permanent: true,
  },
  {
    source: "/fr/blog/auteur/alexandre",
    destination: "/fr/articles/auteur/alexandre",
    permanent: true,
  },
  {
    source: "/fr/blog/auteur/emma",
    destination: "/fr/articles/auteur/emma",
    permanent: true,
  },
  {
    source: "/fr/blog/category/marketing-digital",
    destination: "/fr/blog/marketing",
    permanent: true,
  },
  {
    source:
      "/fr/blog/comment-les-deep-links-ameliorent-les-campagnes-influencer",
    destination: "/fr/blog/les-bases-du-marketing-influence-avec-deep-linking",
    permanent: true,
  },
  {
    source:
      "/fr/blog/comment-les-deep-links-ameliorent-les-chemins-de-conversion",
    destination:
      "/fr/blog/comment-les-deep-links-ameliorent-les-parcours-de-conversion",
    permanent: true,
  },
  {
    source: "/fr/blog/comment-optimiser-votre-funnel-avec-le-test-a-b",
    destination: "/fr/blog/ab-testing-pour-optimiser-son-tunnel-de-conversion",
    permanent: true,
  },
  {
    source: "/fr/blog/comment-suivre-le-revenu-des-campagnes-email",
    destination: "/fr/blog/comment-suivre-les-revenus-des-campagnes-emailing",
    permanent: true,
  },
  {
    source:
      "/fr/blog/comment-suivre-les-performances-des-liens-sur-plusieurs-canaux",
    destination:
      "/fr/blog/comment-suivre-la-performance-des-liens-sur-plusieurs-canaux",
    permanent: true,
  },
  {
    source: "/fr/blog/comment-suivre-les-ventes-et-les-leads-de-systemeio",
    destination:
      "/fr/guides/comment-suivre-ventes-et-leads-systemeio-attribution-marketing",
    permanent: true,
  },
  {
    source: "/fr/guides/comment-suivre-ventes-et-leads-systemeio",
    destination:
      "/fr/guides/comment-suivre-ventes-et-leads-systemeio-attribution-marketing",
    permanent: true,
  },
  {
    source: "/fr/blog/deep-links-vs-universal-links-quelle-difference",
    destination:
      "/fr/blog/deep-links-vs-universal-links-quelle-est-la-difference",
    permanent: true,
  },
  {
    source: "/fr/blog/demarrer-avec-iclosed-et-zapier",
    destination:
      "/fr/guides/comment-suivre-reservations-iclosed-attribution-marketing",
    permanent: true,
  },
  {
    source: "/fr/guides/comment-suivre-reservations-iclosed",
    destination:
      "/fr/guides/comment-suivre-reservations-iclosed-attribution-marketing",
    permanent: true,
  },
  {
    source:
      "/fr/blog/guide-no-code-complet-pour-suivre-vos-conversions-et-ventes-sur-votre-site-web",
    destination:
      "/fr/guides/comment-suivre-conversions-sites-vibe-coding-no-code-ai",
    permanent: true,
  },
  {
    source: "/fr/blog/guide-no-code-pour-embed-tracking-cal-com",
    destination:
      "/fr/guides/comment-suivre-reservations-cal-com-attribution-marketing",
    permanent: true,
  },
  {
    source: "/fr/blog/pourquoi-pimms",
    destination: "/blog/what-is-pimms",
    permanent: true,
  },
  {
    source: "/fr/blog/referrer-utm-fingerprinting-dou-viennent-les-clics",
    destination: "/fr/blog/referrer-vs-utm-vs-fingerprinting-ou-vient-un-clic",
    permanent: true,
  },
  {
    source: "/fr/legal/mentions-legales",
    destination: "/legal/imprint",
    permanent: true,
  },
  {
    source: "/fr/legal/signaler-un-abus",
    destination: "/legal/report-abuse",
    permanent: true,
  },
  {
    source: "/legal/privacy",
    destination: "/legal/privacy-policy",
    permanent: true,
  },
  {
    source: "/legal/terms",
    destination: "/legal/terms-of-service",
    permanent: true,
  },
  {
    source: "/solutions/youtube",
    destination: "/solutions/deep-links-youtube-channel",
    permanent: true,
  },

  // --- 5xx server error URLs ---
  {
    source: "/blog/terms",
    destination: "/legal/terms-of-service",
    permanent: true,
  },
  {
    source: "/blog/privacy",
    destination: "/legal/privacy-policy",
    permanent: true,
  },
  { source: "/blog/imprint", destination: "/legal/imprint", permanent: true },
  {
    source: "/blog/abuse",
    destination: "/legal/report-abuse",
    permanent: true,
  },
  {
    source: "/fr/blog/terms",
    destination: "/legal/terms-of-service",
    permanent: true,
  },
  {
    source: "/fr/blog/privacy",
    destination: "/legal/privacy-policy",
    permanent: true,
  },
  {
    source: "/fr/blog/imprint",
    destination: "/legal/imprint",
    permanent: true,
  },
  {
    source: "/fr/blog/abuse",
    destination: "/legal/report-abuse",
    permanent: true,
  },

  // --- 404 fixes ---
  {
    source: "/guides/how-to-track-framer",
    destination:
      "/guides/how-to-track-framer-form-submissions-marketing-attribution",
    permanent: true,
  },
  {
    source: "/fr/guides/how-to-track-calendly",
    destination:
      "/fr/guides/comment-suivre-reservations-calendly-attribution-marketing",
    permanent: true,
  },
  {
    source: "/fr/tutorials/start-with-zapier",
    destination:
      "/fr/tutoriels/comment-tracker-les-conversions-avec-zapier-attribution-marketing",
    permanent: true,
  },
  {
    source: "/fr/tutorials/utm-guide",
    destination: "/fr/tutoriels/maitriser-le-tracking-utm-et-le-deep-linking",
    permanent: true,
  },
  {
    source: "/fr/guides/how-to-track-framer",
    destination:
      "/fr/guides/comment-suivre-formulaires-framer-attribution-marketing",
    permanent: true,
  },
  {
    source: "/fr/guides/start-with-cal-com-and-zapier",
    destination:
      "/fr/guides/comment-suivre-reservations-cal-com-attribution-marketing",
    permanent: true,
  },
  {
    source: "/guides/how-to-track-tally",
    destination:
      "/guides/how-to-track-tally-form-submissions-marketing-attribution",
    permanent: true,
  },
  {
    source: "/guides/no-code-guide-for-website",
    destination:
      "/guides/how-to-track-conversions-on-vibe-coding-ai-no-code-sites",
    permanent: true,
  },
  {
    source: "/tutorials/start-with-zapier",
    destination: "/tutorials/how-to-track-conversions-with-zapier-and-pimms",
    permanent: true,
  },
  {
    source: "/fr/guides/setup-stripe-for-website",
    destination:
      "/fr/guides/comment-suivre-ventes-stripe-attribution-marketing",
    permanent: true,
  },
  {
    source: "/fr/guides/start-with-iclosed-and-zapier",
    destination:
      "/fr/guides/comment-suivre-reservations-iclosed-attribution-marketing",
    permanent: true,
  },
  {
    source: "/tutorials/utm-guide",
    destination: "/tutorials/mastering-utm-tracking-with-deep-linking",
    permanent: true,
  },
  {
    source: "/fr/guides/no-code-guide-for-website",
    destination:
      "/fr/guides/comment-suivre-conversions-sites-vibe-coding-no-code-ai",
    permanent: true,
  },
  {
    source: "/fr/guides/how-to-track-webflow-leads",
    destination:
      "/fr/guides/comment-suivre-formulaires-lead-webflow-attribution-marketing",
    permanent: true,
  },
  {
    source: "/guides/start-with-iclosed-and-zapier",
    destination: "/guides/how-to-track-iclosed-bookings-marketing-attribution",
    permanent: true,
  },
  {
    source: "/fr/guides/how-to-track-tally",
    destination:
      "/fr/guides/comment-suivre-formulaires-tally-attribution-marketing",
    permanent: true,
  },
  {
    source: "/guides/how-to-track-webflow-leads",
    destination:
      "/guides/how-to-track-webflow-form-submissions-marketing-attribution",
    permanent: true,
  },
  {
    source: "/guides/setup-stripe-for-website",
    destination: "/guides/how-to-track-stripe-sales-marketing-attribution",
    permanent: true,
  },
  {
    source: "/guides/how-to-track-calendly",
    destination: "/guides/how-to-track-calendly-bookings-marketing-attribution",
    permanent: true,
  },
  {
    source: "/guides/start-with-cal-com-and-zapier",
    destination: "/guides/how-to-track-cal-com-bookings-marketing-attribution",
    permanent: true,
  },

  // --- Closest match additions from unmatched 404/redirect ---
  {
    source: "/blog/suivre-revenus-campagnes-email",
    destination: "/fr/blog/comment-suivre-les-revenus-des-campagnes-emailing",
    permanent: true,
  },
  {
    source: "/blog/quest-ce-que-pimms",
    destination: "/blog/what-is-pimms",
    permanent: true,
  },
  {
    source: "/legal/politique-de-confidentialite",
    destination: "/legal/privacy-policy",
    permanent: true,
  },
  { source: "/fr/tutorials", destination: "/fr/tutoriels", permanent: true },
  {
    source: "/fr/tutorials/zapier-getting-started",
    destination:
      "/fr/tutoriels/comment-tracker-les-conversions-avec-zapier-attribution-marketing",
    permanent: true,
  },
  {
    source: "/blog/ameliorer-conversions-apps-2025",
    destination:
      "/fr/blog/7-moyens-pour-booster-les-conversions-des-apps-mobiles-en-2025",
    permanent: true,
  },
  {
    source: "/blog/category/actualites-entreprise",
    destination: "/blog/company-news",
    permanent: true,
  },
  {
    source: "/blog/suivre-paiements-stripe-balises-utm",
    destination: "/guides/how-to-track-stripe-sales-marketing-attribution",
    permanent: true,
  },
  {
    source: "/blog/suivre-revenu-par-clic",
    destination: "/blog/how-to-track-revenue-per-click",
    permanent: true,
  },
  {
    source: "/blog/auteur/emma",
    destination: "/articles/author/emma",
    permanent: true,
  },
  {
    source: "/blog/origine-clic-referrer-utm-fingerprint",
    destination:
      "/blog/referrer-vs-utm-vs-fingerprinting-where-a-click-came-from",
    permanent: true,
  },
  {
    source: "/blog/deeplink-campagnes-influence",
    destination: "/blog/deep-linking-for-influencer-campaigns-basics",
    permanent: true,
  },
  {
    source: "/fr/blog/boost-mobile-conversions-2025",
    destination:
      "/fr/blog/7-moyens-pour-booster-les-conversions-des-apps-mobiles-en-2025",
    permanent: true,
  },

  // new redirects missing
  {
    source: "/blog/quest-ce-que-pimms",
    destination: "/fr/blog/what-is-pimms",
    permanent: true,
  },
  {
    source: "/fr/blog/category/digital-marketing",
    destination: "/fr/blog/marketing",
    permanent: true,
  },
  {
    source:
      "/fr/guides/how-to-track-conversions-on-vibe-coding-ai-no-code-sites",
    destination:
      "/fr/guides/comment-suivre-conversions-sites-vibe-coding-no-code-ai",
    permanent: true,
  },
  {
    source: "/legal/politique-de-confidentialite",
    destination: "/fr/legal/privacy-policy",
    permanent: true,
  },
  {
    source: "/fr/guides/how-to-track-framer-form-submissions",
    destination:
      "/fr/guides/comment-suivre-formulaires-framer-attribution-marketing",
    permanent: true,
  },
  {
    source: "/blog/suivre-paiements-stripe-balises-utm",
    destination:
      "/fr/guides/comment-suivre-ventes-stripe-attribution-marketing",
    permanent: true,
  },
  {
    source: "/guides/comment-suivre-formulaires-lead-webflow",
    destination:
      "/fr/guides/comment-suivre-formulaires-lead-webflow-attribution-marketing",
    permanent: true,
  },
  {
    source: "/fr/guides/how-to-track-webflow-form-submissions",
    destination:
      "/fr/guides/comment-suivre-formulaires-lead-webflow-attribution-marketing",
    permanent: true,
  },
  {
    source: "/blog/ameliorer-conversions-apps-2025",
    destination:
      "/fr/blog/7-moyens-pour-booster-les-conversions-des-apps-mobiles-en-2025",
    permanent: true,
  },
  {
    source: "/fr/blog/deep-links-vs-universal-links",
    destination:
      "/fr/blog/deep-links-vs-universal-links-quelle-est-la-difference",
    permanent: true,
  },
  {
    source: "/fr/blog/deep-links-vs-universal-links-whats-the-difference",
    destination:
      "/fr/blog/deep-links-vs-universal-links-quelle-est-la-difference",
    permanent: true,
  },
  {
    source: "/fr/blog/what-is-pimms",
    destination: "/fr/blog/what-is-pimms",
    permanent: true,
  },
  {
    source: "/blog/category/actualites-entreprise",
    destination: "/fr/blog/actualites-entreprise",
    permanent: true,
  },
  {
    source: "/legal/mentions-legales",
    destination: "/fr/legal/imprint",
    permanent: true,
  },
  {
    source: "/blog/deeplink-campagnes-influence",
    destination: "/fr/blog/les-bases-du-marketing-influence-avec-deep-linking",
    permanent: true,
  },
  {
    source: "/guides/comment-suivre-ventes-et-leads-systemeio",
    destination:
      "/fr/guides/comment-suivre-ventes-et-leads-systemeio-attribution-marketing",
    permanent: true,
  },
  { source: "/fr/tutorials", destination: "/fr/tutoriels", permanent: true },
  {
    source: "/guides/comment-suivre-ventes-stripe",
    destination:
      "/fr/guides/comment-suivre-ventes-stripe-attribution-marketing",
    permanent: true,
  },
  {
    source: "/fr/guides/how-to-track-cal-com-bookings",
    destination:
      "/fr/guides/comment-suivre-reservations-cal-com-attribution-marketing",
    permanent: true,
  },
  {
    source: "/fr/tutorials/zapier-getting-started",
    destination:
      "/fr/tutoriels/comment-tracker-les-conversions-avec-zapier-attribution-marketing",
    permanent: true,
  },
  {
    source: "/blog/category/marketing-digital",
    destination: "/fr/blog/marketing",
    permanent: true,
  },
  {
    source: "/fr/guides/how-to-track-systemeio-sales-and-leads",
    destination:
      "/fr/guides/comment-suivre-ventes-et-leads-systemeio-attribution-marketing",
    permanent: true,
  },
  {
    source: "/blog/suivre-performances-liens-canaux",
    destination:
      "/fr/blog/comment-suivre-la-performance-des-liens-sur-plusieurs-canaux",
    permanent: true,
  },
  {
    source: "/blog/auteur/emma",
    destination: "/fr/articles/auteur/emma",
    permanent: true,
  },
  {
    source: "/blog/deeplink-vs-universal-links",
    destination:
      "/fr/blog/deep-links-vs-universal-links-quelle-est-la-difference",
    permanent: true,
  },
  {
    source: "/guides/comment-suivre-reservations-iclosed",
    destination:
      "/fr/guides/comment-suivre-reservations-iclosed-attribution-marketing",
    permanent: true,
  },
  {
    source: "/legal/signaler-abus",
    destination: "/fr/legal/report-abuse",
    permanent: true,
  },
  {
    source: "/guides/comment-suivre-reservations-cal-com",
    destination:
      "/fr/guides/comment-suivre-reservations-cal-com-attribution-marketing",
    permanent: true,
  },
  {
    source: "/blog/optimisation-funnel-test-ab",
    destination: "/fr/blog/ab-testing-pour-optimiser-son-tunnel-de-conversion",
    permanent: true,
  },
  {
    source: "/blog/5-funnel-tracking-errors-that-skew-data",
    destination: "/blog/5-funnel-tracking-errors-that-skew-data",
    permanent: true,
  },
  {
    source: "/blog/debloquer-attribution-systemeio-pimms",
    destination: "/blog/unlock-systemeio-attribution-with-pimms",
    permanent: true,
  },
  {
    source: "/blog/deeplink-chemins-conversion",
    destination:
      "/fr/blog/comment-les-deep-links-ameliorent-les-parcours-de-conversion",
    permanent: true,
  },
  {
    source: "/blog/effet-parametres-utm-conversions",
    destination: "/blog/how-utm-parameters-impact-conversion-paths",
    permanent: true,
  },
  {
    source: "/blog/erreurs-suivi-funnel",
    destination: "/blog/5-funnel-tracking-errors-that-skew-data",
    permanent: true,
  },
  {
    source:
      "/blog/from-first-click-to-conversion-understand-exactly-how-your-marketing-drives-revenue",
    destination:
      "/blog/from-first-click-to-conversion-how-your-marketing-drives-revenue",
    permanent: true,
  },
  {
    source: "/blog/how-utm-parameters-impact-conversion-paths",
    destination: "/blog/how-utm-parameters-impact-conversion-paths",
    permanent: true,
  },
  {
    source: "/blog/introduction-suivi-conversion",
    destination: "/blog/introducing-pimms-conversion-tracking",
    permanent: true,
  },
  {
    source: "/blog/liens-dynamiques-meilleures-conversions",
    destination:
      "/blog/dynamic-link-personalization-tips-for-higher-conversions",
    permanent: true,
  },
  {
    source:
      "/blog/referrer-vs-utm-vs-fingerprinting-what-really-tells-you-where-a-click-came-from",
    destination:
      "/blog/referrer-vs-utm-vs-fingerprinting-where-a-click-came-from",
    permanent: true,
  },
  {
    source: "/blog/roi-marketing-du-clic-a-la-conversion",
    destination:
      "/blog/from-first-click-to-conversion-how-your-marketing-drives-revenue",
    permanent: true,
  },
  {
    source: "/blog/suivi-utm-reseaux-sociaux",
    destination: "/blog/utm-tracking-for-organic-social-media-posts",
    permanent: true,
  },
  {
    source: "/blog/utm-tracking-for-organic-social-media-posts",
    destination: "/blog/utm-tracking-for-organic-social-media-posts",
    permanent: true,
  },
  {
    source: "/fr/blog/7-ways-to-boost-mobile-app-conversion-rates-in-2025",
    destination:
      "/fr/blog/7-moyens-pour-booster-les-conversions-des-apps-mobiles-en-2025",
    permanent: true,
  },
  {
    source: "/fr/blog/ab-test-funnel-optimization",
    destination: "/fr/blog/ab-testing-pour-optimiser-son-tunnel-de-conversion",
    permanent: true,
  },
  {
    source: "/fr/blog/ab-testing-steps-for-funnel-optimization",
    destination: "/fr/blog/ab-testing-pour-optimiser-son-tunnel-de-conversion",
    permanent: true,
  },
  {
    source: "/fr/blog/author/alexandre",
    destination: "/fr/articles/auteur/alexandre",
    permanent: true,
  },
  {
    source: "/fr/blog/author/emma",
    destination: "/fr/articles/auteur/emma",
    permanent: true,
  },
  {
    source: "/fr/blog/conversion-tracking-introduction",
    destination: "/fr/blog/introduction-au-suivi-des-conversions-avec-pimms",
    permanent: true,
  },
  {
    source: "/fr/blog/deep-links-conversion-paths",
    destination:
      "/fr/blog/comment-les-deep-links-ameliorent-les-parcours-de-conversion",
    permanent: true,
  },
  {
    source: "/fr/blog/deep-links-influencer-campaigns",
    destination: "/fr/blog/les-bases-du-marketing-influence-avec-deep-linking",
    permanent: true,
  },
  {
    source: "/fr/blog/dynamic-link-personalization-tips",
    destination: "/fr/blog/dynamic-link-personalization-tips",
    permanent: true,
  },
  {
    source: "/fr/blog/how-deep-links-improve-conversion-paths",
    destination:
      "/fr/blog/comment-les-deep-links-ameliorent-les-parcours-de-conversion",
    permanent: true,
  },
  {
    source: "/fr/blog/how-to-track-email-campaign-revenue",
    destination: "/fr/blog/comment-suivre-les-revenus-des-campagnes-emailing",
    permanent: true,
  },
  {
    source: "/fr/blog/how-to-track-link-performance-across-multiple-channels",
    destination:
      "/fr/blog/comment-suivre-la-performance-des-liens-sur-plusieurs-canaux",
    permanent: true,
  },
  {
    source: "/fr/blog/how-to-track-revenue-per-click",
    destination: "/fr/blog/comment-suivre-le-revenu-par-clic",
    permanent: true,
  },
  {
    source: "/fr/blog/introducing-conversion",
    destination: "/fr/blog/introduction-au-suivi-des-conversions-avec-pimms",
    permanent: true,
  },
  {
    source: "/fr/blog/referrer-vs-utm-vs-fingerprinting",
    destination: "/fr/blog/referrer-vs-utm-vs-fingerprinting-ou-vient-un-clic",
    permanent: true,
  },
  {
    source:
      "/fr/blog/referrer-vs-utm-vs-fingerprinting-what-really-tells-you-where-a-click-came-from",
    destination: "/fr/blog/referrer-vs-utm-vs-fingerprinting-ou-vient-un-clic",
    permanent: true,
  },
  {
    source: "/fr/blog/revenue-per-click-tracking",
    destination: "/fr/blog/comment-suivre-le-revenu-par-clic",
    permanent: true,
  },
  {
    source: "/fr/blog/track-email-campaign-revenue",
    destination: "/fr/blog/comment-suivre-les-revenus-des-campagnes-emailing",
    permanent: true,
  },
  {
    source: "/fr/blog/track-link-performance-multiple-channels",
    destination:
      "/fr/blog/comment-suivre-la-performance-des-liens-sur-plusieurs-canaux",
    permanent: true,
  },
  {
    source: "/fr/guides/how-to-track-calendly-bookings",
    destination:
      "/fr/guides/comment-suivre-reservations-calendly-attribution-marketing",
    permanent: true,
  },
  {
    source: "/fr/guides/how-to-track-iclosed-bookings",
    destination:
      "/fr/guides/comment-suivre-reservations-iclosed-attribution-marketing",
    permanent: true,
  },
  {
    source: "/fr/legal/imprint",
    destination: "/legal/imprint",
    permanent: true,
  },
  {
    source: "/fr/legal/privacy-policy",
    destination: "/legal/privacy-policy",
    permanent: true,
  },
  {
    source: "/fr/solutions/deep-links-youtube-channel",
    destination: "/solutions/deep-links-youtube-channel",
    permanent: true,
  },
  {
    source: "/guides/comment-suivre-conversions-sites-vibe-coding-no-code-ai",
    destination:
      "/fr/guides/comment-suivre-conversions-sites-vibe-coding-no-code-ai",
    permanent: true,
  },
  {
    source: "/guides/comment-suivre-formulaires-framer",
    destination:
      "/fr/guides/comment-suivre-formulaires-framer-attribution-marketing",
    permanent: true,
  },
  {
    source: "/guides/comment-suivre-formulaires-tally",
    destination:
      "/fr/guides/comment-suivre-formulaires-tally-attribution-marketing",
    permanent: true,
  },
  {
    source: "/guides/comment-suivre-reservations-calendly",
    destination:
      "/fr/guides/comment-suivre-reservations-calendly-attribution-marketing",
    permanent: true,
  },
  {
    source: "/legal/conditions-generales-utilisation",
    destination: "/legal/terms-of-service",
    permanent: true,
  },
  {
    source: "/solutions/deep-links-chaine-youtube",
    destination: "/solutions/deep-links-youtube-channel",
    permanent: true,
  },
  {
    source: "/tutoriels/demarrer-avec-zapier",
    destination:
      "/fr/tutoriels/comment-tracker-les-conversions-avec-zapier-attribution-marketing",
    permanent: true,
  },
  {
    source: "/tutoriels/guide-balises-utm",
    destination: "/fr/tutoriels/maitriser-le-tracking-utm-et-le-deep-linking",
    permanent: true,
  },
];

export default redirects;
