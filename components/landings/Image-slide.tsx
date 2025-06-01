import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Section } from "@/components/base/section";

const ImageSlide = () => {
  const locale = useLocale();

  return (
    <Section id="video">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <Image
          src={`https://assets.pimms.io/landing-growth-insights-${locale}.webp?v=3`}
          alt="PIMMS Growth Insights Dashboard"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </Section>
  );
};

export default ImageSlide;
