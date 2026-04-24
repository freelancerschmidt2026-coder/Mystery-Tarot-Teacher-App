import { LunaRitualEngine } from "../rituals/LunaRitualEngine";
import {
  MemberRitualContext,
  RitualTemplate,
} from "../rituals/types";

export class LunaRitualService {
  private engine: LunaRitualEngine;

  constructor(engine?: LunaRitualEngine) {
    this.engine = engine ?? new LunaRitualEngine();
  }

  getAvailableRituals(): RitualTemplate[] {
    return this.engine.getAvailableRituals();
  }

  matchRitual(context: MemberRitualContext): RitualTemplate | null {
    return this.engine.matchRitual(context);
  }

  getRitualAnimations(ritual: RitualTemplate) {
    return this.engine.getRitualAnimations(ritual);
  }

  getRitualSteps(ritual: RitualTemplate) {
    return this.engine.getRitualSteps(ritual);
  }

  getIntroLine(ritual: RitualTemplate): string {
    return this.engine.getRitualVoiceIntro(ritual);
  }

  getStepLine(stepId: string, ritual: RitualTemplate): string {
    return this.engine.getRitualVoiceStep(stepId, ritual);
  }

  getOutroLine(ritual: RitualTemplate): string {
    return this.engine.getRitualVoiceOutro(ritual);
  }
}
