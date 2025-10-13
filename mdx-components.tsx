import type { MDXComponents } from "mdx/types";
import { H1, H2, H3, H4, Primary, Summary, Text, InlineLogo, TitleIcon, Stronger } from "@/components/mdx/content";
import { Highlight } from "@/components/mdx/Highlight";
import { TextHighlight } from "@/components/mdx/TextHighlight";
import { Avatars } from "@/components/landings/avatars";
import { Hero } from "@/components/landings/hero";
import { Centered, Fast, CtaBottomText, CtaButton } from "@/components/mdx/content";
import ImageSlide from "@/components/landings/Image-slide";
import { HideOnMobile, HideOnDesktop } from "@/components/mdx/content";
import LeadScoringAnimatedList from "@/components/landings/LeadScoringAnimatedList";
import { FaCreditCard, FaLock } from "@/components/icons/custom-icons";
import { AnimatedCentered } from "@/components/mdx/AnimatedCentered";
import { Slide } from "@/components/mdx/Slide";
import {
  PricingCard,
  PricingTitle,
  PricingSubtitle,
  PricingPrice,
  PricingSuffix,
  PriceDisplay,
  PricingCta,
  PricingFeatures,
  PricingFeature,
  PricingHeader,
  PricingTitleGroup,
  PricingTitleRow,
  AbsoluteToggle,
  PricingCommonFeatures,
  CommonFeatureLabel,
  PricingWrapper,
  PricingSlider,
  BillingToggle,
  EventTooltip,
  DynamicPrice,
  DynamicValue,
  DynamicDomains
} from "@/components/mdx/pricing";

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
    Highlight,
    TextHighlight,
    Summary,
    InlineLogo,
    TitleIcon,
    Stronger,
    Avatars,
    Hero,
    Centered,
    Fast,
    CtaButton,
    CtaBottomText,
    ImageSlide,
    HideOnMobile,
    HideOnDesktop,
    LeadScoringAnimatedList,
    FaCreditCard,
    FaLock,
    AnimatedCentered,
    Slide,
    // New pricing components
    PricingCard,
    PricingTitle,
    PricingSubtitle,
    PricingPrice,
    PricingSuffix,
    PriceDisplay,
    PricingCta,
    PricingFeatures,
    PricingFeature,
    PricingHeader,
    PricingTitleGroup,
    PricingTitleRow,
    AbsoluteToggle,
    PricingCommonFeatures,
    CommonFeatureLabel,
    PricingWrapper,
    PricingSlider,
    BillingToggle,
    EventTooltip,
    DynamicPrice,
    DynamicValue,
    DynamicDomains
  };
}
