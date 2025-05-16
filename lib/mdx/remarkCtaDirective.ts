import { visit } from "unist-util-visit";

export function remarkCtaPlaceholder() {
  return (tree: any) => {
    visit(tree, "heading", (node: any, index, parent) => {
      if (typeof index !== "number" || !parent) return;

      const firstChild = node.children?.[0];
      const text = firstChild?.type === "text" ? firstChild.value : "";

      if (
        node.depth === 6 &&
        typeof text === "string" &&
        text.trim().startsWith("sbb-itb-")
      ) {
        parent.children[index] = {
          type: "mdxJsxFlowElement",
          name: "CallToAction",
          attributes: [],
          children: [],
        };
      }
    });
  };
}
