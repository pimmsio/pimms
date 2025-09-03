import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { APP_URL } from "@/app/constants";
import { useTranslations } from "next-intl";

export function CallToAction() {
  const t = useTranslations("landing.cta");

  return (
    <div
      className="not-prose relative overflow-hidden rounded-xl md:rounded-3xl p-8 sm:p-10 md:p-16 my-8 sm:my-12 text-center shadow-xl"
      style={{ background: "linear-gradient(135deg, #3970ff 0%, #2563eb 50%, #1d4ed8 100%)" }}
    >
      {/* Enhanced background pattern */}
      <div className="absolute inset-0">
        <div className="absolute -top-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 bg-white/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-4 -left-4 w-32 h-32 sm:w-40 sm:h-40 bg-white/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white drop-shadow-sm">
          {t("title")}
        </h3>

        <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto text-white/95 leading-relaxed px-4 sm:px-0 drop-shadow-sm">
          {t("subtitle")}
        </p>

        <div className="flex justify-center items-center">
          <Link
            href={`${APP_URL}/register`}
            className="inline-flex items-center justify-center gap-2 bg-white text-brand-primary font-bold py-4 px-8 sm:px-10 rounded-full hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-300 text-base sm:text-lg group shadow-lg"
          >
            <Zap className="w-5 h-5 group-hover:animate-pulse" fill="currentColor" />
            {t("button")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        <p className="text-white/85 text-sm mt-6 font-medium">{t("bottom_text")}</p>
      </div>
    </div>
  );
}
