// Integrates Ethereal Mode into the Luna Orchestrator flow

import { EtherealModeEngine } from "../ethereal/EtherealModeEngine";
import { EtherealUIBridge } from "../ethereal/EtherealUIBridge";

import {
  PastReadingSnapshot,
  CurrentReadingContext,
} from "../ethereal/EtherealModeTypes";

export interface EtherealReadingResult {
  uiScene: ReturnType<EtherealUIBridge["toUI"]>;
  ghostScript: string;
}

export class LunaOrchestratorEthereal {
  private etherealEngine = new EtherealModeEngine();
  private etherealUI = new EtherealUIBridge();

  runEtherealReading(
    pastReadings: PastReadingSnapshot[],
    current: CurrentReadingContext,
    lunaInterpretation: string
  ): EtherealReadingResult {
    const payload = this.etherealEngine.createEtherealReading(
      pastReadings,
      current,
      lunaInterpretation
    );

    const uiScene = this.etherealUI.toUI(payload.scene);

    return {
      uiScene,
      ghostScript: payload.ghostScriptText,
    };
  }
}
