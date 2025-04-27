"use client";

import { useCallback, useRef, useState } from "react";
import { useQrOptionsContext } from "../qr-provider";
import { WEB_URL } from "../../../app/constants";

export const useDownload = () => {
  const { options, frame, url } = useQrOptionsContext();

  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const download = useCallback((blob: Blob, extension: string) => {
    if (!anchorRef.current) return;
    const data = window.URL.createObjectURL(blob);
    anchorRef.current.href = data;
    anchorRef.current.download = `abcde-qrcode.${extension}`;
    anchorRef.current.click();
  }, []);

  const handleDownload = async () => {
    if (!frame || !url) {
      return;
    }

    setLoading(true);

    const res = await fetch(`${WEB_URL}/api/qr-codes/static`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customization: {
          ...options,
          frame: options.logo
            ? frame.base.key
            : frame.nologo.key || frame.base.key,
        },
        value: url,
        image_type: "png",
      }),
    });

    setLoading(false);

    if (!res.ok || !anchorRef.current) {
      return;
    }

    const blob = await res.blob();

    download(blob, "png");
  };

  return { download: handleDownload, loading, ref: anchorRef };
};
