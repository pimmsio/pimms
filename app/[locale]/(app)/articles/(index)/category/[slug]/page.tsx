import { notFound } from "next/navigation";
import { useLocale } from "next-intl";
import { getPages } from "@/lib/mdx";
import BlogCard from "@/components/blog/blog-card";
import { use } from "react";
import { BLOG_CATEGORIES } from "../../../../../../constants";
import { articleFolders } from "@/i18n/config";
import { generateCategoryMetadata } from "@/lib/utils";

export async function generateMetadata({ params }: MetadataProps) {
  const { slug } = await params;
  return generateCategoryMetadata({ params, slug });
}

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({
    slug: category,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default function BlogCategory({ params }: Props) {
  const { slug } = use(params);
  const locale = useLocale();

  const data = BLOG_CATEGORIES.find((category) => category === slug);

  if (!data) {
    notFound();
  }

  const posts = getPages(locale, articleFolders);

  const articles = posts
    .filter((post) => post.metadata.categories?.includes(data))
    .sort((a, b) =>
      b?.metadata.publishedAt.localeCompare(a?.metadata.publishedAt)
    );

  if (!articles || articles.length === 0) {
    notFound();
  }

  return articles.map((article, idx) => (
    <BlogCard
      key={article.slug}
      slug={article.slug}
      metadata={article.metadata}
      priority={idx <= 1}
    />
  ));
}
