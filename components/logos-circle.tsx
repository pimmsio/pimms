"use client";

import React from "react";
import { motion } from "@/lib/framer-motion";
import { H2 } from "./base/h2";
import CtaButtonBig from "./cta/CtaButtonBig";
import { Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "./base/section";

// Outer logos (mix of top deeplink brands and key integrations)
const outerBaseUrl = "/static/logos/deeplinks";
const integrationsBaseUrl = "/static/logos/integrations";
const outerLogos = [
  { src: `${outerBaseUrl}/instagram.svg`, alt: "Instagram" },
  { src: `${outerBaseUrl}/linkedin.svg`, alt: "Linkedin" },
  { src: `${outerBaseUrl}/youtube.svg`, alt: "Youtube" },
  { src: `${integrationsBaseUrl}/wordpress.svg`, alt: "WordPress" },
  { src: `${integrationsBaseUrl}/webflow.svg`, alt: "Webflow" },
  { src: `${integrationsBaseUrl}/lovable.svg`, alt: "Lovable" },
  { src: `${integrationsBaseUrl}/lemlist.svg`, alt: "Lemlist" },
  { src: `${integrationsBaseUrl}/brevo.jpeg`, alt: "Brevo" },
  { src: `${integrationsBaseUrl}/clay.png`, alt: "Clay" },
  { src: `${integrationsBaseUrl}/trigify.jpeg`, alt: "Trigify" },
  { src: `${integrationsBaseUrl}/slack.svg`, alt: "Slack" },
  { src: `${integrationsBaseUrl}/framer.svg`, alt: "Framer" },
  { src: `${integrationsBaseUrl}/systemeio.jpeg`, alt: "Systeme.io" }
];

const innerBaseUrl = "/static/logos/integrations";
const innerLogos = [
  { src: `${innerBaseUrl}/calcom.jpeg`, alt: "Calcom" },
  { src: `${innerBaseUrl}/calendly.svg`, alt: "Calendly" },
  { src: `${innerBaseUrl}/make.svg`, alt: "Make" },
  { src: `${innerBaseUrl}/shopify.svg`, alt: "Shopify" },
  { src: `${innerBaseUrl}/stripe.svg`, alt: "Stripe" },
  { src: `${innerBaseUrl}/tally.svg`, alt: "Tally" },
  { src: `${innerBaseUrl}/typeform.svg`, alt: "Typeform" },
  { src: `${innerBaseUrl}/zapier.jpeg`, alt: "Zapier" }
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
    <Section id="logos" className="overflow-hidden">
      <div className="relative w-full h-[800px] flex items-center justify-center">
        <div
          className="absolute z-10 border border-gray-200 rounded-full touch-none pointer-events-none"
          style={{
            left: `calc(50% - ${outerRadius}px)`,
            top: `calc(50% - ${outerRadius}px)`,
            width: `${outerRadius * 2}px`,
            height: `${outerRadius * 2}px`
          }}
        />
        <div
          className="absolute z-10 border border-gray-200 rounded-full touch-none pointer-events-none"
          style={{
            left: `calc(50% - ${innerRadius}px)`,
            top: `calc(50% - ${innerRadius}px)`,
            width: `${innerRadius * 2}px`,
            height: `${innerRadius * 2}px`
          }}
        />

        <motion.div
          className="absolute inset-0 z-15 touch-none pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
        >
          {outerPositions.map((pos, index) => (
            <div
              key={index}
              className="absolute touch-none pointer-events-none"
              style={{
                left: `calc(50% + ${pos.x}px - ${outerSize / 2}px)`,
                top: `calc(50% + ${pos.y}px - ${outerSize / 2}px)`
              }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
                className="bg-white p-2 rounded-xl border border-gray-200 flex-shrink-0 touch-none pointer-events-none"
              >
                <img
                  src={outerLogos[index]?.src}
                  alt={outerLogos[index]?.alt}
                  className="grayscale hover:grayscale-0 w-16 h-16 min-w-16 max-w-16 object-contain p-2 touch-none pointer-events-none"
                />
              </motion.div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="absolute inset-0 z-15 touch-none pointer-events-none"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
        >
          {innerPositions.map((pos, index) => (
            <div
              key={index}
              className="absolute touch-none pointer-events-none"
              style={{
                left: `calc(50% + ${pos.x}px - ${innerSize / 2}px)`,
                top: `calc(50% + ${pos.y}px - ${innerSize / 2}px)`
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
                className="bg-white p-2 rounded-xl border border-gray-200 flex-shrink-0 touch-none pointer-events-none"
              >
                <img
                  src={innerLogos[index]?.src}
                  alt={innerLogos[index]?.alt}
                  className="grayscale w-12 h-12 min-w-12 max-w-12 object-contain p-1.5 touch-none pointer-events-none"
                />
              </motion.div>
            </div>
          ))}
        </motion.div>

        <div className="text-center max-w-sm z-20 px-4">
          <H2 className="mb-8">
            {tcommon.rich("logos_circle.heading", {
              strong: (chunks) => <span className="text-brand-primary">{chunks}</span>
            })}
          </H2>
          <div>
            <CtaButtonBig
              type="sales"
              size="lg"
              value={tcommon.rich("cta.main_short", {
                fast: () => <Zap size={32} fill="currentColor" />,
                large: (chunks) => <span className="hidden md:block">{chunks}</span>
              })}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default LogosCircle;
