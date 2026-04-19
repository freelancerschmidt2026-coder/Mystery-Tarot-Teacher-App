export type CoverRarity = "free" | "premium" | "legendary";

export interface PremiumCoverLock {
  id: string;
  rarity: CoverRarity;
  isUnlocked: boolean;
}

export const premiumCoverLocks: PremiumCoverLock[] = [
  { id: "default", rarity: "free", isUnlocked: true },
  { id: "starlight", rarity: "free", isUnlocked: true },
  { id: "aura-shift", rarity: "premium", isUnlocked: false },
  { id: "nebula-flow", rarity: "premium", isUnlocked: false },
];

export const PremiumLockSystem = {
  isUnlocked(id: string): boolean {
    const entry = premiumCoverLocks.find((c) => c.id === id);
    return entry ? entry.isUnlocked : false;
  },

  unlock(id: string): void {
    const entry = premiumCoverLocks.find((c) => c.id === id);
    if (entry) entry.isUnlocked = true;
  },

  getRarity(id: string): CoverRarity {
    const entry = premiumCoverLocks.find((c) => c.id === id);
    return entry ? entry.rarity : "free";
  },
};
