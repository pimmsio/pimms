import slugify from "slugify";
import striptags from "striptags";
import removeMarkdown from "remove-markdown";
import { useLocale } from "next-intl";
import { WEB_URL } from "@/app/constants";

export function FaqStructuredData({ faqs, path }: { faqs: { question: string; answer: string }[]; path: string }) {
  const locale = useLocale();

  if (!faqs || faqs.length === 0) return null;

  const url = `${WEB_URL}${path}`;

  const cleanText = (text: string): string => {
    return removeMarkdown(striptags(text))
      .replace(/[\r\n]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: faqs.map(({ question, answer }, i) => ({
      "@type": "Question",
      "@id": `${url}#faq-${slugify(question, { lower: true, strict: true })}-${i + 1}`,
      name: cleanText(question),
      acceptedAnswer: {
        "@type": "Answer",
        text: cleanText(answer)
      }
    }))
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
