// middleware.ts
import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const { device } = userAgent(req);

  const isMobile = device.type === "mobile" || device.type === "tablet";

  const slug = pathname.split("/")[1];

  const hardcodedSlug = "a8b7c6d5";

  if (slug !== hardcodedSlug) {
    return NextResponse.next();
  }

  // YouTube video details
  const youtubeVideoId = "V9PVRfjEBTI?si=xlxAEUoVZesHI0Wb";
  const youtubeWebUrl = `https://youtu.be/${youtubeVideoId}`;

  if (isMobile) {
    // For mobile, send the user to an interstitial fallback page
    return NextResponse.redirect(new URL(`/redirect/${slug}`, req.url));
  } else {
    // For desktop, redirect directly to the web URL
    return NextResponse.redirect(youtubeWebUrl);
  }
}

export const config = {
  matcher: "/:path*",
};
