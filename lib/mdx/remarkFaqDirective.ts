import { visit } from "unist-util-visit";

export function remarkFaqDirective() {
  return (tree: any) => {
    visit(tree, "containerDirective", (node: any) => {
      if (node.name !== "faq") return;

      let question = "";
      let answer = "";

      for (const child of node.children || []) {
        if (child.type === "heading" && child.depth === 3) {
          question = (child.children || [])
            .map((n: any) => n.value ?? "")
            .join("");
        } else if (child.type === "paragraph") {
          answer +=
            (child.children || []).map((n: any) => n.value ?? "").join("") +
            "\n\n";
        }
      }

      node.data = {
        hName: "Faq",
        hProperties: {
          question,
          answer: answer.trim(),
        },
      };

      node.children = [];
    });
  };
}
