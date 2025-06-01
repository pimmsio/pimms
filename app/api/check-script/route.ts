import { NextRequest, NextResponse } from "next/server";

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
    console.log(`Checking script for URL: ${parsedUrl.toString()}`);

    const response = await fetch(parsedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PiMMs-Script-Checker/1.0)",
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

    // Extract all script tags and their sources
    const scriptRegex = /<script[^>]*(?:src=["']([^"']*)["'][^>]*)?[^>]*>(.*?)<\/script>/gi;
    const scripts: { src?: string; content: string }[] = [];

    const scriptMatches = html.match(scriptRegex) || [];

    for (const scriptMatch of scriptMatches) {
      const srcMatch = scriptMatch.match(/src=["']([^"']*)["']/);
      const contentMatch = scriptMatch.match(/<script[^>]*>(.*?)<\/script>/i);

      scripts.push({
        src: srcMatch ? srcMatch[1] : undefined,
        content: contentMatch ? contentMatch[1] : ""
      });
    }

    let scriptFound = false;
    let scriptUrl = undefined;
    let exposeScriptFound = false;
    let injectFormScriptFound = false;

    for (const script of scripts) {
      if (script.src) {
        if (script.src.includes("cdn.pimms.io/analytics/script.detection.js")) {
          scriptFound = true;
          scriptUrl = script.src;
        }
        if (script.src.includes("cdn.pimms.io/analytics/script.expose.js")) {
          exposeScriptFound = true;
        }
        if (script.src.includes("cdn.pimms.io/analytics/script.inject-form.js")) {
          injectFormScriptFound = true;
        }
      }

      if (script.content && script.content.includes("@getpimms/analytics")) {
        scriptFound = true;
      }
    }

    const metaTagFound = /<meta\s+name=["']pimms-sdk["']\s+content=["']true["']\s*\/?>/i.test(html);
    if (metaTagFound) scriptFound = true;

    // Fallback: Use Browserless if not found
    // Si le script n'est pas trouvé, utilisation de Browserless
    if (!scriptFound) {
      const wsApiKey = process.env.WEBSCRAPINGAI_API_KEY;
      if (!wsApiKey) throw new Error("WEBSCRAPINGAI_API_KEY not set");

      const wsUrl = `https://api.webscraping.ai/html?api_key=${wsApiKey}&url=${encodeURIComponent(parsedUrl.toString())}&render_js=true&wait=5`;

      const wsResponse = await fetch(wsUrl, {
        headers: {
          Accept: "text/html",
          "User-Agent": "PiMMs Checker"
        }
      });

      if (!wsResponse.ok) {
        const errorText = await wsResponse.text();
        console.warn("Webscraping.ai failed:", errorText);
        throw new Error(`Webscraping.ai fetch failed (${wsResponse.status})`);
      }

      const renderedHtml = await wsResponse.text();
      const metaTagFound = /<meta\s+name=["']pimms-sdk["']\s+content=["']true["']\s*\/?>/i.test(renderedHtml);
      if (metaTagFound) scriptFound = true;
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
