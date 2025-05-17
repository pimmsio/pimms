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
    source: "/blog/introducing-conversion-tracking",
    destination: "/blog/introducing-pimms-conversion-tracking",
    permanent: true,
  },
  {
    source: "/blog/no-code-guide-to-embed-tracking-cal-com",
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
    source: "/blog/setup-stripe-payments-tracking-with-pimms-on-any-website",
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
];

export default redirects;
