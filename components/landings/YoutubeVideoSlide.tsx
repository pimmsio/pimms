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
      <div className="relative overflow-hidden rounded-2xl bg-black">
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
                className="absolute cursor-pointer inset-0 flex items-center justify-center"
              >
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/90 bg-brand-primary text-white">
                  <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
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
