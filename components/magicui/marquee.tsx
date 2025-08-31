"use client";

import { cn } from "@/lib/utils";
import React, { ComponentPropsWithoutRef, useEffect, useMemo, useRef } from "react";

type Direction = "horizontal" | "vertical";

export interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  /** Set to "vertical" for column scrolling */
  direction?: Direction;
}

/**
 * Simple, dependency-free marquee with CSS animations.
 * Supports horizontal or vertical continuous scrolling.
 * Controls speed via CSS custom property `--duration` (default 30s).
 */
export function Marquee({
  className,
  children,
  reverse = false,
  pauseOnHover = false,
  direction = "horizontal",
  ...props
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate children to create seamless loop
  const items = useMemo(() => {
    const array = React.Children.toArray(children);
    return [...array, ...array, ...array];
  }, [children]);

  useEffect(() => {
    // set default duration if not provided
    const el = containerRef.current;
    if (!el) return;
    if (!el.style.getPropertyValue("--duration")) {
      el.style.setProperty("--duration", "30s");
    }
  }, []);

  const baseAxisClass = direction === "vertical" ? "flex-col" : "flex-row";
  const trackClass = direction === "vertical" ? "animate-marquee-y" : "animate-marquee-x";
  const trackReverseClass = direction === "vertical" ? "animate-marquee-y-reverse" : "animate-marquee-x-reverse";

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", pauseOnHover && "[&:hover_*]:[animation-play-state:paused]", className)}
      {...props}
    >
      <div className={cn("flex gap-4", baseAxisClass)}>
        <div className={cn("flex shrink-0 gap-4", baseAxisClass, reverse ? trackReverseClass : trackClass)}>
          {items.map((child, idx) => (
            <div key={idx} className="shrink-0">
              {child as React.ReactNode}
            </div>
          ))}
        </div>
      </div>

      {/* styles */}
      <style jsx>{`
        .animate-marquee-x {
          display: flex;
          animation: marquee-x var(--duration, 30s) linear infinite;
        }
        .animate-marquee-x-reverse {
          display: flex;
          animation: marquee-x-reverse var(--duration, 30s) linear infinite;
        }
        .animate-marquee-y {
          display: flex;
          animation: marquee-y var(--duration, 30s) linear infinite;
        }
        .animate-marquee-y-reverse {
          display: flex;
          animation: marquee-y-reverse var(--duration, 30s) linear infinite;
        }

        @keyframes marquee-x {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
        @keyframes marquee-x-reverse {
          from {
            transform: translateX(-33.333%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes marquee-y {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-33.333%);
          }
        }
        @keyframes marquee-y-reverse {
          from {
            transform: translateY(-33.333%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

Marquee.displayName = "Marquee";
