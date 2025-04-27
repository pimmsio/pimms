import { QRShape, SHAPE_CHOICES } from "@7qr.codes/qr";
import { SVG } from "@svgdotjs/svg.js";
import { LayoutGrid } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { PickerChoice, PickerChoiceSVG } from "./pickerchoices";

const SHAPE_SIZE = 24;
const BORDER_SIZE = 3;

export function ShapePicker({
  isDark = false,
  shape,
  setShape,
}: {
  isDark?: boolean;
  shape: QRShape;
  setShape: (shape: QRShape) => void;
}) {
  const [isClient, setIsClient] = useState(false);
  const currentColor = isDark ? "#ffffff" : "#000000";

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);

  const renderShapeSVG = useCallback(
    (shape: QRShape) => {
      if (!isClient) return null;

      const draw = SVG().size(SHAPE_SIZE, SHAPE_SIZE);

      switch (shape) {
        case "square":
          draw
            .rect(SHAPE_SIZE - BORDER_SIZE, SHAPE_SIZE - BORDER_SIZE)
            .move(BORDER_SIZE / 2, BORDER_SIZE / 2)
            .radius(1) // Rounded corners
            .stroke({
              color: currentColor,
              width: BORDER_SIZE,
            })
            .fill("none");
          break;
        case "circle":
          draw
            .circle(SHAPE_SIZE - BORDER_SIZE)
            .center(SHAPE_SIZE / 2, SHAPE_SIZE / 2)
            .stroke({ color: currentColor, width: BORDER_SIZE })
            .fill("none");
          break;
      }

      return draw;
    },
    [isClient, currentColor],
  );

  const choices = SHAPE_CHOICES.filter((s) => s !== "classic");

  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {choices.map((s) => (
        <PickerChoiceSVG
          key={`${s}-${isDark}`}
          onClick={() => setShape(s)}
          selected={shape === s}
          size={SHAPE_SIZE}
          svg={renderShapeSVG(s)}
        />
      ))}
      <PickerChoice
        key="classic"
        onClick={() => setShape("classic")}
        selected={shape === "classic"}
        icon={<LayoutGrid />}
      />
    </div>
  );
}
