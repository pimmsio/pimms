import { useTranslations } from "next-intl";
import Link from "next/link";
import { Check } from "lucide-react";
import { APP_URL } from "../../app/constants";
import { Button } from "@/components/ui/button";
import CtaButtonBig from "@/components/cta/CtaButtonBig";

export const LifetimeOfferFree = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 h-full">
      <div className="space-y-5 md:space-y-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-[#08272E]">{t("lifetime_offer.plan_starter")}</h3>
          <p className="text-[#5C5B61] mt-1 text-sm md:text-base">{t("lifetime_offer.free_pass")}</p>
        </div>

        <div className="pb-5 border-b border-gray-200">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl md:text-4xl font-bold text-[#08272E]">0</span>
            <span className="text-lg md:text-xl text-[#5C5B61]">€</span>
          </div>
          <p className="text-[#5C5B61] text-xs md:text-sm mt-1">{t("lifetime_offer.try_free")}</p>
        </div>

        <ul className="space-y-2.5 md:space-y-3">
          {[
            t("lifetime_offer.feature_10_deeplinks"),
            t("lifetime_offer.feature_mobile_redirect"),
            t("lifetime_offer.feature_click_tracking"),
            t("lifetime_offer.feature_limited_conversion"),
            t("lifetime_offer.feature_data_30_days"),
            t("lifetime_offer.feature_1_domain"),
            t("lifetime_offer.feature_qr_utm"),
            t("lifetime_offer.feature_integrations_basic")
          ].map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm md:text-base text-[#08272E]">{feature}</span>
            </li>
          ))}
        </ul>

        <Button variant="outline" size="lg" className="w-full" asChild>
          <Link href={`${APP_URL}/register`}>{t("lifetime_offer.start_free_cta")}</Link>
        </Button>
      </div>
    </div>
  );
};

export const LifetimeOfferPro = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  return (
    <div className="bg-white rounded-2xl border-2 border-[#3970ff] p-6 md:p-8 relative h-full">
      <div className="absolute -top-2.5 left-6 md:left-8 bg-[#3970ff] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
        {t("lifetime_offer.popular")}
      </div>

      <div className="space-y-5 md:space-y-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-[#08272E]">{t("lifetime_offer.plan_pro")}</h3>
          <p className="text-[#5C5B61] mt-1 text-sm md:text-base">{t("lifetime_offer.lifetime_deal")}</p>
        </div>

        <div className="pb-5 border-b border-gray-200">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl md:text-4xl font-bold text-[#08272E]">45</span>
            <span className="text-lg md:text-xl text-[#5C5B61]">€</span>
            <span className="text-xs md:text-sm text-[#5C5B61] ml-2">{t("lifetime_offer.tax")}</span>
          </div>
          <p className="text-[#5C5B61] text-xs md:text-sm mt-1">{t("lifetime_offer.pay_once")}</p>
        </div>

        <div>
          <p className="text-xs md:text-sm font-semibold text-[#08272E] mb-2.5">
            {t("lifetime_offer.everything_in_starter")}
          </p>

          <ul className="space-y-2.5 md:space-y-3">
            {[
              t("lifetime_offer.feature_unlimited_deeplinks"),
              t("lifetime_offer.feature_unlimited_clicks"),
              t("lifetime_offer.feature_conversion_sales"),
              t("lifetime_offer.feature_data_1_year"),
              t("lifetime_offer.feature_5_team"),
              t("lifetime_offer.feature_10_domains"),
              t("lifetime_offer.feature_api"),
              t("lifetime_offer.feature_integrations_pro")
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-4 h-4 md:w-5 md:h-5 text-[#3970ff] flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base text-[#08272E]">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <CtaButtonBig type="pricing" size="lg" className="w-full" value={t("lifetime_offer.cta")} href="/api/pay" />
      </div>
    </div>
  );
};

export const LifetimeOfferBusiness = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 pb-6 border-b border-gray-200">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#08272E]">{t("lifetime_offer.business_title")}</h3>
          <p className="text-[#5C5B61] mt-1 text-sm md:text-base">{t("lifetime_offer.business_subtitle")}</p>
          <p className="text-[#5C5B61] text-xs md:text-sm mt-2">{t("lifetime_offer.everything_in_pro")}</p>
        </div>
        <div className="md:text-right">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl md:text-4xl font-bold text-[#08272E]">350</span>
            <span className="text-lg md:text-xl text-[#5C5B61]">€</span>
            <span className="text-[#5C5B61] ml-1 text-sm md:text-base">/{t("lifetime_offer.year")}</span>
          </div>
          <p className="text-xs md:text-sm text-[#5C5B61]">{t("lifetime_offer.billed_annually")}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 md:gap-4 py-5 md:py-6">
        {[
          t("lifetime_offer.feature_sales_10k"),
          t("lifetime_offer.feature_unlimited_conversion"),
          t("lifetime_offer.feature_advanced_ab"),
          t("lifetime_offer.feature_10_team"),
          t("lifetime_offer.feature_100_domains"),
          t("lifetime_offer.feature_data_3_years")
        ].map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <Check className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm md:text-base text-[#08272E]">{feature}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-5 md:pt-6">
        <p className="text-[#5C5B61] text-xs font-semibold uppercase tracking-wider mb-3 md:mb-4">
          {t("lifetime_offer.premium_services")}
        </p>
        <div className="grid md:grid-cols-2 gap-2.5 md:gap-3 mb-6 md:mb-8">
          {[t("lifetime_offer.feature_priority_support"), t("lifetime_offer.feature_webhooks")].map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <Check className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm md:text-base text-[#08272E]">{feature}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="w-full md:w-auto md:px-12" asChild>
            <Link href={`${APP_URL}/register`}>{t("lifetime_offer.get_started")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
