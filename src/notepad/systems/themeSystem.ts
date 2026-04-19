export type NotebookThemeId = "void" | "starlight" | "rose-veil" | "abyss";

export interface NotebookTheme {
  id: NotebookThemeId;
  name: string;
  description: string;
  containerClass: string;
  accentClass: string;
  auraClass: string;
  glowColor: string;
}

export const notebookThemes: NotebookTheme[] = [
  {
    id: "void",
    name: "Void Black",
    description: "Minimal, deep, and quiet. The default ritual space.",
    containerClass: "bg-black/70 border-white/20",
    accentClass: "text-[#7ffcff]",
    auraClass:
      "from-transparent via-[#0f172a]/60 to-transparent",
    glowColor: "rgba(127, 252, 255, 0.35)",
  },
  {
    id: "starlight",
    name: "Starlight Drift",
    description: "Soft cosmic glow with cyan highlights.",
    containerClass:
      "bg-gradient-to-br from-black via-slate-900 to-black border-[#7ffcff]/40",
    accentClass: "text-[#7ffcff]",
    auraClass:
      "from-[#0f172a]/40 via-[#1e293b]/80 to-[#020617]/60",
    glowColor: "rgba(127, 252, 255, 0.5)",
  },
  {
    id: "rose-veil",
    name: "Rose Veil",
    description: "Mystical pink haze with gentle warmth.",
    containerClass:
      "bg-gradient-to-br from-[#2b0b1f] via-[#3b1028] to-[#12020b] border-[#ff8cff]/40",
    accentClass: "text-[#ff8cff]",
    auraClass:
      "from-[#4c0519]/40 via-[#9f1239]/60 to-[#1f2937]/60",
    glowColor: "rgba(255, 140, 255, 0.5)",
  },
  {
    id: "abyss",
    name: "Abyssal Blue",
    description: "Deep oceanic blue with subtle luminescence.",
    containerClass:
      "bg-gradient-to-br from-[#020617] via-[#02091f] to-[#000] border-blue-400/40",
    accentClass: "text-blue-300",
    auraClass:
      "from-[#0b1120]/40 via-[#1d4ed8]/40 to-[#020617]/70",
    glowColor: "rgba(59, 130, 246, 0.5)",
  },
];

export const ThemeSystem = {
  getTheme(id: NotebookThemeId): NotebookTheme {
    return notebookThemes.find((t) => t.id === id) || notebookThemes[0];
  },
};
