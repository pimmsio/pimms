/**
 * Resource Hints Component
 * Provides comprehensive resource hints for optimal loading performance
 */
export function ResourceHints() {
  return (
    <>
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//api.pimms.io" />
      <link rel="dns-prefetch" href="//assets.pimms.io" />
      <link rel="dns-prefetch" href="//eu.i.posthog.com" />
      <link rel="dns-prefetch" href="//eu-assets.i.posthog.com" />
      <link rel="dns-prefetch" href="//vitals.vercel-insights.com" />

      {/* Preconnect to critical origins */}
      <link rel="preconnect" href="https://api.pimms.io" />
      <link rel="preconnect" href="https://assets.pimms.io" />
    </>
  );
}
