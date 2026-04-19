export interface AnimatedCoverTemplate {
  id: string;
  name: string;
  shimmerSpeed: number;
  hueShift: number;
  className: string;
}

export const animatedCovers: AnimatedCoverTemplate[] = [
  {
    id: "aura-shift",
    name: "Aura Shift",
    shimmerSpeed: 2.4,
    hueShift: 40,
    className: `
      bg-gradient-to-br 
      from-[#1a1a1a] 
      via-[#2a2a4a] 
      to-[#1a1a1a]
      border border-[#7ffcff]/50
      shadow-[0_0_40px_rgba(127,252,255,0.4)]
    `,
  },
  {
    id: "nebula-flow",
    name: "Nebula Flow",
    shimmerSpeed: 3.2,
    hueShift: 120,
    className: `
      bg-gradient-to-br 
      from-[#0a0a1f] 
      via-[#1f0a3f] 
      to-[#0a0a1f]
      border border-[#ff8cff]/50
      shadow-[0_0_50px_rgba(255,140,255,0.5)]
    `,
  },
];
