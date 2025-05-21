// app/api/indexnow-submit/route.ts
import { NextResponse } from "next/server";
import https from "https";
import { pathnames } from "@/i18n/pathnames";

export const dynamic = "force-dynamic";

export async function GET() {
  const DOMAIN = process.env.NEXT_PUBLIC_WEB_DOMAIN as string;
  const INDEXNOW_KEY = process.env.INDEXNOW_KEY as string;

  if (!DOMAIN) throw new Error("Missing NEXT_PUBLIC_WEB_DOMAIN in .env");
  if (!INDEXNOW_KEY) throw new Error("Missing INDEXNOW_KEY in .env");

  const domainWithHttps = `https://${DOMAIN}`;
  const KEY_LOCATION = new URL(
    `${domainWithHttps}/${INDEXNOW_KEY}.txt`
  ).toString();

  const today = new Date().toISOString().split("T")[0];
  const urlsToSubmit = new Set<string>();

  for (const pathname of Object.values(pathnames)) {
    for (const [lang, langPath] of Object.entries(pathname)) {
      if (typeof langPath !== "string" || !langPath.startsWith("/")) continue;
      const lastmod = pathname.lastmod?.split("T")[0];
      if (lastmod === today) {
        try {
          const url = new URL(
            `${domainWithHttps}${lang !== "en" ? `/${lang}` : ""}${langPath}`
          )
            .toString()
            .replace(/\/$/, "");

          console.log(`Submitting ${url} for lang ${lang}`);
          urlsToSubmit.add(url);
        } catch (error) {
          console.error(`Error submitting ${langPath} for lang ${lang}`, error);
        }
      }
    }
  }

  if (urlsToSubmit.size === 0) {
    console.log("No URLs to submit today.");
    return NextResponse.json({ success: true, submitted: 0 });
  }

  const body = JSON.stringify({
    host: new URL(domainWithHttps).host,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: Array.from(urlsToSubmit),
  });

  await new Promise<void>((resolve, reject) => {
    const req = https.request(
      "https://api.indexnow.org/indexnow",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body).toString(),
        },
      },
      (res) => {
        console.log(`Status: ${res.statusCode}`);
        res.on("data", (chunk) => console.log(chunk.toString()));
        res.on("end", resolve);
      }
    );

    req.on("error", (err) => {
      console.error("IndexNow request failed", err);
      reject(err);
    });

    req.write(body);
    req.end();
  });

  return NextResponse.json({ success: true, submitted: urlsToSubmit.size });
}
