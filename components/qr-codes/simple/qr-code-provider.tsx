import { QrCustom, QrCustomOptions } from "@7qr.codes/qr";
import { useEffect, useState } from "react";

const QrCodeProvider = ({
  children,
  frame,
  options,
  value,
}: {
  children: any;
  frame: string | undefined;
  options: Omit<QrCustomOptions, "frame">;
  value: string;
}) => {
  const [qrBase64, setQrBase64] = useState<string>();

  useEffect(() => {
    if (!frame) {
      return;
    }

    const generateQrCode = async () => {
      const qrcode = new QrCustom(value, { ...options, frame });
      const base64 = await qrcode.getSvgDataUri(true);
      setQrBase64(base64);
    };

    generateQrCode();
  }, [value, options, frame]);

  return children(qrBase64);
};

export default QrCodeProvider;
