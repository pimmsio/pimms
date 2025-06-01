import BouncingImages from "@/components/landings/BouncingImages";
import { Section } from "@/components/base/section";
import { H2 } from "@/components/base/h2";
import CtaButtonBig from "@/components/cta/CtaButtonBig";
import { Zap } from "lucide-react";
import { Paragraph } from "../base/paragraph";
import { ReactNode } from "react";
import { parseChildren } from "@/lib/mdx/parseChildren";
import { H2 as MDXH2, Text, SmallText } from "@/components/mdx/content";

interface FreeOfferProps {
  type?: "sales" | "youtube";
  children?: ReactNode;
}

type OfferContent = {
  title: ReactNode;
  description: ReactNode;
  bottom: ReactNode;
};

export const FreeOffer = ({ type = "sales", children }: FreeOfferProps) => {
  // Parse children using the utility
  const parsed = parseChildren<OfferContent>(children, {
    title: { component: MDXH2, key: "title" },
    description: { component: Text, key: "description" },
    bottom: { component: SmallText, key: "bottom" }
  });

  return (
    <Section id="free">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1 space-y-6 text-center lg:text-left">
          {parsed.title && <H2 className="text-left">{parsed.title}</H2>}
          {parsed.description && <Paragraph className="text-lg">{parsed.description}</Paragraph>}
          <div className="pt-2">
            <CtaButtonBig
              type={type}
              size="lg"
              value={
                <>
                  <Zap size={32} fill="currentColor" /> Start for free
                  <span className="hidden md:block"> with 10 links</span>
                </>
              }
            />
            {parsed.bottom && (
              <div className="flex items-center justify-center lg:justify-start gap-2 mt-4">
                <span className="text-sm text-[#5C5B61]">{parsed.bottom}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <BouncingImages />
        </div>
      </div>
    </Section>
  );
};
