"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
import { Section } from "./base/section";
import { Label } from "./base/label";
import { H2 } from "./base/h2";
import { Paragraph } from "./base/paragraph";

interface FAQ {
  question: string;
  answer: string;
  pages?: string[];
}

export default function FAQ({
  defaultFaqs,
  fkey,
}: {
  defaultFaqs: number[];
  fkey: string;
}) {
  const t = useTranslations(fkey);

  const faqs = defaultFaqs.map((number) => ({
    question: t(`faq${number}.question`),
    answer: t(`faq${number}.answer`),
  }));

  return (
    <Section className="max-w-5xl mx-auto my-16">
      <Label className="mb-6 mx-auto w-fit bg-[#3970ff] text-white py-1.5 flex items-center justify-center gap-3 uppercase px-4 text-sm">
        {t("title")}
      </Label>
      <H2 className="mx-auto my-4 text-center">{t("heading")}</H2>
      <Paragraph className="text-center mb-12 mx-auto">
        {t("description")}
      </Paragraph>
      <div className="flex flex-col w-full gap-6">
        {faqs.map((faq, key) => (
          <Accordion
            type="single"
            defaultValue="0"
            collapsible
            key={key}
            className="w-full"
          >
            <AccordionItem
              value={key.toString()}
              className="w-full bg-card rounded-3xl ring-[6px] ring-neutral-100"
            >
              <AccordionTrigger className="p-4 cursor-pointer">
                <div className="text-left text-lg">{faq.question}</div>
              </AccordionTrigger>
              <AccordionContent className="px-4">{faq.answer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </Section>
  );
}
