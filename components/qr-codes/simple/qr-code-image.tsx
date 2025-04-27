import Image from "next/image";

import React, { memo } from "react";
import { cn } from "../../../lib/utils";

const QrCodeImageComponent: React.FC<{
  classname?: string;
  size?: number;
  qrBase64?: string;
}> = ({ classname, qrBase64, size }) => {
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
        width={size}
        height={size}
        className={cn(
          "pointer-events-none object-contain duration-500 ease-in-out sm:h-auto",
          classname
        )}
      />
    </div>
  );
};

export const QrCodeImage = memo(
  QrCodeImageComponent,
  (prev, next) => prev.qrBase64 === next.qrBase64
);
