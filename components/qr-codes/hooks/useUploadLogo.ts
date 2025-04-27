import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ACCEPTED_IMAGE_MIME_TYPES } from "../constants";
import { useQrOptionsContext } from "../qr-provider";
import { useFrame } from "./useFrame";
import { UseFormReturn } from "react-hook-form";
import { WEB_URL } from "../../../app/constants";

export const useUploadLogo = (form: UseFormReturn<any>) => {
  const [uploading, setUploading] = useState(false);

  const { frame, updateOption, options } = useQrOptionsContext();
  const fetchFrame = useFrame();

  const updateLogo = useCallback(
    async (url?: string) => {
      console.log("url", url);
      if (!url) {
        updateOption("logo", { logo: undefined });
      } else {
        updateOption("logo", { logo: url });
      }
    },
    [updateOption]
  );

  useEffect(() => {
    if (!frame) {
      return;
    }

    // Fetch the updated frame after the logo update
    fetchFrame(frame);
  }, [options.logo]);

  const handleLogoUpload = useCallback(
    (image: string) => {
      setUploading(true);
      fetch(`${WEB_URL}/api/qr-codes/logo`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ logo: image }),
      })
        .then(async (res) => {
          if (res.status === 200) {
            const resJson = await res.json();

            await updateLogo(resJson.url); // Ensure the update and fetch are awaited
          } else {
            toast.error("Error uploading logo - try again?");
          }
        })
        .finally(() => {
          setUploading(false);
        });
    },
    [updateLogo]
  );

  const logoRef = form.register("logo", {
    required: false,
  });

  const handleOnDrop = (acceptedFiles: FileList | null) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const fileType = ACCEPTED_IMAGE_MIME_TYPES.find((allowedType) =>
        allowedType.types.find((type) => type === acceptedFiles[0].type)
      );

      if (!fileType) {
        updateLogo();
        toast.error("The file type is incorrect");
        return;
      } else {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          handleLogoUpload(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return { ref: logoRef, uploading, handleOnDrop, handleLogoUpload };
};
