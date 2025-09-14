"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, MailPlus, UserPlus } from "@/components/icons/custom-icons";
import { useTranslations } from "next-intl";

type Props = {
  seedNonce: string;
};

// Simple cache to prevent duplicate requests in development
const funnelRequestCache = new Map<string, Promise<string>>();

export default function AvatarFunnel({ seedNonce }: Props) {
  const t = useTranslations("landing.funnel.event");
  // Use deterministic uid based on seedNonce to ensure consistent caching
  const uid = `avatar-funnel-${seedNonce.replace(/[^a-zA-Z0-9-]/g, "-")}`;
  const [svgContent, setSvgContent] = useState<string>("");

  // ORIGINAL event card logic - keep this as HTML overlay
  const events = [
    { label: t("meeting_booked"), icon: CalendarCheck },
    { label: t("subscriber"), icon: MailPlus },
    { label: t("lead"), icon: UserPlus },
    { label: t("follower"), icon: UserPlus }
  ] as const;
  const [eventIndex, setEventIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setEventIndex((i) => (i + 1) % events.length), 2000);
    return () => clearInterval(id);
  }, [events.length]);

  // Fetch ONLY the funnel SVG from API (no card)
  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const url = `/api/animation-svg/avatar-funnel?uid=${encodeURIComponent(uid)}&seed=${encodeURIComponent(seedNonce)}`;

        // Check cache first
        if (funnelRequestCache.has(url)) {
          const svg = await funnelRequestCache.get(url)!;
          setSvgContent(svg);
          return;
        }

        // Create promise and cache it
        const requestPromise = fetch(url).then(async (response) => {
          if (response.ok) {
            return response.text();
          } else {
            console.error("Failed to fetch funnel SVG");
            throw new Error("Failed to fetch SVG");
          }
        });

        funnelRequestCache.set(url, requestPromise);

        const svg = await requestPromise;
        setSvgContent(svg);
      } catch (error) {
        console.error("Failed to fetch funnel SVG:", error);
        // Remove failed request from cache
        const url = `/api/animation-svg/avatar-funnel?uid=${encodeURIComponent(uid)}&seed=${encodeURIComponent(seedNonce)}`;
        funnelRequestCache.delete(url);
      }
    };
    fetchSvg();
  }, [uid, seedNonce]);

  const centerY = 450;
  const bottomMargin = 240;
  const height = centerY + bottomMargin;

  return (
    <div className="w-full grid place-items-center" aria-hidden="true" data-nosnippet>
      <div className="relative w-full sm:w-11/12">
        {/* API-generated funnel SVG */}
        {svgContent && <div className="w-full h-auto" dangerouslySetInnerHTML={{ __html: svgContent }} />}

        {/* ORIGINAL rotating event card - HTML overlay with real backdrop-blur-sm */}
        {(() => {
          const cardTopPercent = ((centerY + 40) / height) * 100;
          return (
            <div
              className="pointer-events-none absolute left-1/2 -translate-x-1/2"
              style={{ top: `${cardTopPercent}%` }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={eventIndex}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="bg-white/95 backdrop-blur-sm border rounded-2xl px-5 py-2 text-base md:text-lg font-semibold text-gray-900 flex items-center gap-3 whitespace-nowrap"
                >
                  {(() => {
                    const e = events[eventIndex];
                    const Icon = e.icon;
                    return (
                      <>
                        <span className="inline-grid min-w-9 min-h-9 place-items-center w-9 h-9 rounded-full text-primary bg-gradient-to-r from-brand-secondary-light to-brand-primary-100">
                          <Icon size={18} />
                        </span>
                        <span>{e.label}</span>
                      </>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
