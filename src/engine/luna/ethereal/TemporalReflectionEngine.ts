// Computes how "past" and "future" should visually interact

import {
  PastReadingSnapshot,
  CurrentReadingContext,
  TemporalLayerConfig,
  EtherealSceneState,
} from "./EtherealModeTypes";

export class TemporalReflectionEngine {
  buildScene(
    pastReadings: PastReadingSnapshot[],
    current: CurrentReadingContext
  ): EtherealSceneState {
    const temporalConfig = this.computeTemporalConfig(
      pastReadings,
      current
    );

    return {
      pastFrames: pastReadings,
      activeQuestion: current.question,
      temporalConfig,
    };
  }

  private computeTemporalConfig(
    pastReadings: PastReadingSnapshot[],
    current: CurrentReadingContext
  ): TemporalLayerConfig {
    const count = pastReadings.length;
    const emotion = current.emotionalState.toLowerCase();

    let pastOpacity = Math.min(0.7, 0.2 + count * 0.05);
    let pastBlurPx = 8;
    let futureSharpness = 1;
    let blendMode: TemporalLayerConfig["blendMode"] = "overlay";

    if (emotion.includes("shadow") || emotion.includes("regret")) {
      pastOpacity = 0.5;
      pastBlurPx = 10;
      blendMode = "exclusion";
    }

    if (emotion.includes("hope") || emotion.includes("manifest")) {
      futureSharpness = 1.2;
      blendMode = "screen";
    }

    return {
      pastOpacity,
      pastBlurPx,
      futureSharpness,
      blendMode,
    };
  }
}
