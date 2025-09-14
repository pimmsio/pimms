import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  // Minimal base64 JPEG blur (much smaller than the original 300+ char one)
  const minimalBlur =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2ODApLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgACAkEAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQAGBwgJCgv/xAAtEAACAQMDBgcIAwAAAAAAAAABAgMABAUGEiExQQcTFCJRYXGBkTKhscHw0eHx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAP/xAAhEQACAgEDBQEBAAAAAAAAAAAAAQIRIQMSMXFRYYGR/9oADAMBAAIRAxEAPwD5//2Q==";

  return new NextResponse(minimalBlur, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=31536000, immutable",
      "ETag": '"blur-jpeg-v1"',
      "Last-Modified": "Thu, 01 Jan 2024 00:00:00 GMT"
    }
  });
}
