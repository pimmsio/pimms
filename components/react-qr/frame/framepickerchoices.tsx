import { PUBLIC_FRAME_THUMBNAIL_URL } from "../../../app/constants";
import { cn } from "../../../lib/utils";
import { FrameChoicesMetadata } from "./frame.decl";

interface PickerChoiceProps<T> {
  data: FrameChoicesMetadata<T>;
  hideLogo?: boolean;
  selected: boolean;
  size: number;
  onClick?: () => void;
}

export const PickerChoice = <T,>({
  data,
  hideLogo,
  selected,
  size,
  onClick,
}: PickerChoiceProps<T>) => {
  return (
    <div
      className={cn(
        `flex w-full cursor-pointer flex-col items-center justify-center rounded-md bg-white p-3 outline-1 outline-zinc-200`,
        { "outline-primary outline-2": selected }
      )}
      onClick={onClick}
    >
      {data.base.key && (
        <img
          src={`${PUBLIC_FRAME_THUMBNAIL_URL}${
            hideLogo ? data.nologo.key : data.base.key
          }`}
          alt="QR code with Frame"
          width={size}
          height={size}
          className={`pointer-events-none h-[${size}px] w-[${size}px] object-contain`}
        />
      )}
    </div>
  );
};
