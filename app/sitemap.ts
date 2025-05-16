import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { pathnames } from "@/i18n/pathnames";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = "pimms.io";
  const baseUrl = `https://${host}`;
  const urls: MetadataRoute.Sitemap = [];
  const seenUrls = new Set<string>();

  const ROUTE_CONFIG = {
    blog: { changefreq: "monthly", priority: 0.7 },
    guides: { changefreq: "weekly", priority: 0.9 },
    tutorials: { changefreq: "weekly", priority: 0.8 },
    legal: { changefreq: "yearly", priority: 0.3 },
    changelog: { changefreq: "weekly", priority: 0.8 },
    "": { changefreq: "daily", priority: 1.0 },
  } as const;

  const getRouteSegment = (path: string): keyof typeof ROUTE_CONFIG => {
    const normalized = path.replace(/^\/(fr\/)?/, "");
    return (normalized.split("/")[0] || "") as keyof typeof ROUTE_CONFIG;
  };

  const getChangeFrequency = (
    path: string
  ): MetadataRoute.Sitemap[0]["changeFrequency"] => {
    const segment = getRouteSegment(path);
    return ROUTE_CONFIG[segment]?.changefreq || "weekly";
  };

  const getPriority = (path: string): number => {
    const segment = getRouteSegment(path);
    return ROUTE_CONFIG[segment]?.priority ?? 0.8;
  };

  const addUrl = (path: string, updatedAt: string) => {
    const fullUrl = `${baseUrl}${path}`.replace(/\/$/, "");
    if (seenUrls.has(fullUrl)) return;
    seenUrls.add(fullUrl);
    urls.push({
      url: fullUrl,
      lastModified: new Date(updatedAt),
      changeFrequency: getChangeFrequency(path),
      priority: getPriority(path),
    });
  };

  const addAllLocalizedUrls = async () => {
    Object.values(pathnames).forEach((localizedPaths) => {
      locales.forEach((locale) => {
        let path = localizedPaths[locale];
        if (!path) return;
        if (locale === "fr") {
          path = `/fr${path}`;
        }

        addUrl(path, localizedPaths["lastmod"]);
      });
    });
  };

  await addAllLocalizedUrls();
  console.log("Adding all localized URLs", urls.length);
  return urls;
}
