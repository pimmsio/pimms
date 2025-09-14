import BlogCard from "@/components/blog/blog-card";
import { getPages } from "@/lib/mdx";
import { articleFolders, locales } from "@/i18n/config";
import { THUMBNAIL } from "../../../../../constants";
import { getCanonicalLink, getFullLink } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

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

// Generate static params for all locales
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Enable static generation with revalidation for blog index
export const revalidate = 3600; // Revalidate every hour
export const dynamic = "force-static";

export default function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);

  // Set locale for server components
  setRequestLocale(locale);

  const posts = getPages(locale, articleFolders);

  const articles = posts
    .filter((post) => !post.metadata.categories?.includes("legal"))
    .sort((a, b) => {
      // Sort by updatedAt if available, fallback to publishedAt
      const aDate = a?.metadata.updatedAt || a?.metadata.publishedAt;
      const bDate = b?.metadata.updatedAt || b?.metadata.publishedAt;
      return bDate.localeCompare(aDate);
    });

  return articles.map((article, idx) => (
    <BlogCard key={article.slug} slug={article.slug} metadata={article.metadata} locale={locale} priority={idx <= 1} />
  ));
}
