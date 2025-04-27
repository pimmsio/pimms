import isEqual from "lodash.isequal";
import { memo, useCallback, useEffect, useState } from "react";
import { FRAME_COLORS_BACKGROUND, QR_COLORS_SOLID } from "./colors";
import { ShowMoreButton } from "./showmore";
import { cn } from "../../lib/utils";

function MixedColorPickerComponent({
  classname,
  colors,
  setColors,
  defaultColor = "#000000",
  maxItemsPerLine = 5,
  translations,
  addFg,
  addBg,
}: {
  classname?: string;
  colors: string[];
  setColors: (colors: string[]) => void;
  defaultColor?: string;
  maxItemsPerLine?: number;
  translations?: {
    more: string;
  };
  addFg?: string;
  addBg?: string;
}) {
  const [showAll, setShowAll] = useState(false);

  const [currentColors, setCurrentcolors] = useState<string[]>(colors);

  const [visibleColors, setVisibleColors] = useState<string[] | undefined>();
  const [backgroundColors, setBackgroundColors] = useState<
    string[] | undefined
  >();

  const refreshColors = useCallback(() => {
    const allColors = showAll
      ? QR_COLORS_SOLID
      : QR_COLORS_SOLID.slice(0, maxItemsPerLine);

    const fgStr = addFg;
    const fg = fgStr ? fgStr.split(",") : undefined;
    const fgColors = new Set<string>();
    fg?.forEach((c) => fgColors.add(c));
    allColors.forEach((c) => fgColors.add(c));

    const visible = Array.from(fgColors.values());
    setVisibleColors(visible);

    const bgStr = addBg;
    const bg = bgStr ? bgStr.split(",") : undefined;
    const bgColors = new Set<string>();

    bg?.forEach((c) => bgColors.add(c));
    FRAME_COLORS_BACKGROUND.forEach((c) => bgColors.add(c));

    const background = Array.from(bgColors.values());
    setBackgroundColors(background);

    setCurrentcolors([
      fg?.[0] || colors[0] || defaultColor,
      fg?.[1] || fg?.[0] || colors[1] || defaultColor,
      bg?.[0] || colors[2] || defaultColor,
    ]);
  }, [defaultColor, showAll, maxItemsPerLine]);

  useEffect(() => {
    refreshColors();
  }, [refreshColors]);

  const handleColorClick = (selectedColor: string) => {
    let newColors = [...currentColors];

    const hasTwoDefaultColors = currentColors.every(
      (color) => color === defaultColor
    );
    const colorIndex = currentColors.indexOf(selectedColor);
    const hasSelectedColor = colorIndex !== -1;

    if (hasTwoDefaultColors) {
      newColors[0] = selectedColor;
    } else if (hasSelectedColor) {
      if (colorIndex === 1) {
        newColors[0] = currentColors[0];
        newColors[1] = defaultColor;
      } else {
        newColors[0] = currentColors[1];
        newColors[1] = defaultColor;
      }
    } else {
      const defaultColorIndex = newColors.findIndex(
        (color) => color === defaultColor
      );

      // If there is a defaultColor in currentColors, replace it with selectedColor
      if (defaultColorIndex === 1 || defaultColorIndex === -1) {
        newColors[1] = selectedColor;
      } else {
        newColors[0] = selectedColor;
        newColors[1] = currentColors[0];
      }
    }

    setCurrentcolors(newColors);
  };

  const handleBackgroundColorClick = (selectedColor: string) => {
    let newColors = [...currentColors];

    newColors[2] = selectedColor;

    setCurrentcolors(newColors);
  };

  useEffect(() => {
    const hasTwoDefaultColors = currentColors.every(
      (color) => color === defaultColor
    );

    if (hasTwoDefaultColors) {
      setColors(currentColors);
    } else if (currentColors[0] === defaultColor) {
      setColors([currentColors[1], currentColors[1], currentColors[2]]);
    } else if (currentColors[1] === defaultColor) {
      setColors([currentColors[0], currentColors[0], currentColors[2]]);
    } else {
      setColors(currentColors);
    }
  }, [currentColors]);

  return (
    <>
      <div className="flex w-full flex-row flex-wrap gap-3 rounded-full">
        {visibleColors?.map((color) => (
          <div
            key={color}
            style={{ background: color }}
            className={cn(
              "h-6 w-6 cursor-pointer rounded-full active:scale-105",
              classname,
              {
                "border-transparent outline-2 outline-offset-2":
                  currentColors[0] === color || currentColors[1] === color,
              }
            )}
            onClick={() => handleColorClick(color)}
          />
        ))}
        <ShowMoreButton
          showAll={showAll}
          setShowAll={setShowAll}
          translations={translations}
        />
      </div>
      {showAll && (
        <>
          <hr />
          <div className="flex w-full flex-row flex-wrap gap-3 rounded-full">
            {backgroundColors?.map((color) => (
              <div
                key={color}
                style={{ background: color }}
                className={cn(
                  "h-6 w-6 cursor-pointer rounded-full active:scale-105",
                  classname,
                  {
                    "border-transparent outline-2 outline-offset-2":
                      currentColors[2] === color,
                  }
                )}
                onClick={() => handleBackgroundColorClick(color)}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export const MixedColorPicker = memo(MixedColorPickerComponent, (prev, next) =>
  isEqual(prev.colors, next.colors)
);
