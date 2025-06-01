import LandingPage from "./landings/[slug]/page";
import { generateLandingMetadata } from "@/lib/utils";
import { Metadata } from "next";

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  return generateLandingMetadata({ params, lkey: "home", pathname: "/" });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LandingPage params={Promise.resolve({ locale, slug: "home" })} />;
}
