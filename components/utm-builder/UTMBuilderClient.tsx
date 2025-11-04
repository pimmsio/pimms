"use client";

import { useState, useEffect } from "react";
import { UTMFormInputs } from "./UTMFormInputs";
import { UTMResult } from "./UTMResult";

export function UTMBuilderClient() {
  // Form state
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");

  // Generated URL state
  const [generatedUrl, setGeneratedUrl] = useState("");

  // Generate UTM URL whenever inputs change
  useEffect(() => {
    if (!url) {
      setGeneratedUrl("");
      return;
    }

    try {
      // Normalize URL
      let normalizedUrl = url.trim();
      if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
        normalizedUrl = "https://" + normalizedUrl;
      }

      const urlObj = new URL(normalizedUrl);
      const params = new URLSearchParams(urlObj.search);

      // Add UTM parameters if they exist
      if (source) params.set("utm_source", source.toLowerCase().trim().replace(/\s+/g, "-"));
      if (medium) params.set("utm_medium", medium.toLowerCase().trim().replace(/\s+/g, "-"));
      if (campaign) params.set("utm_campaign", campaign.toLowerCase().trim().replace(/\s+/g, "-"));
      if (term) params.set("utm_term", term.toLowerCase().trim().replace(/\s+/g, "-"));
      if (content) params.set("utm_content", content.toLowerCase().trim().replace(/\s+/g, "-"));

      // Build final URL
      const finalUrl = `${urlObj.origin}${urlObj.pathname}${params.toString() ? "?" + params.toString() : ""}`;
      setGeneratedUrl(finalUrl);
    } catch {
      setGeneratedUrl("");
    }
  }, [url, source, medium, campaign, term, content]);

  return (
    <div className="space-y-8">
      <UTMFormInputs
        url={url}
        source={source}
        medium={medium}
        campaign={campaign}
        term={term}
        content={content}
        onUrlChange={setUrl}
        onSourceChange={setSource}
        onMediumChange={setMedium}
        onCampaignChange={setCampaign}
        onTermChange={setTerm}
        onContentChange={setContent}
      />

      <UTMResult generatedUrl={generatedUrl} />
    </div>
  );
}

