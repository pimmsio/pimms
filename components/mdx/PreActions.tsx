"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface PreActionsProps {
  language: string;
  codeId: string;
}

export function PreActions({ language, codeId }: PreActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Find the pre element by its ID
    const preElement = document.getElementById(codeId) as HTMLPreElement | null;

    if (!preElement) return;

    try {
      const text = preElement.textContent || "";
      if (!text.trim()) return;

      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy code", e);
    }
  };

  const getLanguageLabel = () => {
    const labels: { [key: string]: string } = {
      js: "JavaScript",
      javascript: "JavaScript",
      jsx: "React JSX",
      ts: "TypeScript",
      typescript: "TypeScript",
      tsx: "React TSX",
      html: "HTML",
      css: "CSS",
      scss: "SCSS",
      bash: "Terminal",
      sh: "Shell",
      shell: "Shell",
      python: "Python",
      py: "Python",
      json: "JSON",
      code: "Code"
    };
    return labels[language.toLowerCase()] || language.charAt(0).toUpperCase() + language.slice(1);
  };

  return (
    <div className="pre-actions flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-2">
      <span className="text-sm font-medium text-gray-700">{getLanguageLabel()}</span>

      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-3 py-1 text-xs bg-white border border-gray-300 rounded font-medium hover:bg-gray-50 transition-colors cursor-pointer"
        aria-label="Copy code to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-[#3970ff]" />
            <span className="text-[#3970ff]">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3 h-3 text-gray-600" />
            <span className="text-gray-600">Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
