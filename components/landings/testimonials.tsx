import { getTranslations } from "next-intl/server";
import { Section } from "@/components/base/section";
import { H2 } from "@/components/base/h2";
import { Label } from "@/components/base/label";
import { TestimonialCard } from "./testimonial-card";

export const Testimonials = async ({ tkey, locale }: { tkey: string; locale: string }) => {
  const t = await getTranslations({ locale, namespace: tkey });

  return (
    <Section id="testimonials">
      <div className="text-center mb-16">
        <Label className="mb-8">{t("testimonials.label")}</Label>
        <H2 className="text-3xl font-bold text-text-primary leading-tight max-w-4xl mx-auto">
          {t("testimonials.title")}
        </H2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }, (_, i) => (
          <TestimonialCard key={i} tkey={`${tkey}.testimonials.testimonial${i + 1}`} locale={locale} />
        ))}
      </div>
    </Section>
  );
};
