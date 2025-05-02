import { Section } from "../base/section";
import { H2 } from "../base/h2";
import { Paragraph } from "../base/paragraph";
import { Zap } from "lucide-react";
import CtaButtonBig from "../cta/CtaButtonBig";
import { useTranslations } from "next-intl";

export function CallToAction() {
  const t = useTranslations("blog.cta");
  const tcommon = useTranslations("landing.common");

  return (
    <Section className="w-full mx-auto my-8 bg-background-secondary border-[6px] border-neutral-100 rounded-3xl px-2 sm:px-12 py-8 text-center">
      <H2 className="mb-4 text-balance text-center mx-auto">{t("headline")}</H2>
      <Paragraph className="text-center text-lg text-muted-foreground">
        {t("sub")}
      </Paragraph>
      <div className="w-11/12 mx-auto">
        <CtaButtonBig
          type="sales"
          className="mt-6 mb-4"
          value={tcommon.rich("cta.main", {
            fast: () => <Zap size={32} fill="currentColor" />,
            large: (chunks) => (
              <span className="hidden md:block">{chunks}</span>
            ),
          })}
        />
        <div className="text-xs text-muted-foreground text-center font-semibold">
          {tcommon("cta.bottom")}
        </div>
      </div>
    </Section>
  );
}
