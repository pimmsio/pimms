"use client";
import BouncingImages from "@/components/landings/BouncingImages";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Section } from "@/components/base/section";
import { H2 } from "@/components/base/h2";
import CtaButtonBig from "@/components/cta/CtaButtonBig";
import { MoveRight } from "lucide-react";
import { Paragraph } from "../base/paragraph";

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
        <H2 className="my-10">
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
        <div className="flex my-12 w-full">
          <CtaButtonBig
            type={type}
            variant="secondary"
            className="w-full sm:w-10/12 lg:w-9/12 mx-auto md:mx-0"
            value={t.rich("form.button_free", {
              arrow: () => <MoveRight className="!size-6" strokeWidth={2} />,
            })}
          />
        </div>
      </div>
      <div className="flex flex-col w-full md:w-1/2">
        <BouncingImages tkey={`${tkey}.free_offer`} />
      </div>
    </Section>
  );
};
