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
        <div className="relative p-6 rounded-3xl border border-border bg-white">
          <div className="bg-white rounded-3xl border border-border overflow-hidden">
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
