import React from "react";
import Image from "next/image";
import { Section } from "@/components/base/section";

const ImageSlide = ({ locale }: { locale: string }) => {
  return (
    <Section id="video" className="max-w-7xl md:px-0 md:pt-4 md:pb-16">
      {/* Mobile: Simple card without padding border */}
      <div className="md:hidden">
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
          <Image
            src={`https://assets.pimms.io/landing-growth-insights-${locale}.webp?v=6`}
            alt="PIMMS Growth Insights Dashboard"
            width={1400}
            height={1050}
            className="grayscale w-full h-full object-cover"
            priority
            placeholder="blur"
            blurDataURL="/api/placeholder/blur-jpeg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />
        </div>
      </div>

      {/* Desktop: Enhanced design with backdrop effects */}
      <div className="hidden md:block">
        <div className="pimms-image-backdrop relative p-6 rounded-3xl backdrop-blur-sm bg-gradient-to-br from-white/80 to-gray-50/60 shadow-[0_8px_32px_-12px_rgba(57,112,255,0.15),0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-white/20">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100 overflow-hidden transition-all duration-300">
            <Image
              src={`https://assets.pimms.io/landing-growth-insights-${locale}.webp?v=6`}
              alt="PIMMS Growth Insights Dashboard"
              width={1400}
              height={1050}
              className="grayscale w-full h-full object-cover"
              loading="lazy"
              fetchPriority="low"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ImageSlide;
