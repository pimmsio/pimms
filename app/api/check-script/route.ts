import { NextRequest, NextResponse } from "next/server";

function scanHtml(html: string) {
  const scriptRegex =
    /<script[^>]*(?:src=["']([^"']*)["'][^>]*)?[^>]*>([\s\S]*?)<\/script>/gi;
  const matches = html.match(scriptRegex) || [];

  let scriptFound = false;
  let scriptUrl: string | undefined;
  let exposeScriptFound = false;
  let injectFormScriptFound = false;

  for (const m of matches) {
    const srcMatch = m.match(/src=["']([^"']*)["']/);
    const src = srcMatch ? srcMatch[1] : "";

    if (src.includes("cdn.pimms.io/analytics/script.detection.js")) {
      scriptFound = true;
      scriptUrl = src;
    }
    if (src.includes("cdn.pimms.io/analytics/script.expose.js")) {
      exposeScriptFound = true;
    }
    if (src.includes("cdn.pimms.io/analytics/script.inject-form.js")) {
      injectFormScriptFound = true;
    }

    if (m.includes("@getpimms/analytics")) scriptFound = true;
  }

  const metaFound =
    /<meta[^>]+name=["']pimms-sdk["'][^>]+content=["']true["'][^>]*>/i.test(html) ||
    /<meta[^>]+content=["']true["'][^>]+name=["']pimms-sdk["'][^>]*>/i.test(html);
  if (metaFound) scriptFound = true;

  return { scriptFound, scriptUrl, exposeScriptFound, injectFormScriptFound };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
  }

  try {
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
      normalizedUrl = "https://" + normalizedUrl;
    }

    const parsedUrl = new URL(normalizedUrl);

    const response = await fetch(parsedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Pimms-Script-Checker/1.0)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      },
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      return NextResponse.json({
        scriptFound: false,
        error: `Failed to fetch webpage: ${response.status} ${response.statusText}. Please check that the URL is accessible.`
      });
    }

    const html = await response.text();
    let { scriptFound, scriptUrl, exposeScriptFound, injectFormScriptFound } = scanHtml(html);

    if (!scriptFound) {
      const wsApiKey = process.env.WEBSCRAPINGAI_API_KEY;
      if (!wsApiKey) throw new Error("WEBSCRAPINGAI_API_KEY not set");

      const wsUrl = `https://api.webscraping.ai/html?api_key=${wsApiKey}&url=${encodeURIComponent(parsedUrl.toString())}&render_js=true&wait=5`;

      const wsResponse = await fetch(wsUrl, {
        headers: {
          Accept: "text/html",
          "User-Agent": "Pimms Checker"
        }
      });

      if (!wsResponse.ok) {
        const errorText = await wsResponse.text();
        console.warn("Webscraping.ai failed:", errorText);
        throw new Error(`Webscraping.ai fetch failed (${wsResponse.status})`);
      }

      const renderedHtml = await wsResponse.text();
      const fallback = scanHtml(renderedHtml);
      scriptFound = scriptFound || fallback.scriptFound;
      scriptUrl = scriptUrl || fallback.scriptUrl;
      exposeScriptFound = exposeScriptFound || fallback.exposeScriptFound;
      injectFormScriptFound = injectFormScriptFound || fallback.injectFormScriptFound;
    }

    return NextResponse.json({
      scriptFound,
      scriptUrl,
      exposeScriptFound,
      injectFormScriptFound,
      error: null
    });
  } catch (error) {
    console.error("Error checking script:", error);

    let errorMessage = "Unknown error occurred";
    if (error instanceof TypeError && error.message.includes("Invalid URL")) {
      errorMessage = "Invalid URL format. Please ensure the URL is correct.";
    } else if (error instanceof DOMException && error.name === "TimeoutError") {
      errorMessage = "Request timeout. The website took too long to respond.";
    } else if (error instanceof TypeError && error.message.includes("fetch")) {
      errorMessage = "Network error. Unable to reach the website.";
    }

    return NextResponse.json({
      scriptFound: false,
      exposeScriptFound: false,
      injectFormScriptFound: false,
      error: errorMessage
    });
  }
}
