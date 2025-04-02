"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Calendar,
  Check,
  Cloud,
  DollarSign,
  Link,
  MousePointerClick,
  User2,
  WalletCards,
  WholeWord,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/base/section";
import { H2 } from "../base/h2";
import { List, ListItem } from "../base/list";

export const LifetimeOffer = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  return (
    <Section id="lifetime" className="items-center gap-6 mt-8">
      <H2 className="text-center mb-4">{t("lifetime_offer.title")}</H2>
      <div className="relative rounded-3xl bg-[#B3E4FF] ring-[8px] ring-[#80CFFF] shadow-lg text-[#08272E] w-full p-8 md:p-12 flex flex-col gap-4 items-center">
        <div className="highlight transition duration-300 absolute w-[100%] h-[100%] left-[-3%] top-[-3%] bg-white blur-[1em] opacity-20"></div>
        <div className="flex flex-col md:flex-row items-start gap-2 md:gap-24 z-10">
          <div className="w-full md:w-1/2 text-left gap-2 flex flex-col items-center md:items-start z-10">
            <div className="text-2xl md:text-3xl font-bold text-balance mb-4">
              {t.rich("lifetime_offer.offer_name", {
                logo: () => (
                  <Image
                    src="/static/logo.svg"
                    alt="PIMMS"
                    className="w-32 inline-block mb-[6px]"
                    width={1000}
                    height={179}
                  />
                ),
              })}
            </div>
            <div className="text-4xl flex items-start leading-none font-bold">
              <div className="inline-flex opacity-60 mr-2 text-2xl diag-strikethrough">
                99<div className="text-sm mt-0.5">€</div>
              </div>
              <div className="mr-0.5 text-5xl">45</div>
              <div className="text-sm mt-0.5">€ H.T.</div>
            </div>
            <div className="w-fit rounded-md inline-block text-xs bg-[#80CFFF] text-[#08272E] font-semibold uppercase tracking-wide p-0.5 px-1.5 mb-1">
              {t.rich("lifetime_offer.early_bird", {
                price: () => <span className="text-sm">€54</span>,
              })}
            </div>
            <div className="flex my-8 md:mb-0 flex-col gap-4 items-center sm:items-start">
              <Button
                variant="secondary"
                className="py-[0.8em] text-xl md:min-w-64 w-fit hover:scale-105"
                size="lg"
                onClick={() => {
                  window.location.href = `/api/pay`;
                }}
              >
                {t("lifetime_offer.cta")}
                <WalletCards className="!size-6" strokeWidth={2} />
              </Button>
              <ul className="list-none font-medium flex flex-row flex-wrap gap-2 md:justify-center">
                <li className="text-sm flex-row flex gap-1 items-center font-semibold">
                  {t.rich("lifetime_offer.pay_once", {
                    check: () => (
                      <div className="p-1 bg-[#80CFFF] text-[#08272E] w-fit h-fit rounded-full">
                        <Check className="w-4 h-4" />
                      </div>
                    ),
                  })}
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/2 z-10">
            <List className="gap-6 font-medium">
              <ListItem
                icon={<DollarSign className="w-4 h-4" />}
                variant="primary"
              >
                <div className="flex-1">{t("lifetime_offer.features.1")}</div>
              </ListItem>
              <ListItem icon={<Link className="w-4 h-4" />} variant="primary">
                <div className="flex-1">{t("lifetime_offer.features.2")}</div>
              </ListItem>
              <ListItem
                icon={<MousePointerClick className="w-4 h-4" />}
                variant="primary"
              >
                <div className="flex-1">{t("lifetime_offer.features.3")}</div>
              </ListItem>
              <ListItem
                icon={<Calendar className="w-4 h-4" />}
                variant="primary"
              >
                <div className="flex-1">{t("lifetime_offer.features.4")}</div>
              </ListItem>
              <ListItem icon={<Cloud className="w-4 h-4" />} variant="primary">
                <div className="flex-1">{t("lifetime_offer.features.5")}</div>
              </ListItem>
              <ListItem icon={<User2 className="w-4 h-4" />} variant="primary">
                <div className="flex-1">{t("lifetime_offer.features.6")}</div>
              </ListItem>
              <ListItem
                icon={<WholeWord className="w-4 h-4" />}
                variant="primary"
              >
                <div className="flex-1">{t("lifetime_offer.features.7")}</div>
              </ListItem>
            </List>
          </div>
        </div>
      </div>
    </Section>
  );
};
