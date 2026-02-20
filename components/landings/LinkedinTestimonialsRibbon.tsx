"use client";

import React, { useEffect, useState } from "react";

import type { CarouselApi } from "@/components/ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

type LinkedinTestimonialsRibbonProps = {
  children: React.ReactNode;
};

export function LinkedinTestimonialsRibbon({ children }: LinkedinTestimonialsRibbonProps) {
  const childrenArray = React.Children.toArray(children);
  const [api, setApi] = useState<CarouselApi | null>(null);

  const carouselOptions = {
    loop: true,
    dragFree: true,
    align: "start"
  } as const;

  useEffect(() => {
    if (!api) return;
    const interval = window.setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => window.clearInterval(interval);
  }, [api]);

  return (
    <div className="relative w-full py-8">
      <Carousel
        opts={carouselOptions}
        setApi={setApi}
        className="w-full cursor-grab select-none active:cursor-grabbing"
      >
        <CarouselContent className="py-12 px-1">
          {childrenArray.map((child, idx) => (
            <CarouselItem key={getChildKey(child, idx)} className="basis-auto">
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

function getChildKey(child: React.ReactNode, fallbackIdx: number) {
  if (React.isValidElement(child) && child.key != null) return String(child.key);
  return fallbackIdx;
}
