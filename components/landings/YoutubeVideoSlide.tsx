"use client";

import React, { useRef, useState } from "react";
import { Section } from "@/components/base/section";

interface YoutubeVideoSlideProps {
  src: string;
  title?: string;
  thumbnail?: string;
}

export const YoutubeVideoSlide = ({ src, title, thumbnail }: YoutubeVideoSlideProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const resolvedSrc = isPlaying ? withAutoplay(src) : undefined;

  return (
    <Section id="video">
      <div 
        className="relative overflow-hidden rounded-2xl bg-white"
        style={{
          boxShadow: "0 20px 60px -15px rgba(57, 112, 255, 0.3), 0 10px 30px -10px rgba(57, 112, 255, 0.2)"
        }}
      >
        <div className="w-full aspect-video">
          {thumbnail && !isPlaying && (
            <>
              <img
                src={thumbnail}
                alt={title ?? "Product demo"}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <button
                type="button"
                aria-label="Play video"
                onClick={() => setIsPlaying(true)}
                className="absolute cursor-pointer inset-0 flex items-center justify-center focus-visible:outline-none"
              >
                <span
                  className="inline-flex items-center justify-center bg-linear-to-tr to-brand-secondary from-brand-primary rounded-full shadow-md shadow-brand-primary/40 w-14 h-14 md:w-16 md:h-16 transition-transform hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-white/80"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-9 h-9 md:w-10 md:h-10 drop-shadow-lg drop-shadow-brand-primary text-white"
                    aria-hidden="true"
                    fill="currentColor"
                  >
                    <path
                      d="M10 8.5v7l6.5-3.5L10 8.5z"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </>
          )}
          {resolvedSrc && (
            <iframe
              ref={iframeRef}
              src={resolvedSrc}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              title={title ?? "YouTube video"}
              onLoad={() => setIsLoaded(true)}
            />
          )}
        </div>
      </div>
    </Section>
  );
};

export default YoutubeVideoSlide;

const withAutoplay = (value: string) => {
  try {
    const url = new URL(value);
    url.searchParams.set("autoplay", "1");
    url.searchParams.set("playsinline", "1");
    return url.toString();
  } catch {
    const joiner = value.includes("?") ? "&" : "?";
    return `${value}${joiner}autoplay=1&playsinline=1`;
  }
};
