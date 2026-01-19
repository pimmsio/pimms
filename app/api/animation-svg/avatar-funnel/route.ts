import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

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

function buildFunnelGeometry(opts: {
  width: number;
  centerX: number;
  centerY: number;
  yTop: number;
  topWidth: number;
  leftMargin: number;
  rightMargin: number;
}) {
  const { centerX, centerY, yTop, topWidth, leftMargin, rightMargin } = opts;

  const leftTopX = centerX - topWidth / 2;
  const rightTopX = centerX + topWidth / 2;

  const cpOffsetX = topWidth * 0.38;
  const leftCPX = leftTopX + cpOffsetX;
  const rightCPX = rightTopX - cpOffsetX;
  const cpY = yTop + (centerY - yTop) * 0.42;

  const funnelPath = `M ${leftTopX} ${yTop} L ${rightTopX} ${yTop} Q ${rightCPX} ${cpY} ${centerX} ${centerY} Q ${leftCPX} ${cpY} ${leftTopX} ${yTop} Z`;

  const xMin = leftTopX + leftMargin;
  const xMax = rightTopX - rightMargin;

  const lanePathAt = (r: number, yEnd: number) => {
    const x = xMin + r * (xMax - xMin);
    const t = (x - xMin) / (xMax - xMin);
    const cpX = leftCPX + (rightCPX - leftCPX) * t;
    return `M ${x} ${yTop} Q ${cpX} ${cpY} ${centerX} ${yEnd}`;
  };

  return { funnelPath, lanePathAt, xMin, xMax, leftCPX, rightCPX, cpY };
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

// Server-side implementation of useStableRandomStarts
function getStableRandomStarts(count: number, uid: string): number[] {
  const rng = mulberry32(hashStringToInt(uid));
  return Array.from({ length: count }, () => rng());
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
  const uid = searchParams.get("uid") || "funnel";
  const seedNonce = searchParams.get("seed") || "default";

  // EXACT original parameters from AvatarFunnel.tsx
  const VISIBLE_COUNT = 10;
  const POOL_SIZE = 60;
  const EDGE_FADE_TOP = 0.12;

  const width = 780;
  const centerX = width / 2;
  const centerY = 450;
  const bottomMargin = 240;
  const height = centerY + bottomMargin;

  const AVATAR_SIZE = 90;
  const AVATAR_RADIUS = AVATAR_SIZE / 2;
  const CENTER_RADIUS = 60;
  const ANIMATION_OFFSET_MS = 20000;

  // Generate funnel geometry using EXACT original function
  const { funnelPath, lanePathAt } = buildFunnelGeometry({
    width,
    centerX,
    centerY,
    yTop: 0,
    topWidth: width - 20,
    leftMargin: AVATAR_RADIUS + 6,
    rightMargin: AVATAR_RADIUS + 6
  });

  // Get stable random starts for deterministic positioning
  const randomStarts = getStableRandomStarts(VISIBLE_COUNT, uid);

  // Generate avatar seeds using EXACT original logic
  const avatarSeeds = getSharedSeeds(VISIBLE_COUNT, seedNonce);
  const { slotCycles } = getSlotSeeds({
    slotCount: VISIBLE_COUNT,
    poolSize: POOL_SIZE,
    prefillMs: ANIMATION_OFFSET_MS,
    uidSeed: uid,
    seedNonce
  });

  // Create avatars with EXACT original timing and positioning
  const getDelayMs = (i: number) => 400 + i * 280;
  const getDurationMs = (i: number) => 3500 + i * 180;

  const avatars = Array.from({ length: VISIBLE_COUNT }).map((_, i) => ({
    id: `visitor-slot-${i}-cycle-${slotCycles[i] ?? 0}`,
    seed: avatarSeeds[i] ?? `seed-${i}`,
    delayMs: getDelayMs(i),
    cycle: slotCycles[i] ?? 0
  }));

  // Generate SVG with EXACT original structure
  const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
  <defs>
    <linearGradient id="${uid}-tunnelGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#f8fafc" />
    </linearGradient>
    <linearGradient id="${uid}-pimmsBlueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e2e8f0" />
      <stop offset="100%" stop-color="#cbd5e1" />
    </linearGradient>
    <clipPath id="${uid}-avatarClip">
      <circle r="${AVATAR_RADIUS}" cx="0" cy="0" />
    </clipPath>
    <linearGradient id="${uid}-topFadeMaskGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="black" />
      <stop offset="${EDGE_FADE_TOP * 100}%" stop-color="white" />
      <stop offset="100%" stop-color="white" />
    </linearGradient>
    <mask id="${uid}-topEdgeFadeMask" maskUnits="userSpaceOnUse" x="0" y="0" width="${width}" height="${height}">
      <rect x="0" y="0" width="${width}" height="${height}" fill="url(#${uid}-topFadeMaskGradient)" />
    </mask>
  </defs>
  
  <g mask="url(#${uid}-topEdgeFadeMask)">
    <!-- Funnel background -->
    <g>
      <path d="${funnelPath}" fill="url(#${uid}-tunnelGradient)" stroke="#e2e8f0" stroke-width="1.25" />
    </g>

    <!-- Lane hints -->
    ${Array.from({ length: VISIBLE_COUNT })
      .map(
        (_, idx) => `
    <path
      d="${lanePathAt(randomStarts[idx] ?? idx / Math.max(1, VISIBLE_COUNT - 1), centerY - 60)}"
      stroke="#e2e8f0"
      stroke-width="1.5"
      fill="none"
    />`
      )
      .join("")}

    <!-- Animated avatars -->
    ${avatars
      .map((a, idx) => {
        const duration = getDurationMs(idx);
        const begin = computeBegin(ANIMATION_OFFSET_MS, a.delayMs, duration);
        const pathD = lanePathAt(randomStarts[idx] ?? idx / Math.max(1, VISIBLE_COUNT - 1), centerY - 60);

        return `
    <g>
      <!-- Anonymous (top half) -->
      <g>
        <animate attributeName="visibility" begin="${begin}" dur="${duration}ms" repeatCount="indefinite" values="visible;hidden;hidden" keyTimes="0;0.5;1" />
        <g clipPath="url(#${uid}-avatarClip)">
          <circle cx="0" cy="0" r="${AVATAR_RADIUS}" fill="#ffffff" />
          <g transform="translate(-12 -12)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </g>
        </g>
        <circle cx="0" cy="0" r="${AVATAR_RADIUS}" fill="none" stroke="#e2e8f0" stroke-width="0.5" />
      </g>
      <!-- Identified (bottom half) -->
      <g>
        <animate attributeName="visibility" begin="${begin}" dur="${duration}ms" repeatCount="indefinite" values="hidden;visible;visible" keyTimes="0;0.5;1" />
        <g clipPath="url(#${uid}-avatarClip)">
          <circle cx="0" cy="0" r="${AVATAR_RADIUS}" fill="#ffffff" />
          <foreignObject
            x="${-AVATAR_RADIUS}"
            y="${-AVATAR_RADIUS}"
            width="${AVATAR_SIZE}"
            height="${AVATAR_SIZE}"
          >
            <img
              src="/api/avatar/${encodeURIComponent(a.seed || "default")}"
              alt=""
              style="width: ${AVATAR_SIZE}px; height: ${AVATAR_SIZE}px; filter: saturate(0.85);"
              loading="lazy"
            />
          </foreignObject>
        </g>
        <circle cx="0" cy="0" r="${AVATAR_RADIUS}" fill="none" stroke="#e2e8f0" stroke-width="0.5" />
      </g>
      <animateMotion
        begin="${begin}"
        dur="${duration}ms"
        repeatCount="indefinite"
        keyPoints="0;1"
        keyTimes="0;1"
        calcMode="linear"
        path="${pathD}"
      />
    </g>`;
      })
      .join("")}

    <!-- Center Pimms logo -->
    ${(() => {
      const logoY = centerY - 20;
      const logoRadius = Math.max(18, Math.round(CENTER_RADIUS * 0.5));
      const LOGO_SIZE = 512;
      const scale = (logoRadius * 2) / LOGO_SIZE;
      const tx = -LOGO_SIZE / 2;
      const ty = -LOGO_SIZE / 2;
      return `
    <g transform="translate(${centerX} ${logoY})">
      <circle r="${logoRadius}" fill="#3b82f6" />
      <g transform="scale(${scale}) translate(${tx} ${ty})">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M204.297 379.352C204.297 389.651 195.948 398 185.648 398C175.349 398 167 389.651 167 379.352V217.225C167 198.625 170.841 181.927 178.522 167.155C186.286 152.538 197.264 140.424 210.395 131.988C223.963 123.33 239.219 119 256.175 119C273.119 119 288.27 123.46 301.606 132.38C314.72 141.042 325.593 153.426 333.141 168.297C341.054 183.08 345 199.386 345 217.225C345 236.337 341.276 253.404 333.817 268.436C326.502 283.053 315.85 295.196 302.966 303.605C289.852 312.263 274.817 316.592 257.862 316.592C245.298 316.685 232.923 313.134 221.927 306.28C215.275 301.996 209.399 296.973 204.297 291.219V257.039C204.297 253.282 202.081 249.878 198.645 248.357C192.368 245.577 185.372 250.216 186.74 256.944C188.288 264.556 191.088 271.826 195.139 278.76C197.85 283.236 200.902 287.39 204.297 291.219V379.352ZM256.175 276.845C266.113 276.845 274.933 274.169 282.615 268.817C290.381 263.636 296.812 256.257 301.268 247.41C305.772 238.301 308.105 228.033 308.042 217.605C308.135 207.291 305.797 197.133 301.268 188.17C296.81 179.325 290.381 171.945 282.615 166.763C274.933 161.411 266.113 158.748 256.175 158.748C246.226 158.748 237.289 161.423 229.376 166.775C221.762 172.045 215.464 179.412 211.071 188.182C206.544 197.142 204.206 207.295 204.297 217.605C204.297 228.309 206.555 238.241 211.071 247.41C215.465 256.182 221.768 263.55 229.386 268.817C237.299 274.169 246.226 276.845 256.175 276.845Z"
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

  </g>
</svg>`;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
      "ETag": `"avatar-funnel-${uid}-${seedNonce}"`,
      "X-Content-Type-Options": "nosniff"
    }
  });
}
