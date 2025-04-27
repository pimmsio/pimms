import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStepper } from "@/components/ui/stepper";
import { useMount } from "ahooks";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import * as z from "zod";
import { useQrOptionsContext } from "../qr-provider";
import { QrCodeImage } from "./qr-code-image";
import { useMediaQuery } from "../../../hooks/use-media-query";
import { cn } from "../../../lib/utils";
import { FrameChoicesMetadata, FramePicker } from "../../react-qr";
import { QrCodesCustomization } from "../../types";
import Dropzone from "../components/dropzone";
import { useFrame } from "../hooks/useFrame";
import { useUploadLogo } from "../hooks/useUploadLogo";
import { useForm, Form } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

export const optionalString = () => z.string().optional().or(z.literal(""));

export function QrFormSimple({
  id,
  frames,
  qrBase64,
}: {
  id: string;
  frames: Record<string, FrameChoicesMetadata<QrCodesCustomization>[]>;
  qrBase64: string | null;
}) {
  const { isMobile } = useMediaQuery();
  const t = useTranslations(`generate.${id}`);

  const FormSchema = z.object({
    website: optionalString(),
    organization: optionalString(),
    logo: z.any().optional(),
    social_media: z
      .object({
        facebook: optionalString(),
        instagram: optionalString(),
      })
      .optional(),
    brand: z
      .object({
        logo: optionalString(),
        screenshotUrl: optionalString(),
      })
      .optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      website: "",
      organization: "",
      logo: undefined,
      social_media: {
        facebook: "",
        instagram: "",
      },
      brand: {
        logo: "",
        screenshotUrl: "",
      },
    },
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
  });

  const logo = form.watch("brand.logo") || "";

  const { options, updateOption, frame } = useQrOptionsContext();
  const {
    ref: logoRef,
    uploading,
    handleOnDrop,
    handleLogoUpload,
  } = useUploadLogo(form);
  const fetchFrame = useFrame();
  useMount(() => {
    fetchFrame(frames.circle[0]);
  });

  const handleMore = () => {
    setTimeout(() => {
      window.open("https://1lz8g1po93h.typeform.com/to/c5XDUYPu", "_blank");
    }, 200);
  };

  const [openPopover, setOpenPopover] = useState(false);

  const onSubmit = async () => {
    if (isMobile) {
      setOpenPopover(false);
    }
  };

  const { nextStep } = useStepper();

  const handleNextStep = useCallback(() => {
    nextStep();
  }, []);

  const nextButton = (
    <Button
      className="w-full px-12 py-8 text-xl font-semibold"
      onClick={handleNextStep}
    >
      <span>{t("form.next")}</span>
    </Button>
  );

  const preview = (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-8 p-6 sm:rounded-3xl",
        {
          "sticky top-0 z-10 bg-zinc-100": !isMobile,
        }
      )}
    >
      <h3 className="text-lg font-medium">{t("form.preview")}</h3>

      <div className="relative">
        {!options.logo && (
          <Image
            src="/qr-code-here.png"
            width={200}
            height={100}
            alt="votre logo ici"
            className="absolute bottom-40 left-28 z-40"
          />
        )}
        {qrBase64 && (
          <QrCodeImage
            qrBase64={qrBase64}
            size={300}
            classname="h-64 w-64 min-w-64 max-w-64"
          />
        )}
      </div>
      <Button
        variant="secondary"
        className="w-full gap-4 px-2 py-8 text-xl font-semibold"
        onClick={handleMore}
        type="button"
      >
        {t("form.submit.title")}
        <ExternalLink />
      </Button>
      {isMobile && nextButton}
    </div>
  );

  useEffect(() => {
    if (!logo) {
      return;
    }

    handleLogoUpload(logo);
  }, [logo]);

  return (
    <Form {...form}>
      <div className="mx-auto mb-32 w-full max-w-6xl flex-1 overflow-y-auto sm:mb-0 sm:p-4">
        <div className="grid w-full gap-8 md:grid-cols-2 md:items-start">
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative flex w-full flex-col items-start sm:space-y-6"
          >
            <div className="flex w-full flex-col gap-4 bg-[#EBF8FE] p-4 sm:rounded-3xl">
              <div className="mt-4 flex w-full flex-col space-y-4">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="w-full text-center">
                      <FormLabel className="w-full text-lg font-semibold">
                        {t("form.website.label")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("form.website.placeholder")}
                          autoComplete="off"
                          type="website"
                          className="hidden"
                          {...field}
                        />
                      </FormControl>
                      {/* <GoogleSearch
                        handleBusinessSelected={handleBusinessSelected}
                        id={id}
                        ref={googleSearchRef}
                      /> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo}
                  alt={"Logo"}
                  className="h-12 w-12 object-contain"
                />
              )}
              <div className="flex w-full flex-col space-y-4">
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem className="w-full text-center">
                      <FormLabel className="w-full text-lg font-semibold">
                        {t("form.logo.label")}
                      </FormLabel>
                      <FormControl>
                        <Dropzone
                          {...field}
                          {...logoRef}
                          handleOnDrop={handleOnDrop}
                          uploading={uploading}
                          id={id}
                          dropMessage={t("form.logo.dropMessage")}
                          dropButton={t("form.logo.dropButton")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <p className="text-md text-center font-normal">
                {t("form.logo.display.title")}
              </p>
              <FramePicker
                {...{
                  className: "grid grid-cols-2 gap-4",
                  framesData: frames.circle,
                  frame,
                  setFrame: fetchFrame,
                  size: 120,
                }}
              />
            </div>
          </form>
          {!isMobile && preview}
        </div>
      </div>
      {/* {isMobile ? (
        <DialogFooter className="fixed bottom-0 z-50 w-full">
          <Popover
            content={preview}
            openPopover={openPopover}
            setOpenPopover={setOpenPopover}
            mobileOnly
          >
            <div className="bg-white p-4">
              <Button
                className="w-full px-12 py-8 text-xl font-semibold"
                onClick={() => setOpenPopover(true)}
              >
                <span>{t("form.submit.preview")}</span>
              </Button>
            </div>
          </Popover>
        </DialogFooter>
      ) : (
        <DialogFooter className="fixed bottom-0 z-50 w-full">
          <div className="mx-auto w-full max-w-6xl p-4">{nextButton}</div>
        </DialogFooter>
      )} */}
    </Form>
  );
}
