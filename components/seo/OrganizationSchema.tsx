import { WEB_URL } from "@/app/constants";

export function OrganizationSchema({ locale }: { locale: string }) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PIMMS",
    "legalName": "PIMMS SAS",
    "url": `${WEB_URL}`,
    "logo": `${WEB_URL}/static/logo.svg`,
    "foundingDate": "2024",
    "description":
      locale === "fr"
        ? "Plateforme de tracking marketing et attribution : suivez les liens, les leads qualifiés et le chiffre d'affaires de chaque canal."
        : "Marketing tracking & attribution platform: track links, qualified leads, and revenue from every channel.",
    "slogan":
      locale === "fr" ? "Tracking au-delà des clics" : "Tracking beyond clicks",
    "sameAs": [
      "https://twitter.com/pimms_io",
      "https://www.linkedin.com/company/pimms-io",
      "https://github.com/pimmsio"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "support@pimms.io",
        "availableLanguage": ["English", "French"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR"
    },
    "founder": {
      "@type": "Person",
      "name": "Alexandre Sarfati",
      "sameAs": "https://www.linkedin.com/in/alexandre-sarfati/"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "EUR",
      "lowPrice": "0",
      "highPrice": "69",
      "offerCount": "4",
      "priceValidUntil": "2026-12-31"
    }
  };

  return (
    <script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
}
