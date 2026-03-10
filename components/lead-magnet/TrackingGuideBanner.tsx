import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Check, BookOpen } from "@/components/icons/custom-icons";

const GUIDE_IMAGE = "https://assets.pimms.io/tracking-plan.webp";

export async function TrackingGuideBanner({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "landing.lead_magnet" });

  return (
    <div className="not-prose relative overflow-hidden rounded-2xl sm:rounded-3xl my-10 sm:my-14 shadow-xl border border-amber-200/50">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #fffbeb 0%, #fef3c7 30%, #fde68a 70%, #fcd34d 100%)",
        }}
      />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      }} />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 p-6 sm:p-8 md:p-10 items-center">
        {/* Guide image */}
        <div className="md:col-span-2 flex justify-center">
          <div className="relative w-full max-w-[280px] md:max-w-none">
            <div className="absolute -inset-2 bg-amber-400/20 rounded-2xl blur-xl" />
            <Image
              src={GUIDE_IMAGE}
              alt={t("modal_image_alt")}
              width={400}
              height={520}
              className="relative rounded-xl shadow-2xl border-2 border-white/80 w-full h-auto transform hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3 flex flex-col gap-4 sm:gap-5">
          <div className="inline-flex items-center gap-1.5 bg-amber-900/10 text-amber-900 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full w-fit">
            <BookOpen className="w-3.5 h-3.5" />
            {t("banner_badge")}
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            {t("banner_title")}
          </h3>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            {t("banner_subtitle")}
          </p>

          <ul className="space-y-2.5">
            {(["banner_benefit_1", "banner_benefit_2", "banner_benefit_3"] as const).map(
              (key) => (
                <li key={key} className="flex items-start gap-2.5">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-amber-900/10 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-amber-900" />
                  </span>
                  <span className="text-sm sm:text-base text-gray-800 font-medium">
                    {t(key)}
                  </span>
                </li>
              )
            )}
          </ul>

          <button
            type="button"
            data-lead-magnet-trigger
            className="mt-1 inline-flex items-center justify-center gap-2 bg-gray-900 text-white font-bold py-3.5 px-8 rounded-full hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-base sm:text-lg w-fit cursor-pointer shadow-md"
          >
            {t("banner_cta")}
          </button>
        </div>
      </div>
    </div>
  );
}
