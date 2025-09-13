import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  // Simple gray placeholder rectangle
  const svg = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="64" height="64" fill="#f3f4f6"/>
</svg>`;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
      "ETag": '"blur-rect-v1"',
      "Last-Modified": "Thu, 01 Jan 2024 00:00:00 GMT",
      "X-Content-Type-Options": "nosniff"
    }
  });
}
