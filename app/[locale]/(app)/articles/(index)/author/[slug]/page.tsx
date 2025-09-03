import { notFound } from "next/navigation";
import { useLocale } from "next-intl";
import { getPages } from "@/lib/mdx";
import BlogCard from "@/components/blog/blog-card";
import { use } from "react";
import { AUTHORS } from "../../../../../../constants";
import { articleFolders } from "@/i18n/config";
import { generateAuthorMetadata } from "@/lib/utils";

export async function generateMetadata({ params }: MetadataProps) {
  const { slug } = await params;
  return generateAuthorMetadata({ params, slug });
}

export async function generateStaticParams() {
  return AUTHORS.map((author) => ({
    slug: author?.slug
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default function BlogCategory({ params }: Props) {
  const { slug } = use(params);
  const locale = useLocale();

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
    <BlogCard key={article.slug} slug={article.slug} metadata={article.metadata} priority={idx <= 1} />
  ));
}
