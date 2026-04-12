import type {
  MajorExperienceContext,
  MajorExperienceResult,
  MajorExperienceVisualEffect
} from "./types";

type MechanicHandler = (ctx: MajorExperienceContext) => MajorExperienceResult;

const baseResult = (
  ctx: MajorExperienceContext,
  visualEffects: MajorExperienceVisualEffect[] = []
): MajorExperienceResult => {
  const orientationData =
    ctx.orientation === "upright" ? ctx.card.upright : ctx.card.reversed;

  return {
    cardId: ctx.card.id,
    orientation: ctx.orientation,
    prompt: orientationData.prompt,
    userInput: ctx.userInput,
    experienceSummary: orientationData.experienceSummary,
    reward: orientationData.reward,
    featureUnlock: orientationData.featureUnlock,
    visualEffects
  };
};

const leapOfFaithHandler: MechanicHandler = (ctx) => {
  const visualEffects = [
    { id: "path_extend", payload: { intensity: "medium" } },
    { id: "world_brighten", payload: { amount: 0.3 } }
  ];
  return baseResult(ctx, visualEffects);
};

const radianceAmplifierHandler: MechanicHandler = (ctx) => {
  const positivityHint =
    ctx.userInput && ctx.userInput.length > 0 ? "high" : "gentle";

  const visualEffects = [
    { id: "sun_brighten", payload: { mode: positivityHint } },
    { id: "field_expand", payload: {} }
  ];
  return baseResult(ctx, visualEffects);
};

const completionRingHandler: MechanicHandler = (ctx) => {
  const visualEffects = [
    { id: "ring_segments_light", payload: { segments: "multiple" } },
    { id: "portal_activate", payload: {} }
  ];
  return baseResult(ctx, visualEffects);
};

const defaultMechanicHandler: MechanicHandler = (ctx) => baseResult(ctx, []);

export const majorMechanicHandlers: Record<string, MechanicHandler> = {
  "Leap of Faith": leapOfFaithHandler,
  "Radiance Amplifier": radianceAmplifierHandler,
  "Completion Ring": completionRingHandler
};

export const getMechanicHandler = (mechanic: string): MechanicHandler =>
  majorMechanicHandlers[mechanic] ?? defaultMechanicHandler;
