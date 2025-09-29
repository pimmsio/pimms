import { getAvatarSvgCached } from "@/lib/avatarPool";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest, { params }: { params: Promise<{ seed: string }> }) {
  try {
    const { seed } = await params;

    if (!seed) {
      return new NextResponse("Seed parameter is required", { status: 400 });
    }

    // Check for conditional requests (304 Not Modified)
    const ifNoneMatch = request.headers.get("if-none-match");
    const etag = `"avatar-${seed}"`;

    if (ifNoneMatch === etag) {
      return new NextResponse(null, { status: 304 });
    }

    // Generate the avatar SVG
    const avatarSvg = getAvatarSvgCached(seed);

    // Return SVG with optimized headers for maximum caching
    return new NextResponse(avatarSvg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable", // Cache for 1 year in browser
        "CDN-Cache-Control": "public, s-maxage=31536000",
        "Vercel-CDN-Cache-Control": "public, s-maxage=31536000",
        "Vary": "Accept-Encoding",
        "ETag": `"avatar-${seed}"`, // Enable conditional requests
        "Last-Modified": "Thu, 01 Jan 2024 00:00:00 GMT", // Static date for immutable content
        "X-Content-Type-Options": "nosniff"
      }
    });
  } catch (error) {
    console.error("Error generating avatar:", error);
    return new NextResponse("Error generating avatar", { status: 500 });
  }
}
