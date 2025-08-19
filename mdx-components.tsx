import type { MDXComponents } from "mdx/types";
import { H1, H2, H3, H4, Primary, Summary, Text } from "@/components/mdx/content";
import { Avatars } from "@/components/landings/avatars";
import { Hero } from "@/components/landings/hero";
import { Centered, Fast, CtaBottomText } from "@/components/mdx/content";
import ImageSlide from "@/components/landings/Image-slide";
import CtaButton from "@/components/cta/CtaButton";
import { HideOnMobile, HideOnDesktop } from "@/components/mdx/content";
import DeeplinkDemo from "@/components/landings/deeplink-demo";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Map markdown elements to custom components
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    p: Text,
    // Components available in MDX
    Primary,
    Summary,
    Avatars,
    Hero,
    Centered,
    Fast,
    CtaButton,
    CtaBottomText,
    ImageSlide,
    HideOnMobile,
    HideOnDesktop,
    DeeplinkDemo
  };
}
