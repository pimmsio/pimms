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

  return (
    <ul className="space-y-4">
      {headings.map(({ level, text, id }) => (
        <li
          key={id}
          className="transition-all"
          style={{ marginLeft: `calc(${level} * 0.4rem - 0.4rem)` }}
        >
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
                  behavior: "smooth",
                });
                window.history.replaceState(null, "", `#${id}`);
                setTimeout(() => setActiveId(id), 500);
              }
            }}
            className={`block text-sm ${
              activeId === id
                ? "text-[#08272E] font-semibold"
                : "text-[#5C5B61]"
            } hover:text-[#08272E]`}
          >
            {text}
          </a>
        </li>
      ))}
    </ul>
  );
}

const extractHeadings = (mdxContent: string) => {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(mdxContent);
  const headings: { level: number; text: string; id: string }[] = [];

  function visitNode(node: any) {
    if (node.type === "heading" && node.children) {
      const text = node.children
        .map((child: any) => child.value || "")
        .join("");

      // Use GitHub's slug generator to match actual content IDs
      const id = slug(text);

      headings.push({ level: node.depth, text, id });
    }
    if (node.children) {
      node.children.forEach(visitNode);
    }
  }

  visitNode(tree);
  return headings;
};
