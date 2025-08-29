"use client";

import React, { useEffect, useMemo, useRef, useState, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, MailPlus, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";

type Avatar = {
  id: string;
  svg: string;
  delayMs: number;
};

function generateDicebear(seed: string, size: number = 64): string {
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
      id: `visitor-${i}`,
      svg: generateDicebear(`visitor-${i}`, 56),
      delayMs: 400 + i * 280
    }));
  }, [count]);
}

export default function AvatarFunnel() {
  const t = useTranslations("landing.funnel.event");
  const avatars = useAvatars(10);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const uid = useId();

  // Rotating event card state
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
  }, []);

  // Dimensions (widen ~30%)
  const width = 780;
  const centerX = width / 2;
  // Move the convergence point down to make the funnel ~40% taller
  const centerY = 400; // was 360
  const bottomMargin = 240; // more room for larger center logo/glow
  const height = centerY + bottomMargin;

  // Avatar sizing
  const AVATAR_SIZE = 90;
  const AVATAR_RADIUS = AVATAR_SIZE / 2;
  // Center logo sizing (doubled)
  const CENTER_RADIUS = 60;

  // Curved funnel geometry that starts at the very top
  const yTop = 0; // start lanes slightly above the visible area
  const topWidth = width - 20; // keep side margins
  const leftTopX = centerX - topWidth / 2;
  const rightTopX = centerX + topWidth / 2;

  // Control points to curve the funnel sides inward (convex inverse triangle)
  const cpOffsetX = topWidth * 0.38; // pull sides toward center
  const leftCPX = leftTopX + cpOffsetX;
  const rightCPX = rightTopX - cpOffsetX;
  const cpY = yTop + (centerY - yTop) * 0.42; // curvature mid-high

  // Closed path for funnel fill (top edge -> right curve -> left curve back)
  const funnelPath = `M ${leftTopX} ${yTop} L ${rightTopX} ${yTop} Q ${rightCPX} ${cpY} ${centerX} ${centerY} Q ${leftCPX} ${cpY} ${leftTopX} ${yTop} Z`;

  // Generate lanes with a simple quadratic curve per index
  const xMin = leftTopX + AVATAR_RADIUS + 6;
  const xMax = rightTopX - AVATAR_RADIUS - 6;

  // Stable seeded PRNG to randomize initial positions once per mount
  function hashStringToInt(str: string): number {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
    }
    return h >>> 0;
  }
  function mulberry32(seed: number) {
    return function () {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const randomStarts = useMemo(() => {
    const rng = mulberry32(hashStringToInt(uid));
    return Array.from({ length: avatars.length }).map(() => rng());
  }, [avatars.length, uid]);

  const getLanePath = (i: number) => {
    const r = randomStarts[i] ?? i / Math.max(1, avatars.length - 1);
    const x = xMin + r * (xMax - xMin);
    const t = (x - xMin) / (xMax - xMin);
    const cpX = leftCPX + (rightCPX - leftCPX) * t;
    return `M ${x} ${yTop} Q ${cpX} ${cpY} ${centerX} ${centerY - 60}`;
  };

  return (
    <div className="w-full grid place-items-center">
      <div className="relative w-full sm:w-11/12">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
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
          </defs>

          {/* Curved funnel background */}
          <g opacity="0.9">
            <path d={funnelPath} fill={`url(#${uid}-tunnelGradient)`} stroke="#e5e7eb" strokeWidth="1.25" />
          </g>

          {/* Optional soft lanes */}
          {avatars.map((_, idx) => (
            <path key={`lane-${idx}`} d={getLanePath(idx)} stroke="#eef2ff" strokeWidth="3" opacity="0.6" fill="none" />
          ))}

          {/* Avatars moving along straight lines inside the funnel */}
          {avatars.map((a, idx) => {
            const duration = 3500 + idx * 180;
            const begin = `${a.delayMs}ms`;
            return (
              <g key={a.id} visibility="hidden">
                <set attributeName="visibility" to="visible" begin={begin} />
                <g filter="url(#softShadow)">
                  <g clipPath={`url(#${uid}-avatarClip)`}>
                    <circle cx="0" cy="0" r={AVATAR_RADIUS} fill="#ffffff" />
                    <foreignObject x={-AVATAR_RADIUS} y={-AVATAR_RADIUS} width={AVATAR_SIZE} height={AVATAR_SIZE}>
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
                  path={getLanePath(idx)}
                >
                  {/* path attr drives the motion; mpath kept for compatibility */}
                </animateMotion>
              </g>
            );
          })}

          {/* Center node: gradient circle + white PIMMS glyph */}
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
                    fill="#3971FF"
                    d="M0 256C0 114.615 114.615 0 256 0C397.385 0 512 114.615 512 256C512 397.385 397.385 512 256 512C114.615 512 0 397.385 0 256Z"
                    opacity="0"
                  />
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
        </svg>

        {/* Rotating event card below the funnel */}
        {(() => {
          const cardTopPercent = ((centerY + 40) / height) * 100; // just below circle bottom
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
