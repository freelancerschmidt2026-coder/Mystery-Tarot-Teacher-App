// src/engine/luna/LunaEmotionEngine.ts

export type LunaEmotion =
  | "supportive"
  | "encouraging"
  | "celebratory"
  | "calming"
  | "inquisitive"
  | "focused";

export interface EmotionContext {
  editsInRow?: number;
  undoActions?: number;
  timeSpentMinutes?: number;
  nearingCompletion?: boolean;
  stuck?: boolean;
}

export const LunaEmotionEngine = {
  evaluate(context: EmotionContext): LunaEmotion {
    if (context.stuck) return "calming";
    if (context.nearingCompletion) return "celebratory";
    if ((context.editsInRow ?? 0) > 10) return "encouraging";
    if ((context.undoActions ?? 0) > 3) return "supportive";
    if ((context.timeSpentMinutes ?? 0) > 30) return "focused";

    return "inquisitive";
  }
};

export default LunaEmotionEngine;
