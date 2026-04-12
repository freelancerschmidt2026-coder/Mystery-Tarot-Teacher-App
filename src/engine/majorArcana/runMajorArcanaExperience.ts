import type { MajorArcanaCard } from "../../types";
import type {
  MajorExperienceContext,
  MajorExperienceResult,
  MajorOrientation
} from "./types";
import { getMechanicHandler } from "./mechanics";

export const runMajorArcanaExperience = (
  card: MajorArcanaCard,
  orientation: MajorOrientation,
  userInput: string,
  extra?: { userId?: string; timestamp?: string }
): MajorExperienceResult => {
  const ctx: MajorExperienceContext = {
    card,
    orientation,
    userInput,
    timestamp: extra?.timestamp ?? new Date().toISOString(),
    userId: extra?.userId
  };

  const orientationData =
    orientation === "upright" ? card.upright : card.reversed;

  const handler = getMechanicHandler(orientationData.mechanic);
  return handler(ctx);
};
