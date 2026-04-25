// LunaEmotionalEngine.js
// Evaluates emotional alignment, tone, and energetic fit for a reading
// Includes: emotional score, tone selection, mode influence, and notes

export const LunaEmotionalEngine = {
  /**
   * Evaluate emotional alignment for a reading
   * questionType: "LOVE", "CAREER", "SHADOW", "HEALING", etc.
   * mode: "SHADOW", "MANIFESTATION", "HEALING", "CLARITY"
   */
  evaluateEmotionalAlignment({ questionType, mode }) {
    const baseScore = this.baseScoreForQuestion(questionType);
    const modeModifier = this.modeModifier(mode);

    // Final emotional alignment score
    const emotionalAlignmentScore = Math.max(
      1,
      Math.min(100, baseScore + modeModifier)
    );

    const tone = this.selectTone(emotionalAlignmentScore, mode);

    const notes = this.generateNotes({
      questionType,
      mode,
      emotionalAlignmentScore,
      tone
    });

    return {
      emotionalAlignmentScore,
      tone,
      notes,
      breakdown: {
        baseScore,
        modeModifier
      }
    };
  },

  /**
   * Base score based on question type
   */
  baseScoreForQuestion(questionType) {
    const map = {
      "LOVE": 90,
      "CAREER": 85,
      "HEALING": 95,
      "SHADOW": 80,
      "CLARITY": 88,
      "MANIFESTATION": 92
    };
    return map[questionType] || 80;
  },

  /**
   * Mode influence
   */
  modeModifier(mode) {
    const map = {
      "SHADOW": -5,
      "MANIFESTATION": +5,
      "HEALING": +3,
      "CLARITY": +2
    };
    return map[mode] || 0;
  },

  /**
   * Select tone based on emotional score + mode
   */
  selectTone(score, mode) {
    if (score >= 95) return "deeply_attuned";
    if (score >= 90) return "warm_and_present";
    if (score >= 85) return "supportive";
    if (mode === "SHADOW") return "gentle_and_grounded";
    return "steady_and_clear";
  },

  /**
   * Generate emotional notes
   */
  generateNotes({ questionType, mode, emotionalAlignmentScore, tone }) {
    return `Emotional alignment at ${emotionalAlignmentScore}%. Tone: ${tone}. Question type: ${questionType}. Mode: ${mode}.`;
  }
};
