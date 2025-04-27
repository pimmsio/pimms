import { useLocale } from "next-intl";
import { useCallback, useState } from "react";
import { useQrOptionsContext } from "../qr-provider";
import { parseUrl } from "../../../lib/utils";
import { WEB_URL } from "../../../app/constants";

export const useSubmit = (backhalf?: string) => {
  const locale = useLocale();

  const [submitting, setSubmitting] = useState<boolean>(false);

  const { frame, options } = useQrOptionsContext();

  const redirectUrl = useCallback(
    (url: string | undefined) => {
      if (!locale) {
        return;
      }

      const params = new URLSearchParams();

      const callbackUrl = new URL(window.location.href);
      params.set("auth_callback", callbackUrl.origin + callbackUrl.pathname);
      params.set("locale", locale);

      if (url) {
        params.set("hook_url", url);
        params.set("hook_type", "qr");

        if (backhalf) params.set("hook_backhalf", backhalf);
        if (options.colors) params.set("hook_colors", options.colors.join(","));
        if (options.corner) params.set("hook_corner", options.corner);
        if (frame)
          params.set(
            "hook_frame",
            options.logo ? frame.base.key : frame.nologo.key || frame.base.key
          );
        if (options.logo) params.set("hook_logo", options.logo);
        if (options.patterns) {
          params.set("hook_patterns", JSON.stringify(options.patterns));
        }
        // if (options.whitedots !== undefined) {
        //   params.set("hook_whitedots", options.whitedots ? "true" : "false");
        // }
      }

      return `${WEB_URL}/api/start?${params.toString()}`;
    },
    [
      backhalf,
      frame,
      locale,
      options.colors,
      options.corner,
      options.logo,
      options.patterns,
    ]
  );

  const onSubmit = (data: any) => {
    const parsedUrl = parseUrl(data.url);
    if (!frame?.base) {
      return;
    }

    setSubmitting(true);

    const redirect = redirectUrl(parsedUrl);

    if (!redirect) {
      return;
    }

    setTimeout(() => {
      window.location.replace(redirect);
    }, 200);
  };

  return { submitting, onSubmit };
};
