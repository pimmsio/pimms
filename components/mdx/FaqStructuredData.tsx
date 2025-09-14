import striptags from "striptags";
import removeMarkdown from "remove-markdown";
import { WEB_URL } from "@/app/constants";

export function FaqStructuredData({
  faqs,
  path,
  locale
}: {
  faqs: { question: string; answer: string }[];
  path: string;
  locale: string;
}) {
  if (!faqs || faqs.length === 0) return null;

  // Ensure we have clean, unique FAQ data
  const uniqueFaqs = faqs.filter(
    (faq, index, array) => faq.question && faq.answer && array.findIndex((f) => f.question === faq.question) === index
  );

  if (uniqueFaqs.length === 0) return null;

  const url = `${WEB_URL}${path}`;

  const cleanText = (text: string): string => {
    if (!text) return "";
    return removeMarkdown(striptags(text))
      .replace(/[\r\n]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  // Build the structured data carefully to avoid any duplication issues
  const questions = uniqueFaqs.map((faq) => {
    const cleanQuestion = cleanText(faq.question);
    const cleanAnswer = cleanText(faq.answer);

    return {
      "@type": "Question",
      "name": cleanQuestion,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": cleanAnswer
      }
    };
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    "inLanguage": locale,
    "mainEntity": questions
  };

  return (
    <script
      id="faq-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
