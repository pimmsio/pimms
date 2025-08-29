import { ArrowRight, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { APP_URL } from "@/app/constants";

export function CallToAction() {
  const t = useTranslations("blog.cta");

  return (
    <div className="not-prose relative overflow-hidden bg-gradient-primary rounded-xl md:rounded-3xl p-8 sm:p-10 md:p-16 my-8 sm:my-12 text-center shadow-lg">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
            <Zap className="w-8 h-8 text-white" fill="currentColor" />
          </div>
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white!">
          {t("readyToStart.title")}
        </h3>

        <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto text-white/90! leading-relaxed px-4 sm:px-0">
          {t("readyToStart.description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <Link
            href={`${APP_URL}/register`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-brand-primary font-semibold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full hover:bg-gray-50 hover:shadow-md transition-all duration-200 text-sm sm:text-base group"
          >
            {t("readyToStart.startFreeTrial")}
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white! font-semibold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full hover:bg-white/20 transition-all duration-200 border border-white/20 text-sm sm:text-base"
          >
            {t("readyToStart.learnMore")}
          </Link>
        </div>
      </div>
    </div>
  );
}
