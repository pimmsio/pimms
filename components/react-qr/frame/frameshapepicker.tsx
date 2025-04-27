import { memo } from "react";
import { FrameMetadata, FrameShapeType } from "./frame.decl";
import { PickerChoice } from "./framepickerchoices";

const FRAME_SIZE = 50;

type FrameShapePickerProps<T> = {
  framesData: { square: FrameMetadata<T>; circle: FrameMetadata<T> };
  shape?: FrameShapeType;
  size?: number;
  setShape: (f: FrameShapeType) => void;
};

function FrameShapePickerComponent<T>({
  framesData,
  shape,
  size = FRAME_SIZE,
  setShape,
}: FrameShapePickerProps<T>) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <PickerChoice<T>
        key={`frame-circle`}
        onClick={() => setShape("circle")}
        data={{ base: framesData.circle, nologo: framesData.circle }}
        size={size}
        selected={shape === "circle"}
      />
      <PickerChoice<T>
        key={`frame-square`}
        onClick={() => setShape("square")}
        data={{ base: framesData.square, nologo: framesData.square }}
        size={size}
        selected={shape === "square"}
      />
    </div>
  );
}

export const FrameShapePicker = memo(
  <T extends unknown>(props: FrameShapePickerProps<T>) => (
    <FrameShapePickerComponent {...props} />
  ),
  (prev, next) =>
    prev.setShape === next.setShape && prev.framesData === next.framesData,
);
