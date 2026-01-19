import React from "react";

interface TestimonialsGridProps {
  children: React.ReactNode;
}

export function TestimonialsGrid({ children }: TestimonialsGridProps) {
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {childrenArray.map((child, index) => (
        <React.Fragment key={index}>{child}</React.Fragment>
      ))}
    </div>
  );
}
