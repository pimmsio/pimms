"use client";

import { Copy } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import type { ReactNode } from "react";

export function Pre({ children }: { children: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const [hasLanguage, setHasLanguage] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  // Lire depuis le DOM si un data-language est présent
  useEffect(() => {
    const codeEl = preRef.current?.querySelector("code");
    const lang = codeEl?.getAttribute("data-language");

    setHasLanguage(Boolean(lang !== "bash"));
  }, []);

  const handleCopy = async () => {
    const text = preRef.current?.innerText;
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy code", e);
    }
  };

  return (
    <div className="relative">
      <pre
        ref={preRef}
        className="overflow-x-auto rounded-xl border border-[#f9f9f9] p-4 text-sm bg-[#f9f9f9] text-black"
      >
        {children}
      </pre>
      {hasLanguage && (
        <button
          onClick={handleCopy}
          className="absolute flex items-center gap-2 top-2 right-2 z-10 rounded-full bg-white border border-gray-300 px-2 py-1 text-xs text-gray-700 font-bold shadow-xs hover:bg-gray-100 active:bg-gray-200 transition cursor-pointer"
        >
          <Copy className="w-3 h-3" />
          {copied ? "Copied!" : "Copy"}
        </button>
      )}
    </div>
  );
}
