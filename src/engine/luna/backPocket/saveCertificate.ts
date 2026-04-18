// src/engine/luna/backPocket/saveCertificate.ts

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/client";

export type SaveCertificateInput = {
  memberId: string;
  certificateId: string;
  event: {
    type: string;
    memberId: string;
    mysteryName: string;
    dateCompleted: string;
    gradePercent: number;
  };
};

/**
 * Saves a certificate to the member's BackPocket.
 * Stored under:
 *   backPocket/{memberId}/certificates/{certificateId}
 */
export async function saveCertificateToBackPocket({
  memberId,
  certificateId,
  event
}: SaveCertificateInput): Promise<void> {
  const ref = doc(
    db,
    "backPocket",
    memberId,
    "certificates",
    certificateId
  );

  await setDoc(ref, {
    certificateId,
    mysteryName: event.mysteryName,
    dateCompleted: event.dateCompleted,
    gradePercent: event.gradePercent,
    savedAt: serverTimestamp()
  });
}
