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
  // Optimize performance and HTML size
  poweredByHeader: false,
  generateEtags: false,
  // Optimize HTML output
  trailingSlash: false,

  // Optimize for better text-to-HTML ratio
  reactStrictMode: true,

  // Additional HTML optimization (swcMinify is default in Next.js 15)
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
          },
          {
            key: "CDN-Cache-Control",
            value: "s-maxage=60, stale-while-revalidate=300"
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
      },
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=86400"
          }
        ]
      },
      {
        source: "/(.*)\\.(woff|woff2|eot|ttf|otf)",
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
            // Separate critical CSS for above-the-fold content
            criticalStyles: {
              name: "critical-styles",
              test: /\.(css|scss|sass)$/,
              chunks: "initial",
              priority: 30,
              enforce: true,
              minSize: 0,
              maxSize: 51200, // 50KB limit for critical CSS
              reuseExistingChunk: true
            },
            // Separate non-critical CSS for async loading
            nonCriticalStyles: {
              name: "non-critical-styles",
              test: /\.(css|scss|sass)$/,
              chunks: "async",
              priority: 25,
              enforce: true,
              minSize: 10000, // Only chunk if > 10KB
              reuseExistingChunk: true
            },
            // Separate component-specific CSS
            componentStyles: {
              name: "component-styles",
              test: /\.(css|scss|sass)$/,
              chunks: "all",
              priority: 20,
              enforce: true,
              minChunks: 2, // Only if used in 2+ components
              reuseExistingChunk: true
            },
            // Separate Vimeo player into its own chunk
            vimeo: {
              test: /[\\/]node_modules[\\/]@vimeo\/player[\\/]/,
              name: "vimeo-player",
              chunks: "async",
              priority: 25,
              enforce: true
            },
            // Separate Dicebear avatar generation into its own chunk
            dicebear: {
              test: /[\\/]node_modules[\\/]@dicebear[\\/]/,
              name: "dicebear-avatars",
              chunks: "async",
              priority: 24,
              enforce: true
            },
            // Separate Cal.com embed into its own chunk
            calcom: {
              test: /[\\/]node_modules[\\/]@calcom[\\/]/,
              name: "calcom-embed",
              chunks: "async",
              priority: 23,
              enforce: true
            },
            // Separate vendor chunks for better caching (lower priority)
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

      // Target modern browsers to reduce polyfills and legacy JavaScript
      config.target = ["web", "es2022"];

      // Reduce legacy JavaScript polyfills
      config.resolve = {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          // Use modern builds when available
          "core-js": false
        },
        fallback: {
          ...config.resolve.fallback,
          // Disable polyfills for features already supported by modern browsers
          "process": false,
          "buffer": false,
          "util": false,
          "assert": false,
          "stream": false,
          "crypto": false,
          "path": false,
          "fs": false,
          "os": false
        }
      };

      // Optimize for modern JavaScript features
      if (config.resolve) {
        config.resolve.mainFields = ["module", "main"];
        config.resolve.conditionNames = ["import", "module", "require"];
      }

      // Add plugin to exclude polyfills for modern browsers
      const webpack = require("webpack");
      config.plugins = config.plugins || [];
      config.plugins.push(
        new webpack.DefinePlugin({
          __NEXT_POLYFILL_NOMODULE__: false
        })
      );
    }
    return config;
  },
  // Keep server-only packages out of client bundle
  serverExternalPackages: ["googleapis", "googleapis-common"],

  // Modern browser targeting to reduce polyfills
  transpilePackages: [],
  // Enable experimental optimizations
  experimental: {
    // Use modern JavaScript features
    esmExternals: true,
    // Enhanced CSS optimization for better performance
    optimizeCss: {
      // Enable critical CSS inlining with optimized settings
      critters: {
        // Inline critical CSS up to 50KB to reduce render blocking
        inlineThreshold: 51200,
        // Minimize CSS output
        minimumExternalSize: 0,
        // Preload non-critical CSS
        preload: "swap",
        // Optimize font loading
        fonts: true,
        // Remove unused CSS selectors
        pruneSource: true,
        // Compress CSS
        compress: true,
        // Reduce HTML size
        mergeStylesheets: true
      },
      // Remove unused CSS to reduce bundle size
      removeUnusedCss: true,
      // Inline critical CSS for faster rendering
      inlineCriticalCss: true,
      // Preload non-critical CSS asynchronously
      preloadCss: "swap"
    },
    // Enable CSS chunking for better loading
    cssChunking: true,
    // Enable static optimization
    optimisticClientCache: true,
    // Optimize package imports to reduce bundle size
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
    ],
    // Minimize client-side JavaScript
    optimizeServerReact: true,

    // Exclude polyfills for modern browsers to reduce bundle size
    forceSwcTransforms: true
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
    deviceSizes: [640, 768, 1024, 1280], // Reduced from 15+ to 4 sizes
    imageSizes: [16, 32, 48, 64], // Reduced from 10+ to 4 sizes for small images
    minimumCacheTTL: 31536000, // 1 year cache
    // Disable optimization for very small images to avoid srcSet bloat
    unoptimized: false,
    formats: ["image/webp"],
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
