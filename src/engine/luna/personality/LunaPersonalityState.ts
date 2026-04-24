// Tracks Luna's evolving personality over time

import { LunaPersonalityProfile } from "./LunaPersonalityTypes";

export class LunaPersonalityState {
  private profile: LunaPersonalityProfile;

  constructor(initial?: Partial<LunaPersonalityProfile>) {
    this.profile = {
      mood: initial?.mood ?? "GENTLE",
      auraColor: initial?.auraColor ?? "#E8C46A",
      voiceTone: initial?.voiceTone ?? "soft",
      behaviorTags: initial?.behaviorTags ?? ["supportive"],
      evolutionLevel: initial?.evolutionLevel ?? 1,
    };
  }

  getProfile(): LunaPersonalityProfile {
    return this.profile;
  }

  updateProfile(update: Partial<LunaPersonalityProfile>) {
    this.profile = { ...this.profile, ...update };
  }

  evolveLevel() {
    this.profile.evolutionLevel += 1;
  }
}
