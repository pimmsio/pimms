export default {
  plugins: {
    "@tailwindcss/postcss": {},
    // Add CSS optimization for production
    ...(process.env.NODE_ENV === "production" && {
      cssnano: {
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true
            },
            normalizeWhitespace: true,
            minifySelectors: true,
            mergeLonghand: true,
            mergeRules: true,
            // Disable these problematic optimizations that can break CSS syntax
            reduceIdents: false,
            mergeIdents: false,
            // Additional safe optimizations
            discardDuplicates: true,
            discardEmpty: true,
            normalizeUrl: true,
            // Remove SVGO as it's not needed for CSS processing
            svgo: false
          }
        ]
      },
      // Add autoprefixer for better browser support
      autoprefixer: {}
    })
  }
};
