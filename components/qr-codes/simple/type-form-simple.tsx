"use client";

import { Button } from "@react-email/components";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { z } from "zod";
import { useDownload } from "../hooks/useDownload";
import { useQrOptionsContext } from "../qr-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Form } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../ui/form";
import { parseUrl, urlRegex } from "../../../lib/utils";
import { Input } from "../../ui/input";

export function TypeFormSimple({ id }: { id: string }) {
  const t = useTranslations(`generate.${id}`);

  const FormSchema = z.object({
    url: z.string().regex(urlRegex, {
      message: t("form.url.error"),
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      url: "",
    },
    mode: "onChange",
    resolver: zodResolver(FormSchema),
  });

  const { setUrl } = useQrOptionsContext();

  const watchUrl = form.watch("url");
  const parsedUrl = parseUrl(watchUrl);

  useEffect(() => {
    setUrl(parsedUrl);
  }, [parsedUrl, setUrl]);

  const onSubmit = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      download();
    } else {
      form.setFocus("url");
    }
  };

  const { ref: anchorRef, download, loading: loadingDownload } = useDownload();

  return (
    <Form {...form}>
      <div className="mx-auto mb-32 w-full max-w-6xl flex-1 overflow-y-auto sm:mb-0 sm:p-4">
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative flex w-full flex-col items-start sm:space-y-6"
        >
          <div className="flex w-full flex-col space-y-4 p-4 sm:p-0">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full text-center">
                  <FormLabel className="w-full text-lg font-bold">
                    {t("form.url.label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.url.placeholder")}
                      autoComplete="off"
                      type="url"
                      className="mt-2 block h-14 w-full rounded-lg px-5 text-lg outline-none focus:border-transparent focus:outline-none focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </div>
      <a ref={anchorRef} className="hidden" />
      {/* <DialogFooter className="fixed bottom-0 z-50 w-full">
        <div className="mx-auto w-full max-w-6xl p-4">
          <Button
            className="w-full px-12 py-8 text-xl font-semibold"
            type="submit"
            onClick={onSubmit}
            disabled={loadingDownload}
          >
            {loadingDownload && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Téléchargez votre code</span>
          </Button>
        </div>
      </DialogFooter> */}
    </Form>
  );
}
