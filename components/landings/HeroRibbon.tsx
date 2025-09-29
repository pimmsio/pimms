import { getLocale } from "next-intl/server";
import { HeroRibbonSkeleton } from "./HeroRibbonSkeleton";
import { WEB_URL } from "../../app/constants";

type Props = {
  seedNonce: string;
};

// Server-side function to fetch SVG content
async function fetchHeroRibbonSvg(seedNonce: string, locale: string): Promise<string | null> {
  try {
    const uid = `hero-ribbon-${seedNonce.replace(/[^a-zA-Z0-9-]/g, "-")}`;
    const url = `${WEB_URL}/api/animation-svg/hero-ribbon?uid=${encodeURIComponent(uid)}&seed=${encodeURIComponent(seedNonce)}&locale=${encodeURIComponent(locale)}`;

    const response = await fetch(url, {
      // Cache for 1 hour
      next: { revalidate: 3600 }
    });

    if (response.ok) {
      return await response.text();
    } else {
      console.error("Failed to fetch hero ribbon SVG on server");
      return null;
    }
  } catch (error) {
    console.error("Error fetching hero ribbon SVG on server:", error);
    return null;
  }
}

// Pure server component - no client-side JavaScript needed
export default async function HeroRibbon({ seedNonce }: Props) {
  const locale = await getLocale();
  const svgContent = await fetchHeroRibbonSvg(seedNonce, locale);

  if (!svgContent) {
    return <HeroRibbonSkeleton />;
  }

  return (
    <div
      className="w-full grid place-items-center mb-28 sm:mb-12 mt-20 md:mt-6 md:mb-4"
      aria-hidden="true"
      data-nosnippet
      data-noindex="true"
    >
      <div className="relative w-full max-w-6xl scale-200 sm:scale-150 md:scale-125 xl:scale-100">
        <div className="w-full h-auto" dangerouslySetInnerHTML={{ __html: svgContent }} />
      </div>
    </div>
  );
}
