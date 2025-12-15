import { NextRequest, NextResponse } from "next/server";
import { getTranslations } from "next-intl/server";

export const runtime = "edge";

// Exact copies of the original helper functions
function getSharedSeeds(count: number, seedNonce: string): string[] {
  const seeds: string[] = [];
  let hash = 0;
  for (let i = 0; i < seedNonce.length; i++) {
    const char = seedNonce.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  for (let i = 0; i < count; i++) {
    hash = (hash * 9301 + 49297) % 233280;
    seeds.push(`${seedNonce}-${hash}-${i}`);
  }
  return seeds;
}

function mod(a: number, b: number): number {
  return ((a % b) + b) % b;
}

function computeBegin(prefillMs: number, delayMs: number, durationMs: number) {
  const phaseMs = mod(prefillMs - delayMs, durationMs);
  return `-${phaseMs}ms`;
}

function getLaneOffsets(count: number) {
  const offsets: number[] = [];
  for (let i = 0; i < count; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const step = Math.floor(i / 2) + 1;
    const distance = Math.min(0.45, 0.08 * step);
    const tau = 0.5 + side * distance;
    offsets.push(tau);
  }
  if (!offsets.includes(0.5)) offsets.unshift(0.5);
  return offsets.slice(0, count);
}

function buildRibbonGeometry(params: {
  width: number;
  centerY: number;
  thicknessEnds: number;
  thicknessCenter: number;
  c1x: number;
  c2x: number;
}) {
  const { width, centerY, thicknessEnds, thicknessCenter, c1x, c2x } = params;

  const topYEnds = centerY - thicknessEnds / 2;
  const bottomYEnds = centerY + thicknessEnds / 2;
  const topYMid = centerY - thicknessCenter / 2;
  const bottomYMid = centerY + thicknessCenter / 2;

  const topPath = `M 0 ${topYEnds} C ${c1x} ${topYMid}, ${c2x} ${topYMid}, ${width} ${topYEnds}`;
  const ribbonPath = `${topPath} L ${width} ${bottomYEnds} C ${c2x} ${bottomYMid}, ${c1x} ${bottomYMid}, 0 ${bottomYEnds} Z`;

  // EXACT original: tau ranges from 0 to 1, representing position across ribbon thickness
  const lanePathAt = (tau: number) => {
    const y0 = topYEnds + (bottomYEnds - topYEnds) * tau;
    const yMid = topYMid + (bottomYMid - topYMid) * tau;
    return `M 0 ${y0} C ${c1x} ${yMid}, ${c2x} ${yMid}, ${width} ${y0}`;
  };

  return { ribbonPath, lanePathAt };
}

function hashStringToInt(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Server-side implementation of usePerSlotSeeds
function getSlotSeeds(params: {
  slotCount: number;
  poolSize: number;
  prefillMs: number;
  uidSeed: string;
  seedNonce: string;
}) {
  const { slotCount, poolSize, uidSeed, seedNonce } = params;
  const slotSeeds: string[] = [];
  const rng = mulberry32(hashStringToInt(uidSeed + seedNonce));

  for (let i = 0; i < slotCount; i++) {
    const poolIndex = Math.floor(rng() * poolSize);
    slotSeeds.push(`${seedNonce}-slot-${i}-${poolIndex}`);
  }

  return {
    slotSeeds,
    slotCycles: Array(slotCount).fill(0)
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid") || "ribbon";
  const seedNonce = searchParams.get("seed") || "default";
  const locale = searchParams.get("locale") || "en";

  // EXACT original parameters from HeroRibbon.tsx
  const POOL_SIZE = 30;
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
  const GLOBAL_VISUAL_DELAY_MS = 0;
  const EDGE_FADE = 0.08;
  const AVATAR_SIZE = 72;
  const AVATAR_RADIUS = AVATAR_SIZE / 2;
  const LABEL_MAX_WIDTH = 220;
  const LABEL_MAX_HEIGHT = 36;
  const LABEL_GAP = 4;
  const LABEL_FONT_SIZE = 13;
  const LABEL_FONT_WEIGHT = 500;
  const P_LOGO_RADIUS = 24;
  const P_LOGO_GAP = 10;
  const DEAL_RATIO = 0.2;

  // Generate ribbon geometry using EXACT original function
  const { ribbonPath, lanePathAt } = buildRibbonGeometry({
    width,
    centerY,
    thicknessEnds: THICKNESS_ENDS,
    thicknessCenter: THICKNESS_CENTER,
    c1x,
    c2x
  });

  // Get lane offsets and paths using EXACT original logic
  const laneOffsets = getLaneOffsets(10); // AVATAR_COUNT from original
  // EXACT original: lanePathAt(t) where t is the direct offset from getLaneOffsets
  const lanePathsComputed = laneOffsets.map((t) => lanePathAt(t));

  // Generate avatar seeds using EXACT original logic
  const avatarSeeds = getSharedSeeds(10, seedNonce);
  const { slotSeeds, slotCycles } = getSlotSeeds({
    slotCount: 10,
    poolSize: POOL_SIZE,
    prefillMs: PREFILL_MS,
    uidSeed: uid,
    seedNonce
  });

  // Create avatars with EXACT original timing
  const avatars = Array.from({ length: 10 }).map((_, i) => ({
    id: `ribbon-visitor-${i}`,
    seed: avatarSeeds[i],
    delayMs: 300 + i * 260 // EXACT original delays
  }));

  // Get translated labels using proper i18n system
  const t = await getTranslations({ locale, namespace: "general.hero_ribbon.labels" });
  const LABELS = [
    { id: "brevo", text: t("emailing"), src: "/static/symbols/integrations/brevo.svg" },
    { id: "linkedin", text: t("form"), src: "/static/symbols/integrations/framer.svg" },
    { id: "lemlist", text: t("outreach"), src: "/static/symbols/integrations/lemlist.svg" },
    { id: "shopify", text: t("shop"), src: "/static/symbols/integrations/shopify.svg" },
    { id: "chrome", text: t("website"), src: "/static/symbols/integrations/wordpress.svg" },
    { id: "systemeio", text: t("funnel"), src: "/static/symbols/integrations/systemeio.webp" },
    { id: "calcom", text: t("form"), src: "/static/symbols/integrations/calcom.svg" },
    { id: "calendly", text: t("form"), src: "/static/symbols/integrations/calendly.svg" }
  ];

  // Generate SVG with EXACT original structure and styling
  const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
  <defs>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.1" />
    </filter>
    <linearGradient id="${uid}-ribbonFill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#f8fafc" />
    </linearGradient>
    <linearGradient id="${uid}-blueBar" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#e2e8f0" />
      <stop offset="100%" stop-color="#cbd5e1" />
    </linearGradient>
    <clipPath id="${uid}-ribbonClip">
      <path d="${ribbonPath}" />
    </clipPath>
    <clipPath id="${uid}-avatarClip">
      <circle r="${AVATAR_RADIUS}" cx="0" cy="0" />
    </clipPath>
    <linearGradient id="${uid}-fadeMaskGradient" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="black" />
      <stop offset="${EDGE_FADE * 100}%" stop-color="white" />
      <stop offset="${(1 - EDGE_FADE) * 100}%" stop-color="white" />
      <stop offset="100%" stop-color="black" />
    </linearGradient>
    <mask id="${uid}-edgeFadeMask" maskUnits="userSpaceOnUse" x="0" y="0" width="${width}" height="${height}">
      <rect x="0" y="0" width="${width}" height="${height}" fill="url(#${uid}-fadeMaskGradient)" />
    </mask>
  </defs>

  <g mask="url(#${uid}-edgeFadeMask)">
    <g>
      <path d="${ribbonPath}" fill="url(#${uid}-ribbonFill)" />
    </g>
    <g clipPath="url(#${uid}-ribbonClip)">
      ${avatars
        .map((a, idx) => {
          const duration = (4800 + idx * 160) * SPEED_MULTIPLIER;
          const begin = computeBegin(PREFILL_MS, a.delayMs, duration);
          const pathD = lanePathsComputed[idx % lanePathsComputed.length];
          const hasLabel = idx % 10 < 8;
          const label = LABELS[idx % LABELS.length];
          const isDeal = idx % Math.round(1 / DEAL_RATIO) === 0;
          const emailBadge = (idx * 101) % 100 < 90;
          const phoneBadge = (idx * 137) % 100 < 50;
          const warmBadge = (idx * 173) % 100 < 40;

          return `<g key="${a.id}-cycle-${slotCycles[idx] ?? 0}" visibility="hidden">
          <set attributeName="visibility" to="visible" begin="${begin}" />
          <g pointer-events="none" opacity="0">
            <animate attributeName="opacity" begin="${GLOBAL_VISUAL_DELAY_MS}ms" dur="1ms" to="1" fill="freeze" />
            <g clipPath="url(#${uid}-avatarClip)">
              <circle cx="0" cy="0" r="${AVATAR_RADIUS}" fill="#f3f4f6" />
              <g opacity="1">
              <g transform="translate(-16 -16)">
                  <!-- User icon SVG (simplified) -->
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                </g>
                <animate attributeName="opacity" begin="${begin}" dur="${duration}ms" repeatCount="indefinite" keyTimes="0;0.5;0.5001;1" values="1;1;0;0" />
              </g>
              <g opacity="0">
                ${
                  isDeal
                    ? `
                <g>
                  <circle cx="0" cy="0" r="${AVATAR_RADIUS}" fill="url(#${uid}-blueBar)" />
                  <g transform="translate(-14 -14)">
                    <!-- DollarSign icon SVG -->
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </g>
                </g>`
                    : `
                <foreignObject key="persona-${idx}-${slotSeeds[idx]}" x="${-AVATAR_RADIUS}" y="${-AVATAR_RADIUS}" width="${AVATAR_SIZE}" height="${AVATAR_SIZE}">
                  <img src="/api/avatar/${encodeURIComponent(slotSeeds[idx] ?? "seed")}" alt="" style="width: ${AVATAR_SIZE}px; height: ${AVATAR_SIZE}px;" loading="lazy" />
                </foreignObject>`
                }
                <animate attributeName="opacity" begin="${begin}" dur="${duration}ms" repeatCount="indefinite" keyTimes="0;0.5;0.5001;1" values="0;0;1;1" />
              </g>
            </g>
            ${
              hasLabel
                ? `
            <g opacity="0" transform="translate(0 0)">
              ${(() => {
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
                return `
              <rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="${rx}" fill="#ffffff" stroke="#f3f4f6" />
              <image href="${label.src}" x="${x0 + padX}" y="${y0 + (h - iconW) / 2}" width="${iconW}" height="${iconW}" preserveAspectRatio="xMidYMid meet" />
              <text aria-hidden="true" x="${x0 + padX + iconW + gap}" y="${y0 + h / 2 + 4}" font-size="${LABEL_FONT_SIZE}" font-weight="${LABEL_FONT_WEIGHT}" fill="#111827">${text}</text>`;
              })()}
              <animate attributeName="opacity" begin="${begin}" dur="${duration}ms" repeatCount="indefinite" keyTimes="0;0.5;0.5001;1" values="0;0;1;1" />
            </g>`
                : ""
            }
            ${
              !isDeal && (emailBadge || phoneBadge || warmBadge)
                ? `
            <g opacity="0">
              ${(() => {
                const BADGE_R = 10;
                const GAP = 2;
                const baseX = AVATAR_RADIUS - 35;
                const baseY = -AVATAR_RADIUS - 1;
                const badges = [];
                if (emailBadge) badges.push("email");
                if (phoneBadge) badges.push("phone");
                if (warmBadge) badges.push("warm");
                return badges
                  .map(
                    (b, i) => `
                  <g transform="translate(${baseX + i * (BADGE_R * 2 + GAP)} ${baseY})">
                    <circle r="${BADGE_R}" cx="0" cy="0" fill="#ffffff" stroke="#f3f4f6" />
              ${
                      b === "email"
                        ? `<g transform="translate(-7 -7)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="12" r="4"></circle>
                          <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"></path>
                        </svg>
              </g>`
                        : b === "phone"
                          ? `<g transform="translate(-7 -7)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </g>`
                          : `<text x="-7" y="5" font-size="14">🔥</text>`
                    }
                  </g>`
                  )
                  .join("");
              })()}
              <animate attributeName="opacity" begin="${begin}" dur="${duration}ms" repeatCount="indefinite" keyTimes="0;0.5;0.5001;1" values="0;0;1;1" />
            </g>`
                : ""
            }
            <animateMotion begin="${begin}" dur="${duration}ms" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear" path="${pathD}" />
          </g>
        </g>`;
        })
        .join("")}
    </g>
  </g>

  <!-- P logo with EXACT original design -->
  ${(() => {
    const barHeight = THICKNESS_CENTER + BLUE_BAR_EXTRA;
    const y = centerY + barHeight / 2 + P_LOGO_GAP + P_LOGO_RADIUS;
    const LOGO_SIZE = 512;
    const scale = (P_LOGO_RADIUS * 2) / LOGO_SIZE;
    const tx = -LOGO_SIZE / 2;
    const ty = -LOGO_SIZE / 2;
    return `
  <g transform="translate(${centerX} ${y})">
    <g>
      <circle r="${P_LOGO_RADIUS}" fill="#3b82f6" />
    </g>
    <g transform="scale(${scale}) translate(${tx} ${ty})">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M204.297 379.352C204.297 389.651 195.948 398 185.648 398C175.349 398 167 389.651 167 379.352V217.225C167 198.625 170.841 181.927 178.522 167.155C186.286 152.538 197.264 140.424 210.395 131.988C223.963 123.33 239.219 119 256.175 119C273.119 119 288.27 123.46 301.606 132.38C314.72 141.042 325.593 153.426 333.141 168.297C341.054 183.08 345 199.386 345 217.225C345 236.337 341.276 253.404 333.817 268.436C326.502 283.053 315.85 295.196 302.966 303.605C289.852 312.263 274.817 316.592 257.862 316.592C245.298 316.685 232.923 313.134 221.927 306.28C215.275 301.996 209.399 296.973 204.297 291.219V257.039C204.297 253.282 202.081 249.878 198.645 248.357C192.368 245.577 185.372 250.216 186.74 256.944C188.288 264.556 191.088 271.826 195.139 278.76C197.85 283.236 200.902 287.39 204.297 291.219V379.352ZM256.175 276.845C266.113 276.845 274.933 274.169 282.615 268.817C290.381 263.636 296.812 256.257 301.268 247.41C305.772 238.301 308.105 228.033 308.042 217.605C308.135 207.291 305.797 197.133 301.268 188.17C296.81 179.325 290.381 171.945 282.615 166.763C274.933 161.411 266.113 158.748 256.175 158.748C246.226 158.748 237.289 161.423 229.376 166.775C221.762 172.045 215.464 179.412 211.071 188.182C206.544 197.142 204.206 207.295 204.297 217.605C204.297 228.309 206.555 238.241 211.071 247.41C215.465 256.182 221.768 263.550 229.386 268.817C237.299 274.169 246.226 276.845 256.175 276.845Z"
        fill="#ffffff"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M198.645 248.357C202.081 249.878 204.297 253.282 204.297 257.039V291.219C200.902 287.39 197.85 283.236 195.139 278.76C191.088 271.826 188.288 264.556 186.74 256.944C185.372 250.216 192.368 245.577 198.645 248.357Z"
        fill="#ffffff"
      />
    </g>
  </g>`;
  })()}

  <g>
    <rect x="${centerX - BLUE_BAR_WIDTH / 2}" y="${centerY - (THICKNESS_CENTER + BLUE_BAR_EXTRA) / 2}" width="${BLUE_BAR_WIDTH}" height="${THICKNESS_CENTER + BLUE_BAR_EXTRA}" rx="${BLUE_BAR_WIDTH / 2}" fill="#3b82f6" />
  </g>
</svg>`;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=60",
      "CDN-Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Vercel-CDN-Cache-Control": "public, s-maxage=86400",
      "ETag": `"hero-ribbon-${uid}-${seedNonce}-${locale}"`,
      "X-Content-Type-Options": "nosniff"
    }
  });
}
