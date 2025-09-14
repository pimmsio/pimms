import LandingPage from "./landings/[slug]/page";
import { generateLandingMetadata } from "@/lib/utils";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  return generateLandingMetadata({ params, lkey: "home", pathname: "/" });
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
