import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  // Small gray placeholder for smaller logos
  const svg = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" fill="#f3f4f6"/>
</svg>`;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
      "ETag": '"blur-small-v1"',
      "Last-Modified": "Thu, 01 Jan 2024 00:00:00 GMT",
      "X-Content-Type-Options": "nosniff"
    }
  });
}
