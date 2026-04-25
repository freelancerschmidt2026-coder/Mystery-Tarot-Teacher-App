// Main logic for Ethereal Mode (non-animated, temporal reflection reading)

import {
  PastReadingSnapshot,
  CurrentReadingContext,
  EtherealSceneState,
} from "./EtherealModeTypes";

import { TemporalReflectionEngine } from "./TemporalReflectionEngine";

export interface EtherealReadingPayload {
  scene: EtherealSceneState;
  ghostScriptText: string;
}

export class EtherealModeEngine {
  private temporal = new TemporalReflectionEngine();

  createEtherealReading(
    pastReadings: PastReadingSnapshot[],
    current: CurrentReadingContext,
    lunaInterpretation: string
  ): EtherealReadingPayload {
    const scene = this.temporal.buildScene(pastReadings, current);

    const ghostScriptText = this.buildGhostScript(
      current.question,
      lunaInterpretation
    );

    return {
      scene,
      ghostScriptText,
    };
  }

  private buildGhostScript(
    question: string,
    interpretation: string
  ): string {
    return `You asked: "${question}".\n\nLuna reflects:\n${interpretation}`;
  }
}
