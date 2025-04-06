"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { H1 } from "@/components/base/h1";
import { HeroSection } from "@/components/base/hero-section";
import { Paragraph } from "@/components/base/paragraph";
import { List, ListItem } from "@/components/base/list";
import { H1Subtitle } from "../base/h1-subtitle";
export const Hero = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  return (
    <HeroSection>
      <H1>
        {t.rich("hero.title", {
          youtube: () => (
            <Image
              src="/static/youtube.svg"
              alt="YouTube"
              className="w-32 md:w-48 lg:w-60 inline-block mx-0.5 md:mx-1.5 mb-1"
              width={800}
              height={178}
            />
          ),
          not: (chunks) => (
            <span className="relative">
              {chunks}
              <span className="absolute bottom-0 max-md:-translate-x-3/5 left-1/3 flex translate-y-full -rotate-3 flex-nowrap items-center gap-0.5 whitespace-nowrap text-lg font-semibold tracking-wide lg:text-xl">
                {t("hero.additional_title")}
              </span>
            </span>
          ),
        })}
      </H1>

      <H1Subtitle>{t("hero.subtitle")}</H1Subtitle>

      <div className="max-w-sm sm:max-w-md md:max-w-lg flex flex-col items-start justify-left mx-auto px-1 my-4">
        <List className="mt-4 gap-1">
          <ListItem icon={<Check className="w-6 h-6" />}>
            <Paragraph className="font-medium md:text-pretty">
              {t("hero.benefits.1")}
            </Paragraph>
          </ListItem>
          <ListItem icon={<Check className="w-6 h-6" />}>
            <Paragraph className="font-medium md:text-pretty">
              {t("hero.benefits.2")}
            </Paragraph>
          </ListItem>
          <ListItem icon={<Check className="w-6 h-6" />}>
            <Paragraph className="font-medium md:text-pretty">
              {t("hero.benefits.3")}
            </Paragraph>
          </ListItem>
        </List>
      </div>
    </HeroSection>
  );
};
