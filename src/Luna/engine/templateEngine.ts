export interface LunaGeneratedTemplate {
  id: string;
  name: string;
  className: string;
  shimmerSeed: number;
  rarity: "common" | "rare" | "legendary";
}

export const LunaTemplateEngine = {
  generateTemplate(): LunaGeneratedTemplate {
    const seed = Math.floor(Math.random() * 999999);

    return {
      id: `luna-${seed}`,
      name: `Luna Cover ${seed}`,
      shimmerSeed: seed,
      rarity: this.pickRarity(),
      className: this.generateClass(seed),
    };
  },

  pickRarity(): "common" | "rare" | "legendary" {
    const roll = Math.random();

    if (roll > 0.97) return "legendary";
    if (roll > 0.75) return "rare";
    return "common";
  },

  generateClass(seed: number): string {
    const hue = seed % 360;

    return `
      bg-gradient-to-br 
      from-[hsl(${hue},70%,40%)] 
      via-[hsl(${(hue + 60) % 360},70%,30%)] 
      to-[hsl(${(hue + 120) % 360},70%,20%)]
      border border-white/30
      shadow-[0_0_40px_rgba(255,255,255,0.2)]
    `;
  },
};
