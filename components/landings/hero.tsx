import { H1, H1Subtitle } from "@/components/base/h1";
import { HeroSection } from "@/components/base/hero-section";
import { ReactNode } from "react";
import { parseChildren } from "@/lib/mdx/parseChildren";
import { Summary } from "@/components/mdx/content";

interface HeroProps {
  children?: ReactNode;
}

type HeroContent = {
  title: ReactNode;
  subtitle: ReactNode;
};

export const Hero = ({ children }: HeroProps) => {
  // Parse children: use same H1 as landings page (base/h1) so component reference matches
  const parsed = parseChildren<HeroContent>(children, {
    title: { component: H1, key: "title" },
    subtitle: { component: Summary, key: "subtitle" }
  });

  return (
    <HeroSection>
      <div className="text-center space-y-10">
        {parsed.title && <H1>{parsed.title}</H1>}
        {parsed.subtitle && <H1Subtitle>{parsed.subtitle}</H1Subtitle>}
      </div>
    </HeroSection>
  );
};
