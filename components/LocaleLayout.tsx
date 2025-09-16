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
        {/* Critical CSS for above-the-fold content - optimized and compressed */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              *{box-sizing:border-box}
              body{margin:0;font-family:var(--font-inter),ui-sans-serif,system-ui,-apple-system,sans-serif;background:hsl(0 0% 98%);color:hsl(220 20% 15%);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;line-height:1.6}
              html{scroll-behavior:smooth}
              .container{max-width:80rem;margin:0 auto;padding:0 1rem}
              .section{max-width:80rem;margin:0 auto;padding:3rem 1rem}
              .flex{display:flex}
              .items-center{align-items:center}
              .justify-center{justify-content:center}
              .text-center{text-align:center}
              .relative{position:relative}
              .w-full{width:100%}
              .h-auto{height:auto}
              .btn{display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;font-weight:600;border-radius:1rem;transition:transform 0.2s,background-color 0.2s;cursor:pointer;text-decoration:none}
              .btn-primary{background:#3970ff;color:white;padding:0.75rem 1.5rem;border:none}
              .btn-primary:hover{background:#2850d0;transform:translateY(-1px)}
              h1,h2,h3{margin:0 0 1rem;font-weight:600;line-height:1.2}
              h1{font-size:2.5rem}h2{font-size:2rem}h3{font-size:1.5rem}
              p{margin:0 0 1rem;line-height:1.6}
              @media(max-width:768px){h1{font-size:2rem}h2{font-size:1.5rem}h3{font-size:1.25rem}.section{padding:2rem 1rem}}
            `
          }}
        />
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
