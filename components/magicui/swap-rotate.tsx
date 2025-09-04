"use client";

import { AnimatePresence, motion, MotionProps } from "motion/react";
import { useState } from "react";
import { useDebounceFn } from "ahooks";

import { cn } from "@/lib/utils";

interface SwapRotateProps {
  children: React.ReactNode;
  duration?: number;
  motionProps?: MotionProps;
  className?: string;
}

export function SwapRotate({
  children,
  duration = 150, // Duration in milliseconds
  motionProps,
  className
}: SwapRotateProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Debounce the mouse leave to prevent flickering on rapid enter/exit
  const { run: debouncedSetNotHovering, cancel: cancelNotHovering } = useDebounceFn(() => setIsHovering(false), {
    wait: 300
  });

  const defaultMotionProps = {
    initial: { opacity: 0, y: 30 }, // Start from bottom
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }, // Exit to top
    transition: {
      duration: duration / 1000,
      ease: "easeInOut" as const
    } // Convert ms to seconds
  };

  return (
    <div
      className="relative flex w-full h-full items-center justify-center px-4 overflow-hidden"
      onMouseEnter={() => {
        // Cancel any pending "not hovering" action
        cancelNotHovering();

        if (!isHovering) {
          setIsHovering(true);
          setAnimationKey((prev) => prev + 1);
        }
      }}
      onMouseLeave={() => {
        // Debounce setting isHovering to false to prevent flickering
        debouncedSetNotHovering();
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={animationKey}
          className={cn("inline-block", className)}
          {...defaultMotionProps}
          {...motionProps}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
