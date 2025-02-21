const createNextIntlPlugin = require("next-intl/plugin");
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "assets.pimms.io",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
