import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";

type WritableCSSProperties = Exclude<
  keyof CSSStyleDeclaration,
  | "length"
  | "parentRule"
  | "getPropertyPriority"
  | "getPropertyValue"
  | "item"
  | "removeProperty"
  | "setProperty"
  | number
  | typeof Symbol.iterator
>;

interface ResponsiveInlinePushTextProps {
  allTexts: React.ReactNode[];
  activeIndex: number;
  direction?: "up" | "down";
  springConfig?: Transition;
  className?: string;
  style?: React.CSSProperties;
  verticalAlign?: React.CSSProperties["verticalAlign"];
}

export default function ResponsiveInlinePushText({
  allTexts,
  activeIndex,
  direction = "up",
  springConfig = { type: "spring", stiffness: 300, damping: 30, mass: 0.2 },
  className,
  style,
  verticalAlign = "baseline",
}: ResponsiveInlinePushTextProps) {
  const [prevIndex, setPrevIndex] = useState(activeIndex);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMeasured, setIsMeasured] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(null);

  const measureTexts = useCallback(() => {
    if (!measureRef.current || !containerRef.current) return;

    // List of safe, writable CSS properties
    const writableStyleProps: WritableCSSProperties[] = [
      "font",
      "letterSpacing",
      "textIndent",
      "paddingLeft",
      "paddingRight",
      "borderLeftWidth",
      "borderRightWidth",
      "boxSizing",
      "fontSize",
      "fontFamily",
      "fontWeight",
      "fontStyle",
      "textTransform",
      "lineHeight",
    ];

    // Clone styles safely
    const computedStyle = window.getComputedStyle(containerRef.current);
    writableStyleProps.forEach((prop) => {
      const value = computedStyle.getPropertyValue(prop);
      measureRef.current!.style[prop] = value;
    });

    // Measure all texts
    let maxWidth = 0;
    let maxHeight = 0;

    allTexts.forEach((text) => {
      measureRef.current!.textContent = text?.toString() || "";
      const rect = measureRef.current!.getBoundingClientRect();
      maxWidth = Math.max(maxWidth, rect.width);
      maxHeight = Math.max(maxHeight, rect.height);
    });

    setDimensions({ width: maxWidth, height: maxHeight });
    setIsMeasured(true);
  }, [allTexts]);

  useLayoutEffect(() => {
    measureTexts();

    const handleResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(measureTexts);
    };

    window.addEventListener("resize", handleResize);
    const observer = new ResizeObserver(handleResize);

    if (measureRef.current) observer.observe(measureRef.current);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [measureTexts]);

  useEffect(() => {
    if (activeIndex !== prevIndex) setPrevIndex(activeIndex);
  }, [activeIndex, prevIndex]);

  const enterY = direction === "up" ? "100%" : "-100%";
  const exitY = direction === "up" ? "-100%" : "100%";

  return (
    <span
      ref={containerRef}
      className={className}
      style={{
        display: "inline-block",
        verticalAlign,
        position: "relative",
        width: dimensions.width || "auto",
        height: dimensions.height || "auto",
        minWidth: dimensions.width || undefined,
        lineHeight: 1,
        visibility: isMeasured ? "visible" : "hidden",
        // Remove the CSS transition to prevent delayed resizing
        ...style,
      }}
    >
      {/* Measurement element */}
      <span
        ref={measureRef}
        aria-hidden
        style={{
          position: "absolute",
          left: "-9999px", // Move off-screen instead of display: none
          visibility: "hidden",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          font: "inherit",
          letterSpacing: "inherit",
          lineHeight: "inherit",
          // Include all relevant inherited styles
          paddingLeft: "inherit",
          paddingRight: "inherit",
          borderLeftWidth: "inherit",
          borderRightWidth: "inherit",
          boxSizing: "inherit",
          fontSize: "inherit",
          fontFamily: "inherit",
          fontWeight: "inherit",
          fontStyle: "inherit",
          textTransform: "inherit",
        }}
      />

      <AnimatePresence initial={false}>
        <motion.span
          key={activeIndex}
          initial={{ y: enterY, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: exitY, opacity: 0 }}
          transition={springConfig}
          style={{
            display: "block",
            whiteSpace: "nowrap",
            backfaceVisibility: "hidden",
          }}
        >
          {allTexts[activeIndex]}
        </motion.span>

        {prevIndex !== activeIndex && (
          <motion.span
            key={prevIndex}
            initial={{ y: 0 }}
            animate={{ y: exitY, opacity: 0 }}
            transition={springConfig}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              whiteSpace: "nowrap",
              backfaceVisibility: "hidden",
            }}
          >
            {allTexts[prevIndex]}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
