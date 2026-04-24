// Rules that determine how Luna evolves based on member interactions

import {
  LunaPersonalityProfile,
  MemberInteractionSnapshot,
} from "./LunaPersonalityTypes";

export class LunaPersonalityRules {
  determineMood(
    current: LunaPersonalityProfile,
    interaction: MemberInteractionSnapshot
  ) {
    const emotion = interaction.emotionalState.toLowerCase();

    if (emotion.includes("fear") || emotion.includes("anxiety")) {
      return "GENTLE";
    }

    if (emotion.includes("shadow") || interaction.questionThemes.includes("shadow")) {
      return "SHADOW";
    }

    if (interaction.questionThemes.includes("destiny")) {
      return "WISE";
    }

    if (interaction.questionThemes.includes("love")) {
      return "PLAYFUL";
    }

    if (interaction.moonPhase === "Full Moon") {
      return "ASCENDED";
    }

    return current.mood;
  }

  determineAura(mood: string): string {
    switch (mood) {
      case "GENTLE":
        return "#E8C46A";
      case "MYSTICAL":
        return "#6A00FF";
      case "DIRECT":
        return "#FF7A3D";
      case "SHADOW":
        return "#4A2E7F";
      case "PLAYFUL":
        return "#FF4FB2";
      case "WISE":
        return "#3FA6A6";
      case "ASCENDED":
        return "#C9D6E8";
      default:
        return "#E8C46A";
    }
  }

  determineVoiceTone(mood: string): string {
    switch (mood) {
      case "GENTLE":
        return "soft";
      case "DIRECT":
        return "firm";
      case "SHADOW":
        return "whispered";
      case "PLAYFUL":
        return "bright";
      case "WISE":
        return "calm";
      case "ASCENDED":
        return "ethereal";
      default:
        return "soft";
    }
  }

  determineBehaviorTags(mood: string): string[] {
    switch (mood) {
      case "GENTLE":
        return ["supportive", "soothing"];
      case "DIRECT":
        return ["focused", "clear"];
      case "SHADOW":
        return ["probing", "revealing"];
      case "PLAYFUL":
        return ["lighthearted", "encouraging"];
      case "WISE":
        return ["insightful", "calm"];
      case "ASCENDED":
        return ["mythic", "prophetic"];
      default:
        return ["supportive"];
    }
  }
}
