export const runMinorArcanaCleanup = (
  cleanupFn: (() => void) | void,
  visualEffectsEnabled: boolean
): void => {
  // If no cleanup function was provided, do nothing
  if (typeof cleanupFn !== "function") return;

  // If visual effects are disabled, do nothing
  if (!visualEffectsEnabled) return;

  // Run the cleanup function to return symbols to the card
  cleanupFn();
};
