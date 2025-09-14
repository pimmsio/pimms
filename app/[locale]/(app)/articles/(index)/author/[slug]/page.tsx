import { notFound } from "next/navigation";
import { getPages } from "@/lib/mdx";
import BlogCard from "@/components/blog/blog-card";
import { use } from "react";
import { AUTHORS } from "../../../../../../constants";
import { articleFolders, locales } from "@/i18n/config";
import { generateAuthorMetadata } from "@/lib/utils";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: MetadataProps) {
  const { slug } = await params;
  return generateAuthorMetadata({ params, slug });
}

export async function generateStaticParams() {
  const allParams = [];

  for (const locale of locales) {
    for (const author of AUTHORS) {
      allParams.push({
        locale,
        slug: author?.slug
      });
    }
  }

  return allParams;
}

// Enable static generation with revalidation for author pages
export const revalidate = 3600; // Revalidate every hour
export const dynamic = "force-static";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export default function BlogCategory({ params }: Props) {
  const { slug, locale } = use(params);

  // Set locale for server components
  setRequestLocale(locale);

  const data = AUTHORS.find((author) => author?.slug === slug);

  if (!data) {
    notFound();
  }

  const posts = getPages(locale, articleFolders);

  const articles = posts
    .filter((post) => post.metadata.author === data.slug && !post.metadata.categories.includes("legal"))
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
