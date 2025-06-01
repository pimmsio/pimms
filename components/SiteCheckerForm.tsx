"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, Clock, AlertCircle, Copy, Check } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { getCanonicalLink } from "../lib/utils";
import { useLocale } from "next-intl";
import { H2 } from "./base/h2";

interface ScriptCheckResult {
  scriptFound: boolean;
  scriptUrl?: string;
  exposeScriptFound?: boolean;
  injectFormScriptFound?: boolean;
  error?: string;
  timestamp: Date;
  checkedUrl?: string;
}

export default function SiteCheckerForm() {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlParam = searchParams.get("url");

  const [url, setUrl] = useState(urlParam || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScriptCheckResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Auto-check if URL is provided in params
  useEffect(() => {
    if (urlParam && urlParam !== url) {
      setUrl(urlParam);
      checkScript(urlParam);
    }
  }, [urlParam, url]);

  const checkScript = async (targetUrl: string) => {
    if (!targetUrl) return;

    setLoading(true);

    // Normalize URL with better handling
    let normalizedUrl = targetUrl.trim();

    // Remove trailing slash for consistency
    if (normalizedUrl.endsWith("/") && normalizedUrl.length > 1) {
      normalizedUrl = normalizedUrl.slice(0, -1);
    }

    // Add protocol if missing
    if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
      normalizedUrl = "https://" + normalizedUrl;
    }

    try {
      // Validate URL format before sending to API
      try {
        new URL(normalizedUrl);
      } catch {
        throw new Error("Invalid URL format. Please enter a valid website URL.");
      }

      // Create a proxy request to avoid CORS issues
      const response = await fetch(`/api/check-script?url=${encodeURIComponent(normalizedUrl)}`);
      const data = await response.json();

      setResult({
        scriptFound: data.scriptFound,
        scriptUrl: data.scriptUrl,
        exposeScriptFound: data.exposeScriptFound,
        injectFormScriptFound: data.injectFormScriptFound,
        error: data.error,
        timestamp: new Date(),
        checkedUrl: normalizedUrl
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to check script. Please verify the URL is correct and accessible.";
      setResult({
        scriptFound: false,
        exposeScriptFound: false,
        injectFormScriptFound: false,
        error: errorMessage,
        timestamp: new Date(),
        checkedUrl: normalizedUrl
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Update URL with the search parameter
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("url", url);
    router.push(currentUrl.pathname + currentUrl.search, { scroll: false });

    checkScript(url);
  };

  const copyLinkToResults = () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("url", url);

    navigator.clipboard.writeText(currentUrl.toString()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Form Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="url" className="block text-base md:text-lg font-semibold text-gray-800 mb-3">
              Enter your website URL
            </label>
            <Input
              id="url"
              placeholder="example.com, or https://example.com/specific-page"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full h-12 text-base md:text-lg rounded-full px-6"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Button
              type="submit"
              disabled={loading || !url}
              className="flex-1 h-12 text-base md:text-lg font-semibold rounded-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Clock className="w-4 h-4 md:w-5 md:h-5 mr-2 animate-spin" />
                  <span className="hidden sm:inline">Checking...</span>
                  <span className="sm:hidden">Checking</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Check Script Installation</span>
                  <span className="sm:hidden">Check Script</span>
                </>
              )}
            </Button>

            {result && url && (
              <Button
                type="button"
                variant="outline"
                onClick={copyLinkToResults}
                className="sm:flex-none h-12 text-base md:text-lg rounded-full sm:min-w-[140px]"
                size="lg"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    <span className="hidden sm:inline">Share results</span>
                    <span className="sm:hidden">Share</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Results Section */}
      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
            <H2>Check Results</H2>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <span className="text-xs md:text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full w-fit">
                Last checked: {result.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>

          {result.checkedUrl && (
            <div className="mb-6 p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs md:text-sm text-gray-600 mb-1">Checked URL:</p>
              <p className="text-xs md:text-sm font-mono text-gray-800 break-all leading-relaxed">
                {result.checkedUrl}
              </p>
            </div>
          )}

          {result.error ? (
            <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-gray-50 border border-gray-300 rounded-xl">
              <XCircle className="w-6 h-6 md:w-8 md:h-8 text-[#08272E] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-semibold text-[#08272E] mb-2">Error checking script</h3>
                <p className="text-sm md:text-base text-[#5C5B61] leading-relaxed">{result.error}</p>
              </div>
            </div>
          ) : result.scriptFound ? (
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-[#3970ff]/5 border border-[#3970ff]/20 rounded-xl">
                <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-[#3970ff] flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-semibold text-[#08272E] mb-2">PiMMs Script Found!</h3>
                  <p className="text-sm md:text-base text-[#5C5B61] mb-3 leading-relaxed">
                    Your site is using PiMMs analytics script. Great job! You&apos;re all set to track your important
                    conversions and marketing campaigns.
                  </p>
                  <div className="text-xs md:text-sm text-[#3970ff] mb-2">
                    Script URL:
                    <code className="bg-[#3970ff]/10 px-2 py-1 rounded text-xs break-all">{result.scriptUrl}</code>
                  </div>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="mt-6 space-y-4 md:space-y-6">
                <div className="bg-[#3970ff]/5 border border-[#3970ff]/20 rounded-xl p-4 md:p-6">
                  <h4 className="text-base md:text-lg font-semibold text-[#08272E] mb-3 md:mb-4">
                    What this means for your conversions:
                  </h4>
                  <ul className="text-[#5C5B61] space-y-2 text-xs md:text-sm">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#3970ff] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        Automatically captures the <code className="bg-[#3970ff]/10 px-1 rounded">pimms_id</code> from
                        PiMMs links
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#3970ff] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Tracks conversions when users complete important actions on your site</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#3970ff] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        Records events like checkouts, sign-ups, and payments with the associated PiMMs link campaign
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#3970ff] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        No additional setup required - the script handles everything automatically when implemented
                        correctly
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Optional Scripts Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-6">
                  <h4 className="text-base md:text-lg font-semibold text-[#08272E] mb-3 md:mb-4">Optional Scripts</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      {result.injectFormScriptFound ? (
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#3970ff] mt-0.5 mr-3 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs md:text-sm font-medium text-[#08272E]">
                          Inject Form Script {result.injectFormScriptFound ? "(Found)" : "(Not Found)"}
                        </p>
                        <p className="text-xs text-[#5C5B61] leading-relaxed">
                          Automatically injects tracking ID into forms
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      {result.exposeScriptFound ? (
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#3970ff] mt-0.5 mr-3 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs md:text-sm font-medium text-[#08272E]">
                          Expose Script {result.exposeScriptFound ? "(Found)" : "(Not Found)"}
                        </p>
                        <p className="text-xs text-[#5C5B61] leading-relaxed">
                          Exposes tracking ID to all your urls (for systeme.io funnel tracking)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testing Note */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-6">
                  <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-3">💡 Manual Testing</h4>
                  <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                    To verify the analytics object is working, visit your website and open the browser console. Type{" "}
                    <code className="bg-gray-200 px-2 py-1 rounded text-xs break-all">!!window._pimmsAnalytics</code>{" "}
                    and press Enter. It should return <code className="bg-gray-200 px-1 rounded text-xs">true</code> if
                    the script is working correctly.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-gray-50 border border-gray-200 rounded-xl">
                <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-[#5C5B61] flex-shrink-0 mt-1" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-base md:text-lg font-semibold text-[#08272E] mb-2">❌ PiMMs Script Not Found</h3>
                  <p className="text-sm md:text-base text-[#5C5B61] leading-relaxed">
                    The PiMMs analytics script was not detected on your website.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-8">
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Installation Guide</h4>

                <div className="space-y-6 md:space-y-8">
                  <div>
                    <h5 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
                      Option A — HTML Script Tag (Any Website)
                    </h5>
                    <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">
                      Paste this code inside your{" "}
                      <code className="bg-gray-200 px-2 py-1 rounded text-sm">&lt;head&gt;</code> tag on all pages:
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto">
                      <code className="text-xs md:text-sm font-mono break-all">
                        {`<script defer src="https://cdn.pimms.io/analytics/script.detection.js"></script>`}
                      </code>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
                      Option B — NPM Package (React/Next.js)
                    </h5>
                    <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">
                      Install the package and add the component:
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto">
                      <code className="text-xs md:text-sm font-mono whitespace-pre-line">
                        {`# Install the package
npm install @getpimms/analytics

# Add to your React app
import { Analytics as PimmsAnalytics } from "@getpimms/analytics"

<PimmsAnalytics />`}
                      </code>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 md:p-6">
                    <h6 className="text-base md:text-lg font-semibold text-[#08272E] mb-3">
                      💡 Testing Your Installation
                    </h6>
                    <p className="text-[#5C5B61] text-xs md:text-sm leading-relaxed">
                      After installing, you can use this tool to automatically verify your setup, or manually check by
                      opening your browser console and typing{" "}
                      <code className="bg-gray-200 px-2 py-1 rounded text-xs break-all">window._pimmsAnalytics</code>.
                      You should see configuration values if everything is working correctly.
                    </p>
                  </div>

                  <div className="text-center pt-4">
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      Need detailed guidance?{" "}
                      <a
                        href={getCanonicalLink(locale, "/articles/introducing-conversion")}
                        className="text-[#3970ff] hover:text-[#3970ff]/80 underline font-medium break-words"
                      >
                        Read our complete conversion tracking setup guide
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
