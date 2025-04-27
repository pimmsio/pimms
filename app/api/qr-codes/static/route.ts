import { NextRequest, NextResponse } from "next/server";
import { CreateStaticQRCodesPostRequestBody } from "../../../../components/types";
import {
  createWindow,
  generateStaticQRCode,
  staticQRCodeImage,
} from "../../../../lib/qr-codes";
import { PUBLIC_FRAME_URL } from "../../../constants";
import { buildErrorResponse } from "../../../../lib/http/error";
import cors from "../../../../lib/http/cors";
export const runtime = "nodejs";

export async function OPTIONS(req: NextRequest) {
  return cors(req, new Response("CORS", { status: 200 }));
}

const DEFAULT_FRAME = "W9_euUlC96pDO72w7xqGk";

// POST /v1/qr-codes/static - create a static qr code
export async function POST(req: NextRequest) {
  const reqBody: CreateStaticQRCodesPostRequestBody = await req.json();

  const imageType = reqBody.image_type || "svg";

  if (imageType && !["jpeg", "jpg", "png", "svg"].includes(imageType)) {
    return buildErrorResponse(
      400,
      "Bad request",
      "Image type must be either svg, jpeg, or png"
    );
  }

  // Create SVG Window
  createWindow();

  // fetch frame
  const frameUrl = `${PUBLIC_FRAME_URL}${
    reqBody.customization?.frame || DEFAULT_FRAME
  }`;
  const res = await fetch(frameUrl);
  if (!res.ok) {
    return buildErrorResponse(400, "Bad request", "Invalid frame URL provided");
  }

  const frameSvg = await res.text();

  try {
    // Generate QR code
    const qrcode = await generateStaticQRCode(reqBody, frameSvg);

    const imageResponse = await staticQRCodeImage(qrcode, imageType);

    const contentType =
      imageType === "svg" ? "image/svg+xml" : `image/${imageType}`;

    const response = new NextResponse(imageResponse);
    response.headers.set("content-type", contentType);
    return response;
  } catch (e) {
    console.error(e);
    return buildErrorResponse(
      500,
      "Internal error",
      "Oups, something wrong happen. Please contact the support."
    );
  }
}
