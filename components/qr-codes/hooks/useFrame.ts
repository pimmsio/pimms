import { useCallback } from "react";
import { useQrOptionsContext } from "../qr-provider";
import { FrameChoicesMetadata, FrameDataType } from "../../react-qr";
import { QrCodesCustomization } from "../../types";

export const useFrame = () => {
  const { options, setFrame, setSvg, updateOptions } = useQrOptionsContext();

  return useCallback(
    (frame: FrameChoicesMetadata<QrCodesCustomization>) => {
      const frameData: FrameDataType = {
        base: frame.base.key,
        nologo: frame.nologo.key,
      };

      if (!frameData.nologo || options.logo) {
        setFrame(frame);
        setSvg(frame.base.svg);
        updateOptions(frame.base.metadata as any);
        return;
      }

      setFrame(frame);
      setSvg(frame.nologo.svg);
      updateOptions(frame.nologo.metadata as any);
    },
    [options]
  );
};
