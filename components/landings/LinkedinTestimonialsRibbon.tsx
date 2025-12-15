"use client";

import React, { useEffect, useMemo, useState } from "react";

import type { CarouselApi } from "@/components/ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

type LinkedinTestimonialsRibbonProps = {
  children: React.ReactNode;
  /**
   * Number of marquee rows to render.
   * Defaults to 2 (current behavior).
   */
  rows?: 1 | 2;
};

export function LinkedinTestimonialsRibbon({ children, rows = 2 }: LinkedinTestimonialsRibbonProps) {
  const childrenArray = React.Children.toArray(children);
  const half = Math.ceil(childrenArray.length / 2);
  const [rowOneApi, setRowOneApi] = useState<CarouselApi | null>(null);
  const [rowTwoApi, setRowTwoApi] = useState<CarouselApi | null>(null);

  const carouselOptions = {
    loop: true,
    dragFree: true,
    align: "start"
  } as const;

  const [rowOne, rowTwo] = useMemo(() => {
    return rows === 1 ? [childrenArray, []] : [childrenArray.slice(0, half), childrenArray.slice(half)];
  }, [childrenArray, half, rows]);

  useEffect(() => {
    if (!rowOneApi) return;
    const interval = window.setInterval(() => {
      rowOneApi.scrollNext();
    }, 5000);

    return () => window.clearInterval(interval);
  }, [rowOneApi]);

  useEffect(() => {
    if (!rowTwoApi) return;
    const interval = window.setInterval(() => {
      rowTwoApi.scrollNext();
    }, 5000);

    return () => window.clearInterval(interval);
  }, [rowTwoApi]);

  const renderRow = (rowChildren: React.ReactNode[], setApi: (api: CarouselApi) => void) => (
    <Carousel
      opts={carouselOptions}
      setApi={setApi}
      className="w-full cursor-grab select-none active:cursor-grabbing"
    >
      <CarouselContent className="py-12 px-1">
        {rowChildren.map((child, idx) => (
          <CarouselItem key={getChildKey(child, idx)} className="basis-auto">
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );

  return (
    <div className="relative w-full py-8">
      {rows === 1 ? (
        renderRow(rowOne, (api) => setRowOneApi(api))
      ) : (
        <>
          <div className="mb-6">{renderRow(rowOne, (api) => setRowOneApi(api))}</div>
          <div>{renderRow(rowTwo, (api) => setRowTwoApi(api))}</div>
        </>
      )}
    </div>
  );
}

function getChildKey(child: React.ReactNode, fallbackIdx: number) {
  if (React.isValidElement(child) && child.key != null) return String(child.key);
  return fallbackIdx;
}
