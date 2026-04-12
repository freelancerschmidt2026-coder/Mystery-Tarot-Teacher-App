export type SubscriptionPlanId =
  | "BASE_9_95"
  | "LUNA_UNLIMITED";

export interface Subscription {
  userId: string;
  plan: SubscriptionPlanId;
  lunaIncludedMinutes: number;
  lunaExtraMinutesPurchased: number;
  renewsAt: any; // Firestore Timestamp
  status: "active" | "past_due" | "canceled";
}

export interface LunaUsage {
  userId: string;
  billingPeriodId: string; // "YYYY-MM"
  totalMinutesUsed: number;
  totalMessages: number;
  lastUsedAt: any; // Firestore Timestamp
  byCategory: {
    [key: string]: number;
  };
}
