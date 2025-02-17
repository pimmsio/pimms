import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "assets.pimms.io",
      },
    ],
  },
};

export default nextConfig;
