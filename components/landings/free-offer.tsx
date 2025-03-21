"use client";
import BouncingImages from "@/components/landings/BouncingImages";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Paragraph } from "@/components/base/paragraph";
import { Section } from "@/components/base/section";
import { H2 } from "@/components/base/h2";
import CtaButtonBig from "../cta/CtaButtonBig";

export const FreeOffer = ({
  tkey,
  type,
}: {
  tkey: string;
  type: "sales" | "youtube";
}) => {
  const t = useTranslations(tkey);

  return (
    <Section id="free" className="md:flex-row items-center mt-8">
      <div className="w-full md:w-1/2 text-center md:text-left">
        <H2 className="mb-4">
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
        </H2>
        <Paragraph>{t("free_offer.description")}</Paragraph>
        <div className="flex mt-8 mb-6 justify-center md:justify-start">
          <CtaButtonBig tkey={tkey} type={type} className="py-4" />
        </div>
      </div>
      <div className="flex flex-col w-full md:w-1/2">
        <BouncingImages tkey={`${tkey}.free_offer`} />
      </div>
    </Section>
  );
};
