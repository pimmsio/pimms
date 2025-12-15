import Head from "next/head";
import { NextIntlClientProvider } from "next-intl";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import RootProviders from "../app/providers";
import LinkedInInsight from "./linkedin-insight";
import { ResourceHints } from "./resource-hints";
import { getMessages } from "next-intl/server";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true, // Preload critical font
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: true,
  variable: "--font-inter",
  weight: ["400", "600"],
  style: ["normal"]
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: true, // Preload critical font
  variable: "--font-jakarta",
  weight: ["400", "700"],
  fallback: ["Inter", "system-ui", "-apple-system", "sans-serif"]
});

type Props = {
  children: React.ReactNode;
  locale: string;
};

export default async function BaseLayout({ children, locale }: Props) {
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <Head>
        <meta name="apple-mobile-web-app-title" content="Pimms" />
        <ResourceHints />

        {/* Make manifest non-critical to reduce dependency chain */}
        <link rel="manifest" href="/manifest.json" />

        <LinkedInInsight />
      </Head>
      <body className={`${inter.variable} ${jakarta.variable}`}>
        <RootProviders>
          <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Paris">
            {children}
          </NextIntlClientProvider>
        </RootProviders>
      </body>
      {/* <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_CONTAINER_ID as string} /> */}
    </html>
  );
}
