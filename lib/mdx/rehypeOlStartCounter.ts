import { visit } from "unist-util-visit";

// Ensure our custom CSS counter starts at the correct value when an ordered list
// uses a non-1 starting index (e.g., when a list is split by a code block and
// the next list begins with "5.").
//
// We read the `start` attribute set by remark/MDX and apply an inline style
// `counter-reset: list-counter <start-1>` so that `.prose-list-ol` (which uses
// a CSS counter) displays the expected number.
export function rehypeOlStartCounter() {
  return (tree: any) => {
    visit(tree, "element", (node: any) => {
      if (node.tagName !== "ol") return;

      const props = node.properties || {};
      const start = props.start;
      if (start == null) return;

      const startNum = Number(start);
      if (Number.isNaN(startNum) || startNum <= 1) return;

      const resetValue = startNum - 1; // counter should start one before first item

      // Merge/append to existing style if present
      const existingStyle = typeof props.style === "string" ? props.style.trim() : "";
      const counterResetRule = `counter-reset: list-counter ${resetValue};`;
      const style = existingStyle ? `${existingStyle}; ${counterResetRule}` : counterResetRule;

      node.properties = {
        ...props,
        style
      };
    });
  };
}
