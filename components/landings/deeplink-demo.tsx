"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";

const outerBaseUrl = "/static/logos/deeplinks";
const outerLogos = [
  { src: `${outerBaseUrl}/youtube.svg`, alt: "Youtube" },
  { src: `${outerBaseUrl}/amazon.svg`, alt: "Amazon" },
  { src: `${outerBaseUrl}/chrome.svg`, alt: "Chrome" },
  { src: `${outerBaseUrl}/instagram.svg`, alt: "Instagram" },
  { src: `${outerBaseUrl}/linkedin.svg`, alt: "Linkedin" },
  { src: `${outerBaseUrl}/whatsapp.svg`, alt: "Whatsapp" }
];

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-1 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Circle.displayName = "Circle";

export const DeeplinkDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const youtubeRef = useRef<HTMLDivElement>(null);
  const instagramRef = useRef<HTMLDivElement>(null);
  const amazonRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const linkedinRef = useRef<HTMLDivElement>(null);
  const whatsappRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex h-[360px] w-full items-center justify-center overflow-hidden" ref={containerRef}>
      <div className="flex size-full items-center justify-center px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl gap-12 sm:gap-16">
          {/* Left - Lien PIMMS */}
          <div className="flex-shrink-0">
            <div ref={linkRef} className="rounded-xl px-3 py-1 sm:p-4 border-2 border-gray-200 z-20 relative bg-white">
              <div className="text-sm font-semibold text-gray-700 mb-1">Lien</div>
              <div className="text-lg font-bold">PIMMS</div>
              <div className="text-sm text-gray-600 font-mono">pim.ms/lien-court</div>
            </div>
          </div>

          {/* Center - Clic utilisateur */}
          <div className="flex-shrink-0">
            <Circle ref={userRef} className="size-20 border-gray-300 bg-white z-20 relative">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 2M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
            </Circle>
          </div>

          {/* Right - Apps intelligemment sélectionnées */}
          <div className="flex-shrink-0">
            <div className="grid grid-cols-2 gap-2 sm:gap-12">
              {/* Première colonne */}
              <div className="flex flex-row sm:flex-col gap-2 sm:gap-8 items-center justify-center">
                <Circle ref={youtubeRef} className="size-10 sm:size-14 border-gray-200 border-1 bg-white">
                  <img src={outerLogos[0]?.src} alt="Youtube" className="w-6 h-6 sm:w-8 sm:h-8" />
                </Circle>
                <Circle ref={instagramRef} className="size-10 sm:size-14 border-gray-200 border-1 bg-white">
                  <img src={outerLogos[3]?.src} alt="Instagram" className="w-6 h-6 sm:w-8 sm:h-8" />
                </Circle>
                <Circle ref={amazonRef} className="size-10 sm:size-14 border-gray-200 border-1 bg-white">
                  <img src={outerLogos[1]?.src} alt="Amazon" className="w-6 h-6 sm:w-8 sm:h-8" />
                </Circle>
              </div>
              {/* Deuxième colonne */}
              <div className="flex flex-row sm:flex-col gap-2 sm:gap-16 items-center justify-center">
                <Circle ref={chromeRef} className="size-10 sm:size-14 border-gray-200 border-1 bg-white">
                  <img src={outerLogos[2]?.src} alt="Chrome" className="w-6 h-6 sm:w-8 sm:h-8" />
                </Circle>
                <Circle ref={linkedinRef} className="size-10 sm:size-14 border-gray-200 border-1 bg-white">
                  <img src={outerLogos[4]?.src} alt="Linkedin" className="w-6 h-6 sm:w-8 sm:h-8" />
                </Circle>
                <Circle ref={whatsappRef} className="size-10 sm:size-14 border-gray-200 border-1 bg-white">
                  <img src={outerLogos[5]?.src} alt="Whatsapp" className="w-6 h-6 sm:w-8 sm:h-8" />
                </Circle>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Beam from link to user (step 1) - Simple et droit */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={linkRef}
        toRef={userRef}
        pathColor="#e5e7eb"
        gradientStartColor="#3970ff"
        gradientStopColor="#3970ff"
        duration={5}
        curvature={0}
        delay={1}
        pathWidth={3}
        pathOpacity={1}
        className="z-0"
      />

      {/* Tous les beams vers les apps */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={youtubeRef}
        pathColor="#e5e7eb"
        gradientStartColor="#3970ff"
        gradientStopColor="#3970ff"
        duration={5}
        delay={1.5}
        curvature={0}
        pathWidth={3}
        pathOpacity={1}
        className="z-0"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={chromeRef}
        pathColor="#e5e7eb"
        gradientStartColor="#3970ff"
        gradientStopColor="#3970ff"
        duration={5}
        delay={1.5}
        curvature={0}
        pathWidth={3}
        pathOpacity={1}
        className="z-0"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={instagramRef}
        pathColor="#e5e7eb"
        gradientStartColor="#3970ff"
        gradientStopColor="#3970ff"
        duration={5}
        delay={1.5}
        curvature={0}
        pathWidth={3}
        pathOpacity={1}
        className="z-0"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={linkedinRef}
        pathColor="#e5e7eb"
        gradientStartColor="#3970ff"
        gradientStopColor="#3970ff"
        duration={5}
        delay={1.5}
        curvature={0}
        pathWidth={3}
        pathOpacity={1}
        className="z-0"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={amazonRef}
        pathColor="#e5e7eb"
        gradientStartColor="#3970ff"
        gradientStopColor="#3970ff"
        duration={5}
        delay={1.5}
        curvature={0}
        pathWidth={3}
        pathOpacity={1}
        className="z-0"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={whatsappRef}
        pathColor="#e5e7eb"
        gradientStartColor="#3970ff"
        gradientStopColor="#3970ff"
        duration={5}
        delay={1.5}
        curvature={0}
        pathWidth={3}
        pathOpacity={1}
        className="z-0"
      />
    </div>
  );
};

export default DeeplinkDemo;
