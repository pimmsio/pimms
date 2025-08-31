"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface BouncingImagesProps {
  tkey?: string;
}

/**
 * Demonstrates two images overlapping in normal flow.
 * Every 3s, they both shrink + move apart, swap z-index,
 * then scale back up to overlap again.
 */
export default function BouncingImages({ tkey = "landing" }: BouncingImagesProps) {
  const t = useTranslations(tkey);
  const [frontImage, setFrontImage] = useState(0);
  // Tracks the current animation stage: idle | scaleDown | scaleUp
  const [swapStage, setSwapStage] = useState<"idle" | "scaleDown" | "scaleUp">("idle");

  // Get images from translations
  const images = {
    image1: {
      src: t("free_offer.images.1"),
      alt: t("free_offer.images.alt1")
    },
    image2: {
      src: t("free_offer.images.2"),
      alt: t("free_offer.images.alt2")
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Start scale down
      setSwapStage("scaleDown");

      setTimeout(() => {
        setFrontImage((prev) => (prev === 0 ? 1 : 0));
      }, 200);

      // After 300ms (scaleDown done), swap front image
      setTimeout(() => {
        // Then scale up
        setSwapStage("scaleUp");
      }, 400);

      // After another 300ms, return to idle
      setTimeout(() => {
        setSwapStage("idle");
      }, 600);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Classes for image #1
  const image1Transforms = () => {
    switch (swapStage) {
      case "scaleDown":
        // Shrink + shift left
        return "scale-90 -translate-x-4";
      case "scaleUp":
        // Return to original position + size
        return "scale-100 translate-x-0";
      default:
        return "";
    }
  };

  // Classes for image #2
  const image2Transforms = () => {
    switch (swapStage) {
      case "scaleDown":
        // Shrink + shift right
        return "scale-90 translate-x-4";
      case "scaleUp":
        // Return to original position + size
        return "scale-100 translate-x-0";
      default:
        return "";
    }
  };

  return (
    <div className="relative flex items-start justify-center w-full max-w-md mx-auto sm:min-h-[275px]" data-nosnippet>
      <div
        className={`
          relative border border-gray-200 mr-[-20px] sm:mr-[-30px] rounded-xl bg-white
          transition-all duration-300 overflow-hidden w-48 sm:w-56
          ${frontImage === 0 ? "z-10" : "z-0"} 
          ${image1Transforms()}
        `}
      >
        <Image
          src={images.image1.src}
          alt={images.image1.alt}
          width={400}
          height={434}
          className="object-cover w-full h-auto"
        />
      </div>
      <div
        className={`
          relative border border-gray-200 rounded-xl bg-white
          transition-all duration-300 top-[20px] sm:top-[30px] overflow-hidden w-48 sm:w-56
          ${frontImage === 1 ? "z-10" : "z-0"}
          ${image2Transforms()}
        `}
      >
        <Image
          src={images.image2.src}
          alt={images.image2.alt}
          width={400}
          height={434}
          className="object-cover w-full h-auto"
        />
      </div>
    </div>
  );
}
