import { runSuitFlightAnimation } from "../animations/suitFlight";

export const runMinorArcanaTrainingEffects = (
  suitDesign: {
    symbol: string | { type: string; name: string; path: string };
    count: number;
    animation: string;
  },
  visualEffectsEnabled: boolean
): void => {
  // Only run if the animation type is "suit-flight"
  if (suitDesign.animation !== "suit-flight") return;

  // Only run if visual effects are enabled
  if (!visualEffectsEnabled) return;

  // Trigger the suit-flight animation
  runSuitFlightAnimation(
    suitDesign,
    visualEffectsEnabled
  );
};
