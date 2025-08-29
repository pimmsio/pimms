"use client";

import React, { useEffect, useId, useMemo, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";
import { User, DollarSign, AtSign, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

type Avatar = {
  id: string;
  svg: string;
  delayMs: number;
};

function generateDicebear(seed: string): string {
  const avatar = createAvatar(personas, {
    seed,
    radius: 50,
    backgroundType: ["gradientLinear"],
    backgroundColor: ["bfdbfe", "ebfbfe"],
    eyes: ["open", "sleep", "wink", "glasses", "happy", "sunglasses"],
    mouth: ["smile", "frown", "surprise", "pacifier", "bigSmile", "smirk", "lips"]
  });
  return avatar.toString();
}

function useAvatars(count: number): Avatar[] {
  return useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: `ribbon-visitor-${i}`,
      svg: generateDicebear(`ribbon-visitor-${i}`),
      delayMs: 300 + i * 260
    }));
  }, [count]);
}

export default function HeroRibbon() {
  const uid = useId();
  const avatars = useAvatars(10);
  const tcommon = useTranslations("landing");
  const tribbon = useTranslations("landing.ribbon.sources");

  // ===== Adjustable parameters =====
  // Canvas
  const width = 1000; // overall width of the scene
  const height = 420; // overall height of the scene
  const centerX = width / 2;
  const centerY = 210; // vertical center of the ribbon

  // Ribbon thickness (ends vs center). Ends are WIDER than the center.
  const THICKNESS_ENDS = 420; // total thickness at far left/right
  const THICKNESS_CENTER = 200; // total thickness around middle

  // Horizontal curvature control points (0..width)
  const c1x = width * 0.33; // move to adjust curvature start
  const c2x = width * 0.66; // move to adjust curvature end

  // Blue bar appearance
  const BLUE_BAR_WIDTH = 8;
  const BLUE_BAR_EXTRA = 90; // extra pixels beyond ribbon thickness at center
  const PREFILL_MS = 40000; // show avatars as if animation has already been running
  const SPEED_MULTIPLIER = 3; // slow down movement (higher = slower)
  const GLOBAL_VISUAL_DELAY_MS = 1500; // delay showing motion to avoid competing anims

  // Edge fade (percentage of width on each side that fades out)
  const EDGE_FADE = 0.08; // 8% on left and right

  // Avatars
  const AVATAR_SIZE = 72;
  const AVATAR_RADIUS = AVATAR_SIZE / 2;
  const AVATAR_COUNT = avatars.length; // adjust via useAvatars

  // P logo below center bar
  const P_LOGO_RADIUS = 24;
  const P_LOGO_GAP = 10;

  // Counters: leads (personas) and sales (deals)
  const [leadCount, setLeadCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);

  // About 20-30% of avatars become a $ deal icon after the center line
  const DEAL_RATIO = 0.2;

  // Meta for timing when avatars cross the center (at 50% of their duration)
  const avatarMeta = useMemo(() => {
    return avatars.map((a, idx) => ({
      delayMs: a.delayMs,
      duration: (4800 + idx * 160) * SPEED_MULTIPLIER,
      isDeal: idx % Math.round(1 / DEAL_RATIO) === 0
    }));
  }, [avatars]);

  // Aggregate counter update: single timer; derives crossings analytically
  useEffect(() => {
    const startMs = performance.now();
    const prev = new Array(avatarMeta.length).fill(0);
    const update = () => {
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
    const id = window.setInterval(update, 500);
    update();
    return () => clearInterval(id);
  }, [avatarMeta, PREFILL_MS]);

  // Label settings (auto-size to content)
  const LABEL_MAX_WIDTH = 220;
  const LABEL_MAX_HEIGHT = 36;
  const LABEL_GAP = 4; // move closer to avatar
  const LABEL_FONT_SIZE = 14;
  const LABEL_FONT_WEIGHT = 600; // semibold
  const LABELS = [
    { id: "brevo", text: tribbon("emailing"), src: "/static/logos/integrations/brevo.jpeg" },
    { id: "linkedin", text: tribbon("form"), src: "/static/logos/integrations/framer.svg" },
    { id: "lemlist", text: tribbon("outreach"), src: "/static/logos/integrations/lemlist.svg" },
    { id: "shopify", text: tribbon("shop"), src: "/static/logos/integrations/shopify.svg" },
    { id: "chrome", text: tribbon("website"), src: "/static/logos/integrations/wordpress.svg" },
    { id: "systemeio", text: tribbon("funnel"), src: "/static/logos/integrations/systemeio.jpeg" },
    { id: "calcom", text: tribbon("form"), src: "/static/logos/integrations/calcom.jpeg" },
    { id: "calendly", text: tribbon("form"), src: "/static/logos/integrations/calendly.svg" }
  ] as const;

  // ===== Derived geometry (wider at ends, thinner at center) =====
  const topYEnds = centerY - THICKNESS_ENDS / 2;
  const bottomYEnds = centerY + THICKNESS_ENDS / 2;
  const topYMid = centerY - THICKNESS_CENTER / 2; // closer to center → thinner
  const bottomYMid = centerY + THICKNESS_CENTER / 2;

  // Top edge path (left → right)
  const topPath = `M 0 ${topYEnds} C ${c1x} ${topYMid}, ${c2x} ${topYMid}, ${width} ${topYEnds}`;
  // Bottom edge path (we'll close back right → left)
  const ribbonPath = `${topPath} L ${width} ${bottomYEnds} C ${c2x} ${bottomYMid}, ${c1x} ${bottomYMid}, 0 ${bottomYEnds} Z`;

  // Helper to compute a lane Bezier at offset tau (0=top edge, 1=bottom edge)
  const lanePathAt = (tau: number) => {
    const y0 = topYEnds + (bottomYEnds - topYEnds) * tau;
    const yMid = topYMid + (bottomYMid - topYMid) * tau;
    return `M 0 ${y0} C ${c1x} ${yMid}, ${c2x} ${yMid}, ${width} ${y0}`;
  };

  // Precompute lane paths to avoid recomputation in render
  const lanePaths = useMemo(() => {
    // placeholder; reassigned after laneOffsets is defined
    return [] as string[];
  }, []);

  // Distribute avatars around center vertically; center lane is a straight line
  const laneOffsets = useMemo(() => {
    // symmetric around 0.5, avoid going too close to borders
    const base: number[] = [];
    for (let i = 0; i < AVATAR_COUNT; i++) {
      // Alternate above/below center, gradually increasing distance
      const side = i % 2 === 0 ? -1 : 1;
      const step = Math.floor(i / 2) + 1;
      const distance = Math.min(0.45, 0.08 * step); // grow but clamp
      const tau = 0.5 + side * distance; // 0..1
      base.push(tau);
    }
    // Ensure one exact center lane as well
    if (!base.includes(0.5)) base.unshift(0.5);
    return base.slice(0, AVATAR_COUNT);
  }, [AVATAR_COUNT]);

  // Now that laneOffsets is defined, compute the actual paths
  const lanePathsComputed = useMemo(
    () => laneOffsets.map((t) => lanePathAt(t)),
    [laneOffsets, topYEnds, bottomYEnds, topYMid, bottomYMid, c1x, c2x, width]
  );

  // Safe modulo
  const mod = (n: number, m: number) => ((n % m) + m) % m;

  return (
    <div className="w-full grid place-items-center mt-12 mb-28 sm:mb-12 md:mt-0 md:mb-4">
      <div className="relative w-full max-w-6xl scale-200 sm:scale-150 md:scale-125 xl:scale-100">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
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

            {/* Edge fade mask */}
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

          {/* Fade-masked content: ribbon + avatars */}
          <g mask={`url(#${uid}-edgeFadeMask)`}>
            {/* Ribbon background */}
            <g>
              <path d={ribbonPath} fill={`url(#${uid}-ribbonFill)`} stroke="#e5e7eb" strokeWidth="1.25" />
            </g>

            {/* Moving avatars clipped to ribbon (rendered before blue bar so bar stays on top) */}
            <g clipPath={`url(#${uid}-ribbonClip)`}>
              {avatars.map((a, idx) => {
                const duration = (4800 + idx * 160) * SPEED_MULTIPLIER;
                // Start each avatar partway through its cycle so the ribbon looks populated
                const phaseMs = mod(PREFILL_MS - a.delayMs, duration);
                const begin = `-${phaseMs}ms`;
                const tau = laneOffsets[idx % laneOffsets.length];
                const pathD = lanePathsComputed[idx % lanePathsComputed.length];
                const hasLabel = idx % 10 < 8; // ~60% labeled
                const label = LABELS[idx % LABELS.length];
                const isDeal = idx % Math.round(1 / DEAL_RATIO) === 0; // ~20% become deal
                const emailBadge = (idx * 101) % 100 < 90;
                const phoneBadge = (idx * 137) % 100 < 50;
                const warmBadge = (idx * 173) % 100 < 40; // 30% flame badge
                return (
                  <g key={a.id} visibility="hidden">
                    <set attributeName="visibility" to="visible" begin={begin} />
                    {/* Single moving group with layered content to reduce duplicate animateMotion */}
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
                        {/* Visitor layer (pre-blue) */}
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
                        {/* Persona or Deal layer (post-blue) */}
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
                      {/* Inline label (pure SVG to avoid foreignObject cost) */}
                      {hasLabel &&
                        (() => {
                          const text = label.text;
                          const charW = 7; // approx
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
                                x={x0 + padX + iconW + gap}
                                y={y0 + h / 2 + 4}
                                fontSize={LABEL_FONT_SIZE}
                                fontWeight={LABEL_FONT_WEIGHT}
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
                      {/* Badges outside clip so they are visible above the avatar */}
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

          {/* P logo below the center blue bar with counters */}
          {(() => {
            const barHeight = THICKNESS_CENTER + BLUE_BAR_EXTRA;
            const bottomY = centerY + barHeight / 2;
            const y = bottomY + P_LOGO_GAP + P_LOGO_RADIUS;
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
                {/* Counters placed on both sides of the logo */}
                {/* Left (leads) */}
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
                {/* Right (sales) */}
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

          {/* Center blue separator bar (in front of everything) */}
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
