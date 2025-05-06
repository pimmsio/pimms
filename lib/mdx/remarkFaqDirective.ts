import { visit } from "unist-util-visit";

export function remarkFaqDirective() {
  return (tree: any, file: any) => {
    const faqs: { question: string; answer: string }[] = [];

    visit(tree, "containerDirective", (node: any) => {
      if (node.name !== "faq") return;

      let question = "";

      node.children = node.children || [];

      // Extraire <h3> comme question
      node.children = node.children.filter((child: any) => {
        if (child.type === "heading" && child.depth === 3) {
          question = (child.children || [])
            .map((n: any) => n.value ?? "")
            .join("");
          return false;
        }
        return true;
      });

      // Extraire la "réponse" en concaténant tous les nœuds restants
      const answerText = node.children
        .map(
          (child: any) =>
            child.value ||
            (child.children || []).map((c: any) => c.value ?? "").join("")
        )
        .join("\n")
        .trim();

      if (question && answerText) {
        faqs.push({ question, answer: answerText });
      }

      // Pour le rendu visuel
      node.data = {
        hName: "Faq",
        hProperties: {
          question,
        },
      };
    });

    // Injecter dans file.data
    if (faqs.length > 0) {
      file.data.faqs = faqs;
    }
  };
}
