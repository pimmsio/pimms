import type { ReactNode } from "react";
import { PreActions } from "./PreActions";

let preCounter = 0;

export function Pre({ children }: { children: ReactNode }) {
  const id = `code-block-${++preCounter}`;

  const getLanguageFromChildren = () => {
    if (typeof children === "object" && children !== null && "props" in children) {
      const props = (children as any).props as any;
      const className = props?.className || "";
      const match = className.match(/language-(\w+)/);
      const dataLanguage = props?.["data-language"] || props?.["dataLanguage"];
      return (dataLanguage as string) || (match ? match[1] : "code");
    }
    return "code";
  };

  const getFilenameFromChildren = () => {
    if (typeof children === "object" && children !== null && "props" in children) {
      const props = (children as any).props as any;
      return props?.["data-filename"] || props?.["dataFilename"] || props?.filename || props?.meta || "";
    }
    return "";
  };

  const language = getLanguageFromChildren();
  const filename = String(getFilenameFromChildren() || "");

  return (
    <div className="pre-block relative my-6 border border-gray-200 rounded-lg overflow-hidden bg-white">
      <PreActions language={language} filename={filename} codeId={id} />

      <div className="overflow-x-auto">
        <pre id={id} className="p-0 text-sm text-gray-800! bg-white! m-0! overflow-x-auto text-left">
          {children}
        </pre>
      </div>
    </div>
  );
}
