import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getPage } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import remarkDirective from "remark-directive";
import { remarkIframeDirective } from "@/lib/mdx/remarkIframeDirective";
import { remarkFaqDirective } from "@/lib/mdx/remarkFaqDirective";
import { remarkCtaPlaceholder } from "@/lib/mdx/remarkCtaDirective";
import { remarkCustomDirectives } from "@/lib/mdx/remarkCustomDirectives";
import { remarkAtSyntax } from "@/lib/mdx/remark-at-syntax";
import { generateLandingMetadata } from "@/lib/utils";
import { landingFolders } from "@/i18n/config";
import { Zap } from "lucide-react";
import { notFound } from "next/navigation";

// Import MDX components
import { Highlight } from "@/components/mdx/Highlight";
import { Pre } from "@/components/mdx/Pre";
import TallyIframe from "@/components/mdx/TallyIframe";
import { Slide } from "@/components/mdx/LandingSection";
import { CallToAction } from "@/components/mdx/CallToAction";
import { Faq } from "@/components/mdx/Faq";
import { InfoSection } from "@/components/mdx/InfoSection";
import { LinkCards, LinkCard } from "@/components/mdx/LinkCards";
import { Quote } from "@/components/mdx/Quote";
import { Steps, Step, StepCompleted } from "@/components/mdx/Steps";

// Import landing components
import { Hero } from "@/components/landings/hero";
import { Avatars } from "@/components/landings/avatars";
import { Problem } from "@/components/landings/problem";
import Header from "@/components/landings/header";
import ImageSlide from "@/components/landings/Image-slide";
import VideoSlide from "@/components/landings/VideoSlide";
import {
  LifetimeOfferFree,
  LifetimeOfferPro,
  LifetimeOfferProPlus,
  LifetimeOfferScale
} from "@/components/landings/lifetime-offer-split";
import Footer from "@/components/footer/footer";
import LogosCircle from "@/components/logos-circle";
import CtaButtonBig from "@/components/cta/CtaButtonBig";
import BouncingImages from "@/components/landings/BouncingImages";

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
  HideOnMobile
} from "@/components/mdx/content";

// Import chart components
import { AnalyticsDemo } from "@/components/charts/analytics-demo";
import Referer from "@/components/charts/referer";
import { FilterFeature } from "@/components/landings/filter-feature";
import { ABTestingDemo } from "@/components/landings/ab-testing-demo";
import Image from "next/image";

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { slug } = await params;
  const pathname = slug === "home" ? "/" : `/landings/${slug}`;
  return generateLandingMetadata({ params, lkey: slug, pathname });
}

export async function generateStaticParams() {
  return [{ slug: "home" }, { slug: "youtube" }, { slug: "amazon" }];
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;

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
        const t = useTranslations("landing");
        return <Avatars>{children || <SmallText>{t("hero.avatars.title")}</SmallText>}</Avatars>;
      },
      Hero,
      Problem,
      LifetimeOfferFree: () => <LifetimeOfferFree tkey="landing" />,
      LifetimeOfferPro: () => <LifetimeOfferPro tkey="landing" />,
      LifetimeOfferProPlus: () => <LifetimeOfferProPlus tkey="landing" />,
      LifetimeOfferScale: () => <LifetimeOfferScale tkey="landing" />,
      BouncingImages: () => <BouncingImages tkey="landing" />,
      LogosCircle,
      ImageSlide,
      VideoSlide,

      // CTA components
      CtaButton: ({ children }: { children?: React.ReactNode }) => {
        const t = useTranslations("landing");
        // If children is provided, use it directly
        if (children) {
          return <CtaButtonBig type="sales" className="py-3 my-2 w-full md:w-fit mx-auto" value={children} />;
        }
        // Otherwise use the default translation
        return (
          <CtaButtonBig
            type="sales"
            className="py-3 my-2 w-full md:w-fit mx-auto"
            value={t.rich("cta.main", {
              fast: () => <Zap size={32} fill="currentColor" />,
              large: (chunks: any) => <span className="hidden md:block">{chunks}</span>
            })}
          />
        );
      },

      // Content components
      Primary,
      HideOnMobile,
      Fast,
      CtaBottomText,
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

      // Map markdown elements to custom components
      h1: H1,
      h2: H2,
      h3: H3,
      h4: H4,
      p: Text,

      // MDX components
      CallToAction,
      Faq,
      InfoSection,
      LinkCards,
      LinkCard,
      Quote,
      Steps,
      Step,
      StepCompleted,
      code: Highlight,
      pre: Pre,
      TallyIframe,

      // Chart components
      AnalyticsDemo: ({ showConversions, showABTesting }: { showConversions?: boolean; showABTesting?: boolean }) => (
        <div className="rounded-2xl overflow-hidden border border-gray-200">
          <AnalyticsDemo
            tkey="landing"
            showConversions={showConversions !== false}
            showABTesting={showABTesting || false}
          />
        </div>
      ),
      Referer: ({ showABTesting }: { showABTesting?: boolean }) => (
        <div className="rounded-2xl overflow-hidden border border-gray-200">
          <Referer showABTesting={showABTesting} />
        </div>
      ),
      FilterFeature: () => (
        <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
          <FilterFeature tkey="landing" />
        </div>
      ),
      ABTestingDemo: () => (
        <div className="py-8">
          <ABTestingDemo />
        </div>
      ),
      DeeplinkDemo: () => {
        return (
          <div className="rounded-2xl overflow-hidden border border-gray-200">
            <Image
              src={`/static/deeplink-${locale}.svg`}
              alt="Deep Analytics"
              className="w-full"
              width={1000}
              height={179}
            />
          </div>
        );
      }
    };

    return (
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
    );
  } catch {
    notFound();
  }
}
