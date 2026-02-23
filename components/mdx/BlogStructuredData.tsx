import { PageMetadata } from "../../lib/mdx";
import { getCanonicalLinkWithDomain } from "../../lib/utils";
import { WEB_URL } from "@/app/constants";

const typeMap = {
  blog: "BlogPosting",
  guides: "TechArticle",
  tutorials: "Article",
  legal: "Article"
};

export const BlogStructuredData = ({
  metadata,
  path,
  locale,
  author,
  type = "blog"
}: {
  metadata: PageMetadata;
  path: string;
  locale: string;
  author?: { name: string; image: string; slug?: string };
  type?: string;
}) => {

  const url = `${WEB_URL}${path}`;

  const datePublished = metadata.publishedAt.includes("T") ? metadata.publishedAt : `${metadata.publishedAt}T00:00:00Z`;

  const dateModified = metadata.updatedAt.includes("T") ? metadata.updatedAt : `${metadata.updatedAt}T00:00:00Z`;

  // Map locale to language code for inLanguage field
  const languageCode = locale === "fr" ? "fr-FR" : "en-US";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": typeMap[type as keyof typeof typeMap] || "Article",
    headline: metadata.title,
    description: metadata.summary,
    image: metadata.image,
    url,
    datePublished,
    dateModified,
    inLanguage: languageCode,
    author: {
      "@type": "Person",
      name: author?.name ?? "Unknown",
      ...(author?.image && { image: author.image }),
      ...(author?.slug && {
        url: getCanonicalLinkWithDomain(locale, `/articles/author/${author.slug}`, WEB_URL)
      })
    },
    publisher: {
      "@type": "Organization",
      name: "PIMMS",
      url: WEB_URL,
      logo: {
        "@type": "ImageObject",
        url: `${WEB_URL}/icon.png`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <script
      id="blog-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 0) }}
    />
  );
};
