import { MetadataRoute } from "next";
import { WEB_URL } from "./constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${WEB_URL}/sitemap.xml`,
  };
}
