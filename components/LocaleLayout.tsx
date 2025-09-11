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
  display: "swap", // Optimize font loading
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
  adjustFontFallback: true, // Reduce layout shift
  variable: "--font-inter"
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
