import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { pathnames } from "@/i18n/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const domain = headersList.get("host") as string;

  const urls = [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/fr`,
      lastModified: new Date(),
    },
  ];

  // Add other localized paths from pathnames
  Object.entries(pathnames).forEach(([, localizedPaths]) => {
    if (typeof localizedPaths === "string") {
      urls.push({
        url: `https://${domain}${localizedPaths}`,
        lastModified: new Date(),
      });
    } else {
      Object.entries(localizedPaths).forEach(([locale, localizedPath]) => {
        if (localizedPath === "/") {
          return;
        }

        urls.push({
          url: `https://${domain}${
            locale === "en" ? "" : "/" + locale
          }${localizedPath}`,
          lastModified: new Date(),
        });
      });
    }
  });

  return urls;
}
