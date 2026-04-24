import { RitualTemplate, RitualStep } from "../rituals/types";

export class LunaRitualVoiceBridge {
  getIntroLine(ritual: RitualTemplate): string {
    return `We are about to begin ${ritual.name}. ${ritual.description}`;
  }

  getStepLine(step: RitualStep): string {
    return step.voiceLine;
  }

  getOutroLine(ritual: RitualTemplate): string {
    return `The ${ritual.name} is complete. Breathe, and let its energy settle within you.`;
  }
}
