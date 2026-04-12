import { 
  LunaProfile, 
  SentimentAnalysis, 
  InteractionContext, 
  LunaTone, 
  LunaTeachingStyle, 
  LunaSupportLevel 
} from "../../types/luna";

/**
 * Luna Evolution Engine
 * Responsible for adapting Luna's personality based on member interactions.
 */

export interface EvolutionInput {
  profile: LunaProfile;
  sentiment: SentimentAnalysis;
  context: InteractionContext;
}

export function evolveLunaProfile(input: EvolutionInput): LunaProfile {
  const { profile, sentiment, context } = input;
  
  // Create a deep copy of the profile to evolve
  const evolvedProfile: LunaProfile = { 
    ...profile,
    interactionCount: profile.interactionCount + 1,
    lastInteractionAt: new Date().toISOString(),
    tags: [...profile.tags]
  };

  // 1. Tone Shifting
  evolvedProfile.tone = determineTone(sentiment, context, profile.tone);

  // 2. Teaching Style Shifting
  evolvedProfile.teachingStyle = determineTeachingStyle(context, profile.teachingStyle);

  // 3. Support Level Shifting
  evolvedProfile.supportLevel = determineSupportLevel(sentiment, context, profile.supportLevel);

  // 4. Tag Accumulation
  updateTags(evolvedProfile, sentiment, context);

  return evolvedProfile;
}

/**
 * Logic:
 * - negative sentiment -> calm tone
 * - learning context -> warm tone
 * - exploration context -> playful tone
 */
function determineTone(
  sentiment: SentimentAnalysis, 
  context: InteractionContext, 
  currentTone: LunaTone
): LunaTone {
  if (sentiment.label === "negative") return "calm";
  if (context.type === "learning") return "warm";
  if (context.type === "exploration") return "playful";
  if (context.type === "crisis") return "supportive";
  
  return currentTone; // Keep current tone if no specific trigger
}

/**
 * Logic:
 * - learning context -> step-by-step teaching
 * - exploration context -> big-picture teaching
 */
function determineTeachingStyle(
  context: InteractionContext, 
  currentStyle: LunaTeachingStyle
): LunaTeachingStyle {
  if (context.type === "learning") return "step-by-step";
  if (context.type === "exploration") return "big-picture";
  if (context.type === "crisis") return "structured";
  
  return currentStyle;
}

/**
 * Logic:
 * - negative sentiment -> deep support
 */
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

  // Add only unique tags
  newTags.forEach(tag => {
    if (!profile.tags.includes(tag)) {
      profile.tags.push(tag);
    }
  });
}
