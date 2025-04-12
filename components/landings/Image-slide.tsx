"use client";
import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";

const ImageSlide = () => {
  const locale = useLocale();

  return (
    <section
      id="video"
      className="w-full max-w-7xl my-12 md:my-20 md mx-auto relative overflow-hidden outline-[6px] outline-[#3970ff] flex justify-center items-center rounded-3xl"
    >
      <div className="w-full grid grid-cols-1 grid-rows-1 aspect-auto mx-auto overflow-hidden">
        <Image
          src={`https://assets.pimms.io/landing-growth-insights-${locale}.webp?v=3`}
          alt="image-slide"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default ImageSlide;
