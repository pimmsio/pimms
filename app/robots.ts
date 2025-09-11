import { MetadataRoute } from "next";
import { WEB_URL } from "./constants"; // e.g. https://pimms.io

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/api/", "/_vercel/"]
    },
    sitemap: `${WEB_URL}/sitemap.xml`
  };
}
