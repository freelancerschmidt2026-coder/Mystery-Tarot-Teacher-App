// src/engine/luna/feedback/saveTier1Feedback.ts

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/client";

export type Tier1FeedbackInput = {
  memberId: string;
  answers: {
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    q5: string;
    rating: number;
  };
};

/**
 * Saves Tier 1 questionnaire feedback to the GateKeeper CRM.
 * Stored under:
 *   crm/{memberId}/tier1Feedback/{autoTimestampId}
 */
export async function saveTier1Feedback({
  memberId,
  answers
}: Tier1FeedbackInput): Promise<void> {
  const feedbackRef = doc(
    db,
    "crm",
    memberId,
    "tier1Feedback",
    `${Date.now()}`
  );

  await setDoc(feedbackRef, {
    ...answers,
    createdAt: serverTimestamp()
  });
}
