"use client";

import React, { useEffect, useId, useMemo, useState } from "react";
import { getAvatarSvgCached, getSharedSeeds } from "@/lib/avatarPool";
import { usePerSlotSeeds, Avatar } from "@/lib/avatarAnim";
import { User, DollarSign, AtSign, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { buildRibbonGeometry, computeBegin, getLaneOffsets } from "@/lib/visCommon";

type Props = {
  /** Pass a per-request nonce from your server component / MDX wrapper */
  seedNonce: string;
};

function useAvatars(count: number, seedNonce: string): Avatar[] {
  const seeds = useMemo(() => getSharedSeeds(count, seedNonce), [count, seedNonce]);
  return useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: `ribbon-visitor-${i}`,
        svg: getAvatarSvgCached(seeds[i]),
        delayMs: 300 + i * 260
      })),
    [count, seeds]
  );
}

export default function HeroRibbon({ seedNonce }: Props) {
  const uid = useId();
  const avatars = useAvatars(10, seedNonce);
  const tcommon = useTranslations("landing");
  const tribbon = useTranslations("landing.ribbon.sources");
  const POOL_SIZE = 60;

  // ===== Adjustable parameters =====
  const width = 1000;
  const height = 420;
  const centerX = width / 2;
  const centerY = 210;

  const THICKNESS_ENDS = 420;
  const THICKNESS_CENTER = 200;

  const c1x = width * 0.33;
  const c2x = width * 0.66;

  const BLUE_BAR_WIDTH = 8;
  const BLUE_BAR_EXTRA = 90;
  const PREFILL_MS = 40000;
  const SPEED_MULTIPLIER = 3;
  const GLOBAL_VISUAL_DELAY_MS = 1500;

  const EDGE_FADE = 0.08;

  const AVATAR_SIZE = 72;
  const AVATAR_RADIUS = AVATAR_SIZE / 2;
  const AVATAR_COUNT = avatars.length;

  const P_LOGO_RADIUS = 24;
  const P_LOGO_GAP = 10;

  const [leadCount, setLeadCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);

  const DEAL_RATIO = 0.2;

  const avatarMeta = useMemo(
    () =>
      avatars.map((a, idx) => ({
        delayMs: a.delayMs,
        duration: (4800 + idx * 160) * SPEED_MULTIPLIER,
        isDeal: idx % Math.round(1 / DEAL_RATIO) === 0
      })),
    [avatars, SPEED_MULTIPLIER]
  );

  const getDelayMs = React.useCallback((idx: number) => avatars[idx].delayMs, [avatars]);
  const getDurationMs = React.useCallback((idx: number) => (4800 + idx * 160) * SPEED_MULTIPLIER, [SPEED_MULTIPLIER]);

  const { slotSeeds, slotCycles } = usePerSlotSeeds({
    slotCount: avatars.length,
    poolSize: POOL_SIZE,
    prefillMs: PREFILL_MS,
    getDelayMs,
    getDurationMs,
    uidSeed: uid,
    seedNonce // <<< ensure SSR/CSR parity
  });

  // counters
  useEffect(() => {
    const startMs = performance.now();
    const prev = new Array(avatarMeta.length).fill(0);
    const tick = () => {
      const now = performance.now();
      const elapsed = now - startMs + PREFILL_MS;
      let leads = 0;
      let sales = 0;
      for (let i = 0; i < avatarMeta.length; i++) {
        const { delayMs, duration, isDeal } = avatarMeta[i];
        const t = elapsed - delayMs;
        const crosses = t >= 0 ? Math.floor((t - duration / 2) / duration) + 1 : 0;
        const d = Math.max(0, crosses - prev[i]);
        if (d) {
          prev[i] = crosses;
          if (isDeal) sales += d;
          else leads += d;
        }
      }
      if (leads) setLeadCount((c) => c + leads);
      if (sales) setSalesCount((c) => c + sales);
    };
    const id = window.setInterval(tick, 500);
    tick();
    return () => clearInterval(id);
  }, [avatarMeta, PREFILL_MS]);

  const LABEL_MAX_WIDTH = 220;
  const LABEL_MAX_HEIGHT = 36;
  const LABEL_GAP = 4;
  const LABEL_FONT_SIZE = 14;
  const LABEL_FONT_WEIGHT = 600;
  const LABELS = [
    { id: "brevo", text: tribbon("emailing"), src: "/static/symbols/integrations/brevo.jpeg" },
    { id: "linkedin", text: tribbon("form"), src: "/static/symbols/integrations/framer.svg" },
    { id: "lemlist", text: tribbon("outreach"), src: "/static/symbols/integrations/lemlist.svg" },
    { id: "shopify", text: tribbon("shop"), src: "/static/symbols/integrations/shopify.svg" },
    { id: "chrome", text: tribbon("website"), src: "/static/symbols/integrations/wordpress.svg" },
    { id: "systemeio", text: tribbon("funnel"), src: "/static/symbols/integrations/systemeio.jpeg" },
    { id: "calcom", text: tribbon("form"), src: "/static/symbols/integrations/calcom.jpeg" },
    { id: "calendly", text: tribbon("form"), src: "/static/symbols/integrations/calendly.svg" }
  ] as const;

  const { ribbonPath, lanePathAt } = buildRibbonGeometry({
    width,
    centerY,
    thicknessEnds: THICKNESS_ENDS,
    thicknessCenter: THICKNESS_CENTER,
    c1x,
    c2x
  });

  const laneOffsets = useMemo(() => getLaneOffsets(AVATAR_COUNT), [AVATAR_COUNT]);
  const lanePathsComputed = useMemo(() => laneOffsets.map((t) => lanePathAt(t)), [laneOffsets, lanePathAt]);

  return (
    <div
      className="w-full grid place-items-center mt-12 mb-28 sm:mb-12 md:mt-0 md:mb-4"
      aria-hidden="true"
      data-nosnippet
    >
      <div className="relative w-full max-w-6xl scale-200 sm:scale-150 md:scale-125 xl:scale-100">
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
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
            </filter>
            <linearGradient id={`${uid}-ribbonFill`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#eef2ff" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            <linearGradient id={`${uid}-blueBar`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2fcdfa" />
              <stop offset="100%" stopColor="#3970ff" />
            </linearGradient>
            <clipPath id={`${uid}-ribbonClip`}>
              <path d={ribbonPath} />
            </clipPath>
            <clipPath id={`${uid}-avatarClip`}>
              <circle r={AVATAR_RADIUS} cx="0" cy="0" />
            </clipPath>
            <linearGradient id={`${uid}-fadeMaskGradient`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="black" />
              <stop offset={`${EDGE_FADE * 100}%`} stopColor="white" />
              <stop offset={`${(1 - EDGE_FADE) * 100}%`} stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </linearGradient>
            <mask id={`${uid}-edgeFadeMask`} maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
              <rect x="0" y="0" width={width} height={height} fill={`url(#${uid}-fadeMaskGradient)`} />
            </mask>
          </defs>

          <g mask={`url(#${uid}-edgeFadeMask)`}>
            <g>
              <path d={ribbonPath} fill={`url(#${uid}-ribbonFill)`} stroke="#e5e7eb" strokeWidth="1.25" />
            </g>
            <g clipPath={`url(#${uid}-ribbonClip)`}>
              {avatars.map((a, idx) => {
                const duration = (4800 + idx * 160) * SPEED_MULTIPLIER;
                const begin = computeBegin(PREFILL_MS, a.delayMs, duration);
                const pathD = lanePathsComputed[idx % lanePathsComputed.length];
                const hasLabel = idx % 10 < 8;
                const label = LABELS[idx % LABELS.length];
                const isDeal = idx % Math.round(1 / DEAL_RATIO) === 0;
                const emailBadge = (idx * 101) % 100 < 90;
                const phoneBadge = (idx * 137) % 100 < 50;
                const warmBadge = (idx * 173) % 100 < 40;
                return (
                  <g key={`${a.id}-cycle-${slotCycles[idx] ?? 0}`} visibility="hidden">
                    <set attributeName="visibility" to="visible" begin={begin} />
                    <g pointerEvents="none" opacity="0">
                      <animate
                        attributeName="opacity"
                        begin={`${GLOBAL_VISUAL_DELAY_MS}ms`}
                        dur="1ms"
                        to="1"
                        fill="freeze"
                      />
                      <g clipPath={`url(#${uid}-avatarClip)`}>
                        <circle cx="0" cy="0" r={AVATAR_RADIUS} fill="#ffffff" />
                        <g opacity={1}>
                          <g transform={`translate(${-16} ${-16})`}>
                            <User width={32} height={32} stroke="#1f2937" strokeWidth={2} />
                          </g>
                          <animate
                            attributeName="opacity"
                            begin={begin}
                            dur={`${duration}ms`}
                            repeatCount="indefinite"
                            keyTimes="0;0.5;0.5001;1"
                            values="1;1;0;0"
                          />
                        </g>
                        <g opacity={0}>
                          {isDeal ? (
                            <g>
                              <circle cx={0} cy={0} r={AVATAR_RADIUS} fill={`url(#${uid}-blueBar)`} />
                              <g transform={`translate(${-14} ${-14})`}>
                                <DollarSign width={28} height={28} stroke="#ffffff" strokeWidth={3} />
                              </g>
                            </g>
                          ) : (
                            <foreignObject
                              key={`persona-${idx}-${slotSeeds[idx]}`}
                              x={-AVATAR_RADIUS}
                              y={-AVATAR_RADIUS}
                              width={AVATAR_SIZE}
                              height={AVATAR_SIZE}
                            >
                              <div
                                dangerouslySetInnerHTML={{ __html: getAvatarSvgCached(slotSeeds[idx] ?? "seed") }}
                                style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
                              />
                            </foreignObject>
                          )}
                          <animate
                            attributeName="opacity"
                            begin={begin}
                            dur={`${duration}ms`}
                            repeatCount="indefinite"
                            keyTimes="0;0.5;0.5001;1"
                            values="0;0;1;1"
                          />
                        </g>
                      </g>
                      <circle cx="0" cy="0" r={AVATAR_RADIUS} fill="none" stroke="#e5e7eb" strokeWidth="1" />
                      {hasLabel &&
                        (() => {
                          const text = label.text;
                          const charW = 7;
                          const padX = 12;
                          const iconW = 16;
                          const gap = 6;
                          const w = Math.min(LABEL_MAX_WIDTH, padX * 2 + iconW + gap + text.length * charW);
                          const h = LABEL_MAX_HEIGHT;
                          const rx = 9999;
                          const x0 = -w / 2;
                          const y0 = AVATAR_RADIUS + LABEL_GAP;
                          return (
                            <g opacity={0} transform={`translate(0 0)`}>
                              <rect x={x0} y={y0} width={w} height={h} rx={rx} fill="#ffffff" stroke="#e5e7eb" />
                              <image
                                href={label.src}
                                x={x0 + padX}
                                y={y0 + (h - iconW) / 2}
                                width={iconW}
                                height={iconW}
                                preserveAspectRatio="xMidYMid meet"
                              />
                              <text
                                aria-hidden="true"
                                x={x0 + padX + iconW + gap}
                                y={y0 + h / 2 + 4}
                                fontSize={LABEL_FONT_SIZE}
                                fontWeight={LABEL_FONT_WEIGHT as any}
                                fill="#111827"
                              >
                                {text}
                              </text>
                              <animate
                                attributeName="opacity"
                                begin={begin}
                                dur={`${duration}ms`}
                                repeatCount="indefinite"
                                keyTimes="0;0.5;0.5001;1"
                                values="0;0;1;1"
                              />
                            </g>
                          );
                        })()}
                      {!isDeal && (emailBadge || phoneBadge || warmBadge) && (
                        <g opacity={0}>
                          {(() => {
                            const BADGE_R = 10;
                            const GAP = 2;
                            const baseX = AVATAR_RADIUS - 35;
                            const baseY = -AVATAR_RADIUS - 1;
                            const badges: Array<"email" | "phone" | "warm"> = [];
                            if (emailBadge) badges.push("email");
                            if (phoneBadge) badges.push("phone");
                            if (warmBadge) badges.push("warm");
                            return (
                              <g>
                                {badges.map((b, i) => (
                                  <g key={i} transform={`translate(${baseX + i * (BADGE_R * 2 + GAP)} ${baseY})`}>
                                    <circle r={BADGE_R} cx={0} cy={0} fill="#ffffff" stroke="#e5e7eb" strokeWidth={1} />
                                    {b === "email" && (
                                      <g transform={`translate(${-7} ${-7})`}>
                                        <AtSign width={14} height={14} stroke="#0f172a" strokeWidth={2} />
                                      </g>
                                    )}
                                    {b === "phone" && (
                                      <g transform={`translate(${-7} ${-7})`}>
                                        <Phone width={14} height={14} stroke="#0f172a" strokeWidth={2} />
                                      </g>
                                    )}
                                    {b === "warm" && (
                                      <text x={-7} y={5} fontSize={14}>
                                        🔥
                                      </text>
                                    )}
                                  </g>
                                ))}
                              </g>
                            );
                          })()}
                          <animate
                            attributeName="opacity"
                            begin={begin}
                            dur={`${duration}ms`}
                            repeatCount="indefinite"
                            keyTimes="0;0.5;0.5001;1"
                            values="0;0;1;1"
                          />
                        </g>
                      )}
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
                  </g>
                );
              })}
            </g>
          </g>

          {/* P logo + counters */}
          {(() => {
            const barHeight = THICKNESS_CENTER + BLUE_BAR_EXTRA;
            const y = centerY + barHeight / 2 + P_LOGO_GAP + P_LOGO_RADIUS;
            const LOGO_SIZE = 512;
            const scale = (P_LOGO_RADIUS * 2) / LOGO_SIZE;
            const tx = -LOGO_SIZE / 2;
            const ty = -LOGO_SIZE / 2;
            return (
              <g transform={`translate(${centerX} ${y})`}>
                <g filter="url(#softShadow)">
                  <circle r={P_LOGO_RADIUS} fill={`url(#${uid}-blueBar)`} />
                </g>
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

                {/* Counters */}
                <g transform={`translate(${-P_LOGO_RADIUS - 12} ${-P_LOGO_RADIUS + 2})`}>
                  <foreignObject x={-260} y={0} width={260} height={P_LOGO_RADIUS * 2}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        height: P_LOGO_RADIUS * 2
                      }}
                    >
                      <div
                        style={{
                          padding: "6px 12px",
                          borderRadius: 9999,
                          background: "rgba(255,255,255,0.98)",
                          border: "1px solid rgba(229,231,235,1)",
                          fontSize: 14,
                          fontWeight: 700,
                          color: "#0f172a",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          minWidth: 110,
                          textAlign: "center"
                        }}
                      >
                        {leadCount} {tcommon("ribbon.leads")}
                      </div>
                    </div>
                  </foreignObject>
                </g>

                <g transform={`translate(${P_LOGO_RADIUS + 12} ${-P_LOGO_RADIUS + 2})`}>
                  <foreignObject x={0} y={0} width={260} height={P_LOGO_RADIUS * 2}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        height: P_LOGO_RADIUS * 2
                      }}
                    >
                      <div
                        style={{
                          padding: "6px 12px",
                          borderRadius: 9999,
                          background: "rgba(255,255,255,0.98)",
                          border: "1px solid rgba(229,231,235,1)",
                          fontSize: 14,
                          fontWeight: 700,
                          color: "#0f172a",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          minWidth: 110,
                          textAlign: "center"
                        }}
                      >
                        {salesCount} {tcommon("ribbon.sales")}
                      </div>
                    </div>
                  </foreignObject>
                </g>
              </g>
            );
          })()}

          <g filter="url(#softShadow)">
            <rect
              x={centerX - BLUE_BAR_WIDTH / 2}
              y={centerY - (THICKNESS_CENTER + BLUE_BAR_EXTRA) / 2}
              width={BLUE_BAR_WIDTH}
              height={THICKNESS_CENTER + BLUE_BAR_EXTRA}
              rx={BLUE_BAR_WIDTH / 2}
              fill={`url(#${uid}-blueBar)`}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
