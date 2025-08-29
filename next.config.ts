const createNextIntlPlugin = require("next-intl/plugin");
import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import redirects from "./redirect";
import { remarkAtSyntax } from "./lib/mdx/remark-at-syntax";
const withNextIntl = createNextIntlPlugin();

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkAtSyntax],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [
        rehypePrettyCode,
        {
          theme: "one-light"
        }
      ]
    ]
  }
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        hostname: "assets.pimms.io"
      },
      {
        hostname: "assets.seobotai.com"
      },
      {
        hostname: "placehold.co"
      },
      {
        hostname: "www.google.com"
      }
    ]
  },
  async redirects() {
    return redirects;
  },
  async rewrites() {
    return [
      // for pimms proxy
      {
        source: "/_proxy/pimms/track/click",
        destination: "https://api.pimms.io/track/click"
      },
      // for posthog proxy
      {
        source: "/_proxy/posthog/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*"
      },
      {
        source: "/_proxy/posthog/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*"
      }
    ];
  }
};

export default withNextIntl(withMDX(nextConfig));
