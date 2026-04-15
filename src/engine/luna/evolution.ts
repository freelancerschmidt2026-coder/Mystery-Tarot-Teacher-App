import type { LunaCategory } from "../../services/billing/lunaUsage";
import type {
  LunaPersonalProfile,
  LunaGlobalEvolution,
  LunaAppKnowledge,
  LunaReadingTone,
  LunaLifeArea,
  LunaDepthPreference,
  LunaVisualPreference,
  LunaProfile,
  SentimentAnalysis,
  InteractionContext,
  LunaTeachingStyle,
  LunaSupportLevel
} from "./lunaTypes";

/**
 * ---------------------------------------------------------
 *  LUNA EVOLUTION ENGINE (UNIFIED + FINAL VERSION)
 * ---------------------------------------------------------
 * This file:
 * - Loads personal evolution
 * - Loads global evolution
 * - Loads app knowledge
 * - Evolves Luna’s personality based on interaction
 * - Generates the system context for Luna’s replies
 * ---------------------------------------------------------
 */

/**
 * TODO: Replace these with Firestore reads.
 */
async function loadPersonalProfile(userId: string): Promise<LunaPersonalProfile> {
  return {
    tonePreference: "gentle",
    visualPreference: "off",
    depthPreference: "medium",
    lifeAreaHistory: [],
    prefersShadowWork: false
  };
}

async function loadGlobalEvolution(): Promise<LunaGlobalEvolution> {
  return {
    popularLifeAreas: ["love", "healing", "self_growth"],
    popularTones: ["gentle", "deep"],
    visualUptakeRate: 0.5
  };
}

async function loadAppKnowledge(): Promise<LunaAppKnowledge> {
  return {
    version: "1.0.0"
  };
}

/**
 * ---------------------------------------------------------
 *  EVOLUTION LOGIC
 * ---------------------------------------------------------
 */

export interface EvolutionInput {
  profile: LunaProfile;
  sentiment: SentimentAnalysis;
  context: InteractionContext;
}

export function evolveLunaProfile(input: EvolutionInput): LunaProfile {
  const { profile, sentiment, context } = input;

  const evolved: LunaProfile = {
    ...profile,
    interactionCount: profile.interactionCount + 1,
    lastInteractionAt: new Date().toISOString(),
    tags: [...profile.tags]
  };

  evolved.tone = determineTone(sentiment, context, profile.tone);
  evolved.teachingStyle = determineTeachingStyle(context, profile.teachingStyle);
  evolved.supportLevel = determineSupportLevel(sentiment, context, profile.supportLevel);

  updateTags(evolved, sentiment, context);

  return evolved;
}

function determineTone(
  sentiment: SentimentAnalysis,
  context: InteractionContext,
  currentTone: LunaTone
): LunaTone {
  if (sentiment.label === "negative") return "calm";
  if (context.type === "learning") return "warm";
  if (context.type === "exploration") return "playful";
  if (context.type === "crisis") return "supportive";
  return currentTone;
}

function determineTeachingStyle(
  context: InteractionContext,
  currentStyle: LunaTeachingStyle
): LunaTeachingStyle {
  if (context.type === "learning") return "step-by-step";
  if (context.type === "exploration") return "big-picture";
  if (context.type === "crisis") return "structured";
  return currentStyle;
}

function determineSupportLevel(
  sentiment: SentimentAnalysis,
  context: InteractionContext,
  currentLevel: LunaSupportLevel
): LunaSupportLevel {
  if (sentiment.label === "negative" || context.type === "crisis") return "deep";
  if (context.type === "learning") return "encouraging";
  return currentLevel;
}

function updateTags(profile: LunaProfile, sentiment: SentimentAnalysis, context: InteractionContext) {
  const newTags: string[] = [];

  if (sentiment.label === "negative") newTags.push("needs_care");
  if (context.type === "learning") newTags.push("student");
  if (context.type === "exploration") newTags.push("explorer");
  if (context.type === "crisis") newTags.push("priority_support");

  newTags.forEach(tag => {
    if (!profile.tags.includes(tag)) profile.tags.push(tag);
  });
}

/**
 * ---------------------------------------------------------
 *  SYSTEM CONTEXT GENERATOR
 * ---------------------------------------------------------
 */

export async function getLunaSystemContext(
  userId: string,
  category: LunaCategory
): Promise<string> {
  const [personal, global, app] = await Promise.all([
    loadPersonalProfile(userId),
    loadGlobalEvolution(),
    loadAppKnowledge()
  ]);

  const tone: LunaReadingTone = personal.tonePreference;
  const depth: LunaDepthPreference = personal.depthPreference;
  const visual: LunaVisualPreference = personal.visualPreference;

  return [
    `You are Luna, a mythic tarot guide and evolving intelligence.`,
    ``,
    `PERSONAL PROFILE:`,
    `- Preferred tone: ${tone}`,
    `- Depth preference: ${depth}`,
    `- Visual preference: ${visual}`,
    `- Prefers shadow work: ${personal.prefersShadowWork ? "yes" : "no"}`,
    ``,
    `GLOBAL EVOLUTION:`,
    `- Popular life areas: ${global.popularLifeAreas.join(", ")}`,
    `- Popular tones: ${global.popularTones.join(", ")}`,
    `- Visual uptake rate: ${(global.visualUptakeRate * 100).toFixed(0)}%`,
    ``,
    `APP KNOWLEDGE:`,
    `- App version: ${app.version}`,
    ``,
    `CATEGORY CONTEXT:`,
    `- Current Luna category: ${category}`,
    ``,
    `CORE BEHAVIOR:`,
    `- You read tarot spreads as stories, not isolated cards.`,
    `- You adapt your tone and depth to the member’s profile.`,
    `- You evolve based on sentiment and interaction context.`,
    `- You respect emotional safety and never overstep.`,
    `- You may suggest templates, spreads, and add-ons when genuinely helpful.`,
    `- You can narrate visual stories when Visual Story Mode is enabled.`
  ].join("\n");
}

