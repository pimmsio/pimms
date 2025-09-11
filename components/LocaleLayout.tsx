import Head from "next/head";
import { GoogleTagManager } from "@next/third-parties/google";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import RootProviders from "../app/providers";
import LinkedInInsight from "./linkedin-insight";
import { ResourceHints } from "./resource-hints";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Optimize font loading with swap
  preload: true, // Preload the font for better performance
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: true, // Reduce layout shift
  variable: "--font-inter",
  // Only load the weights we actually use to reduce bundle size
  weight: ["400", "500", "600", "700"],
  style: ["normal"]
});

type Props = {
  children: React.ReactNode;
  locale: string;
};

export default async function BaseLayout({ children, locale }: Props) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <Head>
        <meta name="apple-mobile-web-app-title" content="Pimms" />
        <ResourceHints />
        <LinkedInInsight />
        {/* Simple critical CSS inline - much simpler than complex components */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body{font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;background-color:hsl(0 0% 98%);color:hsl(220,20%,15%)}
              html{scroll-behavior:smooth}
              .antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
            `
          }}
        />
      </Head>
      <body className={`${inter.className} antialiased overscroll-none scroll-smooth`}>
        <RootProviders>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </RootProviders>
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_CONTAINER_ID as string} />
    </html>
  );
}
