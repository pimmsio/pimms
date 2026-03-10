import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Check, BookOpen, ArrowRight } from "@/components/icons/custom-icons";

const GUIDE_IMAGE = "https://assets.pimms.io/tracking-plan.webp";

export async function TrackingGuideSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "landing.lead_magnet" });

  return (
    <section className="w-full py-16 sm:py-24 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #fffbeb 0%, #fef3c7 40%, #fde68a 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Guide image */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative max-w-[360px] lg:max-w-[420px]">
              <div className="absolute -inset-4 bg-amber-400/20 rounded-3xl blur-2xl" />
              <Image
                src={GUIDE_IMAGE}
                alt={t("modal_image_alt")}
                width={420}
                height={546}
                className="relative rounded-2xl shadow-2xl border-2 border-white/80 w-full h-auto transform hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-amber-900/10 text-amber-900 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full w-fit">
              <BookOpen className="w-4 h-4" />
              {t("banner_badge")}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {t("section_title")}
            </h2>

            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              {t("section_subtitle")}
            </p>

            <ul className="space-y-4 mt-2">
              {(
                [
                  "section_benefit_1",
                  "section_benefit_2",
                  "section_benefit_3",
                  "section_benefit_4",
                ] as const
              ).map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-amber-900/10 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-amber-900" />
                  </span>
                  <span className="text-base sm:text-lg text-gray-800 font-medium">
                    {t(key)}
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              data-lead-magnet-trigger
              className="mt-2 inline-flex items-center justify-center gap-2.5 bg-gray-900 text-white font-bold py-4 px-10 rounded-full hover:bg-gray-800 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-lg w-fit cursor-pointer shadow-lg group"
            >
              {t("banner_cta")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            <p className="text-sm text-amber-800/60 font-medium">
              {t("section_social_proof")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
