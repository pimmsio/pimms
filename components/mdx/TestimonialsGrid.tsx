import { BlurFade } from "@/components/magicui/blur-fade";
import React from "react";

interface TestimonialsGridProps {
  children: React.ReactNode;
}

export function TestimonialsGrid({ children }: TestimonialsGridProps) {
  // Convert children to array to handle BlurFade wrapping
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {childrenArray.map((child, index) => (
        <BlurFade key={index} direction="up" delay={0.1 * (index + 1)} inView>
          {child}
        </BlurFade>
      ))}
    </div>
  );
}
