import { ModeProfile, ModeTriggerContext } from "./ModeTypes";

export class ShadowModeEngine {
  shouldActivate(context: ModeTriggerContext): boolean {
    const emotion = context.emotionalState.toLowerCase();

    if (emotion.includes("fear")) return true;
    if (emotion.includes("shadow")) return true;
    if (context.questionThemes.includes("shadow")) return true;
    if (context.moonPhase === "New Moon") return true;

    return false;
  }

  getProfile(): ModeProfile {
    return {
      mode: "SHADOW",
      uiThemeTag: "shadow",
      lunaMoodBias: "SHADOW",
      animationIntensity: "LOW",
      voiceToneBias: "whispered",
      recommendedRituals: ["SHADOW", "CLEANSING"],
      recommendedDeckTags: ["shadow", "introspection"],
    };
  }
}
