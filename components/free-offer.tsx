"use client";
import CtaButton from "@/components/cta/CtaButton";
import BouncingImages from "@/components/BouncingImages";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const FreeOffer = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  return (
    <section
      id="free"
      className="w-full max-w-5xl py-6 md:py-12 px-1 flex flex-col md:flex-row items-center mx-auto gap-6 mt-8 rounded-3xl"
    >
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-balance mb-4">
          {t.rich("free_offer.title", {
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
        <p className="text-md md:text-lg leading-relaxed text-balance text-[#5C5B61]">
          {t("free_offer.description")}
        </p>
        <div className="flex mt-8 mb-6 justify-center md:justify-start">
          <CtaButton tkey={tkey} show />
        </div>
      </div>
      <div className="flex flex-col w-full md:w-1/2">
        <BouncingImages tkey={`${tkey}.free_offer`} />
      </div>
    </section>
  );
};
