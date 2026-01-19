"use client";

import React, { useEffect, useRef, useState } from "react";
import { Section } from "@/components/base/section";

interface VimeoVideoSlideProps {
  src: string;
  cover?: string;
  title?: string;
}

export const VimeoVideoSlide = ({ src, cover, title }: VimeoVideoSlideProps) => {
  const [coverVisible, setCoverVisible] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    (async function () {
      if (!iframeRef.current) return;

      // Dynamic import Vimeo player to reduce bundle size
      const { default: Player } = await import("@vimeo/player");
      playerRef.current = new Player(iframeRef.current);

      playerRef.current.on("loaded", () => setPlayerReady(true));
      playerRef.current.on("play", () => {
        setVideoPlaying(true);
        setTimeout(() => setCoverVisible(false), 100);
      });
      playerRef.current.on("pause", () => {
        setVideoPlaying(false);
        setCoverVisible(true);
      });
    })();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  const handlePlay = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!coverVisible || !playerReady) return;
    playerRef.current?.play().catch((err: any) => console.error("Erreur lors du lancement de la vidéo :", err));
  };

  // If no cover is provided, render the iframe directly without the cover-play interaction.
  if (!cover) {
    return (
      <Section id="video">
        <div className="relative overflow-hidden border-2 border-brand-primary rounded-3xl bg-black">
          <div className="w-full aspect-video">
            <iframe
              ref={iframeRef}
              src={src}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; encrypted-media; fullscreen"
              title={title ?? "Video demonstration"}
            />
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="video">
      <div className="relative overflow-hidden border-2 border-brand-primary rounded-3xl">
        <div className="w-full grid grid-cols-1 grid-rows-1 aspect-video overflow-hidden">
          <iframe
            ref={iframeRef}
            src={src}
            className={`row-start-1 col-start-1 w-full h-full transition-opacity duration-500 ${
              videoPlaying ? "opacity-100" : "opacity-0"
            }`}
            frameBorder="0"
            allowFullScreen
            allow="autoplay; encrypted-media; fullscreen"
            title={title ?? "Video demonstration"}
          ></iframe>
          <button
            onClick={handlePlay}
            onTouchEnd={handlePlay}
            onPointerDown={handlePlay}
            className={`row-start-1 col-start-1 transition-opacity duration-500 ${
              coverVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            } grid place-items-end sm:place-items-center relative cursor-pointer focus-visible:outline-none`}
            style={{
              WebkitTouchCallout: "none",
              WebkitUserSelect: "none",
              userSelect: "none"
            }}
          >
            <video autoPlay loop muted playsInline className="w-full h-full object-cover z-0 pointer-events-none">
              <source src={cover} type="video/mp4" />
            </video>
            <span
              className="absolute top-[10%] right-[10%] sm:top-auto sm:right-auto z-10 inline-flex items-center justify-center bg-linear-to-tr to-brand-secondary from-brand-primary rounded-full shadow-md shadow-brand-primary/40 w-11 h-11 sm:w-14 sm:h-14 transition-transform hover:scale-105 active:scale-95"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 sm:w-9 sm:h-9 drop-shadow-lg drop-shadow-brand-primary text-white"
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
        </div>
      </div>
    </Section>
  );
};

export default VimeoVideoSlide;
