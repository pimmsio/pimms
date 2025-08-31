"use client";

import React, { useEffect, useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, MailPlus, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { getAvatarSvgCached, getSharedSeeds } from "@/lib/avatarPool";
import { Avatar, usePerSlotSeeds } from "@/lib/avatarAnim";
import { buildFunnelGeometry, computeBegin, useStableRandomStarts } from "@/lib/visCommon";

type Props = {
  seedNonce: string; // per-request nonce (same value used by HeroRibbon)
};

export default function AvatarFunnel({ seedNonce }: Props) {
  const t = useTranslations("landing.funnel.event");

  const VISIBLE_COUNT = 10;
  const POOL_SIZE = 60;
  const EDGE_FADE_TOP = 0.12; // ~12% of the height fades at the top

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

  const uid = useId();

  const width = 780;
  const centerX = width / 2;
  const centerY = 450;
  const bottomMargin = 240;
  const height = centerY + bottomMargin;

  const AVATAR_SIZE = 90;
  const AVATAR_RADIUS = AVATAR_SIZE / 2;

  const CENTER_RADIUS = 60;

  const ANIMATION_OFFSET_MS = 20000;

  const { funnelPath, lanePathAt } = buildFunnelGeometry({
    width,
    centerX,
    centerY,
    yTop: 0,
    topWidth: width - 20,
    leftMargin: AVATAR_RADIUS + 6,
    rightMargin: AVATAR_RADIUS + 6
  });

  const randomStarts = useStableRandomStarts(VISIBLE_COUNT, uid);

  const getDelayMs = React.useCallback((i: number) => 400 + i * 280, []);
  const getDurationMs = React.useCallback((i: number) => 3500 + i * 180, []);

  const { slotCycles } = usePerSlotSeeds({
    slotCount: VISIBLE_COUNT,
    poolSize: POOL_SIZE,
    prefillMs: ANIMATION_OFFSET_MS,
    getDelayMs,
    getDurationMs,
    uidSeed: uid,
    seedNonce
  });

  const avatars = useMemo<Avatar[]>(
    () =>
      Array.from({ length: VISIBLE_COUNT }).map((_, i) => ({
        id: `visitor-slot-${i}-cycle-${slotCycles[i] ?? 0}`,
        svg: getAvatarSvgCached(getSharedSeeds(VISIBLE_COUNT, seedNonce)[i] ?? `seed-${i}`),
        delayMs: getDelayMs(i),
        cycle: slotCycles[i] ?? 0
      })),
    [VISIBLE_COUNT, slotCycles, getDelayMs, seedNonce]
  );

  return (
    <div className="w-full grid place-items-center" aria-hidden="true" data-nosnippet>
      <div className="relative w-full sm:w-11/12">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
          focusable="false"
        >
          <defs>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
            </filter>
            <linearGradient id={`${uid}-tunnelGradient`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e7eeff" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            <linearGradient id={`${uid}-pimmsBlueGradient`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2fcdfa" />
              <stop offset="100%" stopColor="#3970ff" />
            </linearGradient>
            <radialGradient id={`${uid}-pimmsHighlight`} cx="35%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <clipPath id={`${uid}-avatarClip`}>
              <circle r={AVATAR_RADIUS} cx="0" cy="0" />
            </clipPath>
            <linearGradient id={`${uid}-topFadeMaskGradient`} x1="0" y1="0" x2="0" y2="1">
              {/* Top is transparent (black), then quickly fades to opaque (white) */}
              <stop offset="0%" stopColor="black" />
              <stop offset={`${EDGE_FADE_TOP * 100}%`} stopColor="white" />
              <stop offset="100%" stopColor="white" />
            </linearGradient>

            <mask id={`${uid}-topEdgeFadeMask`} maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
              {/* Fill entire viewport with the vertical mask */}
              <rect x="0" y="0" width={width} height={height} fill={`url(#${uid}-topFadeMaskGradient)`} />
            </mask>
          </defs>

          <g mask={`url(#${uid}-topEdgeFadeMask)`}>
            {/* Funnel background */}
            <g opacity="0.9">
              <path d={funnelPath} fill={`url(#${uid}-tunnelGradient)`} stroke="#e5e7eb" strokeWidth="1.25" />
            </g>

            {/* Lane hints */}
            {Array.from({ length: VISIBLE_COUNT }).map((_, idx) => (
              <path
                key={`lane-${idx}`}
                d={lanePathAt(randomStarts[idx] ?? idx / Math.max(1, VISIBLE_COUNT - 1), centerY - 60)}
                stroke="#eef2ff"
                strokeWidth="3"
                opacity="0.6"
                fill="none"
              />
            ))}

            <g opacity="0.9">
              <path d={funnelPath} fill={`url(#${uid}-tunnelGradient)`} stroke="#e5e7eb" strokeWidth="1.25" />
            </g>

            {Array.from({ length: VISIBLE_COUNT }).map((_, idx) => (
              <path
                key={`lane-${idx}`}
                d={lanePathAt(randomStarts[idx] ?? idx / Math.max(1, VISIBLE_COUNT - 1), centerY - 60)}
                stroke="#eef2ff"
                strokeWidth="3"
                opacity="0.6"
                fill="none"
              />
            ))}

            {avatars.map((a, idx) => {
              const duration = getDurationMs(idx);
              const begin = computeBegin(ANIMATION_OFFSET_MS, a.delayMs, duration);
              const pathD = lanePathAt(randomStarts[idx] ?? idx / Math.max(1, VISIBLE_COUNT - 1), centerY - 60);

              return (
                <g key={a.id}>
                  <g filter="url(#softShadow)">
                    <g clipPath={`url(#${uid}-avatarClip)`}>
                      <circle cx="0" cy="0" r={AVATAR_RADIUS} fill="#ffffff" />
                      <foreignObject
                        key={`persona-${idx}-${a.cycle}`}
                        x={-AVATAR_RADIUS}
                        y={-AVATAR_RADIUS}
                        width={AVATAR_SIZE}
                        height={AVATAR_SIZE}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: a.svg }}
                          style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
                        />
                      </foreignObject>
                    </g>
                    <circle cx="0" cy="0" r={AVATAR_RADIUS} fill="none" stroke="#e5e7eb" strokeWidth="1" />
                  </g>
                  <animateMotion
                    begin={begin}
                    dur={`${duration}ms`}
                    repeatCount="indefinite"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                    path={pathD}
                  />
                </g>
              );
            })}

            <g transform={`translate(${centerX} ${centerY - 60})`}>
              <g filter="url(#softShadow)">
                <circle r={CENTER_RADIUS} fill={`url(#${uid}-pimmsBlueGradient)`} />
                <circle r={CENTER_RADIUS} fill={`url(#${uid}-pimmsHighlight)`} />
              </g>
              {(() => {
                const LOGO_SIZE = 512;
                const scale = (CENTER_RADIUS * 2) / LOGO_SIZE;
                const tx = -LOGO_SIZE / 2;
                const ty = -LOGO_SIZE / 2;
                return (
                  <g transform={`scale(${scale}) translate(${tx} ${ty})`}>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M204.297 379.352C204.297 389.651 195.948 398 185.648 398C175.349 398 167 389.651 167 379.352V217.225C167 198.625 170.841 181.927 178.522 167.155C186.286 152.538 197.264 140.424 210.395 131.988C223.963 123.33 239.219 119 256.175 119C273.119 119 288.27 123.46 301.606 132.38C314.72 141.042 325.593 153.426 333.141 168.297C341.054 183.08 345 199.386 345 217.225C345 236.337 341.276 253.404 333.817 268.436C326.502 283.053 315.85 295.196 302.966 303.605C289.852 312.263 274.817 316.592 257.862 316.592C245.298 316.685 232.923 313.134 221.927 306.28C215.275 301.996 209.399 296.973 204.297 291.219V257.039C204.297 253.282 202.081 249.878 198.645 248.357C192.368 245.577 185.372 250.216 186.74 256.944C188.288 264.556 191.088 271.826 195.139 278.76C197.85 283.236 200.902 287.39 204.297 291.219V379.352ZM256.175 276.845C266.113 276.845 274.933 274.169 282.615 268.817C290.381 263.636 296.812 256.257 301.268 247.41C305.772 238.301 308.105 228.033 308.042 217.605C308.135 207.291 305.797 197.133 301.268 188.17C296.81 179.325 290.381 171.945 282.615 166.763C274.933 161.411 266.113 158.748 256.175 158.748C246.226 158.748 237.289 161.423 229.376 166.775C221.762 172.045 215.464 179.412 211.071 188.182C206.544 197.142 204.206 207.295 204.297 217.605C204.297 228.309 206.555 238.241 211.071 247.41C215.465 256.182 221.768 263.55 229.386 268.817C237.299 274.169 246.226 276.845 256.175 276.845Z"
                      fill="#ffffff"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M198.645 248.357C202.081 249.878 204.297 253.282 204.297 257.039V291.219C200.902 287.39 197.85 283.236 195.139 278.76C191.088 271.826 188.288 264.556 186.74 256.944C185.372 250.216 192.368 245.577 198.645 248.357Z"
                      fill="#ffffff"
                    />
                  </g>
                );
              })()}
            </g>
          </g>
        </svg>

        {/* Rotating event card */}
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
