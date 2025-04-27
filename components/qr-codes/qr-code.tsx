/* eslint-disable react/display-name */
import { QrCustom, QrCustomOptions } from "@7qr.codes/qr";
import Image from "next/image";

import isEqual from "lodash.isequal";
import React, { memo, useCallback, useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export interface QrCodeProps extends Partial<QrCustomOptions> {
  value: string;
}

const QrCodeComponent: React.FC<
  Omit<QrCodeProps, "frame"> & {
    classname?: string;
    size?: number;
    skeleton: string;
    svg?: string;
  }
> = ({
  classname,
  colors,
  corner,
  level,
  logo,
  patterns,
  svg,
  type,
  value,
  // whitedots,
}) => {
  const [qrBase64, setQrBase64] = useState<string | null>(null);

  const generateQrCode = useCallback(
    (options: Partial<QrCodeProps>) => {
      if (!svg) {
        return;
      }

      const fn = async () => {
        const qrcode = new QrCustom(value, {
          colors,
          corner,
          frame: svg,
          level,
          logo,
          patterns,
          type,
          // whitedots,
          ...options,
        });
        const base64 = await qrcode.getSvgDataUri(true);

        setQrBase64(base64);
      };

      fn();
    },
    [colors, corner, level, logo, patterns, svg, type, value]
  );

  useEffect(() => {
    generateQrCode({});
  }, [generateQrCode]);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center space-x-6 rounded-md leading-none sm:w-auto sm:max-w-96 sm:items-stretch md:max-h-96",
        classname
      )}
    >
      <Image
        src={
          qrBase64 ||
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC"
        }
        alt="QR code with Frame"
        width={400}
        height={400}
        className={cn(
          "pointer-events-none object-contain duration-500 ease-in-out sm:h-auto",
          classname
        )}
      />
    </div>
  );
};

export const QrCode = memo(
  QrCodeComponent,
  (prev, next) =>
    isEqual(prev.colors, next.colors) &&
    prev.corner === next.corner &&
    prev.svg === next.svg &&
    prev.logo === next.logo &&
    isEqual(prev.patterns, next.patterns)
);
