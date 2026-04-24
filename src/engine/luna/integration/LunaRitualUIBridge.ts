import { RitualTemplate, RitualStep } from "../rituals/types";

export interface UIRitualSummary {
  id: string;
  name: string;
  category: string;
  description: string;
  recommendedFor: string[];
  moonPhaseAffinity?: string;
}

export interface UIRitualStep {
  id: string;
  label: string;
  description: string;
  durationMs: number;
}

export class LunaRitualUIBridge {
  toUISummary(ritual: RitualTemplate): UIRitualSummary {
    return {
      id: ritual.id,
      name: ritual.name,
      category: ritual.category,
      description: ritual.description,
      recommendedFor: ritual.recommendedFor,
      moonPhaseAffinity: ritual.moonPhaseAffinity,
    };
  }

  toUISteps(steps: RitualStep[]): UIRitualStep[] {
    return steps.map((s) => ({
      id: s.id,
      label: s.label,
      description: s.description,
      durationMs: s.durationMs,
    }));
  }
}
