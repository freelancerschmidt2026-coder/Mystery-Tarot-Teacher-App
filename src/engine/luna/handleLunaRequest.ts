import { canUseLuna, trackLunaUsage, type LunaCategory } from "../../services/billing/lunaUsage";
import { lunaModelEngine } from "./lunaModelEngine";
import { getLunaSystemContext } from "./evolution";

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

  const systemContext = await getLunaSystemContext(userId, category);

  const message = await lunaModelEngine.generateLunaReply({
    userId,
    category,
    prompt,
    systemContext
  });

  await trackLunaUsage(userId, category);

  return {
    type: "luna_reply",
    message
  };
}
