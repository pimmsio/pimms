import sizeOf from "image-size";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { z } from "zod";
import { convertImage } from "../../../../lib/qr-codes";
import { buildErrorResponse } from "../../../../lib/http/error";
import { resizeAndCropImage } from "../../../../lib/image";
import { storage } from "../../../../lib/storage";

const uploadLogoSchema = z.object({
  logo: z.string(),
});

// PUT /api/qr-codes/logo – upload logo
export const PUT = async (req: Request) => {
  let { logo } = await uploadLogoSchema.parseAsync(await req.json());

  if (!logo) {
    return buildErrorResponse(
      400,
      "Bad request",
      "Please provide a valid logo"
    );
  }

  const res = await fetch(logo);
  if (!res.ok) {
    return buildErrorResponse(400, "Bad request", "Invalid frame URL provided");
  }

  const arrayBuffer = await res.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const { height, width, type: imageType } = sizeOf(bytes);

  if (imageType && !["jpeg", "jpg", "png", "svg"].includes(imageType)) {
    return buildErrorResponse(
      400,
      "Bad request",
      "Image type must be either svg, jpeg, or png"
    );
  }

  try {
    // convert if type is svg to png
    if (imageType === "svg") {
      const buffer = Buffer.from(arrayBuffer);
      const convertBuffer = await convertImage(buffer, "png");
      const resizeBuffer = await resizeAndCropImage(convertBuffer, {
        width,
        height,
      });
      const convertBase64 = `data:image/${imageType};base64,${Buffer.from(
        resizeBuffer
      ).toString("base64")}`;
      const { url } = await storage.upload(`logos/${nanoid()}`, convertBase64, {
        contentType: "image/png",
      });

      return NextResponse.json({ url, height, width, imageType });
    } else {
      const { url } = await storage.upload(`logos/${nanoid()}`, logo);
      return NextResponse.json({ url, height, width, imageType });
    }
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
};
