import { Input } from "@/components/ui/input";
import { Loader2, UploadCloud } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { ChangeEvent, useRef } from "react";
import { useQrOptionsContext } from "../qr-provider";
import { useMediaQuery } from "../../../hooks/use-media-query";
import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils";

interface DropzoneProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  classNameWrapper?: string;
  className?: string;
  dropMessage: string;
  dropButton: string;
  id: string;
  uploading: boolean;
  handleOnDrop: (acceptedFiles: FileList | null) => void;
}

const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
  (
    {
      className,
      classNameWrapper,
      dropMessage,
      dropButton,
      id,
      uploading,
      handleOnDrop,
      ...props
    },
    ref
  ) => {
    const t = useTranslations(`generate.${id}.form.logo.dropzone`);
    const { isMobile } = useMediaQuery();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { options } = useQrOptionsContext();

    // Function to handle file input change
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      handleOnDrop(e.target.files);
    };

    // Function to simulate a click on the file input element
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (inputRef.current) {
        inputRef.current.click();
      }
    };

    const handleDropzoneClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (inputRef.current) {
        inputRef.current.click();
      }
    };

    const logo = options.logo ? (
      <div className="relative h-6 w-auto">
        <Image
          src={options.logo}
          alt="logo"
          height={0}
          width={0}
          sizes="100vw"
          className="h-6 w-full object-cover"
        />
      </div>
    ) : null;

    if (isMobile) {
      return (
        <div ref={ref} className="flex flex-col items-center gap-2">
          <Button
            onClick={handleButtonClick}
            className="w-full px-12 py-8 text-xl font-semibold"
            variant="secondary"
            size="lg"
          >
            {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>{t("button")}</span>
          </Button>
          <small>{t("format")}</small>
          <Input
            {...props}
            value={undefined}
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleInputChange}
          />
          {logo}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          `border-2 border-dashed bg-white hover:cursor-pointer`,
          classNameWrapper
        )}
      >
        <div
          className="flex flex-col items-center justify-center space-y-2 p-4"
          onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            const { files } = e.dataTransfer;
            if (inputRef.current) {
              inputRef.current.files = files;
              handleOnDrop(files);
            }
          }}
          onClick={handleDropzoneClick}
        >
          {uploading ? (
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          ) : options.logo ? (
            logo
          ) : (
            <UploadCloud className="mr-2 flex h-8 w-8 flex-shrink-0" />
          )}

          <div className="flex items-center justify-center gap-2">
            <span className="text-md font-medium [text-wrap:balance]">
              {t("description")}
            </span>
            <Input
              {...props}
              value={undefined}
              ref={inputRef}
              type="file"
              className={cn("hidden", className)}
              onChange={handleInputChange}
            />
          </div>
          <small>{t("format")}</small>
        </div>
      </div>
    );
  }
);

export default Dropzone;
