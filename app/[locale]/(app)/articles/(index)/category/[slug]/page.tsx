import { notFound } from "next/navigation";
import { getPages } from "@/lib/mdx";
import BlogCard from "@/components/blog/blog-card";
import { use } from "react";
import { BLOG_CATEGORIES } from "../../../../../../constants";
import { articleFolders, locales } from "@/i18n/config";
import { generateCategoryMetadata } from "@/lib/utils";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: MetadataProps) {
  const { slug } = await params;
  return generateCategoryMetadata({ params, slug });
}

export async function generateStaticParams() {
  const allParams = [];

  for (const locale of locales) {
    for (const category of BLOG_CATEGORIES) {
      allParams.push({
        locale,
        slug: category
      });
    }
  }

  return allParams;
}

// Enable static generation with revalidation for category pages
export const revalidate = 3600; // Revalidate every hour
export const dynamic = "force-static";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export default function BlogCategory({ params }: Props) {
  const { slug, locale } = use(params);

  // Set locale for server components
  setRequestLocale(locale);

  const data = BLOG_CATEGORIES.find((category) => category === slug);

  if (!data) {
    notFound();
  }

  const posts = getPages(locale, articleFolders);

  const articles = posts
    .filter((post) => post.metadata.categories?.includes(data))
    .sort((a, b) => {
      // Sort by updatedAt if available, fallback to publishedAt
      const aDate = a?.metadata.updatedAt || a?.metadata.publishedAt;
      const bDate = b?.metadata.updatedAt || b?.metadata.publishedAt;
      return bDate.localeCompare(aDate);
    });

  if (!articles || articles.length === 0) {
    notFound();
  }

  return articles.map((article, idx) => (
    <BlogCard key={article.slug} slug={article.slug} metadata={article.metadata} locale={locale} priority={idx <= 1} />
  ));
}
