import { H2 } from "../base/h2";
import { Paragraph } from "../base/paragraph";
import { Column, ColumnBlock, ColumnItem } from "../base/column";
import { useTranslations } from "next-intl";
import { Section } from "../base/section";
import { AnalyticsDemo } from "../charts/analytics-demo";
import { Calendar1, Share2, Zap } from "lucide-react";
import { FilterFeature } from "./filter-feature";

export const TopFeatures = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  return (
    <>
      <Section className="max-w-5xl mx-auto">
        <H2 className="mx-auto mb-4 mt-8 text-center">
          {t("top_features.title")}
        </H2>
        <Paragraph className="text-center mb-4 mx-auto">
          {t("top_features.description")}
        </Paragraph>

        <Column>
          <ColumnItem>
            <ColumnBlock className="justify-between gap-10 rounded-3xl border-[6px] border-neutral-100 bg-card overflow-hidden">
              <div className="relative h-[275px]">
                <AnalyticsDemo tkey={tkey} />
              </div>
              <div className="relative flex flex-col px-6 pb-6">
                <h3 className="text-base font-semibold text-[#08272E]">
                  {t("top_features.features.title1")}
                </h3>
                <Paragraph>{t("top_features.features.description1")}</Paragraph>
              </div>
            </ColumnBlock>
            <ColumnBlock className="justify-between gap-10 rounded-3xl border-[6px] border-neutral-100 bg-card overflow-hidden">
              <div className="relative h-[275px]">
                <FilterFeature tkey={tkey} />
              </div>
              <div className="relative flex flex-col px-6 pb-6">
                <h3 className="text-base font-semibold text-[#08272E]">
                  {t("top_features.features.title2")}
                </h3>
                <Paragraph>{t("top_features.features.description2")}</Paragraph>
              </div>
            </ColumnBlock>
          </ColumnItem>
        </Column>
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
                <Calendar1 size={24} />
                {t("top_features.analytics_features.title2")}
              </span>
              <p className="max-w-xs text-balance text-sm text-neutral-500 sm:max-w-none">
                {t("top_features.analytics_features.description2")}
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
      </Section>
    </>
  );
};
