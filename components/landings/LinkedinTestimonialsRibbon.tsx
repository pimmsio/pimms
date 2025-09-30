import { Marquee } from "@/components/magicui/marquee";
import React from "react";

export function LinkedinTestimonialsRibbon({ children }: { children: React.ReactNode }) {
  // Convert children to array and split into two rows
  const childrenArray = React.Children.toArray(children);
  const midPoint = Math.ceil(childrenArray.length / 2);
  const firstRow = childrenArray.slice(0, midPoint);
  const secondRow = childrenArray.slice(midPoint);

  return (
    <div className="relative w-full py-16 bg-gradient-to-b from-gray-50/50 to-transparent">
      {/* First row - scrolling left */}
      <div className="mb-8">
        <Marquee reverse pauseOnHover className="py-6" style={{ "--duration": "80s" } as React.CSSProperties}>
          {firstRow.map((child, idx) => (
            <div key={idx} className="px-4">
              {child}
            </div>
          ))}
        </Marquee>
      </div>

      {/* Second row - scrolling right */}
      <div>
        <Marquee pauseOnHover className="py-6" style={{ "--duration": "80s" } as React.CSSProperties}>
          {secondRow.map((child, idx) => (
            <div key={idx} className="px-4">
              {child}
            </div>
          ))}
        </Marquee>
      </div>

      {/* Gradient overlays on left and right edges */}
      <div className="hidden md:block pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10"></div>
      <div className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10"></div>
    </div>
  );
}
