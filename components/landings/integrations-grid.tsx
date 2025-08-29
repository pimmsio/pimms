"use client";

import React from "react";
import { motion } from "@/lib/framer-motion";

type Logo = { src: string; alt: string; size?: "sm" | "md" | "lg" };

const baseUrl = "/static/logos/integrations";
const deeplinksBaseUrl = "/static/logos/deeplinks";

// Reuse the same set as the circle component
const logos: Logo[] = [
  { src: `${baseUrl}/shopify.svg`, alt: "Shopify", size: "lg" },
  { src: `${baseUrl}/stripe.svg`, alt: "Stripe", size: "lg" },
  { src: `${baseUrl}/zapier.jpeg`, alt: "Zapier", size: "md" },
  { src: `${baseUrl}/make.svg`, alt: "Make", size: "md" },
  { src: `${baseUrl}/typeform.svg`, alt: "Typeform", size: "md" },
  { src: `${baseUrl}/tally.svg`, alt: "Tally", size: "sm" },
  { src: `${baseUrl}/calcom.jpeg`, alt: "Cal.com", size: "sm" },
  { src: `${baseUrl}/calendly.svg`, alt: "Calendly", size: "md" },
  { src: `${baseUrl}/systemeio.jpeg`, alt: "Systeme.io", size: "md" },
  { src: `${deeplinksBaseUrl}/youtube.svg`, alt: "YouTube", size: "sm" },
  { src: `${baseUrl}/wordpress.svg`, alt: "WordPress", size: "sm" },
  { src: `${baseUrl}/webflow.svg`, alt: "Webflow", size: "md" },
  { src: `${baseUrl}/lovable.svg`, alt: "Lovable", size: "md" },
  { src: `${baseUrl}/lemlist.svg`, alt: "Lemlist", size: "sm" },
  { src: `${baseUrl}/brevo.jpeg`, alt: "Brevo", size: "sm" },
  { src: `${baseUrl}/clay.png`, alt: "Clay", size: "sm" },
  { src: `${baseUrl}/trigify.jpeg`, alt: "Trigify", size: "sm" },
  { src: `${baseUrl}/slack.svg`, alt: "Slack", size: "md" },
  { src: `${baseUrl}/framer.svg`, alt: "Framer", size: "md" }
];

// Hand-tuned percentage positions to better match the design without overlaps
const positions: Array<{ left: string; top: string; delay: number }> = [
  // Row 1
  { left: "10%", top: "10%", delay: 0.0 },
  { left: "28%", top: "10%", delay: 0.03 },
  { left: "46%", top: "12%", delay: 0.06 },
  { left: "64%", top: "10%", delay: 0.09 },
  { left: "82%", top: "14%", delay: 0.12 },
  // Row 2
  { left: "14%", top: "28%", delay: 0.15 },
  { left: "32%", top: "26%", delay: 0.18 },
  { left: "50%", top: "24%", delay: 0.21 },
  { left: "68%", top: "28%", delay: 0.24 },
  { left: "86%", top: "30%", delay: 0.27 },
  // Row 3
  { left: "12%", top: "46%", delay: 0.3 },
  { left: "30%", top: "44%", delay: 0.33 },
  { left: "48%", top: "46%", delay: 0.36 },
  { left: "66%", top: "44%", delay: 0.39 },
  { left: "82%", top: "48%", delay: 0.42 },
  // Row 4
  { left: "16%", top: "64%", delay: 0.45 },
  { left: "34%", top: "62%", delay: 0.48 },
  { left: "52%", top: "64%", delay: 0.51 },
  { left: "70%", top: "66%", delay: 0.54 },
  { left: "86%", top: "70%", delay: 0.57 }
];

export const IntegrationsGrid: React.FC = () => {
  return (
    <div className="relative w-full rounded-l-3xl overflow-hidden border-l border-y border-path-neutral">
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(2,6,23,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(2,6,23,0.05)_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div className="relative h-[320px] sm:h-[360px] md:h-[400px] lg:h-[420px]">
        {logos.map((logo, i) => {
          const pos = positions[i % positions.length];

          return (
            <motion.div
              key={`${logo.alt}-${i}`}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: pos.delay }}
              className="absolute"
              style={{
                left: pos.left,
                top: pos.top
              }}
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: pos.delay + 0.2 }}
                className="bg-white/95 backdrop-blur-xl border border-gray-200 shadow-[0_12px_40px_-18px_rgba(2,6,23,0.25)] rounded-2xl p-2 md:p-3"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={`${
                    logo.size === "lg"
                      ? "w-12 h-12 md:w-[56px] md:h-[56px]"
                      : logo.size === "sm"
                        ? "w-8 h-8 md:w-9 md:h-9"
                        : "w-10 h-10 md:w-11 md:h-11"
                  } object-contain transition`}
                />
              </motion.div>
            </motion.div>
          );
        })}

        {/* no empty ghost cells per request */}
      </div>
    </div>
  );
};

export default IntegrationsGrid;
