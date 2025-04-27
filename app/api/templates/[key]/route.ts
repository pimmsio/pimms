import { buildErrorResponse } from "@/lib/http/error";
import { NextRequest, NextResponse } from "next/server";
import { storage } from "../../../../lib/storage";

export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ key: string }> }
) => {
  const { params } = context; // Destructure context to access params
  const { key } = await params;

  console.log("key", key);

  if (!key) {
    return buildErrorResponse(
      400,
      "Invalid Request",
      "Key parameter is required"
    );
  }

  try {
    const path = `frames/${key}`;
    const metadata = await storage.getMetadata(path);

    return NextResponse.json({ key, metadata }, { status: 200 });
  } catch (error) {
    console.log(error);
    return buildErrorResponse(
      500,
      "Server Error",
      "Failed to process the request"
    );
  }
};
