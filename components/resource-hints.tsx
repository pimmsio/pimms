/**
 * Resource Hints Component
 * Provides comprehensive resource hints for optimal loading performance
 */
export function ResourceHints() {
  return (
    <>
      {/* Preconnect to critical font origins - highest priority */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Preconnect to critical API origins */}
      <link rel="preconnect" href="https://assets.pimms.io" />

      {/* DNS prefetch for analytics and tracking domains */}
      <link rel="dns-prefetch" href="//eu.i.posthog.com" />
      <link rel="dns-prefetch" href="//eu-assets.i.posthog.com" />
      <link rel="dns-prefetch" href="//vitals.vercel-insights.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//px.ads.linkedin.com" />
    </>
  );
}
