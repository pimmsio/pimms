import { useTranslations } from "next-intl";
import { Avatar } from "@/components/base/avatar";
import { Heart, Star } from "lucide-react";
import { Paragraph } from "../base/paragraph";

export default function MainTestimonial({ tkey }: { tkey: string }) {
  const t = useTranslations(tkey);

  return (
    <section className="mx-auto my-12 max-w-md space-y-4 md:my-24 md:space-y-6 lg:max-w-lg text-balance">
      <div className="rating !flex justify-center">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} fill="green" strokeWidth={0} />
        ))}
      </div>
      <Paragraph className="space-y-2 text-center leading-relaxed text-balance lg:text-lg px-2">
        {t.rich("main_testimonial.text", {
          strong: (chunks) => (
            <span className="bg-[#B3E4FF] text-[#08272E] px-1.5 font-medium">
              {chunks}
            </span>
          ),
          love: () => (
            <Heart
              className="w-4 h-4 inline-block"
              fill="#E0004B"
              strokeWidth={0}
            />
          ),
        })}
      </Paragraph>
      <div className="flex items-center justify-center gap-3 lg:gap-4">
        <Avatar
          src={t("main_testimonial.author_avatar")}
          alt=""
          className="size-10"
        />
        <div>
          <p className="font-semibold lg:text-lg">
            {t("main_testimonial.author_name")}
          </p>
          <Paragraph className="text-sm font-medium">
            {t("main_testimonial.author_company")}
          </Paragraph>
        </div>
      </div>
    </section>
  );
}
