import LandingPage from "./landings/[slug]/page";
import { generatePagesMetadata } from "@/lib/utils";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getPage } from "@/lib/mdx";
import { landingFolders } from "@/i18n/config";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const locale = (await params).locale;
  
  try {
    const page = getPage(locale, landingFolders, "home");
    
    return generatePagesMetadata({
      params,
      dir: "landings",
      slug: "home",
      metadata: page.metadata
    });
  } catch {
    notFound();
  }
}

// Enable static generation with revalidation for the homepage
export const revalidate = 3600; // Revalidate every hour
export const dynamic = "force-static";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Set locale for server components - CRITICAL for static generation with next-intl
  setRequestLocale(locale);

  return <LandingPage params={Promise.resolve({ locale, slug: "home" })} />;
}
