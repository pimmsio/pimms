import { H2 } from "../base/h2";
import { Paragraph } from "../base/paragraph";
import { useTranslations } from "next-intl";
import { Section } from "../base/section";
import { Check, Globe, ImagePlus } from "lucide-react";
import Image from "next/image";
import { List, ListItem } from "../base/list";

export const LinkFeatures = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  return (
    <Section className="max-w-5xl mx-auto md:py-8">
      <H2 className="mx-auto mb-4 text-center">{t("link_features.title")}</H2>
      <Paragraph className="text-center mx-auto">
        {t("link_features.description")}
      </Paragraph>
      <Section
        id="solutions"
        className="bg-card rounded-3xl border-[6px] border-neutral-100 px-4 md:px-8 mt-8"
      >
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
      <div className="bg-card rounded-3xl border-[6px] border-neutral-100 p-8 w-full mt-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mx-auto max-w-2xl">
          <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <span className="flex items-center gap-2 font-semibold">
              <Globe size={24} />
              {t("link_features.features.title1")}
            </span>
            <p className="max-w-xs text-balance text-sm text-neutral-500 sm:max-w-none">
              {t("link_features.features.description1")}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <span className="flex items-center gap-2 font-semibold">
              <ImagePlus size={24} />
              {t("link_features.features.title2")}
            </span>
            <p className="max-w-xs text-balance text-sm text-neutral-500 sm:max-w-none">
              {t("link_features.features.description2")}
            </p>
          </div>
        </div>
      </div>
    </Section>
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
