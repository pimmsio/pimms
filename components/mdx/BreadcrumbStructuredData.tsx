import { getCanonicalLinkWithDomain } from "@/lib/utils";
import { PageMetadata } from "@/lib/mdx";
import { useLocale, useTranslations } from "next-intl";
import { WEB_URL } from "@/app/constants";

export const BreadcrumbStructuredData = ({
  metadata,
  category,
  slug
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
    article: `/articles/${slug}`
  };

  const domainWithHttps = WEB_URL;
  const urlPartsPathnames = {
    root: getCanonicalLinkWithDomain(locale, urlParts.root, domainWithHttps),
    category: getCanonicalLinkWithDomain(locale, urlParts.category, domainWithHttps),
    article: getCanonicalLinkWithDomain(locale, urlParts.article, domainWithHttps)
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("category.overview.title"),
        item: urlPartsPathnames.root
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t(`category.${category}.title`),
        item: urlPartsPathnames.category
      },
      {
        "@type": "ListItem",
        position: 3,
        name: metadata.title,
        item: urlPartsPathnames.article
      }
    ]
  };

  return (
    <script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
