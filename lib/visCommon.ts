import { hashStringToInt, mod, mulberry32 } from "@/lib/avatarAnim";
import { useMemo } from "react";

/** Negative begin string so animation looks pre-filled */
export function computeBegin(prefillMs: number, delayMs: number, durationMs: number) {
  const phaseMs = mod(prefillMs - delayMs, durationMs);
  return `-${phaseMs}ms`;
}

/** Stable random in [0,1) array of length `count` derived from a uid/seed */
export function useStableRandomStarts(count: number, uid: string) {
  return useMemo(() => {
    const rng = mulberry32(hashStringToInt(uid));
    return Array.from({ length: count }).map(() => rng());
  }, [count, uid]);
}

/** Symmetric lane offsets around 0.5 (0..1) keeping away from edges */
export function getLaneOffsets(count: number) {
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

/** Build ribbon shape + lane path factory */
export function buildRibbonGeometry(opts: {
  width: number;
  centerY: number;
  thicknessEnds: number;
  thicknessCenter: number;
  c1x: number;
  c2x: number;
}) {
  const { width, centerY, thicknessEnds, thicknessCenter, c1x, c2x } = opts;
  const topYEnds = centerY - thicknessEnds / 2;
  const bottomYEnds = centerY + thicknessEnds / 2;
  const topYMid = centerY - thicknessCenter / 2;
  const bottomYMid = centerY + thicknessCenter / 2;

  const topPath = `M 0 ${topYEnds} C ${c1x} ${topYMid}, ${c2x} ${topYMid}, ${width} ${topYEnds}`;
  const ribbonPath = `${topPath} L ${width} ${bottomYEnds} C ${c2x} ${bottomYMid}, ${c1x} ${bottomYMid}, 0 ${bottomYEnds} Z`;

  const lanePathAt = (tau: number) => {
    const y0 = topYEnds + (bottomYEnds - topYEnds) * tau;
    const yMid = topYMid + (bottomYMid - topYMid) * tau;
    return `M 0 ${y0} C ${c1x} ${yMid}, ${c2x} ${yMid}, ${width} ${y0}`;
  };

  return { ribbonPath, lanePathAt, topYEnds, bottomYEnds, topYMid, bottomYMid };
}

/** Build funnel geometry + lane path factories */
export function buildFunnelGeometry(opts: {
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
