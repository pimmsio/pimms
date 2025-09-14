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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": typeMap[type as keyof typeof typeMap] || "Article",
    headline: metadata.title,
    description: metadata.summary,
    image: metadata.image,
    url,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: author?.name ?? "Unknown",
      ...(author?.slug && {
        url: getCanonicalLinkWithDomain(locale, `/articles/author/${author.slug}`, WEB_URL)
      })
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
