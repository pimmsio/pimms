import cors from "@/lib/http/cors";
import { buildErrorResponse } from "@/lib/http/error";
import sizeOf from "image-size";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { storage } from "../../../lib/storage";
import { WEB_URL } from "../../constants";

const QRPatternWithScaleSchema = z.object({
  name: z.string(),
  scale: z.number(),
});

const QRCodesCustomizationSchema = z.object({
  colors: z.array(z.string()),
  corner: z.string(),
  id: z.string().optional(),
  level: z.string(),
  logo: z.string().optional(),
  patterns: z.array(QRPatternWithScaleSchema),
  type: z.number(),
  whitedots: z.boolean().optional(),
});

const uploadTemplateSchema = z.object({
  frame: z.string(),
  metadata: QRCodesCustomizationSchema,
  key: z.string().optional(),
});

export async function OPTIONS(req: NextRequest) {
  return cors(req, new Response("CORS", { status: 200 }));
}

// PUT /v1/templates – upload frame template
export const PUT = async (req: Request) => {
  let {
    frame,
    metadata,
    key: inputKey,
  } = await uploadTemplateSchema.parseAsync(await req.json());

  if (!frame) {
    return buildErrorResponse(
      400,
      "Bad request",
      "Please provide a valid frame"
    );
  }

  const res = await fetch(frame);
  if (!res.ok) {
    return buildErrorResponse(400, "Bad request", "Invalid frame URL provided");
  }

  const arrayBuffer = await res.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const { type: imageType } = sizeOf(bytes);

  if (imageType && !["svg"].includes(imageType)) {
    return buildErrorResponse(400, "Bad request", "Image type must be a svg");
  }

  try {
    // Store template
    const key = inputKey || nanoid();

    const convertBase64 = `data:image/${imageType};base64,${Buffer.from(
      arrayBuffer
    ).toString("base64")}`;
    const { url } = await storage.upload(`frames/${key}`, convertBase64, {
      contentType: "image/svg+xml",
      metadata: {
        customization: JSON.stringify({ ...metadata, version: "1.0" }),
      },
    });

    console.log(url);

    // Generate thumbnail
    const resThumb = await fetch(`${WEB_URL}/api/qr-codes/static`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customization: {
          frame: key,
          ...metadata,
        },
        value: "https://7qr.codes",
        image_type: "png",
      }),
    });

    if (!resThumb.ok) {
      return buildErrorResponse(
        500,
        "Internal error",
        "Oups, something wrong happen. Please contact the support."
      );
    }

    const arrayBufferThumb = await resThumb.arrayBuffer();
    const convertBase64Thumb = `data:image/${imageType};base64,${Buffer.from(
      arrayBufferThumb
    ).toString("base64")}`;
    await storage.upload(`frames/thumbnails/${key}`, convertBase64Thumb, {
      contentType: "image/png",
    });

    return NextResponse.json({ key });
  } catch (error: any) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
};
