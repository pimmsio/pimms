import { notFound } from "next/navigation";
import { useLocale } from "next-intl";
import { getPages } from "@/lib/mdx";
import BlogCard from "@/components/blog/blog-card";
import { use } from "react";
import { BLOG_CATEGORIES } from "../../../../../../constants";

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({
    slug: category?.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default function BlogCategory({ params }: Props) {
  const { slug } = use(params);
  const locale = useLocale();

  const data = BLOG_CATEGORIES.find((category) => category?.slug === slug);

  if (!data) {
    notFound();
  }

  const posts = getPages(locale, "blog");

  const articles = posts
    .filter((post) => post.metadata.categories?.includes(data.slug))
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
