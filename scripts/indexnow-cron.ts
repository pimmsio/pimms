import https from "https";
import { pathnames } from "../i18n/pathnames";

const DOMAIN = process.env.NEXT_PUBLIC_WEB_DOMAIN as string;
const INDEXNOW_KEY = process.env.INDEXNOW_KEY as string;

if (!DOMAIN) throw new Error("Missing NEXT_PUBLIC_WEB_DOMAIN in .env");
if (!INDEXNOW_KEY) throw new Error("Missing INDEXNOW_KEY in .env");

const KEY_LOCATION = new URL(`${DOMAIN}/${INDEXNOW_KEY}.txt`).toString();
const today = new Date().toISOString().split("T")[0];
const urlsToSubmit = new Set<string>();

for (const pathname of Object.values(pathnames)) {
  for (const langPath of Object.values(pathname)) {
    if (typeof langPath !== "string" || !langPath.startsWith("/")) continue;
    const lastmod = pathname.lastmod?.split("T")[0];
    if (lastmod === today) {
      console.log(`Submitting ${DOMAIN}${langPath}`);
      urlsToSubmit.add(`${DOMAIN}${langPath}`);
    }
  }
}

if (urlsToSubmit.size === 0) {
  console.log("No URLs to submit today.");
  process.exit(0);
}

const body = JSON.stringify({
  host: new URL(DOMAIN).host,
  key: INDEXNOW_KEY,
  keyLocation: KEY_LOCATION,
  urlList: Array.from(urlsToSubmit),
});

console.log(body);

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
  }
);

req.on("error", (err) => console.error("IndexNow request failed", err));
req.write(body);
req.end();
