"use client";
import { Check, Split, TrendingDown, UserX } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { Paragraph } from "@/components/base/paragraph";
import { H2 } from "@/components/base/h2";
import { Label } from "@/components/base/label";
import { List, ListItem } from "@/components/base/list";
import { Section } from "@/components/base/section";

export const Problem = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <Section id="problem" className="bg-card px-4 md:px-8 md:py-8 mt-8">
        <Label className="bg-[#FFEAF1] text-[#E0004B]">
          {t("problem.title")}
        </Label>
        <H2 className="mt-4">
          {t.rich("problem.heading", {
            logo: () => (
              <Image
                src="/static/logo.svg"
                alt="pimms"
                className="w-20 inline-block mb-[2px] mr-1"
                width={1000}
                height={179}
              />
            ),
          })}
        </H2>
        <Paragraph>{t("problem.description")}</Paragraph>
        {showMore ? (
          <List className="gap-6 mt-4">
            <ListItemWrapper
              title={t("problem.more.title1")}
              description={t("problem.more.description1")}
              icon={<UserX className="w-6 h-6" />}
              variant="alert"
            />
            <ListItemWrapper
              title={t("problem.more.title2")}
              description={t("problem.more.description2")}
              icon={<TrendingDown className="w-6 h-6" />}
              variant="alert"
            />
            <ListItemWrapper
              title={t("problem.more.title3")}
              description={t("problem.more.description3")}
              icon={<Split className="w-6 h-6" />}
              variant="alert"
            />
          </List>
        ) : (
          <button
            onClick={() => setShowMore(true)}
            className="text-[#08272E] font-bold w-fit my-2 py-2 hover:underline cursor-pointer"
          >
            {t("cta.show_more")}
          </button>
        )}
      </Section>

      <Section id="solutions" className="bg-card px-4 md:px-8 md:py-8 mt-8">
        <Label className="bg-[#f1fdf8] text-[#26CF64]">
          {t("solution.title")}
        </Label>
        <H2 className="mt-4">{t("solution.heading")}</H2>
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
            variant="success"
          />
          <ListItemWrapper
            title={t("solution.more.title2")}
            description={t("solution.more.description2")}
            icon={<Check className="w-6 h-6" />}
            variant="success"
          />
          <ListItemWrapper
            title={t("solution.more.title3")}
            description={t("solution.more.description3")}
            icon={<Check className="w-6 h-6" />}
            variant="success"
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
  description: string;
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
