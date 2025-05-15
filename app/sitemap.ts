import type { MetadataRoute } from "next";
import { pathnames, locales } from "@/i18n/config";
import { getPages } from "@/lib/mdx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = "pimms.io";
  const baseUrl = `https://${host}`;
  const urls: MetadataRoute.Sitemap = [];

  const ROUTE_CONFIG = {
    blog: { changefreq: "monthly", priority: 0.7 },
    guides: { changefreq: "weekly", priority: 0.9 },
    tutorials: { changefreq: "weekly", priority: 0.8 },
    legal: { changefreq: "yearly", priority: 0.3 },
    changelog: { changefreq: "weekly", priority: 0.8 },
    "": { changefreq: "daily", priority: 1.0 },
  } as const;

  function getRouteSegment(
    path: string | undefined
  ): keyof typeof ROUTE_CONFIG {
    if (!path) return "";
    const normalized = path.replace(/^\/(fr|en)?\/?/, "");
    return (normalized.split("/")[0] || "") as keyof typeof ROUTE_CONFIG;
  }

  function getChangeFrequency(
    path: string | undefined
  ): MetadataRoute.Sitemap[0]["changeFrequency"] {
    const segment = getRouteSegment(path);
    return ROUTE_CONFIG[segment]?.changefreq || "weekly";
  }

  function getPriority(path: string | undefined): number {
    const segment = getRouteSegment(path);
    return ROUTE_CONFIG[segment]?.priority ?? 0.8;
  }

  const getLocalizedUrls = (basePath: string): string[] => {
    return locales.map((locale) => {
      const localized = pathnames[basePath]?.[locale] || basePath;
      return `${baseUrl}${localized}`;
    });
  };

  const addStaticUrls = () => {
    Object.keys(pathnames).forEach((appPath) => {
      getLocalizedUrls(appPath).forEach((url) => {
        urls.push({
          url,
          lastModified: new Date(),
          changeFrequency: getChangeFrequency(url.replace(baseUrl, "")),
          priority: getPriority(url.replace(baseUrl, "")),
        });
      });
    });
  };

  const addDynamicUrls = async () => {
    for (const locale of locales) {
      const pages = getPages(locale, ["blog", "guides", "tutorials"]);

      pages.forEach(({ slug, metadata }) => {
        const basePath =
          metadata.categories.find((cat: string) => cat in ROUTE_CONFIG) ||
          "blog";
        const fullPath =
          `/${locale === "en" ? "" : locale + "/"}${basePath}/${slug}`.replace(
            /\/+/g,
            "/"
          );

        urls.push({
          url: `${baseUrl}${fullPath}`,
          lastModified: metadata.updatedAt
            ? new Date(metadata.updatedAt)
            : new Date(),
          changeFrequency: getChangeFrequency(fullPath),
          priority: getPriority(fullPath),
        });
      });
    }
  };

  addStaticUrls();
  await addDynamicUrls();

  return urls;
}
