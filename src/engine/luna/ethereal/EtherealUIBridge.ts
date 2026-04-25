// Shapes Ethereal Mode data into UI-friendly structures

import {
  EtherealSceneState,
  PastReadingSnapshot,
} from "./EtherealModeTypes";

export interface UIPastFrame {
  id: string;
  question: string;
  answerSummary: string;
  auraColor: string;
  createdAt: string;
}

export interface UITemporalConfig {
  pastOpacity: number;
  pastBlurPx: number;
  futureSharpness: number;
  blendMode: string;
}

export interface UIEtherealScene {
  pastFrames: UIPastFrame[];
  activeQuestion: string;
  temporalConfig: UITemporalConfig;
}

export class EtherealUIBridge {
  toUI(scene: EtherealSceneState): UIEtherealScene {
    return {
      pastFrames: scene.pastFrames.map(this.toUIPastFrame),
      activeQuestion: scene.activeQuestion,
      temporalConfig: {
        pastOpacity: scene.temporalConfig.pastOpacity,
        pastBlurPx: scene.temporalConfig.pastBlurPx,
        futureSharpness: scene.temporalConfig.futureSharpness,
        blendMode: scene.temporalConfig.blendMode,
      },
    };
  }

  private toUIPastFrame(frame: PastReadingSnapshot): UIPastFrame {
    return {
      id: frame.id,
      question: frame.question,
      answerSummary: frame.answerSummary,
      auraColor: frame.auraColor,
      createdAt: frame.createdAt,
    };
  }
}
