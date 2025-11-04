import { notFound } from "next/navigation";
import { getPages } from "@/lib/mdx";
import BlogCard from "@/components/blog/blog-card";
import { use } from "react";
import { BLOG_TAGS } from "../../../../../../constants";
import { articleFolders, locales } from "@/i18n/config";
import { generateTagMetadata, getTagBySlug } from "@/lib/utils";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: MetadataProps) {
  const { slug } = await params;
  return generateTagMetadata({ params, slug });
}

export async function generateStaticParams() {
  const allParams = [];

  for (const locale of locales) {
    for (const [tagKey, tagValue] of Object.entries(BLOG_TAGS)) {
      allParams.push({
        locale,
        slug: tagValue[locale].slug
      });
    }
  }

  return allParams;
}

// Enable static generation with revalidation for tag pages
export const revalidate = 3600; // Revalidate every hour
export const dynamic = "force-static";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export default function BlogTag({ params }: Props) {
  const { slug, locale } = use(params);

  console.log("[BlogTag] Requested slug:", slug, "locale:", locale);

  // Set locale for server components
  setRequestLocale(locale);

  // Get tag by slug in current locale
  const tag = getTagBySlug(slug, locale as "en" | "fr");
  console.log("[BlogTag] Found tag:", tag);

  if (!tag) {
    console.log("[BlogTag] Tag not found, returning 404");
    notFound();
  }

  const posts = getPages(locale, articleFolders);
  console.log("[BlogTag] Total posts loaded:", posts.length);

  const articles = posts
    .filter((post) => {
      const hasTag = post.metadata.tags?.includes(tag.key);
      if (hasTag) {
        console.log("[BlogTag] Article with tag:", post.slug, "tags:", post.metadata.tags);
      }
      return hasTag;
    })
    .sort((a, b) => {
      // Sort by updatedAt if available, fallback to publishedAt
      const aDate = a?.metadata.updatedAt || a?.metadata.publishedAt;
      const bDate = b?.metadata.updatedAt || b?.metadata.publishedAt;
      return bDate.localeCompare(aDate);
    });

  console.log("[BlogTag] Filtered articles count:", articles.length);

  if (!articles || articles.length === 0) {
    console.log("[BlogTag] No articles found for tag, returning 404");
    notFound();
  }

  return (
    <>
      <div className="col-span-1 lg:col-span-2 text-center mb-8">
        <p className="text-sm font-medium text-gray-600">
          {articles.length} {articles.length === 1 ? (locale === "fr" ? "article" : "article") : (locale === "fr" ? "articles" : "articles")}
        </p>
      </div>
      {articles.map((article, idx) => (
        <BlogCard key={article.slug} slug={article.slug} metadata={article.metadata} locale={locale} priority={idx <= 1} />
      ))}
    </>
  );
}

