export interface ClarificationResult {
  id: string;
  question: string;
  ritualHint: string;
}

export const ClarificationEngine = {
  generateClarification(): ClarificationResult {
    const seed = Math.floor(Math.random() * 999999);

    const questions = [
      "What intention guides your next page?",
      "What energy do you want this notebook to hold?",
      "What truth are you ready to uncover?",
      "What path is calling you forward?",
    ];

    const hints = [
      "Let the shimmer guide your intuition.",
      "Listen to the quiet pull beneath the surface.",
      "Your next step is already forming.",
      "The notebook responds to clarity.",
    ];

    return {
      id: `clarify-${seed}`,
      question: questions[seed % questions.length],
      ritualHint: hints[(seed * 3) % hints.length],
    };
  },
};
