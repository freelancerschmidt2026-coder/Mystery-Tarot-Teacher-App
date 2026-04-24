import { LunaRitualEngine } from "../rituals/LunaRitualEngine";
import {
  MemberRitualContext,
  RitualTemplate,
} from "../rituals/types";

export class LunaRitualIntegrationService {
  private ritualEngine: LunaRitualEngine;

  constructor(ritualEngine?: LunaRitualEngine) {
    this.ritualEngine = ritualEngine ?? new LunaRitualEngine();
  }

  getAvailableRituals(): RitualTemplate[] {
    return this.ritualEngine.getAvailableRituals();
  }

  matchRitualForMember(
    context: MemberRitualContext
  ): RitualTemplate | null {
    return this.ritualEngine.matchRitual(context);
  }

  getRitualSteps(ritual: RitualTemplate) {
    return this.ritualEngine.getRitualSteps(ritual);
  }

  getRitualAnimations(ritual: RitualTemplate) {
    return this.ritualEngine.getRitualAnimations(ritual);
  }

  getIntroLine(ritual: RitualTemplate): string {
    return this.ritualEngine.getRitualVoiceIntro(ritual);
  }

  getStepLine(stepId: string, ritual: RitualTemplate): string {
    return this.ritualEngine.getRitualVoiceStep(stepId, ritual);
  }

  getOutroLine(ritual: RitualTemplate): string {
    return this.ritualEngine.getRitualVoiceOutro(ritual);
  }
}
