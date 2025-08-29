"use client";

import { useEffect, useMemo, useState } from "react";
import remarkParse from "remark-parse";
import { unified } from "unified";
import remarkMdx from "remark-mdx";
import { slug } from "github-slugger"; // Import GitHub's slug generator

export default function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState("");
  const headings = useMemo(() => extractHeadings(content), [content]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // Account for fixed header
      let closestHeading = "";
      let closestDistance = Infinity;

      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const distance = Math.abs(elementTop - scrollPosition);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestHeading = id;
          }
        }
      });

      setActiveId(closestHeading);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  if (headings.length === 0) {
    return <p className="text-sm text-text-secondary">No headings found</p>;
  }

  return (
    <nav className="space-y-1 sm:space-y-2 max-w-full">
      {headings.map(({ level, text, id }, index) => (
        <div key={id + index} className={`${level === 3 ? "pl-3 sm:pl-4" : ""}`}>
          <a
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById(id);
              if (element) {
                const rect = element.getBoundingClientRect();
                const offsetPosition = rect.top + window.scrollY - 120;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth"
                });
                window.history.replaceState(null, "", `#${id}`);
                setTimeout(() => setActiveId(id), 500);
              }
            }}
            className={`block text-sm py-1 sm:py-1.5 pr-2 transition-colors duration-150 truncate ${
              activeId === id ? "text-brand-primary font-medium" : "text-text-secondary hover:text-text-primary"
            }`}
            title={text}
          >
            {text}
          </a>
        </div>
      ))}
    </nav>
  );
}

// Helper function to recursively extract text from any node
const extractTextFromNode = (node: any): string => {
  if (!node) return "";

  // If it's a text node, return its value
  if (node.type === "text" && node.value) {
    return node.value;
  }

  // If it has children, recursively extract text from all children
  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractTextFromNode).join("");
  }

  // For other node types (like links), try to extract text from their children
  return "";
};

const extractHeadings = (mdxContent: string) => {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(mdxContent);
  const headings: { level: number; text: string; id: string }[] = [];

  function visitNode(node: any) {
    if (node.type === "heading" && node.children && node.depth >= 2 && node.depth <= 3) {
      // Use the helper function to extract all text content from the heading
      const text = extractTextFromNode(node);
      if (text.trim()) {
        const id = slug(text);
        headings.push({ level: node.depth, text, id });
      }
    }
    if (node.children) {
      node.children.forEach(visitNode);
    }
  }

  visitNode(tree);
  return headings;
};
