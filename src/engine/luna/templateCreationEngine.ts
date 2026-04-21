// src/engine/luna/templateCreationEngine.ts

export type TemplateTheme =
  | "mystic"
  | "celestial"
  | "shadow_work"
  | "elemental"
  | "ancestral"
  | "minimal"
  | "custom";

export interface TemplateIdeaInput {
  memberDescription: string; // what they tell Luna
  deckPurpose: string;       // e.g. "training deck", "shadow work", etc.
  keywords?: string[];       // optional extracted keywords
}

export interface BorderOption {
  id: string;
  name: string;
  styleToken: string; // used by UI to map to a visual style
}

export interface FontOption {
  id: string;
  name: string;
  family: string;
  weight: "regular" | "bold";
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
}

export interface TrainingDeckTemplate {
  id: string;
  name: string;
  theme: TemplateTheme;
  description: string;
  basePrice: number;
  borders: BorderOption[];
  fonts: FontOption[];
  colors: ColorOption[];
  createdFromIdea: TemplateIdeaInput;
  isPreMade: boolean;
}

export interface TemplateMatchResult {
  matchedTemplate?: TrainingDeckTemplate;
  isNewTemplate: boolean;
  suggestedTemplate: TrainingDeckTemplate;
}

/**
 * In a real system, this would come from Firestore or a config file.
 * For now, we use a small in-memory catalog as a placeholder.
 */
const PREMADE_TEMPLATES: TrainingDeckTemplate[] = [
  {
    id: "premade-mystic-training-01",
    name: "Mystic Trainer",
    theme: "mystic",
    description: "A mystical training deck template with soft glow borders and elegant serif fonts.",
    basePrice: 19,
    borders: [],
    fonts: [],
    colors: [],
    createdFromIdea: {
      memberDescription: "Mystical, soft, training deck",
      deckPurpose: "training deck",
      keywords: ["mystic", "soft", "training"]
    },
    isPreMade: true
  }
];

/**
 * Utility: simple keyword match against existing templates.
 */
function findMatchingTemplate(idea: TemplateIdeaInput): TrainingDeckTemplate | undefined {
  const text = `${idea.memberDescription} ${idea.deckPurpose} ${(idea.keywords || []).join(" ")}`.toLowerCase();

  return PREMADE_TEMPLATES.find((tpl) => {
    const haystack = `${tpl.name} ${tpl.description} ${tpl.createdFromIdea.memberDescription} ${(tpl.createdFromIdea.keywords || []).join(" ")}`.toLowerCase();
    return idea.keywords?.some((k) => haystack.includes(k.toLowerCase())) || haystack.includes(text);
  });
}

/**
 * Utility: infer a theme from the idea.
 */
function inferTheme(idea: TemplateIdeaInput): TemplateTheme {
  const text = `${idea.memberDescription} ${idea.deckPurpose}`.toLowerCase();

  if (text.includes("shadow")) return "shadow_work";
  if (text.includes("star") || text.includes("moon") || text.includes("cosmic")) return "celestial";
  if (text.includes("ancestor") || text.includes("lineage")) return "ancestral";
  if (text.includes("element") || text.includes("fire") || text.includes("water")) return "elemental";
  if (text.includes("minimal") || text.includes("clean")) return "minimal";
  if (text.includes("mystic") || text.includes("mystical") || text.includes("magic")) return "mystic";

  return "custom";
}

/**
 * Utility: generate 5 border options in the same "thought family".
 */
function generateBorderOptions(theme: TemplateTheme): BorderOption[] {
  const baseId = `border-${theme}`;
  return Array.from({ length: 5 }).map((_, i) => ({
    id: `${baseId}-${i + 1}`,
    name: `${theme} border ${i + 1}`,
    styleToken: `${theme}_border_variant_${i + 1}`
  }));
}

/**
 * Utility: generate 5 font options (similar but not identical).
 */
function generateFontOptions(theme: TemplateTheme): FontOption[] {
  const baseId = `font-${theme}`;
  const baseNames = ["Serene Script", "Arcane Sans", "Oracle Serif", "Glyph Notes", "Veil Mono"];

  return baseNames.map((name, i) => ({
    id: `${baseId}-${i + 1}`,
    name: `${name} ${i + 1}`,
    family: name.replace(" ", ""),
    weight: i % 2 === 0 ? "regular" : "bold"
  }));
}

/**
 * Utility: generate 5 color options (same vibe, different shades).
 */
function generateColorOptions(theme: TemplateTheme): ColorOption[] {
  const baseId = `color-${theme}`;

  const palette =
    theme === "mystic"
      ? ["#F5A9F2", "#C28CFF", "#8AD5FF", "#FFCCE5", "#B3A6FF"]
      : theme === "celestial"
      ? ["#A5B4FC", "#C4B5FD", "#E0E7FF", "#F9A8D4", "#7DD3FC"]
      : theme === "shadow_work"
      ? ["#111827", "#1F2933", "#4B5563", "#6B7280", "#9CA3AF"]
      : theme === "elemental"
      ? ["#F97316", "#22C55E", "#0EA5E9", "#EAB308", "#EF4444"]
      : theme === "ancestral"
      ? ["#92400E", "#78350F", "#B45309", "#D97706", "#FBBF24"]
      : theme === "minimal"
      ? ["#111827", "#6B7280", "#9CA3AF", "#D1D5DB", "#F3F4F6"]
      : ["#EC4899", "#8B5CF6", "#22D3EE", "#F97316", "#10B981"];

  return palette.map((hex, i) => ({
    id: `${baseId}-${i + 1}`,
    name: `${theme} color ${i + 1}`,
    hex
  }));
}

/**
 * Utility: calculate a base price for the template.
 * You can later replace this with a more complex pricing model.
 */
function calculatePrice(idea: TemplateIdeaInput, theme: TemplateTheme): number {
  let base = 19;

