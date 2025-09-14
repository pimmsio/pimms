import LandingPage from "./landings/[slug]/page";
import { generateLandingMetadata } from "@/lib/utils";
import { Metadata } from "next";

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  return generateLandingMetadata({ params, lkey: "home", pathname: "/" });
}

// Enable static generation with revalidation for the homepage
export const revalidate = 3600; // Revalidate every hour
// export const dynamic = "force-static";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LandingPage params={Promise.resolve({ locale, slug: "home" })} />;
}
