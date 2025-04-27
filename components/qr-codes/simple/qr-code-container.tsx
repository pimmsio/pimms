"use client";

import { useMemo } from "react";
import { useQrOptionsContext } from "../qr-provider";
import QrCodeProvider from "./qr-code-provider";
import { QrFormSimple } from "./qr-form-simple";
import { FrameChoicesMetadata } from "../../react-qr";
import { QrCodesCustomization } from "../../types";
import { nanoid } from "nanoid";

export function QrCodeContainer({
  id,
  frames,
}: {
  id: string;
  frames:
    | Record<string, FrameChoicesMetadata<QrCodesCustomization>[]>
    | undefined;
}) {
  const { options, svg } = useQrOptionsContext();

  const value = useMemo(() => `https://pim.ms/demo-qr?rand=${nanoid()}`, []);

  if (!frames) {
    return;
  }

  return (
    <QrCodeProvider value={value} options={{ ...options }} frame={svg}>
      {(qrBase64: string) => (
        <QrFormSimple id={id} frames={frames} qrBase64={qrBase64} />
      )}
    </QrCodeProvider>
  );
}
