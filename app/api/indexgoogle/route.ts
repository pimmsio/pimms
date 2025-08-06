// app/api/google-indexing-submit/route.ts
import { NextResponse } from "next/server";
import { google } from "googleapis";
import { pathnames } from "@/i18n/pathnames";

export const dynamic = "force-dynamic";

export async function GET() {
  const DOMAIN = process.env.NEXT_PUBLIC_WEB_DOMAIN as string;
  const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL as string;
  const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!DOMAIN || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    throw new Error("Missing required environment variables.");
  }

  console.log(GOOGLE_CLIENT_EMAIL);

  const auth = new google.auth.JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/indexing"]
  });

  await auth.authorize();

  const indexing = google.indexing({ version: "v3", auth });

  const domainWithHttps = `https://${DOMAIN}`;
  const urlsToSubmit = new Set<string>();

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  for (const pathname of Object.values(pathnames)) {
    const lastmod = pathname.lastmod?.split("T")[0];
    if (!lastmod) continue;

    const lastModDate = new Date(lastmod);
    if (lastModDate < oneWeekAgo) continue;

    for (const [lang, langPath] of Object.entries(pathname)) {
      if (typeof langPath !== "string" || !langPath.startsWith("/")) continue;

      const url = `${domainWithHttps}${lang !== "en" ? `/${lang}` : ""}${langPath}`.replace(/\/$/, "");

      urlsToSubmit.add(url);
    }
  }

  if (urlsToSubmit.size === 0) {
    console.log("No URLs to submit this week.");
    return NextResponse.json({ success: true, submitted: 0 });
  }

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  for (const url of urlsToSubmit) {
    try {
      await indexing.urlNotifications.publish({
        requestBody: {
          type: "URL_UPDATED",
          url
        }
      });
      console.log(`Submitted: ${url}`);
      await delay(300);
    } catch (error) {
      console.error(`Error submitting ${url}:`, error);
    }
  }

  return NextResponse.json({ success: true, submitted: urlsToSubmit.size });
}
