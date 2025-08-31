import { useTranslations } from "next-intl";
import { Avatar } from "@/components/base/avatar";
import { Star } from "lucide-react";
import { Paragraph } from "../base/paragraph";

export const TestimonialCard = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
      <div className="space-y-6 h-full flex flex-col">
        {/* Rating Stars */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index}>
              <Star className="w-5 h-5 text-vibrant-orange fill-current" />
            </div>
          ))}
        </div>

        {/* Testimonial Text */}
        <div className="flex-1">
          <Paragraph className="text-text-primary leading-relaxed">{t("text")}</Paragraph>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 mt-auto">
          <Avatar src={t("author_avatar")} alt={t("author_name")} className="w-10 h-10 border border-gray-200" />
          <div>
            <p className="font-semibold text-text-primary leading-tight">{t("author_name")}</p>
            <p className="text-sm text-text-secondary mt-1">{t("author_role")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
