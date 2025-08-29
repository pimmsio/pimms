"use client";

import React, { useRef, useState } from "react";
import { motion } from "@/lib/framer-motion";
import { GridPattern } from "../magicui/grid-pattern";
import { useInterval } from "ahooks";

type Logo = { src: string; alt: string; size?: "sm" | "md" | "lg" };

const baseUrl = "/static/logos/integrations";
const deeplinksBaseUrl = "/static/logos/deeplinks";

const logoPool: Logo[] = [
  { src: `${baseUrl}/shopify.svg`, alt: "Shopify", size: "lg" },
  { src: `${baseUrl}/stripe.svg`, alt: "Stripe", size: "lg" },
  { src: `${baseUrl}/zapier.jpeg`, alt: "Zapier", size: "md" },
  { src: `${baseUrl}/make.svg`, alt: "Make", size: "md" },
  { src: `${baseUrl}/typeform.svg`, alt: "Typeform", size: "md" },
  { src: `${baseUrl}/tally.svg`, alt: "Tally", size: "sm" },
  { src: `${baseUrl}/calcom.jpeg`, alt: "Cal.com", size: "sm" },
  { src: `${baseUrl}/calendly.svg`, alt: "Calendly", size: "md" },
  { src: `${baseUrl}/systemeio.jpeg`, alt: "Systeme.io", size: "md" },
  { src: `${deeplinksBaseUrl}/youtube.svg`, alt: "YouTube", size: "sm" },
  { src: `${baseUrl}/wordpress.svg`, alt: "WordPress", size: "sm" },
  { src: `${baseUrl}/webflow.svg`, alt: "Webflow", size: "md" },
  { src: `${baseUrl}/lovable.svg`, alt: "Lovable", size: "md" },
  { src: `${baseUrl}/lemlist.svg`, alt: "Lemlist", size: "sm" },
  { src: `${baseUrl}/brevo.jpeg`, alt: "Brevo", size: "sm" },
  { src: `${baseUrl}/clay.png`, alt: "Clay", size: "sm" },
  { src: `${baseUrl}/trigify.jpeg`, alt: "Trigify", size: "sm" },
  { src: `${baseUrl}/slack.svg`, alt: "Slack", size: "md" },
  { src: `${baseUrl}/framer.svg`, alt: "Framer", size: "md" }
];

// Grid configuration (keeps a compact rectangle)
const COLS = 9; // fewer columns per request
const ROWS = 6;
const CELL = 60; // px
const GRID_WIDTH = COLS * CELL;
const GRID_HEIGHT = ROWS * CELL;

// Logical positions (column, row). 0-indexed.
const positions: Array<{ col: number; row: number; delay: number }> = [
  { col: 4, row: 0, delay: 0.1 },
  { col: 6, row: 0, delay: 0.15 },
  { col: 8, row: 0, delay: 0.2 },
  { col: 1, row: 1, delay: 0.25 },
  { col: 3, row: 1, delay: 0.3 },
  { col: 4, row: 2, delay: 0.4 },
  { col: 0, row: 2, delay: 0.45 },
  { col: 2, row: 2, delay: 0.5 },
  { col: 6, row: 2, delay: 0.6 },
  { col: 1, row: 3, delay: 0.7 },
  { col: 3, row: 3, delay: 0.75 },
  { col: 7, row: 3, delay: 0.85 },
  { col: 0, row: 4, delay: 0.7 },
  { col: 2, row: 4, delay: 0.75 },
  { col: 6, row: 4, delay: 0.85 },
  { col: 5, row: 5, delay: 1.05 },
  { col: 3, row: 5, delay: 1.1 }
];

export const IntegrationsGrid: React.FC = () => {
  const CARD = 60;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const initialIndexes = React.useMemo(() => {
    return Array.from({ length: positions.length }, (_, i) => i % logoPool.length);
  }, []);

  // Randomly highlight 4 logos (remove grayscale) every second
  const [coloredSet, setColoredSet] = useState<Set<number>>(new Set());

  useInterval(
    () => {
      const next = new Set<number>();
      const target = Math.min(4, positions.length);
      while (next.size < target) {
        next.add(Math.floor(Math.random() * positions.length));
      }
      setColoredSet(next);
    },
    4000,
    { immediate: true }
  );

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-3xl md:rounded-none">
      <div className="relative" style={{ height: GRID_HEIGHT }}>
        <div
          className="absolute left-1/2 top-1/2 origin-center"
          style={{ width: GRID_WIDTH, height: GRID_HEIGHT, transform: `translate(-50%, -50%)` }}
        >
          <GridPattern
            width={CELL}
            height={CELL}
            className="pointer-events-none absolute inset-0 text-neutral-200 [mask-image:linear-gradient(transparent,black,transparent)]"
          />

          <div className="absolute inset-0 z-10">
            {Array.from({ length: positions.length }).map((_, i) => {
              const safeIndex = initialIndexes[i] ?? i % logoPool.length;
              const logo = logoPool[safeIndex];
              const defaultPos = positions[i % positions.length];
              // Compute absolute px positions from grid coordinates
              const left = defaultPos.col * CELL;
              const top = defaultPos.row * CELL;
              const cover = !!logo && (logo.alt === "Lemlist" || logo.alt === "Zapier");
              const isColored = coloredSet.has(i);
              return (
                <motion.div
                  key={`${i}-${safeIndex}`}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`absolute rounded-lg bg-white shadow-md transition-all duration-700 ${isColored ? "grayscale-0" : "grayscale"}`}
                  style={{
                    width: CARD,
                    height: CARD,
                    top,
                    left,
                    backgroundImage: logo ? `url(${logo.src})` : "none",
                    backgroundSize: cover ? "100%" : "70%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsGrid;
