import BlogCard from "@/components/blog/blog-card";
import { useLocale } from "next-intl";
import { getPages } from "@/lib/mdx";

export default function BlogPage() {
  const locale = useLocale();
  const posts = getPages(locale, "blog");

  const articles = posts.sort((a, b) =>
    b?.metadata.publishedAt.localeCompare(a?.metadata.publishedAt)
  );

  return articles.map((article, idx) => (
    <BlogCard
      key={article.slug}
      slug={article.slug}
      metadata={article.metadata}
      priority={idx <= 1}
    />
  ));
}
