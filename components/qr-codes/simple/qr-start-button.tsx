"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { trackEvent } from "@/lib/tracking";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { QR_COOKIES_LIST } from "../constants";

export function QrStartButton({
  id,
  title,
  variant = "default",
}: {
  id: string;
  title?: string;
  variant?: ButtonProps["variant"];
}) {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState<boolean>(false);
  const t = useTranslations(`generate.${id}`);

  const onClick = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();

    const callbackUrl = new URL(window.location.href);
    params.set(
      "callback",
      `${callbackUrl.origin}/generator/${encodeURIComponent(id)}`
    );
    params.set("hook_start", "qr");

    // custom frame key in search param
    const frame = searchParams.get("frame");
    if (frame) {
      params.set("hook_frame", frame);
    }

    setTimeout(() => {
      // window.location.replace(`${WEB_URL}/api/qr-steps?${params.toString()}`);
    }, 200);
  }, []);

  return (
    <Button
      variant={variant}
      className="w-full px-12 py-8 text-xl font-semibold md:w-fit"
      onClick={onClick}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      <span>{title || t("startButton")}</span>
    </Button>
  );
}
