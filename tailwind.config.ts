/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        "brand-primary": "var(--color-brand-primary)",
        "brand-primary-hover": "var(--color-brand-primary-hover)",
        "brand-primary-light": "var(--color-brand-primary-light)",
        "brand-primary-50": "var(--color-brand-primary-50)",
        "brand-primary-100": "var(--color-brand-primary-100)",
        "brand-primary-200": "var(--color-brand-primary-200)",
        "brand-primary-300": "var(--color-brand-primary-300)",
        "brand-primary-400": "var(--color-brand-primary-400)",
        "brand-primary-500": "var(--color-brand-primary-500)",
        "brand-primary-600": "var(--color-brand-primary-600)",
        "brand-primary-700": "var(--color-brand-primary-700)",
        "brand-primary-800": "var(--color-brand-primary-800)",
        "brand-primary-900": "var(--color-brand-primary-900)",

        // Vibrant palette
        "vibrant-blue": "var(--color-vibrant-blue)",
        "vibrant-cyan": "var(--color-vibrant-cyan)",
        "vibrant-teal": "var(--color-vibrant-teal)",
        "vibrant-emerald": "var(--color-vibrant-emerald)",
        "vibrant-green": "var(--color-vibrant-green)",
        "vibrant-lime": "var(--color-vibrant-lime)",
        "vibrant-yellow": "var(--color-vibrant-yellow)",
        "vibrant-amber": "var(--color-vibrant-amber)",
        "vibrant-orange": "var(--color-vibrant-orange)",
        "vibrant-red": "var(--color-vibrant-red)",
        "vibrant-rose": "var(--color-vibrant-rose)",
        "vibrant-pink": "var(--color-vibrant-pink)",
        "vibrant-fuchsia": "var(--color-vibrant-fuchsia)",
        "vibrant-purple": "var(--color-vibrant-purple)",
        "vibrant-violet": "var(--color-vibrant-violet)",
        "vibrant-indigo": "var(--color-vibrant-indigo)",

        // Semantic colors
        "success": "var(--color-success)",
        "success-light": "var(--color-success-light)",
        "success-border": "var(--color-success-border)",
        "success-300": "var(--color-success-300)",
        "success-600": "var(--color-success-600)",
        "warning": "var(--color-warning)",
        "warning-light": "var(--color-warning-light)",
        "warning-border": "var(--color-warning-border)",
        "error": "var(--color-error)",
        "error-light": "var(--color-error-light)",
        "error-border": "var(--color-error-border)",
        "error-50": "var(--color-error-50)",
        "error-300": "var(--color-error-300)",
        "error-400": "var(--color-error-400)",
        "error-600": "var(--color-error-600)",
        "info": "var(--color-info)",
        "info-light": "var(--color-info-light)",
        "info-border": "var(--color-info-border)",

        // Text colors
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",

        // Path and line colors
        "path-neutral": "var(--color-path-neutral)",
        "stroke-light": "var(--color-stroke-light)",
        "stroke-medium": "var(--color-stroke-medium)",

        // Unified data colors - for charts, legends & metrics
        "data-primary": "var(--color-data-primary)",
        "data-primary-light": "var(--color-data-primary-light)",
        "data-secondary": "var(--color-data-secondary)",
        "data-secondary-light": "var(--color-data-secondary-light)",
        "data-success": "var(--color-data-success)",
        "data-success-light": "var(--color-data-success-light)"
      },
      backgroundImage: {
        // Gradient tokens
        "gradient-primary": "var(--gradient-primary)",
        "gradient-primary-soft": "var(--gradient-primary-soft)",
        "gradient-primary-light": "var(--gradient-primary-light)",
        "gradient-background-soft": "var(--gradient-background-soft)",
        "gradient-background-reverse": "var(--gradient-background-reverse)",
        "gradient-info": "var(--gradient-info)",
        "gradient-success": "var(--gradient-success)",
        "gradient-warning": "var(--gradient-warning)",
        "gradient-error": "var(--gradient-error)",

        // Unified data gradients
        "gradient-data-primary": "var(--gradient-data-primary)",
        "gradient-data-secondary": "var(--gradient-data-secondary)",
        "gradient-data-success": "var(--gradient-data-success)"
      }
    }
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
};
