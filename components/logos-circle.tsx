"use client";

import React from "react";
import { motion } from "framer-motion";
import { H2 } from "./base/h2";
import CtaButtonBig from "./cta/CtaButtonBig";
import { Zap } from "@/components/icons/custom-icons";
import { useTranslations } from "next-intl";
import { Section } from "./base/section";
import { Primary } from "./mdx/content";
import Link from "next/link";
import { useLocale } from "next-intl";
import { getCanonicalLink } from "@/lib/utils";
import { SwapRotate } from "./magicui/swap-rotate";

// Outer logos (mix of top deeplink brands and key integrations)
const outerBaseUrl = "/static/symbols/deeplinks";
const integrationsBaseUrl = "/static/symbols/integrations";
const outerLogos = [
  { src: `${outerBaseUrl}/instagram.svg`, alt: "Instagram" },
  { src: `${outerBaseUrl}/linkedin.svg`, alt: "Linkedin" },
  { src: `${outerBaseUrl}/youtube.svg`, alt: "Youtube" },
  {
    src: `${integrationsBaseUrl}/wordpress.svg`,
    alt: "WordPress",
    guide: "/articles/how-to-track-elementor-form-leads"
  },
  { src: `${integrationsBaseUrl}/webflow.svg`, alt: "Webflow", guide: "/articles/how-to-track-webflow-leads" },
  { src: `${integrationsBaseUrl}/lovable.svg`, alt: "Lovable" },
  { src: `${integrationsBaseUrl}/lemlist.svg`, alt: "Lemlist" },
  { src: `${integrationsBaseUrl}/brevo.svg`, alt: "Brevo" },
  { src: `${integrationsBaseUrl}/clay.webp`, alt: "Clay" },
  { src: `${integrationsBaseUrl}/trigify.jpeg`, alt: "Trigify" },
  { src: `${integrationsBaseUrl}/slack.svg`, alt: "Slack" },
  { src: `${integrationsBaseUrl}/framer.svg`, alt: "Framer", guide: "/articles/how-to-track-framer" },
  {
    src: `${integrationsBaseUrl}/systemeio.webp`,
    alt: "Systeme.io",
    guide: "/articles/how-to-track-systemeio-sales-and-leads"
  }
];

const innerBaseUrl = "/static/symbols/integrations";
const innerLogos = [
  { src: `${innerBaseUrl}/calcom.svg`, alt: "Calcom", guide: "/articles/start-with-cal-com-and-zapier" },
  { src: `${innerBaseUrl}/calendly.svg`, alt: "Calendly", guide: "/articles/how-to-track-calendly" },
  {
    src: `${innerBaseUrl}/make.svg`,
    alt: "Make",
    guide: "/articles/ultimate-guide-to-cross-channel-automation-with-make"
  },
  { src: `${innerBaseUrl}/shopify.svg`, alt: "Shopify" },
  { src: `${innerBaseUrl}/stripe.svg`, alt: "Stripe", guide: "/articles/setup-stripe-for-website" },
  { src: `${innerBaseUrl}/tally.svg`, alt: "Tally", guide: "/articles/how-to-track-tally" },
  { src: `${innerBaseUrl}/typeform.svg`, alt: "Typeform" },
  { src: `${innerBaseUrl}/zapier.jpeg`, alt: "Zapier", guide: "/articles/start-with-zapier" }
];

// Helper to place n items evenly in a circle
const generateRingPositions = (count: number, radius: number) => {
  return Array.from({ length: count }, (_, i) => {
    const angle = (2 * Math.PI * i) / count;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  });
};

const LogosCircle: React.FC = () => {
  const tcommon = useTranslations("landing");
  const locale = useLocale();

  // Outer ring
  const outerCount = 13; // # of logos in outer ring
  const outerRadius = 360; // distance from center
  const outerSize = 70; // logo size
  const outerPositions = generateRingPositions(outerCount, outerRadius);

  // Inner ring
  const innerCount = 8;
  const innerRadius = 250;
  const innerSize = 60;
  const innerPositions = generateRingPositions(innerCount, innerRadius);

  return (
    <Section id="logos" className="overflow-hidden" data-nosnippet>
      <div className="relative w-full h-[800px] flex items-center justify-center">
        <div
          className="absolute z-10 border border-gray-200 rounded-full touch-none pointer-events-none"
          style={{
            left: `calc(50% - ${outerRadius}px)`,
            top: `calc(50% - ${outerRadius}px)`,
            width: `${outerRadius * 2}px`,
            height: `${outerRadius * 2}px`
          }}
          data-noindex="true"
        />
        <div
          className="absolute z-10 border border-gray-200 rounded-full touch-none pointer-events-none"
          style={{
            left: `calc(50% - ${innerRadius}px)`,
            top: `calc(50% - ${innerRadius}px)`,
            width: `${innerRadius * 2}px`,
            height: `${innerRadius * 2}px`
          }}
          data-noindex="true"
        />

        <motion.div
          className="absolute inset-0 z-15"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
        >
          {outerPositions.map((pos, index) => {
            const logo = outerLogos[index];
            const logoContent = (
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
                className="bg-white p-2 rounded-xl border border-gray-200 flex-shrink-0"
              >
                <img
                  src={logo?.src || "/static/logo.svg"}
                  alt={logo?.alt || "Logo"}
                  width={64}
                  height={64}
                  className="grayscale hover:grayscale-0 w-16 h-16 min-w-16 max-w-16 object-contain p-2 transition-all duration-200"
                  loading="lazy"
                />
              </motion.div>
            );

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `calc(50% + ${pos.x}px - ${outerSize / 2}px)`,
                  top: `calc(50% + ${pos.y}px - ${outerSize / 2}px)`
                }}
                suppressHydrationWarning
              >
                {logo?.guide ? (
                  <Link
                    href={getCanonicalLink(locale, logo.guide)}
                    className="block hover:scale-105 transition-transform duration-200"
                    title={`Learn how to track ${logo.alt}`}
                  >
                    {logoContent}
                  </Link>
                ) : (
                  <div className="touch-none pointer-events-none">{logoContent}</div>
                )}
              </div>
            );
          })}
        </motion.div>

        <motion.div
          className="absolute inset-0 z-15"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
        >
          {innerPositions.map((pos, index) => {
            const logo = innerLogos[index];
            const logoContent = (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
                className="bg-white p-2 rounded-xl border border-gray-200 flex-shrink-0"
              >
                <img
                  src={logo?.src || "/static/logo.svg"}
                  alt={logo?.alt || "Logo"}
                  width={48}
                  height={48}
                  className="grayscale hover:grayscale-0 w-12 h-12 min-w-12 max-w-12 object-contain p-1.5 transition-all duration-200"
                  loading="lazy"
                />
              </motion.div>
            );

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `calc(50% + ${pos.x}px - ${innerSize / 2}px)`,
                  top: `calc(50% + ${pos.y}px - ${innerSize / 2}px)`
                }}
                suppressHydrationWarning
              >
                {logo?.guide ? (
                  <Link
                    href={getCanonicalLink(locale, logo.guide)}
                    className="block hover:scale-105 transition-transform duration-200"
                    title={`Learn how to track ${logo.alt}`}
                  >
                    {logoContent}
                  </Link>
                ) : (
                  <div className="touch-none pointer-events-none">{logoContent}</div>
                )}
              </div>
            );
          })}
        </motion.div>

        <div className="text-center max-w-sm z-20 px-4">
          <H2 className="mb-8">
            {tcommon.rich("logos_circle.heading", {
              strong: (chunks) => <Primary>{chunks}</Primary>
            })}
          </H2>
          <div>
            <CtaButtonBig
              type="sales"
              size="lg"
              value={
                <SwapRotate>
                  {tcommon.rich("cta.main_short", {
                    fast: () => <Zap size={32} fill="currentColor" />,
                    large: (chunks) => <span className="hidden md:block">{chunks}</span>
                  })}
                </SwapRotate>
              }
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default LogosCircle;
