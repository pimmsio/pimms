import { CornerType } from "@7qr.codes/qr";
import { useEffect } from "react";
import { useQrOptionsContext } from "../qr-provider";

const useFrameMetadata = () => {
  const { frame, updateOption, options } = useQrOptionsContext();

  useEffect(() => {
    if (!frame) {
      return;
    }

    let metadata = frame.nologo.metadata;
    if (!frame.nologo || options.logo) {
      metadata = frame.base.metadata;
    }

    if (!metadata) {
      return;
    }

    if (metadata.corner) {
      updateOption("corner", { corner: metadata.corner as CornerType });
    }

    if (metadata.colors) {
      updateOption("colors", { colors: metadata.colors });
    }

    if (metadata.patterns?.[0]) {
      updateOption("patterns", { patterns: metadata.patterns[0] as any });
    }
  }, [frame]);
};

export default useFrameMetadata;
