import { H2 } from "../base/h2";
import { Paragraph } from "../base/paragraph";
import { useLocale, useTranslations } from "next-intl";
import { Section } from "../base/section";
import { AnalyticsDemo } from "../charts/analytics-demo";
import { FilterFeature } from "./filter-feature";
import Referer from "../charts/referer";
import Image from "next/image";
import { Label } from "../base/label";
import { Globe, Share2, Zap } from "lucide-react";

export const TopFeatures = ({ tkey, showConversions = true }: { tkey: string; showConversions?: boolean }) => {
  const t = useTranslations(tkey);
  const locale = useLocale();

  return (
    <Section id="top-features">
      <div className="text-center mb-12">
        <Label className="mb-6">{t("top_features.title")}</Label>
        <H2 className="mb-4">
          {t.rich("top_features.heading", {
            logo: () => (
              <Image
                src="/static/logo.svg"
                alt="PIMMS"
                className="w-20 lg:w-24 inline-block align-baseline mx-2"
                width={1000}
                height={179}
              />
            ),
            strong: (chunks) => <span className="text-[#3970ff]">{chunks}</span>
          })}
        </H2>
        <Paragraph className="text-lg text-[#5C5B61] max-w-3xl mx-auto">{t("top_features.description")}</Paragraph>
      </div>

      <div className="space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden border border-gray-200">
              <Image
                src={`/static/deeplink-${locale}.svg`}
                alt="Deep Analytics"
                className="w-full"
                width={1000}
                height={179}
              />
            </div>
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-4">
            <h3 className="text-2xl font-bold text-[#08272E]">{t("top_features.features.title1")}</h3>
            <Paragraph className="text-[#5C5B61]">{t("top_features.features.description1")}</Paragraph>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-2xl font-bold text-[#08272E]">{t("top_features.features.title2")}</h3>
            <Paragraph className="text-[#5C5B61]">{t("top_features.features.description2")}</Paragraph>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden border border-gray-200">
              <AnalyticsDemo tkey={tkey} showConversions={showConversions} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden border border-gray-200">
              <Referer />
            </div>
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-4">
            <h3 className="text-2xl font-bold text-[#08272E]">{t("top_features.features.title3")}</h3>
            <Paragraph className="text-[#5C5B61]">{t("top_features.features.description3")}</Paragraph>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-2xl font-bold text-[#08272E]">{t("top_features.features.title4")}</h3>
            <Paragraph className="text-[#5C5B61]">{t("top_features.features.description4")}</Paragraph>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
              <FilterFeature tkey={tkey} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#3970ff]/10 rounded-2xl mb-6">
                <Zap size={28} className="text-[#3970ff]" />
              </div>
              <h4 className="font-semibold text-lg text-[#08272E] mb-3">
                {t("top_features.analytics_features.title1")}
              </h4>
              <p className="text-[#5C5B61]">{t("top_features.analytics_features.description1")}</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#3970ff]/10 rounded-2xl mb-6">
                <Globe size={28} className="text-[#3970ff]" />
              </div>
              <h4 className="font-semibold text-lg text-[#08272E] mb-3">{t("top_features.link_features.title1")}</h4>
              <p className="text-[#5C5B61]">{t("top_features.link_features.description1")}</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#3970ff]/10 rounded-2xl mb-6">
                <Share2 size={28} className="text-[#3970ff]" />
              </div>
              <h4 className="font-semibold text-lg text-[#08272E] mb-3">
                {t("top_features.analytics_features.title3")}
              </h4>
              <p className="text-[#5C5B61]">{t("top_features.analytics_features.description3")}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
