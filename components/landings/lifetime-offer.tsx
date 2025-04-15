"use client";

import { useTranslations } from "next-intl";
import {
  Database,
  Link,
  MousePointerClick,
  Plus,
  TrendingUp,
  User2,
  WholeWord,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/base/section";
import { H2 } from "../base/h2";
import { List, ListItem } from "../base/list";
import { Paragraph } from "../base/paragraph";

export const LifetimeOffer = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  return (
    <Section id="lifetime" className="items-center gap-6 bg-zinc-100">
      <H2 className="text-center">{t("lifetime_offer.title")}</H2>
      <Paragraph>{t("lifetime_offer.subtitle")}</Paragraph>
      <div className="relative rounded-3xl bg-white text-[#08272E] w-full py-6 px-4 lg:p-0 flex flex-col lg:flex-row gap-8 items-start lg:my-12">
        <div className="w-full lg:w-1/2 text-left gap-4 flex flex-col lg:self-center px-2 lg:py-4 lg:pl-8 lg:justify-center">
          <Paragraph>{t("lifetime_offer.description")}</Paragraph>
          <List className="gap-3 font-medium">
            <ListItem
              icon={<TrendingUp className="w-4 h-4" />}
              variant="primary"
            >
              {t("lifetime_offer.features.1")}
            </ListItem>
            <ListItem icon={<Link className="w-4 h-4" />} variant="primary">
              {t("lifetime_offer.features.2")}
            </ListItem>
            <ListItem
              icon={<MousePointerClick className="w-4 h-4" />}
              variant="primary"
            >
              {t("lifetime_offer.features.3")}
            </ListItem>
            <ListItem icon={<Database className="w-4 h-4" />} variant="primary">
              {t("lifetime_offer.features.4")}
            </ListItem>
            <ListItem icon={<User2 className="w-4 h-4" />} variant="primary">
              {t("lifetime_offer.features.5")}
            </ListItem>
            <ListItem
              icon={<WholeWord className="w-4 h-4" />}
              variant="primary"
            >
              {t("lifetime_offer.features.6")}
            </ListItem>
            <ListItem icon={<Plus className="w-4 h-4" />} variant="primary">
              {t("lifetime_offer.features.7")}
            </ListItem>
          </List>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-y-10 items-center">
          <div className="relative rounded-3xl lg:min-h-[400px] bg-zinc-100 text-[#08272E] w-full py-10 lg:px-10 lg:p-16 border-[6px] border-[#3970ff] flex items-center justify-center lg:scale-110">
            <div className="flex flex-col items-center justify-between gap-6 w-full">
              <div className="absolute -top-3 bg-[#3970ff] text-xs font-bold text-white px-3 py-0.5 rounded-full uppercase">
                {t("lifetime_offer.popular")}
              </div>
              <div className="flex flex-col items-center justify-between gap-6 w-full">
                <div className="text-lg font-bold tracking-tight">
                  {t("lifetime_offer.lifetime_deal")}
                </div>
                <div className="text-4xl flex items-start leading-none font-bold">
                  <div className="inline-flex opacity-60 mr-2 text-2xl diag-strikethrough">
                    75<div className="text-sm mt-0.5">€</div>
                  </div>
                  <div className="mr-0.5 text-6xl">45</div>
                  <div className="text-sm mt-0.5">
                    € {t("lifetime_offer.tax")}
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="py-[0.25em] text-xl w-10/12 md:w-6/12 lg:w-10/12 hover:scale-105"
                  size="lg"
                  onClick={() => {
                    window.location.href = `/api/pay`;
                  }}
                >
                  {t("lifetime_offer.cta")}
                </Button>
                <div className="text-xs">{t("lifetime_offer.pay_once")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Paragraph>{t("lifetime_offer.bottom")}</Paragraph>
    </Section>
  );
};
