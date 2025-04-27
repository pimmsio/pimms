import { Element, SVG } from "@svgdotjs/svg.js";
import { ReactNode, useCallback, useEffect, useMemo, useRef } from "react";
import { cn } from "../../lib/utils";

interface PickerChoiceProps {
  disabled?: boolean;
  icon: ReactNode;
  onClick?: () => void;
  selected?: boolean;
}

export function PickerChoice({ icon, onClick, selected }: PickerChoiceProps) {
  return (
    <div
      className={cn("cursor-pointer rounded border p-2", {
        "outline-primary-strong border-transparent outline-2": selected,
      })}
      onClick={onClick}
    >
      {icon}
    </div>
  );
}

interface PickerChoiceSvgProps {
  classname?: string;
  disabled?: boolean;
  selected?: boolean;
  size: number;
  svg: Element | null;
  onClick?: () => void;
}

export function PickerChoiceSVG({
  classname,
  selected,
  size,
  svg,
  onClick,
}: PickerChoiceSvgProps) {
  const SVGWrapperRefElement = useRef(null);
  const hasDrawn = useRef(false);

  const isValidSVG = svg && svg.width() && svg.height();

  const SVGContainer = useMemo(() => {
    if (!isValidSVG) {
      return null;
    }
    return SVG().size(svg.width(), svg.height());
  }, [svg, isValidSVG]);

  const draw = useCallback(() => {
    if (!isValidSVG || hasDrawn.current) {
      return;
    }

    SVGContainer?.add(svg);
    hasDrawn.current = true;
  }, [svg, SVGContainer, isValidSVG]);

  useEffect(() => {
    if (!isValidSVG || !SVGWrapperRefElement.current || hasDrawn.current) {
      return;
    }

    SVGContainer?.addTo(SVGWrapperRefElement.current);
  }, [SVGWrapperRefElement, SVGContainer, isValidSVG]);

  useEffect(() => {
    if (!isValidSVG) {
      return;
    }

    draw();
  }, [draw, isValidSVG]);

  if (!isValidSVG) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex cursor-pointer flex-wrap rounded border p-2",
        {
          "border-transparent outline-2": selected,
        },
        classname
      )}
      onClick={onClick}
    >
      <div
        className={`h-[${size}px] w-[${size}px] cursor-pointer rounded-md active:scale-105`}
        ref={SVGWrapperRefElement}
      />
    </div>
  );
}
