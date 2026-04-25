import {
  MoonPhaseName,
  MoonPhaseEffectsProfile,
} from "./MoonPhaseTypes";

export class MoonPhaseEffects {
  getEffects(phase: MoonPhaseName): MoonPhaseEffectsProfile {
    switch (phase) {
      case "New Moon":
        return {
          uiThemeTag: "shadow",
          lunaMoodBias: "SHADOW",
          ritualBias: ["SHADOW", "CLEANSING"],
          deckBias: ["shadow", "introspection"],
        };
      case "Full Moon":
        return {
          uiThemeTag: "radiant",
          lunaMoodBias: "ASCENDED",
          ritualBias: ["MANIFESTATION", "DESTINY"],
          deckBias: ["manifestation", "power"],
        };
      case "First Quarter":
      case "Waxing Crescent":
      case "Waxing Gibbous":
        return {
          uiThemeTag: "growth",
          lunaMoodBias: "MYSTICAL",
          ritualBias: ["TRANSFORMATION", "DESTINY"],
          deckBias: ["growth", "path"],
        };
      case "Last Quarter":
      case "Waning Gibbous":
      case "Waning Crescent":
        return {
          uiThemeTag: "release",
          lunaMoodBias: "WISE",
          ritualBias: ["CLEANSING", "HEALING"],
          deckBias: ["closure", "healing"],
        };
      default:
        return {
          uiThemeTag: "neutral",
          lunaMoodBias: "GENTLE",
          ritualBias: [],
          deckBias: [],
        };
    }
  }
}
