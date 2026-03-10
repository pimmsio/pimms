"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, Clock, AlertCircle } from "@/components/icons/custom-icons";
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
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScriptCheckResult | null>(null);

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
    checkScript(url);
  };

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Form Section */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="url" className="block text-base md:text-lg font-semibold text-gray-800 mb-4">
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

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
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
          </div>
        </form>
      </div>

      {/* Results Section */}
      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-8">
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
              <XCircle className="w-6 h-6 md:w-8 md:h-8 text-text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-semibold text-text-primary mb-2">Error checking script</h3>
                <p className="text-sm md:text-base text-text-secondary leading-relaxed">{result.error}</p>
              </div>
            </div>
          ) : result.scriptFound ? (
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-brand-primary/5 border border-brand-primary/20 rounded-xl">
                <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-brand-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-semibold text-text-primary mb-2">Pimms Script Found!</h3>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                    Your site is set up to track conversions from your Pimms links. You&apos;re good to go!
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
                {[
                  { label: "Detection script", found: result.scriptFound },
                  { label: "Form injection script (optional)", found: result.injectFormScriptFound },
                  { label: "Expose script (optional)", found: result.exposeScriptFound },
                ].map((check) => (
                  <div key={check.label} className="flex items-center justify-between gap-3 px-4 md:px-6 py-3 md:py-4">
                    <span className="text-sm md:text-base font-medium text-text-primary">{check.label}</span>
                    {check.found ? (
                      <CheckCircle className="w-5 h-5 text-brand-primary flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-gray-50 border border-gray-200 rounded-xl">
                <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-text-secondary flex-shrink-0 mt-1" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-base md:text-lg font-semibold text-text-primary mb-2">
                    ❌ Pimms Script Not Found
                  </h3>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                    The Pimms analytics script was not detected on your website.
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

                  <div className="text-center pt-4">
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      Need detailed guidance?{" "}
                      <a
                        href={getCanonicalLink(locale, "/articles/introducing-conversion")}
                        className="text-brand-primary hover:text-brand-primary/80 underline font-medium break-words"
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
