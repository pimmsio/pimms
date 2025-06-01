"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [open, setOpen] = useState<string | undefined>(undefined);

  return (
    <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="flex flex-col w-full gap-4">
      {faqs.map((faq, key) => (
        <AccordionItem
          value={key.toString()}
          key={key}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          <AccordionTrigger className="cursor-pointer px-6 py-4 hover:bg-gray-50 transition-colors">
            <span className="text-lg font-semibold text-[#08272E] text-left pr-4">{faq.question}</span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-[#5C5B61] text-base">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
