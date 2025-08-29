import { useTranslations } from "next-intl";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { APP_URL } from "../../app/constants";
import { Button } from "@/components/ui/button";
import CtaButtonBig from "@/components/cta/CtaButtonBig";
import CalComButton from "./cal-com-button";

interface FeatureItem {
  text: string;
  excluded?: boolean;
}

const renderFeatureList = (features: (string | FeatureItem)[], checkColor: string = "text-success") => {
  return features.map((feature, i) => {
    const isExcluded = typeof feature === "object" && feature.excluded;
    const featureText = typeof feature === "object" ? feature.text : feature;
    return (
      <li key={i} className="flex items-start gap-3 py-1">
        {isExcluded ? (
          <X className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
        ) : (
          <Check className={`w-4 h-4 ${checkColor} flex-shrink-0 mt-0.5`} />
        )}
        <span
          className={`text-sm ${isExcluded ? "text-muted-foreground line-through" : "text-foreground"} leading-relaxed font-medium`}
        >
          {featureText}
        </span>
      </li>
    );
  });
};

export const LifetimeOfferFree = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  const features: (string | FeatureItem)[] = [
    t("lifetime_offer.feature_smart_deeplinks_10"),
    t("lifetime_offer.feature_mobile_app_redirection"),
    t("lifetime_offer.feature_real_time_analytics"),
    t("lifetime_offer.feature_domains_1"),
    t("lifetime_offer.feature_api_access"),
    t("lifetime_offer.feature_utm_builder"),
    t("lifetime_offer.feature_data_30_days"),
    t("lifetime_offer.feature_qr_codes")
  ];

  return (
    <div className="bg-white rounded-2xl outline outline-gray-200 h-full shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4">
      <div className="p-6 sm:p-8">
        <div className="text-left flex flex-col gap-1">
          <h3 className="text-lg font-bold leading-tight text-text-primary">{t("lifetime_offer.plan_free")}</h3>
          <p className="text-text-secondary text-xs max-w-[28ch]">{t("lifetime_offer.free_pass")}</p>
        </div>

        <div className="text-left flex flex-col gap-0">
          <span className="text-2xl font-bold leading-tight text-text-primary">€0</span>
          <p className="text-text-secondary text-xs">{t("lifetime_offer.forever")}</p>
        </div>

        <Button size="sm" variant="outline" className="w-full text-xs mt-2" asChild>
          <Link href={`${APP_URL}/register`}>{t("lifetime_offer.start_free_cta")}</Link>
        </Button>
      </div>

      <div className="bg-accent rounded-b-2xl flex-1 border-t border-gray-100 p-6 sm:p-8">
        <ul className="space-y-2">{renderFeatureList(features, "text-brand-primary")}</ul>
      </div>
    </div>
  );
};

export const LifetimeOfferStarter = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  const features: (string | FeatureItem)[] = [
    t("lifetime_offer.feature_smart_deeplinks_200"),
    t("lifetime_offer.feature_click_tracking_unlimited"),
    t("lifetime_offer.feature_conversion_tracking_full"),
    t("lifetime_offer.feature_integrations_pro"),
    t("lifetime_offer.feature_domains_3"),
    t("lifetime_offer.feature_team_3"),
    t("lifetime_offer.feature_data_6_months"),
    t("lifetime_offer.feature_priority_support_1_month")
  ];

  return (
    <div className="bg-white rounded-2xl outline outline-border h-full shadow-sm hover:shadow-md transition-all duration-300">
      <div className="p-6 sm:p-8 flex flex-col gap-8">
        <div className="text-left flex flex-col gap-1">
          <h3 className="text-xl font-semibold leading-tight text-foreground">{t("lifetime_offer.plan_starter")}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-[30ch]">
            {t("lifetime_offer.lifetime_deal")}
          </p>
        </div>

        <div className="text-left flex flex-col gap-0">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold leading-tight text-foreground">59€</span>
            <span className="text-lg text-muted-foreground">HT</span>
          </div>
          <p className="text-muted-foreground text-sm">{t("lifetime_offer.pay_once")}</p>
        </div>

        <CtaButtonBig
          type="pricing"
          value={t("lifetime_offer.cta")}
          href="/api/pay?id=5kAeWJ8Q2f0O1e8dQS"
          className="w-full"
          size="lg"
        />
      </div>

      <div className="bg-zinc-50 rounded-b-2xl flex-1 border-t border-primary/20 sm:min-h-[455px] p-6 sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          {t("lifetime_offer.everything_in_starter")}
        </p>
        <ul className="space-y-3">{renderFeatureList(features, "text-primary")}</ul>
      </div>
    </div>
  );
};

export const LifetimeOfferPro = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  const features: (string | FeatureItem)[] = [
    t("lifetime_offer.feature_smart_deeplinks_600"),
    t("lifetime_offer.feature_sales_tracking_scale_30k"),
    t("lifetime_offer.feature_stripe_integration"),
    t("lifetime_offer.feature_ab_testing"),
    t("lifetime_offer.feature_webhooks"),
    t("lifetime_offer.feature_team_5"),
    t("lifetime_offer.feature_data_12_months"),
    t("lifetime_offer.feature_priority_support_3_months")
  ];

  return (
    <div className="bg-white rounded-2xl outline-1 outline-brand-primary h-full shadow-md hover:shadow-lg transition-all duration-300">
      <div className="p-6 sm:p-8 flex flex-col gap-8">
        <div className="text-left flex flex-col gap-1">
          <h3 className="text-xl font-semibold leading-tight text-foreground">{t("lifetime_offer.plan_pro")}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-[30ch]">
            {t("lifetime_offer.growth_subtitle")}
          </p>
        </div>

        <div className="text-left flex flex-col gap-0">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold leading-tight text-foreground">99€</span>
            <span className="text-lg text-muted-foreground">HT</span>
          </div>
          <p className="text-muted-foreground text-sm">{t("lifetime_offer.pay_once")}</p>
        </div>

        <CtaButtonBig
          type="pricing"
          value={t("lifetime_offer.cta")}
          href="/api/pay?id=9B66oG2VvcYq3STaGmc7u07"
          className="w-full"
          size="lg"
        />
      </div>

      <div className="bg-zinc-50 rounded-b-2xl flex-1 border-t border-brand-primary/20 sm:min-h-[455px] p-6 sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          {t("lifetime_offer.everything_in_pro")}
        </p>
        <ul className="space-y-3">{renderFeatureList(features, "text-brand-primary")}</ul>
      </div>
    </div>
  );
};

export const LifetimeOfferScale = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  const features = [
    t("lifetime_offer.feature_smart_deeplinks_unlimited"),
    t("lifetime_offer.feature_click_tracking_unlimited"),
    t("lifetime_offer.feature_sales_tracking_scale"),
    t("lifetime_offer.feature_team_unlimited"),
    t("lifetime_offer.feature_domains_unlimited"),
    t("lifetime_offer.feature_bulk_operations")
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl outline outline-gray-700 h-full shadow-md hover:shadow-lg transition-all duration-300">
      <div className="p-6 sm:p-8 flex flex-col gap-8">
        <div className="text-left flex flex-col gap-1 sm:min-h-[101px]">
          <h3 className="text-xl font-semibold leading-tight text-white">{t("lifetime_offer.business_title")}</h3>
          <p className="text-gray-300 text-sm leading-relaxed max-w-[30ch]">
            {t("lifetime_offer.everything_in_growth")}
          </p>
        </div>

        <div className="text-left">
          <span className="text-2xl font-medium leading-tight text-gray-300">{t("lifetime_offer.ondemand")}</span>
        </div>

        <CalComButton variant="inverse" className="w-full">
          {t("lifetime_offer.contact_sales")}
        </CalComButton>
      </div>

      <div className="bg-gray-800 rounded-b-2xl flex-1 border-t border-white/10 sm:min-h-[455px] p-6 sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-300 mb-3">
          {t("lifetime_offer.everything_in_growth")}
        </p>
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 py-1">
              <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-300 leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
