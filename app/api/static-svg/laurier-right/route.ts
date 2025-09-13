import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  // Optimized static SVG for right laurier (simplified, no complex gradients)
  const svg = `<svg width="97" height="166" viewBox="0 0 97 166" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-10">
<path d="M62.3369 65.8905C73.2855 52.6181 85.8104 21.0356 48.3212 0.884247L62.3369 65.8905Z" fill="#3970ff"/>
<path d="M62.7178 65.8084C47.2729 58.2266 22.8469 34.6109 48.7021 0.802185L62.7178 65.8084Z" fill="#2fcdfa"/>
<path d="M60.4448 104.686C76.8309 99.4399 104.442 79.6422 83.7985 42.4218L60.4448 104.686Z" fill="#1d4ed8"/>
<path d="M60.8097 104.823C51.9155 90.0949 44.1343 57.0224 84.1633 42.5587L60.8097 104.823Z" fill="#3970ff"/>
<path d="M0.76416 147.5C11.4308 161 39.6642 179.9 67.2642 147.5H0.76416Z" fill="#1e40af"/>
<path d="M0.76416 147.89C11.4308 134.39 39.6642 115.49 67.2642 147.89H0.76416Z" fill="#3970ff"/>
<path d="M37.2304 128.187C52.7793 135.553 86.4671 139.965 96.8271 98.6834L37.2304 128.187Z" fill="#1d4ed8"/>
<path d="M37.4033 128.537C40.9731 111.705 57.8903 82.2412 97 99.0326L37.4033 128.537Z" fill="#3970ff"/>
</svg>`;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
      "ETag": '"laurier-right-v1"',
      "Last-Modified": "Thu, 01 Jan 2024 00:00:00 GMT",
      "X-Content-Type-Options": "nosniff"
    }
  });
}
