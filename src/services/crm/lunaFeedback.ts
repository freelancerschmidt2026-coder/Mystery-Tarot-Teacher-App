export type LunaFeedbackCategory = "template" | "spread" | "deck" | "feature" | "visual_mode";

export interface LunaMonetizationIdea {
  id: string;
  userId: string;
  category: LunaFeedbackCategory;
  summary: string;
  suggestedName: string;
  suggestedPriceRange: string;
  notesForYou: string;
  createdAt: string;
}

/**
 * TODO: Wire this to Firestore or your CRM.
 * For now, it just logs to console so nothing breaks.
 */
export async function saveLunaMonetizationIdea(idea: LunaMonetizationIdea): Promise<void> {
  console.log("Luna monetization idea (stub):", idea);
}
