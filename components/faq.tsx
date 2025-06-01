import { Section } from "./base/section";
import { Label } from "./base/label";
import { H2 } from "./base/h2";
import { Paragraph } from "./base/paragraph";
import { getTranslations } from "next-intl/server";
import { FAQAccordion } from "./FAQAccordion";

interface FAQ {
  question: string;
  answer: string;
}

export default async function FAQ({ defaultFaqs, fkey }: { defaultFaqs: number[]; fkey: string }) {
  const t = await getTranslations(fkey);

  const faqs: FAQ[] = defaultFaqs.map((number) => ({
    question: t(`faq${number}.question`),
    answer: t(`faq${number}.answer`)
  }));

  // Structured data for SEO - rendered server-side
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Section id="faq">
      {/* Structured data script - rendered server-side for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      <div className="text-center mb-12">
        <Label className="mb-6">{t("title")}</Label>
        <H2 className="mb-4">{t("heading")}</H2>
        <Paragraph className="text-lg text-[#5C5B61] max-w-2xl mx-auto">{t("description")}</Paragraph>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Server-side rendered content for SEO and no-JS fallback */}
        <noscript>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-[#08272E] mb-3">{faq.question}</h3>
                <p className="text-[#5C5B61] text-base">{faq.answer}</p>
              </div>
            ))}
          </div>
        </noscript>

        {/* Interactive accordion when JavaScript is available */}
        <div className="js-only">
          <FAQAccordion faqs={faqs} />
        </div>
      </div>
    </Section>
  );
}
