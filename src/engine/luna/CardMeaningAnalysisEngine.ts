// src/engine/luna/CardMeaningAnalysisEngine.ts

export interface MeaningAnalysisResult {
  missingUpright: boolean;
  missingReversed: boolean;
  clarityScore: number; // 0–100
  vague: boolean;
  suggestions: string[];
}

export const CardMeaningAnalysisEngine = {
  analyze(params: {
    upright: string;
    reversed: string;
  }): MeaningAnalysisResult {
    const suggestions: string[] = [];

    const missingUpright = !params.upright.trim();
    const missingReversed = !params.reversed.trim();

    let clarityScore = 100;
    let vague = false;

    const vagueWords = ["maybe", "sort of", "kind of", "possibly", "unclear"];

    vagueWords.forEach((word) => {
      if (params.upright.toLowerCase().includes(word)) {
        clarityScore -= 20;
        vague = true;
      }
      if (params.reversed.toLowerCase().includes(word)) {
        clarityScore -= 20;
        vague = true;
      }
    });

    if (missingUpright) suggestions.push("Upright meaning is missing.");
    if (missingReversed) suggestions.push("Reversed meaning is missing.");
    if (vague) suggestions.push("Meanings contain vague language.");

    return {
      missingUpright,
      missingReversed,
      clarityScore: Math.max(0, clarityScore),
      vague,
      suggestions
    };
  }
};

export default CardMeaningAnalysisEngine;
