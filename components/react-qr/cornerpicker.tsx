import {
  CORNER_CHOICES,
  CornerType,
  corner1,
  corner10,
  corner2,
  corner3,
  corner4,
  corner5,
  corner6,
  corner7,
  corner8,
  corner9,
} from "@7qr.codes/qr";
import { SVG } from "@svgdotjs/svg.js";
import { memo, useCallback, useEffect, useState } from "react";
import { PickerChoiceSVG } from "./pickerchoices";
import { ShowMoreButton } from "./showmore";

const CORNER_SIZE = 24;

function CornerPickerComponent({
  corner,
  isDark = false,
  maxItemsPerLine = 5,
  setCorner,
}: {
  corner: CornerType;
  isDark?: boolean;
  maxItemsPerLine?: number;
  setCorner: (corner: CornerType) => void;
}) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);

  const getCornerSVG = useCallback(
    (corner: string) => {
      if (!isClient) return null;

      const svg = SVG(corner).size(CORNER_SIZE, CORNER_SIZE);
      svg.fill("#08272E");

      return svg;
    },
    [isClient, isDark],
  );

  const renderCornerSVG = useCallback(
    (corner: CornerType) => {
      switch (corner) {
        default:
        case "corner1":
          return getCornerSVG(corner1);
        case "corner2":
          return getCornerSVG(corner2);
        case "corner3":
          return getCornerSVG(corner3);
        case "corner4":
          return getCornerSVG(corner4);
        case "corner5":
          return getCornerSVG(corner5);
        case "corner6":
          return getCornerSVG(corner6);
        case "corner7":
          return getCornerSVG(corner7);
        case "corner8":
          return getCornerSVG(corner8);
        case "corner9":
          return getCornerSVG(corner9);
        case "corner10":
          return getCornerSVG(corner10);
      }
    },
    [getCornerSVG],
  );

  const [showAll, setShowAll] = useState(false);

  const choices = CORNER_CHOICES.filter((s) => s !== "corner1");
  const visibleChoices = showAll ? choices : choices.slice(0, maxItemsPerLine);

  const handleCornerClick = (selectedCorner: CornerType) => {
    if (corner === selectedCorner) {
      setCorner("corner1");
      return;
    }

    setCorner(selectedCorner);
  };

  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {visibleChoices.map((s) => (
        <PickerChoiceSVG
          key={`${s}-${isDark}`}
          onClick={() => handleCornerClick(s)}
          size={CORNER_SIZE}
          svg={renderCornerSVG(s)}
        />
      ))}
      {CORNER_CHOICES.length > maxItemsPerLine && (
        <ShowMoreButton showAll={showAll} setShowAll={setShowAll} />
      )}
    </div>
  );
}

export const CornerPicker = memo(
  CornerPickerComponent,
  (prev, next) => prev.corner === next.corner,
);
