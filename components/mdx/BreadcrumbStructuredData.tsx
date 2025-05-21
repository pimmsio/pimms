import Script from "next/script";
import { getCanonicalLinkWithDomain } from "@/lib/utils";
import { PageMetadata } from "@/lib/mdx";
import { useLocale, useTranslations } from "next-intl";

const DOMAIN = process.env.NEXT_PUBLIC_WEB_DOMAIN as string;

export const BreadcrumbStructuredData = ({
  metadata,
  category,
  slug,
}: {
  metadata: PageMetadata;
  category: string;
  slug: string;
}) => {
  const locale = useLocale();
  const t = useTranslations("blog");

  const urlParts = {
    root: "/articles",
    category: `/articles/category/${category}`,
    article: `/articles/${slug}`,
  };

  const domainWithHttps = `https://${DOMAIN}`;
  const urlPartsPathnames = {
    root: getCanonicalLinkWithDomain(locale, urlParts.root, domainWithHttps),
    category: getCanonicalLinkWithDomain(
      locale,
      urlParts.category,
      domainWithHttps
    ),
    article: getCanonicalLinkWithDomain(
      locale,
      urlParts.article,
      domainWithHttps
    ),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("category.overview.title"),
        item: urlPartsPathnames.root,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t(`category.${category}.title`),
        item: urlPartsPathnames.category,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: metadata.title,
        item: urlPartsPathnames.article,
      },
    ],
  };

  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
};
