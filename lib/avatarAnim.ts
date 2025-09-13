import { useMemo } from "react";
import { getSharedSeeds } from "@/lib/avatarPool";

export type Avatar = {
  id: string;
  svg?: string; // Keep for backwards compatibility
  seed?: string; // New: avatar seed for external URL
  delayMs: number;
  cycle?: number;
};

export function hashStringToInt(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
}

export function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function sampleUniqueIndices(count: number, max: number, rng: () => number): number[] {
  const indices = Array.from({ length: max }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count);
}

export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

type UsePerSlotSeedsArgs = {
  slotCount: number;
  poolSize: number;
  prefillMs: number;
  getDelayMs: (slotIndex: number) => number;
  getDurationMs: (slotIndex: number) => number;
  uidSeed: string;
  seedNonce: string; // <<< NEW: guarantees SSR/CSR parity
};

/**
 * Rotates one seed per visible slot.
 * - Same face during a motion cycle; swap at cycle boundary.
 * - Deterministic order inside the nonce-specific pool (no random flicker).
 */
export function usePerSlotSeeds(args: UsePerSlotSeedsArgs) {
  const { slotCount, poolSize, uidSeed, seedNonce } = args;

  // Deterministic initial seeds par slot (on garde ça)
  const initialSlotSeeds = useMemo(() => {
    const seeds = getSharedSeeds(poolSize, seedNonce);
    const rng = mulberry32(hashStringToInt(`${seedNonce}::${uidSeed}::init`)); // NEW: seed init avec nonce
    const picks = sampleUniqueIndices(Math.min(slotCount, poolSize), poolSize, rng);
    return picks.map((i) => seeds[i]);
  }, [uidSeed, slotCount, poolSize, seedNonce]);

  return { slotSeeds: initialSlotSeeds, slotCycles: Array.from({ length: slotCount }, () => 0) } as const;
}
