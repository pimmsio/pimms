"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { HeroRibbonSkeleton } from "./HeroRibbonSkeleton";

type Props = {
  seedNonce: string;
};

// Simple cache to prevent duplicate requests in development
const requestCache = new Map<string, Promise<string>>();

export default function HeroRibbon({ seedNonce }: Props) {
  const locale = useLocale();

  // Use deterministic uid based on seedNonce to ensure consistent caching
  const uid = `hero-ribbon-${seedNonce.replace(/[^a-zA-Z0-9-]/g, "-")}`;
  const [svgContent, setSvgContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const url = `/api/animation-svg/hero-ribbon?uid=${encodeURIComponent(uid)}&seed=${encodeURIComponent(seedNonce)}&locale=${encodeURIComponent(locale)}`;

        // Check cache first
        if (requestCache.has(url)) {
          const svg = await requestCache.get(url)!;
          setSvgContent(svg);
          return;
        }

        // Create promise and cache it
        const requestPromise = fetch(url).then(async (response) => {
          if (response.ok) {
            return response.text();
          } else {
            console.error("Failed to fetch hero ribbon SVG");
            throw new Error("Failed to fetch SVG");
          }
        });

        requestCache.set(url, requestPromise);

        const svg = await requestPromise;
        setSvgContent(svg);
      } catch (error) {
        console.error("Error fetching hero ribbon SVG:", error);
        // Remove failed request from cache
        const url = `/api/animation-svg/hero-ribbon?uid=${encodeURIComponent(uid)}&seed=${encodeURIComponent(seedNonce)}&locale=${encodeURIComponent(locale)}`;
        requestCache.delete(url);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSvg();
  }, [uid, seedNonce, locale]);

  // Show skeleton immediately while loading, then transition to actual content
  if (isLoading || !svgContent) {
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
