const createNextIntlPlugin = require("next-intl/plugin");
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withNextIntl = createNextIntlPlugin();

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        hostname: "assets.pimms.io",
      },
    ],
  },
};

export default withMDX(withNextIntl(nextConfig));
