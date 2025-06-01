import { H1, H1Subtitle } from "@/components/base/h1";
import { HeroSection } from "@/components/base/hero-section";
import { ReactNode } from "react";
import { parseChildren } from "@/lib/mdx/parseChildren";
import { H1 as MDXH1, Summary } from "@/components/mdx/content";

interface HeroProps {
  children?: ReactNode;
}

type HeroContent = {
  title: ReactNode;
  subtitle: ReactNode;
};

export const Hero = ({ children }: HeroProps) => {
  // Parse children using the utility
  const parsed = parseChildren<HeroContent>(children, {
    title: { component: MDXH1, key: "title" },
    subtitle: { component: Summary, key: "subtitle" }
  });

  return (
    <HeroSection>
      <div className="text-center space-y-6">
        {parsed.title && <H1>{parsed.title}</H1>}
        {parsed.subtitle && <H1Subtitle>{parsed.subtitle}</H1Subtitle>}
      </div>
    </HeroSection>
  );
};
