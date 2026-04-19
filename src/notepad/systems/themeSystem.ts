export type NotebookThemeId = "void" | "starlight" | "rose-veil" | "abyss";

export interface NotebookTheme {
  id: NotebookThemeId;
  name: string;
  description: string;
  containerClass: string;
  accentClass: string;
}

export const notebookThemes: NotebookTheme[] = [
  {
    id: "void",
    name: "Void Black",
    description: "Minimal, deep, and quiet. The default ritual space.",
    containerClass: "bg-black/70 border-white/20",
    accentClass: "text-[#7ffcff]",
  },
  {
    id: "starlight",
    name: "Starlight Drift",
    description: "Soft cosmic glow with cyan highlights.",
    containerClass:
      "bg-gradient-to-br from-black via-slate-900 to-black border-[#7ffcff]/40",
    accentClass: "text-[#7ffcff]",
  },
  {
    id: "rose-veil",
    name: "Rose Veil",
    description: "Mystical pink haze with gentle warmth.",
    containerClass:
      "bg-gradient-to-br from-[#2b0b1f] via-[#3b1028] to-[#12020b] border-[#ff8cff]/40",
    accentClass: "text-[#ff8cff]",
  },
  {
    id: "abyss",
    name: "Abyssal Blue",
    description: "Deep oceanic blue with subtle luminescence.",
    containerClass:
      "bg-gradient-to-br from-[#020617] via-[#02091f] to-[#000] border-blue-400/40",
    accentClass: "text-blue-300",
  },
];

export const ThemeSystem = {
  getTheme(id: NotebookThemeId): NotebookTheme {
    return notebookThemes.find((t) => t.id === id) || notebookThemes[0];
  },
};
