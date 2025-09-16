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
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
      <link rel="preconnect" href="https://assets.pimms.io" />

      {/* Preload critical CSS to reduce dependency chain */}
      <link rel="preload" href="/_next/static/css/app/globals.css" as="style" />

      {/* Preload critical font files to reduce dependency chain */}
      <link
        rel="preload"
        href="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
        as="font"
        type="font/woff2"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_qU79TR_VdV0.woff2"
        as="font"
        type="font/woff2"
        crossOrigin=""
      />

      {/* Non-critical resources use dns-prefetch to reduce HTML size */}
      <link rel="dns-prefetch" href="//eu.i.posthog.com" />
      <link rel="dns-prefetch" href="//eu-assets.i.posthog.com" />
      <link rel="dns-prefetch" href="//vitals.vercel-insights.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//px.ads.linkedin.com" />
    </>
  );
}
