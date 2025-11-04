"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle, ExternalLink } from "@/components/icons/custom-icons";
import { useLocale } from "next-intl";
import { APP_URL } from "../../app/constants";

interface UTMResultProps {
  generatedUrl: string;
}

export function UTMResult({ generatedUrl }: UTMResultProps) {
  const locale = useLocale();
  const isEn = locale === "en";
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    if (!generatedUrl) return;

    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleCreateShortLink = () => {
    // Open registration page with the URL as a parameter
    const registerUrl = `${APP_URL}/${locale}/register${generatedUrl ? `?url=${encodeURIComponent(generatedUrl)}` : ""}`;
    window.open(registerUrl, "_blank");
  };

  if (!generatedUrl) return null;

  return (
    <div className="bg-gradient-info border border-brand-primary/20 rounded-2xl p-6 md:p-8 space-y-4">
      <h3 className="text-lg font-bold text-gray-900">{isEn ? "Your Generated URL:" : "Votre URL Générée:"}</h3>

      {/* URL Display */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 break-all">
        <code className="text-sm text-gray-800 leading-relaxed">{generatedUrl}</code>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleCopyUrl}
          className="flex-1 h-12 text-base font-semibold rounded-full"
          variant={copied ? "outline" : "default"}
        >
          {copied ? (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              {isEn ? "Copied!" : "Copié!"}
            </>
          ) : (
            <>
              <Copy className="w-5 h-5 mr-2" />
              {isEn ? "Copy URL" : "Copier l'URL"}
            </>
          )}
        </Button>

        <Button
          onClick={handleCreateShortLink}
          variant="secondary"
          className="flex-1 h-12 text-base font-semibold rounded-full"
        >
          <ExternalLink className="w-5 h-5 mr-2" />
          {isEn ? "Create Short Link" : "Créer un Lien Court"}
        </Button>
      </div>

      <p className="text-xs text-gray-600 text-center">
        {isEn
          ? "Creating a short link requires a free Pimms account"
          : "La création d'un lien court nécessite un compte Pimms gratuit"}
      </p>
    </div>
  );
}
