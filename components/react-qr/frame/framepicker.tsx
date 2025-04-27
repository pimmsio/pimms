import { memo } from "react";
import { FrameChoicesMetadata } from "./frame.decl";
import { PickerChoice } from "./framepickerchoices";
import { cn } from "../../../lib/utils";
import { QrCodesCustomization } from "../../types";

const FRAME_SIZE = 50;

type FramePickerProps<T> = {
  className?: string;
  frame?: FrameChoicesMetadata<T>;
  framesData: FrameChoicesMetadata<T>[];
  size?: number;
  setFrame: (f: FrameChoicesMetadata<T>) => void;
};

function FramePickerComponent<T>({
  className,
  frame,
  framesData,
  size = FRAME_SIZE,
  setFrame,
}: FramePickerProps<T>) {
  return (
    <div className={cn("mb-2 flex flex-wrap gap-2", className)}>
      {framesData.map((f, i) => (
        <PickerChoice
          key={`frame-${i}`}
          onClick={() => setFrame(f)}
          data={f}
          size={size}
          selected={frame === f}
        />
      ))}
    </div>
  );
}

export const FramePicker = memo(
  <T extends QrCodesCustomization>(props: FramePickerProps<T>) => (
    <FramePickerComponent {...props} />
  ),
  (prev, next) =>
    prev.setFrame === next.setFrame && prev.framesData === next.framesData
);
