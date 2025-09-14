import { visit } from "unist-util-visit";

export function remarkAtSyntax() {
  return (tree: any) => {
    // Helper function to transform @Component syntax in text nodes
    function transformAtSyntax(text: string) {
      // Parse @Component[attr="value"] syntax
      // Updated regex to handle URLs and complex attribute values
      const match = text.match(/^@(\w+)(?:\[([^\]]+)\])?\s*(.*)$/);
      if (match) {
        const [, componentName, attributesStr, restText] = match;

        // Parse attributes from [attr="value", attr2="value2"] format
        const attributes: any[] = [];
        if (attributesStr) {
          // Split by comma but not within quotes
          const attrPairs = attributesStr.match(/(\w+)="([^"]+)"/g) || [];

          for (const pair of attrPairs) {
            const attrMatch = pair.match(/(\w+)="([^"]+)"/);
            if (attrMatch) {
              attributes.push({
                type: "mdxJsxAttribute",
                name: attrMatch[1],
                value: attrMatch[2]
              });
            }
          }
        }

        // Create JSX element
        const jsxNode: any = {
          type: "mdxJsxFlowElement",
          name: componentName,
          attributes: attributes,
          children: restText.trim() ? [{ type: "text", value: restText.trim() }] : []
        };

        return jsxNode;
      }
      return null;
    }

    // Transform @ComponentName lines in paragraphs
    visit(tree, "paragraph", (node: any, index, parent) => {
      if (!parent || index === undefined) return;

      const firstChild = node.children?.[0];
      if (firstChild?.type === "text" && firstChild.value.startsWith("@")) {
        const jsxNode = transformAtSyntax(firstChild.value);
        if (jsxNode) {
          // Add remaining children from the paragraph
          if (node.children.length > 1) {
            jsxNode.children.push(...node.children.slice(1));
          }
          (parent as any).children[index] = jsxNode;
        }
      }
    });

    // Transform @ComponentName inside JSX elements (like List)
    visit(tree, "mdxJsxFlowElement", (node: any) => {
      if (!node.children) return;

      const newChildren: any[] = [];

      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];

        if (child.type === "text") {
          // Split by newlines and process each line
          const lines = child.value.split("\n");
          let hasTransformed = false;

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith("@")) {
              const jsxNode = transformAtSyntax(trimmedLine);
              if (jsxNode) {
                newChildren.push(jsxNode);
                hasTransformed = true;
              }
            } else if (trimmedLine || !hasTransformed) {
              // Keep non-empty lines or empty lines if no transformation happened
              if (newChildren.length > 0 || trimmedLine) {
                newChildren.push({ type: "text", value: line + "\n" });
              }
            }
          }
        } else if (
          child.type === "paragraph" &&
          child.children?.[0]?.type === "text" &&
          child.children[0].value.startsWith("@")
        ) {
          // Handle @Component that are wrapped in paragraphs inside JSX
          const jsxNode = transformAtSyntax(child.children[0].value);
          if (jsxNode) {
            // Add remaining children from the paragraph
            if (child.children.length > 1) {
              jsxNode.children.push(...child.children.slice(1));
            }
            newChildren.push(jsxNode);
          } else {
            newChildren.push(child);
          }
        } else {
          newChildren.push(child);
        }
      }

      node.children = newChildren;
    });

    // Transform ** to <Primary> in headings
    visit(tree, "heading", (node: any) => {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child.type === "strong") {
          // Replace strong with Primary JSX element
          node.children[i] = {
            type: "mdxJsxTextElement",
            name: "Primary",
            attributes: [],
            children: child.children
          };
        }
      }
    });
  };
}
