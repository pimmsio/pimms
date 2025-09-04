import { TrendingUp, DollarSign } from "lucide-react";
import { useTranslations } from "next-intl";

interface HeroBenefitsProps {
  className?: string;
}

export default function HeroBenefits({ className = "" }: HeroBenefitsProps) {
  const t = useTranslations("landing.hero");

  const benefits = [
    {
      icon: TrendingUp,
      text: t("benefits.opportunities")
    },
    {
      icon: DollarSign,
      text: t("benefits.conversions")
    }
  ];

  return (
    <div className={`flex items-center justify-center gap-6 mt-4 ${className}`}>
      {benefits.map((benefit, index) => {
        const IconComponent = benefit.icon;
        return (
          <div key={index} className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-md border border-gray-200 bg-gray-50">
              <IconComponent className="w-3 h-3 text-gray-600" />
            </div>
            <span className="text-sm font-medium text-gray-600 whitespace-nowrap">{benefit.text}</span>
          </div>
        );
      })}
    </div>
  );
}
