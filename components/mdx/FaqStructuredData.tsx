import slugify from "slugify";
import striptags from "striptags";
import removeMarkdown from "remove-markdown";
import { useLocale } from "next-intl";

const MAX_LENGTH = 750;

export function FaqStructuredData({
  faqs,
  url,
}: {
  faqs: { question: string; answer: string }[];
  url: string;
}) {
  const locale = useLocale();

  if (!faqs || faqs.length === 0) return null;

  const cleanText = (text: string): string => {
    const cleaned = removeMarkdown(striptags(text))
      .replace(/[\r\n]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return cleaned.length > MAX_LENGTH
      ? cleaned.slice(0, MAX_LENGTH - 1) + "…"
      : cleaned;
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
        text: cleanText(answer),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
