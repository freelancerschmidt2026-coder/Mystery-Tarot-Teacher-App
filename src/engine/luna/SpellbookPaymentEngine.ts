// src/engine/luna/SpellbookPaymentEngine.ts

export interface SpellbookPage {
  title: string;
  description: string;
  icon: string;
}

export interface SpellbookOffer {
  pages: SpellbookPage[];
  price: string;
  isEligible: boolean;
}

export const SpellbookPaymentEngine = {
  buildOffer(userTier: string): SpellbookOffer {
    const isEligible = userTier !== "PREMIUM";

    return {
      price: "$9.99",
      isEligible,
      pages: [
        {
          title: "Living Tarot",
          description: "Watch the cards awaken and step into your world.",
          icon: "🔥",
        },
        {
          title: "Luna’s Voice Rituals",
          description: "Unlock voice‑activated ceremonies and hidden scenes.",
          icon: "🌙",
        },
        {
          title: "Mystery Evolutions",
          description: "Characters leave the card and act out your prophecy.",
          icon: "✨",
        },
      ],
    };
  },
};
