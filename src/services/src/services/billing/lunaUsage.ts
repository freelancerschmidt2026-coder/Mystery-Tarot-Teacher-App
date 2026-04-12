import { db, Timestamp } from "../firebase"; // we'll fix this path once we find your firebase file
import type { LunaUsage, Subscription } from "./lunaModels";

export type LunaCategory = "course_help" | "testing" | "design" | "friend_chat";

function getBillingPeriodId(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export async function canUseLuna(userId: string): Promise<boolean> {
  const billingPeriodId = getBillingPeriodId();

  const subSnap = await db.collection("subscriptions").doc(userId).get();
  if (!subSnap.exists) return false;

  const sub = subSnap.data() as Subscription;
  const included = sub.lunaIncludedMinutes || 0;
  const extra = sub.lunaExtraMinutesPurchased || 0;
  const totalAllowed = included + extra;

  if (sub.plan === "LUNA_UNLIMITED") return true;

  const usageSnap = await db
    .collection("lunaUsage")
    .doc(`${userId}_${billingPeriodId}`)
    .get();

  const used = usageSnap.exists
    ? (usageSnap.data() as LunaUsage).totalMinutesUsed || 0
    : 0;

  return used < totalAllowed;
}

export async function trackLunaUsage(
  userId: string,
  category: LunaCategory,
  estimatedMinutes = 0.5
): Promise<void> {
  const billingPeriodId = getBillingPeriodId();
  const usageRef = db.collection("lunaUsage").doc(`${userId}_${billingPeriodId}`);

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(usageRef);
    const data = (snap.exists ? snap.data() : {}) as Partial<LunaUsage>;

    const prevTotal = data.totalMinutesUsed || 0;
    const prevMessages = data.totalMessages || 0;
    const prevByCategory = data.byCategory || {};

    tx.set(
      usageRef,
      {
        userId,
        billingPeriodId,
        totalMinutesUsed: prevTotal + estimatedMinutes,
        totalMessages: prevMessages + 1,
        lastUsedAt: Timestamp.now(),
        byCategory: {
          ...prevByCategory,
          [category]: (prevByCategory[category] || 0) + estimatedMinutes
        }
      },
      { merge: true }
    );
  });
}
