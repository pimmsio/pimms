import { QrCustom, QrCustomOptions } from "@7qr.codes/qr";
import React, { useEffect, useState } from "react";

export interface QrCodeProps extends Partial<QrCustomOptions> {
  value: string;
}

export const QrCode: React.FC<QrCodeProps & { size?: number }> = ({
  size = 400,
  value,
  colors,
  corner,
  level,
  logo,
  patterns,
  frame,
  type,
}) => {
  const [qrBase64, setQrBase64] = useState<string | null>(null);
  const [displaySize, setDisplaySize] = useState<{
    width: number;
    height: number;
  }>({ width: size, height: size });

  useEffect(() => {
    const generateQrCode = async () => {
      if (!frame) {
        return;
      }

      const qrcode = new QrCustom(value, {
        colors,
        corner,
        level,
        logo,
        patterns,
        frame,
        type,
      });
      const base64 = await qrcode.getSvgDataUri();
      const dimensions = await qrcode.getDimensions();

      // Maintain aspect ratio based on the maximum size constraint
      const aspectRatio = dimensions.width / dimensions.height;
      let width, height;

      if (dimensions.width > dimensions.height) {
        width = Math.min(size, dimensions.width);
        height = width / aspectRatio;
      } else {
        height = Math.min(size, dimensions.height);
        width = height * aspectRatio;
      }

      setDisplaySize({ width, height });
      setQrBase64(base64);
    };

    generateQrCode();
  }, [colors, corner, frame, level, logo, patterns, type, value, size]);

  return qrBase64 ? (
    <img
      src={qrBase64}
      alt="QR code"
      width={displaySize.width}
      height={displaySize.height}
      className={`h-[${displaySize.height}px] w-[${displaySize.width}px] pointer-events-none`}
      style={{ maxWidth: "100%", height: "auto" }} // Ensure it's responsive
    />
  ) : null;
};
