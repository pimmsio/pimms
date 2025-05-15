import { visit } from "unist-util-visit";

function extractAttributes(node: any) {
  const rawAttrs = node.attributes;

  if (Array.isArray(rawAttrs)) {
    return rawAttrs.map((attr) => ({
      type: "mdxJsxAttribute",
      name: attr.name,
      value: attr.value,
    }));
  }

  // Handle case where attributes is an object like: { href: "/..." }
  if (rawAttrs && typeof rawAttrs === "object") {
    return Object.entries(rawAttrs).map(([name, value]) => ({
      type: "mdxJsxAttribute",
      name,
      value,
    }));
  }

  return [];
}

export function remarkCustomDirectives() {
  return (tree: any) => {
    visit(tree, (node) => {
      if (node.type === "containerDirective") {
        if (node.name === "info") {
          node.type = "mdxJsxFlowElement";
          node.name = "InfoSection";
          node.attributes = [];
        }
        if (node.name === "linkcards") {
          node.type = "mdxJsxFlowElement";
          node.name = "LinkCards";
          node.attributes = [];
        }
        if (node.name === "linkcard") {
          node.type = "mdxJsxFlowElement";
          node.name = "LinkCard";
          node.attributes = extractAttributes(node);
        }
      }
    });
  };
}
