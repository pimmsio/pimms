const createNextIntlPlugin = require("next-intl/plugin");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});
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
  // Enable compression and minification
  compress: true,
  // Enable source maps for production builds
  productionBrowserSourceMaps: true,
  // Add headers for better SEO, security, and performance
  async headers() {
    return [
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8"
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600"
          }
        ]
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          }
        ]
      },
      {
        source: "/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      }
    ];
  },
  // Target modern browsers to reduce bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    // Remove React dev tools in production
    reactRemoveProperties: process.env.NODE_ENV === "production"
  },
  // Optimize output (temporarily disabled for source maps testing)
  // output: "standalone",
  // Advanced webpack optimizations
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Enable source maps for production
      config.devtool = "source-map";

      // Optimize chunk splitting for better caching
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            // Separate CSS into smaller chunks
            styles: {
              name: "styles",
              test: /\.(css|scss|sass)$/,
              chunks: "all",
              priority: 20,
              enforce: true
            },
            // Separate vendor chunks for better caching
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
              priority: 10,
              enforce: true
            },
            // Separate analytics and tracking
            analytics: {
              test: /[\\/]node_modules[\\/](@vercel\/analytics|@getpimms\/analytics|posthog-js)[\\/]/,
              name: "analytics",
              chunks: "all",
              priority: 15,
              enforce: true
            },
            // Separate heavy visualization libraries
            visualization: {
              test: /[\\/]node_modules[\\/](d3-|framer-motion)[\\/]/,
              name: "visualization",
              chunks: "all",
              priority: 12,
              enforce: true
            },
            // Separate MDX and markdown processing
            mdx: {
              test: /[\\/]node_modules[\\/](@mdx-js|remark-|rehype-|unified)[\\/]/,
              name: "mdx",
              chunks: "all",
              priority: 11,
              enforce: true
            },
            // Common utilities
            utils: {
              test: /[\\/]node_modules[\\/](clsx|class-variance-authority|tailwind-merge|lodash)[\\/]/,
              name: "utils",
              chunks: "all",
              priority: 9,
              enforce: true
            }
          }
        }
      };

      // Optimize CSS loading
      config.optimization.splitChunks.cacheGroups.default = {
        ...config.optimization.splitChunks.cacheGroups.default,
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      };

      // Target modern browsers to reduce polyfills
      config.target = ["web", "es2022"];

      // Optimize for modern JavaScript features
      if (config.resolve) {
        config.resolve.mainFields = ["module", "main"];
        config.resolve.conditionNames = ["import", "module", "require"];
      }
    }
    return config;
  },
  // Keep server-only packages out of client bundle
  serverExternalPackages: ["googleapis", "googleapis-common"],
  // Enable experimental optimizations
  experimental: {
    // Use modern JavaScript features
    esmExternals: true,
    // Disable CSS optimization temporarily due to critters dependency issue
    // optimizeCss: true,
    // Enable CSS chunking for better loading
    cssChunking: true,
    // Enable static optimization
    optimisticClientCache: true,
    optimizePackageImports: [
      "@radix-ui/react-accordion",
      "@radix-ui/react-slot",
      "@radix-ui/react-toast",
      "framer-motion",
      "@dicebear/core",
      "ahooks",
      "clsx",
      "class-variance-authority",
      "tailwind-merge"
    ]
  },
  // Turbopack configuration (moved from experimental.turbo)
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js"
      }
    }
  },
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
      },
      {
        hostname: "placehold.co"
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

export default withBundleAnalyzer(withNextIntl(withMDX(nextConfig)));
