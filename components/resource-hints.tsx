/**
 * Resource Hints Component
 * Provides comprehensive resource hints for optimal loading performance
 * Optimized to reduce HTML bloat while maintaining performance
 */
export function ResourceHints() {
  return (
    <>
      {/* Critical preconnections only */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://assets.pimms.io" />

      {/* Non-critical resources use dns-prefetch to reduce HTML size */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//eu.i.posthog.com" />
      <link rel="dns-prefetch" href="//eu-assets.i.posthog.com" />
      <link rel="dns-prefetch" href="//vitals.vercel-insights.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//px.ads.linkedin.com" />
    </>
  );
}
