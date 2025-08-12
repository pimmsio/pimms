import type { ReactNode } from "react";
import { PreActions } from "./PreActions";

export function Pre({ children }: { children: ReactNode }) {
  // Generate a unique ID for this code block
  const id = `code-block-${Math.random().toString(36).substr(2, 9)}`;

  // Extract language from children if possible
  const getLanguageFromChildren = () => {
    if (typeof children === "object" && children !== null && "props" in children) {
      const props = (children as any).props as any;
      const className = props?.className || "";
      const match = className.match(/language-(\w+)/);
      // rehype-pretty-code also adds data-language on <code>
      const dataLanguage = props?.["data-language"] || props?.["dataLanguage"];
      return (dataLanguage as string) || (match ? match[1] : "code");
    }
    return "code";
  };

  const getFilenameFromChildren = () => {
    if (typeof children === "object" && children !== null && "props" in children) {
      const props = (children as any).props as any;
      // Support common meta keys produced by rehype-pretty-code
      // via code fence meta: ```ts filename=app.ts
      return props?.["data-filename"] || props?.["dataFilename"] || props?.filename || props?.meta || "";
    }
    return "";
  };

  const language = getLanguageFromChildren();
  const filename = String(getFilenameFromChildren() || "");

  return (
    <div className="pre-block relative my-6 border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Header with language label and copy button */}
      <PreActions language={language} filename={filename} codeId={id} />

      {/* Code content - server rendered for SEO */}
      <div className="overflow-x-auto">
        <pre id={id} className="p-0 text-sm text-gray-800 bg-white m-0 overflow-x-auto text-left">
          {children}
        </pre>
      </div>
    </div>
  );
}
