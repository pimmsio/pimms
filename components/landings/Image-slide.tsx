import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Section } from "@/components/base/section";

const ImageSlide = () => {
  const locale = useLocale();

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
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />
        </div>
      </div>

      {/* Desktop: Enhanced design with backdrop effects */}
      <div className="hidden md:block">
        <div
          className="relative p-6 rounded-3xl backdrop-blur-sm bg-gradient-to-br from-white/80 to-gray-50/60 shadow-[0_8px_32px_-12px_rgba(57,112,255,0.15),0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-white/20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(57,112,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(57,112,255,0.05) 0%, transparent 50%)
            `,
            backgroundPosition: "0% 0%",
            backgroundSize: "100% 100%"
          }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100 overflow-hidden transition-all duration-300">
            <Image
              src={`https://assets.pimms.io/landing-growth-insights-${locale}.webp?v=6`}
              alt="PIMMS Growth Insights Dashboard"
              width={1400}
              height={1050}
              className="grayscale w-full h-full object-cover"
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ImageSlide;
