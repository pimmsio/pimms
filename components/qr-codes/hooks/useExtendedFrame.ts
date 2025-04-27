import { fetchExtendedFrame } from "@/lib/qr-codes/fetchFrames";

import { useMount } from "ahooks";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FrameChoicesMetadata } from "../../react-qr";
import { QrCodesCustomization } from "../../types";

export const useExtendedFrame = ({
  frames,
}: {
  frames:
    | Record<string, FrameChoicesMetadata<QrCodesCustomization>[]>
    | undefined;
}) => {
  const searchParams = useSearchParams();
  const extendedFrame = searchParams?.get("frame");

  const [loading, setLoading] = useState(!!extendedFrame);
  const [allFrames, setAllFrames] = useState(frames);

  useMount(() => {
    const fetchFrames = async () => {
      if (extendedFrame) {
        setLoading(true);
        try {
          const all = await fetchExtendedFrame(frames, extendedFrame);
          console.log(frames, all);
          setAllFrames(all);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFrames();
  });

  return { frames: allFrames, loading };
};
