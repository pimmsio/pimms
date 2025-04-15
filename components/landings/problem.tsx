import { H2 } from "../base/h2";
import { Paragraph } from "../base/paragraph";
import { useTranslations } from "next-intl";
import { Section } from "../base/section";
import { CircleX, X } from "lucide-react";
import Image from "next/image";
import { List, ListItem } from "../base/list";
import { Label } from "../base/label";

export const Problem = ({
  tkey,
  showSecondSection = false,
}: {
  tkey: string;
  showSecondSection?: boolean;
}) => {
  const t = useTranslations(tkey);

  return (
    <div className="my-12">
      <Label className="mb-6 mx-auto w-fit bg-[#FFEAF1] text-[#E0004B] py-1.5 flex items-center justify-center gap-2 uppercase px-4 text-sm">
        <CircleX className="w-4 h-4" />
        {t("problem.title")}
      </Label>
      <div className="w-11/12 mx-auto">
        <H2 className="mx-auto mb-4 text-center">
          {t.rich("problem.heading", {
            logo: () => (
              <Image
                src="/static/logo.svg"
                alt="pim.ms"
                className="w-20 sm:w-24 inline-block mb-[2px] mx-0.5"
                width={1000}
                height={179}
              />
            ),
            strong: (chunks) => (
              <span className="text-[#3970ff]">{chunks}</span>
            ),
          })}
        </H2>
      </div>
      <Section
        id="probleme"
        className="bg-card rounded-3xl border-[6px] border-neutral-100 px-4 md:px-8 mt-8 flex flex-col lg:flex-row gap-12 lg:gap-4 items-center"
      >
        <div className="w-full lg:w-3/5">
          <Paragraph>{t("problem.description")}</Paragraph>
          <List className="gap-6 mt-4">
            <ListItemWrapper
              title={t.rich("problem.more.title1", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
              icon={<X className="w-6 h-6" />}
              variant="alert"
            />
            <ListItemWrapper
              title={t.rich("problem.more.title2", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
              icon={<X className="w-6 h-6" />}
              variant="alert"
            />
            <ListItemWrapper
              title={t.rich("problem.more.title3", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
              icon={<X className="w-6 h-6" />}
              variant="alert"
            />
          </List>
        </div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full lg:w-2/5 h-full object-cover z-0 pointer-events-none rounded-3xl border-[6px] border-neutral-100"
        >
          <source
            src="https://assets.pimms.io/too-many-step-paypal.mp4"
            type="video/mp4"
          />
        </video>
      </Section>

      {showSecondSection && (
        <Section className="bg-card rounded-3xl border-[6px] border-neutral-100 px-4 md:px-8 mt-8">
          <Paragraph>{t("problem.description2")}</Paragraph>
          <List className="gap-6 mt-4">
            <ListItemWrapper
              title={t.rich("problem.more2.title1", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
              icon={<X className="w-6 h-6" />}
              variant="alert"
            />
            <ListItemWrapper
              title={t.rich("problem.more2.title2", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
              icon={<X className="w-6 h-6" />}
              variant="alert"
            />
            <ListItemWrapper
              title={t.rich("problem.more2.title3", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
              icon={<X className="w-6 h-6" />}
              variant="alert"
            />
          </List>
        </Section>
      )}
    </div>
  );
};

const ListItemWrapper = ({
  title,
  icon,
  variant,
}: {
  title: string | React.ReactNode;
  icon?: React.ReactNode;
  variant?: "alert" | "success";
}) => {
  return (
    <ListItem className="gap-4" icon={icon} variant={variant} size="lg">
      <Paragraph className="text-[#08272E] font-normal">{title}</Paragraph>
    </ListItem>
  );
};
