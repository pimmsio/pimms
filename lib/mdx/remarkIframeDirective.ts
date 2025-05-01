import { visit } from "unist-util-visit";

export function remarkIframeDirective() {
  return (tree: any) => {
    visit(tree, "containerDirective", (node: any) => {
      if (node.name !== "iframe") return;

      const paragraph = node.children?.find((n: any) => n.type === "paragraph");
      const linkNode = paragraph?.children?.find((n: any) => n.type === "link");

      const url = linkNode?.url?.trim();
      if (!url) {
        console.warn("iframe directive: no URL found in link node");
        return;
      }

      node.data = {
        hName: "Iframe",
        hProperties: {
          src: url,
        },
      };

      node.children = [];
    });
  };
}
