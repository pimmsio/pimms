import { useTranslations } from "next-intl";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { APP_URL } from "../../app/constants";
import { Button } from "@/components/ui/button";
import CtaButtonBig from "@/components/cta/CtaButtonBig";

interface FeatureItem {
  text: string;
  excluded?: boolean;
}

const renderFeatureList = (features: (string | FeatureItem)[], checkColor: string = "text-green-600") => {
  return features.map((feature, i) => {
    const isExcluded = typeof feature === "object" && feature.excluded;
    const featureText = typeof feature === "object" ? feature.text : feature;
    return (
      <li key={i} className="flex items-start gap-3">
        {isExcluded ? (
          <X className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0 mt-0.5" />
        ) : (
          <Check className={`w-4 h-4 md:w-5 md:h-5 ${checkColor} flex-shrink-0 mt-0.5`} />
        )}
        <span className={`text-sm md:text-base ${isExcluded ? "text-gray-400 line-through" : "text-[#08272E]"}`}>
          {featureText}
        </span>
      </li>
    );
  });
};

export const LifetimeOfferFree = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  const features: (string | FeatureItem)[] = [
    // Core features (most important)
    t("lifetime_offer.feature_smart_deeplinks_10"),
    t("lifetime_offer.feature_mobile_app_redirection"),
    t("lifetime_offer.feature_click_tracking_basic"),
    t("lifetime_offer.feature_real_time_analytics"),

    // Tools
    t("lifetime_offer.feature_qr_codes"),
    t("lifetime_offer.feature_utm_builder"),

    // Basic limits
    t("lifetime_offer.feature_team_1"),
    t("lifetime_offer.feature_domains_1"),
    t("lifetime_offer.feature_data_30_days"),

    // What they're missing (at the end to encourage upgrade)
    { text: t("lifetime_offer.feature_smart_deeplinks_unlimited"), excluded: true },
    { text: t("lifetime_offer.feature_click_tracking_unlimited"), excluded: true },
    { text: t("lifetime_offer.feature_conversion_tracking_unlimited"), excluded: true },
    { text: t("lifetime_offer.feature_sales_tracking_and_attribution"), excluded: true },
    { text: t("lifetime_offer.feature_ab_testing"), excluded: true }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="space-y-4 flex-1">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-[#08272E]">{t("lifetime_offer.plan_starter")}</h3>
          <p className="text-[#5C5B61] mt-1 text-sm md:text-base">{t("lifetime_offer.free_pass")}</p>
        </div>

        <div className="pb-4 border-b border-gray-200">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl md:text-4xl font-bold text-[#08272E]">€0</span>
          </div>
          <p className="text-[#5C5B61] text-xs md:text-sm mt-1">{t("lifetime_offer.forever")}</p>
        </div>

        <ul className="space-y-2 flex-1">{renderFeatureList(features)}</ul>
      </div>

      <div className="mt-6">
        <Button size="lg" className="w-full bg-gray-900 hover:bg-gray-800" asChild>
          <Link href={`${APP_URL}/register`}>{t("lifetime_offer.start_free_cta")}</Link>
        </Button>
      </div>
    </div>
  );
};

export const LifetimeOfferPro = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  const features: (string | FeatureItem)[] = [
    // Unlimited core features (most important)
    t("lifetime_offer.feature_branded_links"),

    // Tracking capabilities
    t("lifetime_offer.feature_click_tracking_unlimited"),
    t("lifetime_offer.feature_conversion_tracking_full"),

    // Sales tracking (separate Stripe item)
    t("lifetime_offer.feature_sales_tracking_and_attribution"),
    t("lifetime_offer.feature_sales_attribution_5k"),
    t("lifetime_offer.feature_stripe_integration"),

    // Team & data
    t("lifetime_offer.feature_team_3"),
    t("lifetime_offer.feature_domains_3"),
    t("lifetime_offer.feature_data_6_months"),

    // Integrations & API (no Stripe mention)
    t("lifetime_offer.feature_integrations_pro"),
    t("lifetime_offer.feature_api_access"),

    // Support
    t("lifetime_offer.feature_priority_support_1_month"),

    // What they're missing (at the end)
    { text: t("lifetime_offer.feature_ab_testing"), excluded: true },
    { text: t("lifetime_offer.feature_bulk_operations"), excluded: true }
  ];

  return (
    <div className="bg-white rounded-2xl border-2 border-[#3970ff] p-6 relative h-full shadow-lg hover:shadow-xl transition-shadow flex flex-col">
      <div className="absolute -top-2.5 left-6 bg-[#3970ff] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
        {t("lifetime_offer.popular")}
      </div>

      <div className="space-y-4 flex-1">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-[#08272E]">{t("lifetime_offer.plan_pro")}</h3>
          <p className="text-[#5C5B61] mt-1 text-sm md:text-base">{t("lifetime_offer.lifetime_deal")}</p>
        </div>

        <div className="pb-4 border-b border-gray-200">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl md:text-4xl font-bold text-[#08272E]">€59</span>
            <span className="text-xs md:text-sm text-[#5C5B61] ml-2">{t("lifetime_offer.tax")}</span>
          </div>
          <p className="text-[#5C5B61] text-xs md:text-sm mt-1">{t("lifetime_offer.pay_once")}</p>
        </div>

        <div className="flex-1">
          <p className="text-xs md:text-sm font-semibold text-[#08272E] mb-2">
            {t("lifetime_offer.everything_in_starter")}
          </p>

          <ul className="space-y-2">{renderFeatureList(features, "text-[#3970ff]")}</ul>
        </div>
      </div>

      <div className="mt-6">
        <CtaButtonBig type="pricing" size="lg" className="w-full" value={t("lifetime_offer.cta")} href="/api/pay" />
      </div>
    </div>
  );
};

export const LifetimeOfferGrowth = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  const features: (string | FeatureItem)[] = [
    // Higher sales tracking (main value prop)
    t("lifetime_offer.feature_sales_attribution_30k"),

    // Advanced features unlocked
    t("lifetime_offer.feature_ab_testing"),
    t("lifetime_offer.feature_bulk_operations"),
    t("lifetime_offer.feature_custom_mobile_redirects"),

    // Enhanced analytics (logical order)
    t("lifetime_offer.feature_conversion_funnel"),
    t("lifetime_offer.feature_revenue_attribution"),

    // Growing team
    t("lifetime_offer.feature_team_5"),
    t("lifetime_offer.feature_domains_10"),
    t("lifetime_offer.feature_data_12_months"),

    // Advanced integrations
    t("lifetime_offer.feature_integrations_shopify"),
    t("lifetime_offer.feature_api_access_enhanced"),

    // Professional services
    t("lifetime_offer.feature_marketing_attribution"),
    t("lifetime_offer.feature_priority_support_3_months")
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="space-y-4 flex-1">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-[#08272E]">{t("lifetime_offer.plan_growth")}</h3>
          <p className="text-[#5C5B61] mt-1 text-sm md:text-base">{t("lifetime_offer.growth_subtitle")}</p>
        </div>

        <div className="pb-4 border-b border-gray-200">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl md:text-4xl font-bold text-[#08272E]">€299</span>
            <span className="text-xs md:text-sm text-[#5C5B61] ml-2">{t("lifetime_offer.tax")}</span>
          </div>
          <p className="text-[#5C5B61] text-xs md:text-sm mt-1">{t("lifetime_offer.pay_once")}</p>
        </div>

        <div className="flex-1">
          <p className="text-xs md:text-sm font-semibold text-[#08272E] mb-2">
            {t("lifetime_offer.everything_in_pro")}
          </p>

          <ul className="space-y-2">{renderFeatureList(features)}</ul>
        </div>
      </div>

      <div className="mt-6">
        <CtaButtonBig type="pricing" size="lg" className="w-full" value={t("lifetime_offer.cta")} href="/api/pay" />
      </div>
    </div>
  );
};

export const LifetimeOfferBusiness = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  const features = [
    // High-volume sales tracking (fixed limit vs scaling)
    t("lifetime_offer.feature_sales_attribution_50k"),

    // Enterprise features (limited vs unlimited)
    t("lifetime_offer.feature_team_10"),
    t("lifetime_offer.feature_domains_100"),
    t("lifetime_offer.feature_data_3_years"),

    // Advanced capabilities
    t("lifetime_offer.feature_fraud_detection"),

    // Enterprise integrations
    t("lifetime_offer.feature_api_access_unlimited"),
    t("lifetime_offer.feature_sso"),

    // Premium services
    t("lifetime_offer.feature_dedicated_manager"),
    t("lifetime_offer.feature_custom_development")
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 pb-6 border-b border-gray-200">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#08272E]">{t("lifetime_offer.business_title")}</h3>
          <p className="text-[#5C5B61] mt-1 text-sm md:text-base">{t("lifetime_offer.business_subtitle")}</p>
          <p className="text-[#5C5B61] text-xs md:text-sm mt-2">{t("lifetime_offer.everything_in_growth")}</p>
        </div>
        <div className="md:text-right">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl md:text-4xl font-bold text-[#08272E]">€50</span>
            <span className="text-[#5C5B61] ml-1 text-sm md:text-base">/{t("lifetime_offer.monthly")}</span>
          </div>
          <p className="text-xs md:text-sm text-[#5C5B61]">{t("lifetime_offer.billed_annually")}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 md:gap-4 py-5 md:py-6">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <Check className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm md:text-base text-[#08272E]">{feature}</span>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button size="lg" className="w-full md:w-auto md:px-12 bg-gray-900 hover:bg-gray-800" asChild>
          <Link href={`${APP_URL}/register`}>{t("lifetime_offer.get_started")}</Link>
        </Button>
      </div>
    </div>
  );
};

export const LifetimeOfferScale = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  const features = [
    // Unlimited scaling
    t("lifetime_offer.feature_sales_tracking_scale"),

    // Enterprise features
    t("lifetime_offer.feature_team_unlimited"),
    t("lifetime_offer.feature_domains_unlimited"),
    t("lifetime_offer.feature_data_unlimited"),

    // Advanced capabilities
    t("lifetime_offer.feature_fraud_detection"),

    // Enterprise integrations
    t("lifetime_offer.feature_api_access_unlimited"),
    t("lifetime_offer.feature_sso"),

    // Premium services
    t("lifetime_offer.feature_dedicated_manager"),
    t("lifetime_offer.feature_custom_development")
  ];

  return (
    <div className="bg-white rounded-2xl border-2 border-[#FF6B35] p-6 md:p-8 relative shadow-lg hover:shadow-xl transition-shadow">
      <div className="absolute -top-2.5 left-6 bg-[#FF6B35] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
        {t("lifetime_offer.enterprise")}
      </div>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 pb-6 border-b border-gray-200">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#08272E]">{t("lifetime_offer.scale_title")}</h3>
          <p className="text-[#5C5B61] mt-1 text-sm md:text-base">{t("lifetime_offer.scale_subtitle")}</p>
          <p className="text-[#5C5B61] text-xs md:text-sm mt-2">{t("lifetime_offer.everything_in_growth")}</p>
        </div>
        <div className="md:text-right">
          <div className="flex items-baseline gap-1">
            <span className="text-xl md:text-2xl font-bold text-[#08272E]">{t("lifetime_offer.scales_per_50k")}</span>
          </div>
          <p className="text-xs md:text-sm text-[#5C5B61]">{t("lifetime_offer.billed_annually")}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 md:gap-4 py-5 md:py-6">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <Check className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm md:text-base text-[#08272E]">{feature}</span>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button size="lg" className="w-full md:w-auto md:px-12 bg-[#FF6B35] hover:bg-[#e55a2b] text-white" asChild>
          <Link href={`${APP_URL}/contact`}>{t("lifetime_offer.contact_sales")}</Link>
        </Button>
      </div>
    </div>
  );
};

// Legacy component name for backward compatibility
export const LifetimeOfferBusinessLifetime = LifetimeOfferGrowth;
