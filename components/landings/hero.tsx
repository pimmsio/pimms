import { H1, H1Subtitle } from "@/components/base/h1";
import { HeroSection } from "@/components/base/hero-section";
import { BlurFade } from "@/components/magicui/blur-fade";
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
      <div className="text-center space-y-10">
        {parsed.title && (
          <BlurFade direction="up" delay={0.1} inView={false}>
            <H1>{parsed.title}</H1>
          </BlurFade>
        )}
        {parsed.subtitle && (
          <BlurFade direction="up" delay={0.3} inView={false}>
            <H1Subtitle>{parsed.subtitle}</H1Subtitle>
          </BlurFade>
        )}
      </div>
    </HeroSection>
  );
};
