"use client";

import { cn } from "@/lib/utils";
import { useInterval } from "ahooks";
import { AnimatePresence, motion } from "framer-motion";
import React, { ComponentPropsWithoutRef, useMemo, useState } from "react";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 }
  } as const;

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedList = React.memo(({ children, className, delay = 1000, ...props }: AnimatedListProps) => {
  const [index, setIndex] = useState(0);
  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  useInterval(() => {
    setIndex((prevIndex) => {
      return prevIndex + 1;
    });
  }, delay);

  const itemsToShow = useMemo(() => {
    return [
      childrenArray[index % childrenArray.length],
      childrenArray[(index + 1) % childrenArray.length],
      childrenArray[(index + 2) % childrenArray.length],
      childrenArray[(index + 3) % childrenArray.length],
      childrenArray[(index + 4) % childrenArray.length],
      childrenArray[(index + 5) % childrenArray.length]
    ].reverse();
  }, [index, childrenArray]);

  return (
    <div className={cn(`flex flex-col items-center gap-4`, className)} {...props}>
      <AnimatePresence>
        {itemsToShow.map((item) => (
          <AnimatedListItem key={(item as React.ReactElement).key}>{item}</AnimatedListItem>
        ))}
      </AnimatePresence>
    </div>
  );
});

AnimatedList.displayName = "AnimatedList";
