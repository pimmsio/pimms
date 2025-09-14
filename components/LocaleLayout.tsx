import Head from "next/head";
import { GoogleTagManager } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import RootProviders from "../app/providers";
import LinkedInInsight from "./linkedin-insight";
import { ResourceHints } from "./resource-hints";
import { getMessages } from "next-intl/server";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Optimize font loading with swap
  preload: false, // Don't preload to reduce head size, rely on swap instead
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: true, // Reduce layout shift
  variable: "--font-inter",
  // Only load the most essential weights to reduce bundle size
  weight: ["400", "600"], // Reduced from 4 weights to 2
  style: ["normal"]
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["400", "700"]
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
        <LinkedInInsight />
        {/* Expanded critical CSS to reduce HTML class usage */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body{font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;background-color:hsl(0 0% 98%);color:hsl(220,20%,15%);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;overflow-x:hidden}
              html{scroll-behavior:smooth}
              .section{max-width:80rem;margin:0 auto;padding:3rem 1rem}
              .container{max-width:80rem;margin:0 auto;padding:0 1rem}
              .btn{display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;font-weight:600;border-radius:1rem;transition:all 0.2s;cursor:pointer;text-decoration:none}
              .btn-primary{background:#3970ff;color:white;padding:0.75rem 1.5rem;border:none}
              .btn-primary:hover{background:#2850d0;transform:translateY(-1px)}
              .btn-secondary{background:white;color:#3970ff;padding:0.75rem 1.5rem;border:2px solid #3970ff}
              .btn-secondary:hover{background:#f8fbff}
              .card{background:white;border-radius:1.5rem;border:1px solid #e5e7eb;padding:2rem;box-shadow:0 1px 3px rgba(0,0,0,0.1)}
              .text-center{text-align:center}
              .flex{display:flex}
              .items-center{align-items:center}
              .justify-center{justify-content:center}
              .space-y-6>*+*{margin-top:1.5rem}
              .space-y-4>*+*{margin-top:1rem}
              .grid{display:grid}
              .grid-cols-2{grid-template-columns:repeat(2,1fr)}
              .gap-4{gap:1rem}
              .gap-6{gap:1.5rem}
              .mb-4{margin-bottom:1rem}
              .mb-6{margin-bottom:1.5rem}
              .mb-8{margin-bottom:2rem}
              .mt-8{margin-top:2rem}
              .py-8{padding-top:2rem;padding-bottom:2rem}
              .px-4{padding-left:1rem;padding-right:1rem}
              .rounded-xl{border-radius:0.75rem}
              .rounded-3xl{border-radius:1.5rem}
              .border{border-width:1px;border-color:#e5e7eb}
              .shadow-lg{box-shadow:0 10px 15px -3px rgba(0,0,0,0.1)}
              .relative{position:relative}
              .absolute{position:absolute}
              .z-10{z-index:10}
              .overflow-hidden{overflow:hidden}
              .w-full{width:100%}
              .h-auto{height:auto}
              .object-cover{object-fit:cover}
              @media(min-width:640px){.sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\\:py-16{padding-top:4rem;padding-bottom:4rem}.sm\\:grid-cols-2{grid-template-columns:repeat(2,1fr)}}
              @media(min-width:768px){.md\\:px-8{padding-left:2rem;padding-right:2rem}.md\\:py-20{padding-top:5rem;padding-bottom:5rem}.md\\:grid-cols-3{grid-template-columns:repeat(3,1fr)}}
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
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_CONTAINER_ID as string} />
    </html>
  );
}
