import type { MDXComponents } from "mdx/types";
import { H1, H2, H3, H4, Primary, Summary, Text, InlineLogo, TitleIcon } from "@/components/mdx/content";
import { Highlight } from "@/components/mdx/Highlight";
import { TextHighlight } from "@/components/mdx/TextHighlight";
import { Avatars } from "@/components/landings/avatars";
import AvatarFunnel from "@/components/landings/AvatarFunnel";
import HeroRibbon from "@/components/landings/HeroRibbon";
import { Hero } from "@/components/landings/hero";
import { Centered, Fast, CtaBottomText, CtaButton } from "@/components/mdx/content";
import ImageSlide from "@/components/landings/Image-slide";
import { HideOnMobile, HideOnDesktop } from "@/components/mdx/content";
import DeeplinkDemo from "@/components/landings/deeplink-demo";
import LeadScoringAnimatedList from "@/components/landings/LeadScoringAnimatedList";
import { FaCreditCard, FaLock } from "react-icons/fa6";
import { AnimatedCentered } from "@/components/mdx/AnimatedCentered";
import { Slide } from "@/components/mdx/Slide";
import {
  PricingCard,
  PricingTitle,
  PricingSubtitle,
  PricingPrice,
  PricingCta,
  PricingFeatures,
  PricingFeature,
  PricingHeader,
  PricingTitleGroup
} from "@/components/mdx/PricingComponents";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const seedNonce = crypto.randomUUID();

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
    Highlight,
    TextHighlight,
    Summary,
    InlineLogo,
    TitleIcon,
    Avatars,
    Hero,
    Centered,
    Fast,
    CtaButton,
    CtaBottomText,
    ImageSlide,
    HideOnMobile,
    HideOnDesktop,
    DeeplinkDemo,
    LeadScoringAnimatedList,
    FaCreditCard,
    FaLock,
    AnimatedCentered,
    Slide,
    HeroRibbon: (props: any) => <HeroRibbon seedNonce={seedNonce} {...props} />,
    AvatarFunnel: (props: any) => <AvatarFunnel seedNonce={seedNonce} {...props} />,
    // New pricing components
    PricingCard,
    PricingTitle,
    PricingSubtitle,
    PricingPrice,
    PricingCta,
    PricingFeatures,
    PricingFeature,
    PricingHeader,
    PricingTitleGroup
  };
}
