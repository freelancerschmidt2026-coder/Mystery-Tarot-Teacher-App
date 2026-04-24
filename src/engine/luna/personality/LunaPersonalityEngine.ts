// Orchestrates Luna's personality evolution

import {
  MemberInteractionSnapshot,
  LunaPersonalityProfile,
} from "./LunaPersonalityTypes";

import { LunaPersonalityState } from "./LunaPersonalityState";
import { LunaPersonalityRules } from "./LunaPersonalityRules";

export class LunaPersonalityEngine {
  private state: LunaPersonalityState;
  private rules: LunaPersonalityRules;

  constructor(initial?: Partial<LunaPersonalityProfile>) {
    this.state = new LunaPersonalityState(initial);
    this.rules = new LunaPersonalityRules();
  }

  evolve(interaction: MemberInteractionSnapshot): LunaPersonalityProfile {
    const current = this.state.getProfile();

    const newMood = this.rules.determineMood(current, interaction);
    const newAura = this.rules.determineAura(newMood);
    const newVoice = this.rules.determineVoiceTone(newMood);
    const newTags = this.rules.determineBehaviorTags(newMood);

    this.state.updateProfile({
      mood: newMood,
      auraColor: newAura,
      voiceTone: newVoice,
      behaviorTags: newTags,
    });

    this.state.evolveLevel();

    return this.state.getProfile();
  }

  getProfile(): LunaPersonalityProfile {
    return this.state.getProfile();
  }
}
