"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Calendar,
  Check,
  Cloud,
  Crown,
  DollarSign,
  Link,
  MousePointerClick,
  User2,
  WholeWord,
} from "lucide-react";
import { Button } from "./ui/button";

export const LifetimeOffer = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  return (
    <section
      id="lifetime"
      className="relative rounded-3xl max-w-5xl mx-auto bg-[#80CFFF] ring-[8px] ring-[#B3E4FF] shadow-lg text-[#08272E] w-full p-8 md:p-12 flex flex-col gap-4 mt-8 mb-24 items-center"
    >
      <div className="highlight transition duration-300 absolute w-[100%] h-[100%] left-[-3%] top-[-3%] bg-white blur-[1em] opacity-20"></div>
      {/* <div className="flex items-center gap-2 text-sm font-semibold p-2 bg-[#B3E4FF] text-[#08272E] rounded-xl z-10 mb-6">
        <Timer className="w-4 h-4" />
        {t("lifetime_offer.promo_code")}
      </div> */}
      <div className="flex flex-col md:flex-row items-start gap-4 z-10">
        <div className="w-full md:w-1/2 text-left gap-2 flex flex-col z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-balance mb-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#FFD700] text-[#08272E] p-2">
              <Crown className="w-6 h-6" />
            </span>
            {t.rich("lifetime_offer.title", {
              logo: () => (
                <Image
                  src="/static/logo.svg"
                  alt="PIMMS"
                  className="w-32 inline-block mb-[6px] ml-4"
                  width={1000}
                  height={179}
                />
              ),
            })}
          </h2>
          <div className="text-4xl flex items-start leading-none font-bold">
            <div className="inline-flex opacity-60 mr-2 text-2xl diag-strikethrough">
              <div className="text-sm mt-0.5">€</div>99
            </div>
            <div className="text-sm mt-0.5">€</div>
            <div className="mr-0.5 text-4xl">45</div>
            <div className="text-base self-end opacity-90 ml-1">
              {t("lifetime_offer.price_lifetime")}
            </div>
          </div>
          <div className="w-fit rounded-md inline-block text-xs bg-gray-100 text-slate-900 font-bold uppercase tracking-wide p-0.5 px-1.5 shadow mb-1">
            {t.rich("lifetime_offer.early_bird", {
              price: () => <span className="text-sm">€54</span>,
            })}
          </div>
          <div className="flex my-8 md:mb-0 flex-col gap-4 items-start">
            <Button
              variant="secondary"
              className="py-[0.8em] text-xl md:min-w-64 w-fit hover:scale-105"
              size="lg"
              onClick={() => {
                window.location.href =
                  "https://buy.stripe.com/00g15T7LY4ma2iceUX";
              }}
            >
              <span className="inline p-2 bg-[#FFD700] rounded-full">
                <Crown className="w-6 h-6" />
              </span>
              {t("lifetime_offer.cta")}
            </Button>
            <ul className="list-none font-bold flex flex-wrap gap-2 md:justify-center">
              <li className="text-md md:text-lg flex-row flex gap-2 items-center">
                <div className="p-1 bg-[#B3E4FF] text-[#08272E] w-fit h-fit rounded-full">
                  <Check className="w-4 h-4" />
                </div>
                {t("lifetime_offer.pay_once")}
              </li>
              <li className="text-md md:text-lg flex-row flex gap-2 items-center">
                <div className="p-1 bg-[#B3E4FF] text-[#08272E] w-fit h-fit rounded-full">
                  <Check className="w-4 h-4" />
                </div>
                {t("lifetime_offer.yours_forever")}
              </li>
            </ul>
            <div className="text-sm font-semibold p-4 bg-[#B3E4FF] text-[#08272E] rounded-xl">
              {t("lifetime_offer.money_back")}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/2 z-10">
          <ul className="list-none flex flex-col gap-4 font-semibold">
            <li className="flex items-start gap-2 text-base leading-snug text-[#08272E] fill-current">
              <div className="p-1 bg-[#08272E] text-white w-fit h-fit rounded-full">
                <DollarSign className="w-4 h-4" />
              </div>
              <div className="flex-1">{t("lifetime_offer.features.1")}</div>
            </li>
            <li className="flex items-start gap-2 text-base leading-snug text-[#08272E] fill-current">
              <div className="p-1 bg-[#08272E] text-white w-fit h-fit rounded-full">
                <Link className="w-4 h-4" />
              </div>
              <div className="flex-1">{t("lifetime_offer.features.2")}</div>
            </li>
            <li className="flex items-start gap-2 text-base leading-snug text-[#08272E] fill-current">
              <div className="p-1 bg-[#08272E] text-white w-fit h-fit rounded-full">
                <MousePointerClick className="w-4 h-4" />
              </div>
              <div className="flex-1">{t("lifetime_offer.features.3")}</div>
            </li>
            <li className="flex items-start gap-2 text-base leading-snug text-[#08272E] fill-current">
              <div className="p-1 bg-[#08272E] text-white w-fit h-fit rounded-full">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="flex-1">{t("lifetime_offer.features.4")}</div>
            </li>
            <li className="flex items-start gap-2 text-base leading-snug text-[#08272E] fill-current">
              <div className="p-1 bg-[#08272E] text-white w-fit h-fit rounded-full">
                <Cloud className="w-4 h-4" />
              </div>
              <div className="flex-1">{t("lifetime_offer.features.5")}</div>
            </li>
            <li className="flex items-start gap-2 text-base leading-snug text-[#08272E] fill-current">
              <div className="p-1 bg-[#08272E] text-white w-fit h-fit rounded-full">
                <User2 className="w-4 h-4" />
              </div>
              <div className="flex-1">{t("lifetime_offer.features.6")}</div>
            </li>
            <li className="flex items-start gap-2 text-base leading-snug text-[#08272E] fill-current">
              <div className="p-1 bg-[#08272E] text-white w-fit h-fit rounded-full">
                <WholeWord className="w-4 h-4" />
              </div>
              <div className="flex-1">{t("lifetime_offer.features.7")}</div>
            </li>
            <li className="flex items-start gap-2 text-base leading-snug text-[#08272E] fill-current">
              <div className="p-1 bg-[#08272E] text-white w-fit h-fit rounded-full">
                <Check className="w-4 h-4" />
              </div>
              <div className="flex-1">{t("lifetime_offer.features.8")}</div>
            </li>
            <li className="flex items-start gap-2 text-base leading-snug text-[#08272E] fill-current">
              <div className="p-1 bg-[#08272E] text-white w-fit h-fit rounded-full">
                <Check className="w-4 h-4" />
              </div>
              <div className="flex-1">{t("lifetime_offer.features.9")}</div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
