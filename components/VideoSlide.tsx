"use client";
import React, { useState, useRef, useEffect } from "react";
import Player from "@vimeo/player";

interface VideoSlideProps {
  vimeoSrc?: string;
  coverVideoSrc?: string;
}

const VideoSlide: React.FC<VideoSlideProps> = ({
  vimeoSrc = "https://player.vimeo.com/video/1057782853?badge=0&playsinline=0",
  coverVideoSrc = "https://assets.pimms.io/pimms-intro-preview.mp4",
}) => {
  const [coverVisible, setCoverVisible] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);
  useEffect(() => {
    if (iframeRef.current) {
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
    }
    return () => {
      if (playerRef.current) {
        playerRef.current.unload().catch(() => {});
        playerRef.current = null;
      }
    };
  }, []);
  const handlePlay = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!coverVisible || !playerReady) return;
    playerRef.current
      ?.play()
      .catch((err) =>
        console.error("Erreur lors du lancement de la vidéo :", err)
      );
  };
  return (
    <section
      id="video"
      className="w-full max-w-7xl my-12 md:my-20 md mx-auto relative overflow-hidden outline outline-[6px] outline-[#F2F3F5] flex justify-center items-center"
    >
      <div className="w-full grid grid-cols-1 grid-rows-1 aspect-video mx-auto overflow-hidden">
        <iframe
          ref={iframeRef}
          src={vimeoSrc}
          className={`row-start-1 col-start-1 w-full h-full transition-opacity duration-500 ${
            videoPlaying ? "opacity-100" : "opacity-0"
          }`}
          frameBorder="0"
          allowFullScreen
          allow="autoplay; encrypted-media; fullscreen"
        ></iframe>
        <button
          onClick={handlePlay}
          onTouchEnd={handlePlay}
          onPointerDown={handlePlay}
          className={`row-start-1 col-start-1 transition-opacity duration-500 ${
            coverVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          } grid place-items-center relative`}
          style={{
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            userSelect: "none",
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover z-0 pointer-events-none"
          >
            <source src={coverVideoSrc} type="video/mp4" />
          </video>
          <div className="absolute z-10 flex items-center justify-center w-20 h-20 bg-primary rounded-full shadow-lg transition-transform hover:scale-110 border-[6px] border-white hover:border-[#F0A8BF]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              stroke="currentColor"
              viewBox="0 0 16 16"
              className="text-white"
            >
              <path d="M6.271 4.055c-.45-.275-.771-.079-.771.438v7.015c0 .516.321.713.771.438l5.394-3.503c.449-.276.449-.6 0-.877l-5.394-3.511z" />
            </svg>
          </div>
        </button>
      </div>
    </section>
  );
};

export default VideoSlide;
