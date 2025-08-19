import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Section } from "@/components/base/section";
import { BlurFade } from "@/components/magicui/blur-fade";

const ImageSlide = () => {
  const locale = useLocale();

  return (
    <BlurFade direction="up" delay={1.2} inView={false}>
      <Section id="video" className="max-w-7xl md:px-0 md:pt-4 md:pb-16">
        {/* Mobile: Simple card without padding border */}
        <div className="md:hidden">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <Image
              src={`https://assets.pimms.io/landing-growth-insights-${locale}.webp?v=6`}
              alt="PIMMS Growth Insights Dashboard"
              width={1400}
              height={1050}
              className="w-full h-full object-cover"
              priority
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
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300">
              <Image
                src={`https://assets.pimms.io/landing-growth-insights-${locale}.webp?v=6`}
                alt="PIMMS Growth Insights Dashboard"
                width={1400}
                height={1050}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Section>
    </BlurFade>
  );
};

export default ImageSlide;
