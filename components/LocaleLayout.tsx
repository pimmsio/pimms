import Head from "next/head";
import { GoogleTagManager } from "@next/third-parties/google";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import RootProviders from "../app/providers";
import LinkedInInsight from "./linkedin-insight";

const inter = Inter({ subsets: ["latin"] });

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
