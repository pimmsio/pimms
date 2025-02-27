"use client";
import CtaButton from "@/components/cta/CtaButton";
import BouncingImages from "@/components/BouncingImages";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const Offer = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  return (
    <section className="w-full py-6 md:py-12 px-1 flex flex-col md:flex-row items-center mx-auto max-w-7xl gap-6 mt-8">
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-balance mb-4">
          {t.rich("offer_details.title", {
            logo: () => (
              <Image
                src="/static/logo.svg"
                alt="pim.ms"
                className="w-32 inline-block mb-[6px] ml-1"
                width={1000}
                height={179}
              />
            ),
          })}
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-balance">
          {t("offer_details.description")}
        </p>
        <div className="mt-8 w-full">
          <CtaButton tkey={tkey} show />
        </div>
      </div>
      <div className="flex flex-col w-full md:w-1/2">
        <BouncingImages tkey={`${tkey}.offer_details`} />
      </div>
    </section>
  );
};
