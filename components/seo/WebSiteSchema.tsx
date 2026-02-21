import { WEB_URL } from "@/app/constants";

export function WebSiteSchema({ locale }: { locale: string }) {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PIMMS",
    "alternateName": "PIMMS.io",
    "url": `${WEB_URL}`,
    "description":
      locale === "fr"
        ? "Plateforme de tracking marketing et attribution : suivez les clics, leads et revenus"
        : "Marketing tracking & attribution platform: track clicks, leads and revenue",
    "inLanguage": [locale, "en", "fr"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${WEB_URL}/articles?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PIMMS",
      "logo": {
        "@type": "ImageObject",
        "url": `${WEB_URL}/static/logo.svg`
      }
    }
  };

  return (
    <script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
    />
  );
}
