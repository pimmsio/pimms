import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getPage } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";
import { twMerge } from "tailwind-merge";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { rehypeOlStartCounter } from "@/lib/mdx/rehypeOlStartCounter";
import remarkDirective from "remark-directive";
import { remarkIframeDirective } from "@/lib/mdx/remarkIframeDirective";
import { remarkFaqDirective } from "@/lib/mdx/remarkFaqDirective";
import { remarkCtaPlaceholder } from "@/lib/mdx/remarkCtaDirective";
import { remarkCustomDirectives } from "@/lib/mdx/remarkCustomDirectives";
import { remarkAtSyntax } from "@/lib/mdx/remark-at-syntax";
import { cn, generateLandingMetadata, getCanonicalLink } from "@/lib/utils";
import { landingFolders } from "@/i18n/config";
import { Zap } from "lucide-react";
import { notFound } from "next/navigation";
import { FaCreditCard, FaLock } from "react-icons/fa6";

// Import MDX components
import { Highlight } from "@/components/mdx/Highlight";
import { TextHighlight } from "@/components/mdx/TextHighlight";
import { Pre } from "@/components/mdx/Pre";
import TallyIframe from "@/components/mdx/TallyIframe";
import { Slide } from "@/components/mdx/Slide";
import { CallToAction } from "@/components/mdx/CallToAction";
import { Callout } from "@/components/mdx/Callout";
import { Faq } from "@/components/mdx/Faq";
import { Figure } from "@/components/mdx/Figure";
import { InfoSection } from "@/components/mdx/InfoSection";
import { LinkCards, LinkCard } from "@/components/mdx/LinkCards";
import { Quote } from "@/components/mdx/Quote";
import { Steps, Step, StepCompleted } from "@/components/mdx/Steps";
import { FaqStructuredData } from "@/components/mdx/FaqStructuredData";
import { AnimatedCentered } from "@/components/mdx/AnimatedCentered";
import { BlurFade } from "@/components/magicui/blur-fade";

// Import landing components
import { Hero } from "@/components/landings/hero";
import { Avatars } from "@/components/landings/avatars";
import { Problem } from "@/components/landings/problem";
import Header from "@/components/landings/header";
import ImageSlide from "@/components/landings/Image-slide";
import VideoSlide from "@/components/landings/VideoSlide";

import Footer from "@/components/footer/footer";
import LogosCircle from "@/components/logos-circle";
import { DeeplinkDemo as DeeplinkDemoComponent } from "@/components/landings/deeplink-demo";
import CtaButtonBig from "@/components/cta/CtaButtonBig";
import BouncingImages from "@/components/landings/BouncingImages";
import IntegrationsGrid from "@/components/landings/integrations-grid";
import LeadScoringAnimatedList from "@/components/landings/LeadScoringAnimatedList";
import ConversionFlipCard from "@/components/landings/ConversionFlipCard";
import HeroBenefits from "@/components/landings/hero-benefits";
import StylizedTestimonials from "@/components/landings/stylized-testimonials";
import ContactSidebar from "@/components/landings/contact-sidebar";

// Import generic content components
import {
  H1,
  H2,
  H3,
  H4,
  Summary,
  Text,
  SmallText,
  Label,
  List,
  Item,
  Feature,
  FeatureTitle,
  FeatureText,
  FeatureCard,
  IconBox,
  Group,
  Features,
  CTA,
  Fast,
  CtaBottomText,
  WithoutPimms,
  Video,
  Centered,
  Section,
  TwoColumns,
  Column,
  Primary,
  TitleIcon,
  HideOnMobile,
  HideOnDesktop,
  InlineLogo
} from "@/components/mdx/content";

// Import chart components
import { AnalyticsDemo } from "@/components/charts/analytics-demo";
import Referer from "@/components/charts/referer";
import { FilterFeature } from "@/components/landings/filter-feature";
import { ABTestingDemo } from "@/components/landings/ab-testing-demo";
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

import CtaDemo from "@/components/cta/CtaDemo";
import { ComparisonContainer, ComparisonHeader, ComparisonRow } from "@/components/landings/ComparisonTable";
import AvatarFunnel from "../../../../../components/landings/AvatarFunnel";
import HeroRibbon from "../../../../../components/landings/HeroRibbon";
import { SwapRotate } from "../../../../../components/magicui/swap-rotate";

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { slug } = await params;
  const pathname = slug === "home" ? "/" : `/landings/${slug}`;
  return generateLandingMetadata({ params, lkey: slug, pathname });
}

export async function generateStaticParams() {
  return [
    { slug: "home" },
    { slug: "youtube" },
    { slug: "linkedin-tracker" },
    { slug: "systemeio" },
    { slug: "landing-page-tracking" }
  ];
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const seedNonce = crypto.randomUUID();

  try {
    const page = getPage(locale, landingFolders, slug);

    const components = {
      // Layout components
      Slide,
      Section,
      Header,
      Footer: () => <Footer showRef={true} showApps={true} />,

      // Landing page specific components
      Avatars: ({ children }: { children?: React.ReactNode }) => {
        return <Avatars>{children || null}</Avatars>;
      },
      Hero,
      Problem,

      // Composable pricing components
      PricingCard,
      PricingTitle,
      PricingSubtitle,
      PricingPrice,
      PricingCta,
      PricingFeatures,
      PricingFeature,
      PricingHeader,
      PricingTitleGroup,
      BouncingImages: () => <BouncingImages tkey="landing" />,
      LogosCircle,
      IntegrationsGrid,
      HeroRibbon: (props: any) => <HeroRibbon seedNonce={seedNonce} {...props} />,
      AvatarFunnel: (props: any) => <AvatarFunnel seedNonce={seedNonce} {...props} />,
      ConversionFlipCard,
      ImageSlide,
      VideoSlide,
      HeroBenefits,
      SwapRotate,
      StylizedTestimonials,
      ContactSidebar,
      ComparisonContainer,
      ComparisonHeader,
      ComparisonRow,
      // CTA components
      CtaButton: ({
        children,
        variant = "default",
        href
      }: {
        children?: React.ReactNode;
        variant?: "default" | "secondary" | "outline" | "inverse";
        href?: string;
      }) => {
        const t = useTranslations("landing");
        // If children is provided, use it directly
        if (children) {
          return (
            <CtaButtonBig
              type="sales"
              size="xl"
              variant={variant}
              className="my-2 gap-1 w-fit mx-auto sm:min-w-[380px]"
              value={children}
              href={href}
            />
          );
        }
        // Otherwise use the default translation
        return (
          <CtaButtonBig
            type="sales"
            size="xl"
            variant={variant}
            className="py-3 my-2 w-full md:w-fit mx-auto"
            value={t.rich("cta.main", {
              fast: () => <Zap size={32} fill="currentColor" />,
              large: (chunks: any) => <span className="hidden md:block">{chunks}</span>
            })}
            href={href}
          />
        );
      },
      CtaDemo,
      // Content components
      Primary,
      TitleIcon,
      HideOnMobile,
      HideOnDesktop,
      Fast,
      CtaBottomText,
      InlineLogo,

      // Animated components
      AnimatedCentered,
      BlurFade,
      WithoutPimms,
      Video,
      Centered,
      TwoColumns,
      Column,

      // Generic content components
      H1,
      H2,
      H3,
      H4,
      Highlight,
      TextHighlight,
      Summary,
      Text,
      Stronger: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <strong className={cn("font-bold text-lg", className)}>{children}</strong>
      ),
      SmallText,
      Label,
      List,
      Item,
      Feature,
      FeatureTitle,
      FeatureText,
      FeatureCard,
      IconBox,
      Group,
      Features,
      CTA,

      // Map markdown elements to custom components
      h1: H1,
      h2: H2,
      h3: H3,
      h4: H4,
      p: Text,

      // MDX components
      CallToAction,
      Callout,
      Faq,
      InfoSection,
      LinkCards,
      LinkCard,
      Figure,
      Quote,
      Steps,
      Step,
      StepCompleted,
      code: Highlight,
      pre: Pre,
      TallyIframe,
      LeadScoringAnimatedList,
      // Ordered list mapping to respect start numbering when lists are split
      ol: ({ children, className, style, start, ...rest }: React.OlHTMLAttributes<HTMLOListElement>) => {
        const styleObj: React.CSSProperties = typeof style === "object" && style !== null ? style : {};
        let startNum = typeof start === "number" ? start : start ? Number(start) : undefined;
        if (!startNum) {
          const maybeDataStart = (rest as any)["data-start"] as any;
          if (maybeDataStart) {
            const n = Number(maybeDataStart);
            if (!Number.isNaN(n)) startNum = n;
          }
        }
        const computedStyle: React.CSSProperties = {
          ...styleObj,
          ...(startNum && startNum > 1 ? { counterReset: `list-counter ${startNum - 1}` } : {})
        };
        return (
          <ol
            {...rest}
            start={startNum}
            style={computedStyle}
            className={twMerge("prose-list-ol my-5 sm:my-6 space-y-2.5 text-gray-600 text-base pl-1", className)}
          >
            {children}
          </ol>
        );
      },

      // Chart components
      AnalyticsDemo: () => <AnalyticsDemo tkey="landing" />,
      Referer: ({ showABTesting }: { showABTesting?: boolean }) => <Referer showABTesting={showABTesting} />,
      FilterFeature: () => <FilterFeature tkey="landing" />,
      ABTestingDemo: () => <ABTestingDemo />,
      DeeplinkDemo: () => {
        return <DeeplinkDemoComponent />;
      },

      // React Icons
      FaCreditCard,
      FaLock
    };

    const pathname = slug === "home" ? "/" : `/landings/${slug}`;
    const path = getCanonicalLink(locale, pathname);

    return (
      <>
        <MDXRemote
          source={page.content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [
                remarkGfm,
                remarkDirective,
                remarkAtSyntax,
                remarkIframeDirective,
                remarkFaqDirective,
                remarkCtaPlaceholder,
                remarkCustomDirectives
              ],
              rehypePlugins: [
                rehypeSlug,
                rehypeAutolinkHeadings,
                rehypeOlStartCounter,
                [
                  rehypePrettyCode,
                  {
                    theme: "github-light",
                    keepBackground: false
                  }
                ]
              ]
            }
          }}
        />

        <FaqStructuredData path={path} faqs={page.faqs} />
      </>
    );
  } catch {
    notFound();
  }
}
