import { canUseLuna, trackLunaUsage, type LunaCategory } from "../../services/billing/lunaUsage";

export async function handleLunaRequest(
  userId: string,
  category: LunaCategory,
  prompt: string
) {
  const allowed = await canUseLuna(userId);

  if (!allowed) {
    return {
      type: "limit_reached",
      message:
        "You’ve reached your Luna time for this month. Visit your BackPocket to add more Luna time or upgrade your plan."
    };
  }

  // TODO: replace this with your real Luna API call
  const response = {
    type: "mock",
    message: `Luna would respond to: "${prompt}"`
  };

  await trackLunaUsage(userId, category);

  return response;
}
