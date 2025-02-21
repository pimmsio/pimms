import { MetadataRoute } from "next";
import { WEB_DOMAIN } from "./constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${WEB_DOMAIN}/sitemap.xml`,
  };
}
