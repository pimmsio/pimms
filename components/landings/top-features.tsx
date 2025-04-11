import { H2 } from "../base/h2";
import { Paragraph } from "../base/paragraph";
import { useLocale, useTranslations } from "next-intl";
import { Section } from "../base/section";
import { AnalyticsDemo } from "../charts/analytics-demo";
import { FilterFeature } from "./filter-feature";
import Referer from "../charts/referer";
import Image from "next/image";
import { Label } from "../base/label";
import { Check, Globe, Share2, Zap } from "lucide-react";

export const TopFeatures = ({
  tkey,
  showConversions = true,
}: {
  tkey: string;
  showConversions?: boolean;
}) => {
  const t = useTranslations(tkey);
  const locale = useLocale();

  return (
    <Section className="max-w-5xl mx-auto">
      <Label className="mb-6 mx-auto w-fit bg-[#3970ff] text-white py-1.5 flex items-center justify-center gap-3 uppercase px-4 text-sm">
        <Check className="w-4 h-4" />
        {t("top_features.title")}
      </Label>

      <H2 className="mx-auto my-4 text-center">
        {t.rich("top_features.heading", {
          strong: (chunks) => <span className="text-[#3970ff]">{chunks}</span>,
        })}
      </H2>
      <Paragraph className="text-center mb-12 mx-auto">
        {t("top_features.description")}
      </Paragraph>

      <div className="flex flex-col gap-12 mx-auto w-full max-w-screen-lg">
        <div className="justify-between gap-6 w-full overflow-hidden flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/2">
            <Image
              src={`/static/deeplink-${locale}.svg`}
              alt="pim.ms"
              className={"w-full border-[6px] border-neutral-100 rounded-3xl"}
              width={1000}
              height={179}
            />
          </div>
          <div className="flex flex-col px-6 pb-6 w-full sm:w-1/2 justify-center">
            <h3 className="text-lg sm:text-xl mb-2 font-semibold text-[#08272E]">
              {t("top_features.features.title1")}
            </h3>
            <Paragraph>{t("top_features.features.description1")}</Paragraph>
          </div>
        </div>
        <div className="justify-between gap-6 w-full overflow-hidden flex flex-col sm:flex-row-reverse">
          <div className="w-full sm:w-1/2">
            <AnalyticsDemo tkey={tkey} showConversions={showConversions} />
          </div>
          <div className="flex flex-col px-6 pb-6 w-full sm:w-1/2 justify-center">
            <h3 className="text-lg sm:text-xl mb-2 font-semibold text-[#08272E]">
              {t("top_features.features.title2")}
            </h3>
            <Paragraph>{t("top_features.features.description2")}</Paragraph>
          </div>
        </div>
        <div className="justify-between gap-6 w-full overflow-hidden flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/2">
            <Referer />
          </div>
          <div className="flex flex-col px-6 pb-6 w-full sm:w-1/2 justify-center">
            <h3 className="text-lg sm:text-xl mb-2 font-semibold text-[#08272E]">
              {t("top_features.features.title3")}
            </h3>
            <Paragraph>{t("top_features.features.description3")}</Paragraph>
          </div>
        </div>
        <div className="justify-between gap-6 w-full overflow-hidden flex flex-col sm:flex-row-reverse">
          <div className="w-full sm:w-1/2 bg-card rounded-3xl border-[6px] border-neutral-100">
            <FilterFeature tkey={tkey} />
          </div>
          <div className="flex flex-col px-6 pb-6 w-full sm:w-1/2 justify-center">
            <h3 className="text-lg sm:text-xl mb-2 font-semibold text-[#08272E]">
              {t("top_features.features.title4")}
            </h3>
            <Paragraph>{t("top_features.features.description4")}</Paragraph>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-3xl border-[6px] border-neutral-100 p-8 w-full mt-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 mx-auto max-w-3xl">
          <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <span className="flex items-center gap-2 font-semibold">
              <Zap size={24} />
              {t("top_features.analytics_features.title1")}
            </span>
            <p className="max-w-xs text-balance text-sm text-neutral-500 sm:max-w-none">
              {t("top_features.analytics_features.description1")}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <span className="flex items-center gap-2 font-semibold">
              <Globe size={24} />
              {t("top_features.link_features.title1")}
            </span>
            <p className="max-w-xs text-balance text-sm text-neutral-500 sm:max-w-none">
              {t("top_features.link_features.description1")}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <span className="flex items-center gap-2 font-semibold">
              <Share2 size={24} />
              {t("top_features.analytics_features.title3")}
            </span>
            <p className="max-w-xs text-balance text-sm text-neutral-500 sm:max-w-none">
              {t("top_features.analytics_features.description3")}
            </p>
          </div>
        </div>
      </div>
      {/* <div className="bg-card rounded-3xl border-[6px] border-neutral-100 p-8 w-full mt-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mx-auto max-w-2xl">
          <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <span className="flex items-center gap-2 font-semibold">
              <Globe size={24} />
              {t("link_features.features.title1")}
            </span>
            <p className="max-w-xs text-balance text-sm text-neutral-500 sm:max-w-none">
              {t("link_features.features.description1")}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <span className="flex items-center gap-2 font-semibold">
              <ImagePlus size={24} />
              {t("link_features.features.title2")}
            </span>
            <p className="max-w-xs text-balance text-sm text-neutral-500 sm:max-w-none">
              {t("link_features.features.description2")}
            </p>
          </div>
        </div>
      </div> */}
    </Section>
  );
};
