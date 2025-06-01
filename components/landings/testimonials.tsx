import { useTranslations } from "next-intl";
import { Section } from "@/components/base/section";
import { H2 } from "@/components/base/h2";
import { Label } from "@/components/base/label";
import { TestimonialCard } from "./testimonial-card";

export const Testimonials = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  return (
    <Section id="testimonials">
      <div className="text-center mb-12">
        <Label className="mb-4">{t("testimonials.label")}</Label>
        <H2 className="text-3xl font-bold text-[#08272E] leading-tight max-w-4xl mx-auto">{t("testimonials.title")}</H2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }, (_, i) => (
          <TestimonialCard key={i} tkey={`${tkey}.testimonials.testimonial${i + 1}`} />
        ))}
      </div>
    </Section>
  );
};
