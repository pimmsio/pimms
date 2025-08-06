import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Section } from "@/components/base/section";

const ImageSlide = () => {
  const locale = useLocale();

  return (
    <Section id="video" className="max-w-7xl md:px-0 md:py-4">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <Image
          src={`https://assets.pimms.io/landing-growth-insights-${locale}.webp?v=4`}
          alt="PIMMS Growth Insights Dashboard"
          width={1400}
          height={1050}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </Section>
  );
};

export default ImageSlide;
