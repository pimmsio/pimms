import { useTranslations } from "next-intl";
import { Avatar } from "@/components/base/avatar";
import { Star } from "lucide-react";
import { Paragraph } from "../base/paragraph";

export const TestimonialCard = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="space-y-4">
        {/* Rating Stars */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index}>
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
            </div>
          ))}
        </div>

        {/* Testimonial Text */}
        <Paragraph className="text-[#08272E] leading-relaxed">{t("text")}</Paragraph>

        {/* Author */}
        <div className="flex items-center gap-3">
          <Avatar src={t("author_avatar")} alt={t("author_name")} className="w-10 h-10 border border-gray-200" />
          <div>
            <p className="font-semibold text-[#08272E]">{t("author_name")}</p>
            <p className="text-sm text-[#5C5B61]">{t("author_role")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
