"use client";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Paragraph } from "@/components/base/paragraph";
import { H2 } from "@/components/base/h2";
import { List, ListItem } from "@/components/base/list";
import { Section } from "@/components/base/section";

export const Problem = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  return (
    <>
      <H2 className="text-center mb-4">{t("deeplinks_explanation.title")}</H2>
      <Paragraph className="text-center mb-4">
        {t("deeplinks_explanation.description")}
      </Paragraph>
      <Section id="solutions" className="bg-card px-4 md:px-8 md:py-8 mt-8">
        <Paragraph className="mt-4">
          {t.rich("solution.description", {
            logo: () => (
              <Image
                src="/static/logo.svg"
                alt="pim.ms"
                className="w-16 inline-block mb-[2px] mr-0.5"
                width={1000}
                height={179}
              />
            ),
          })}
        </Paragraph>
        <List className="gap-6 mt-4">
          <ListItemWrapper
            title={t("solution.more.title1")}
            description={t("solution.more.description1")}
            icon={<Check className="w-6 h-6" />}
          />
          <ListItemWrapper
            title={t("solution.more.title2")}
            description={t("solution.more.description2")}
            icon={<Check className="w-6 h-6" />}
          />
          <ListItemWrapper
            title={t("solution.more.title3")}
            description={t("solution.more.description3")}
            icon={<Check className="w-6 h-6" />}
          />
        </List>
      </Section>
    </>
  );
};

const ListItemWrapper = ({
  title,
  description,
  icon,
  variant,
}: {
  title: string;
  description: string | React.ReactNode;
  icon?: React.ReactNode;
  variant?: "alert" | "success";
}) => {
  return (
    <ListItem className="gap-4" icon={icon} variant={variant} size="lg">
      <div className="flex flex-col">
        <Paragraph className="text-[#08272E] font-bold">{title}</Paragraph>
        <Paragraph className="md:text-md">{description}</Paragraph>
      </div>
    </ListItem>
  );
};
