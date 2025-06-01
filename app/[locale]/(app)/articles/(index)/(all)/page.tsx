import BlogCard from "@/components/blog/blog-card";
import { useLocale } from "next-intl";
import { getPages } from "@/lib/mdx";
import { articleFolders } from "@/i18n/config";
import { THUMBNAIL } from "../../../../../constants";
import { getCanonicalLink, getFullLink } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: MetadataProps) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "blog.category.overview" });
  const pathname = "/articles";
  const canonical = getCanonicalLink(locale, pathname);

  return {
    title: t("title"),
    description: t("description"),
    image: THUMBNAIL,
    alternates: {
      canonical: getFullLink(canonical),
      languages: {
        en: getFullLink(pathname),
        fr: getFullLink(`/fr${pathname}`)
      }
    }
  };
}

export default function BlogPage() {
  const locale = useLocale();
  const posts = getPages(locale, articleFolders);

  const articles = posts
    .filter((post) => !post.metadata.categories?.includes("legal"))
    .sort((a, b) => b?.metadata.publishedAt.localeCompare(a?.metadata.publishedAt));

  return articles.map((article, idx) => (
    <BlogCard key={article.slug} slug={article.slug} metadata={article.metadata} priority={idx <= 1} />
  ));
}
