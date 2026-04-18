// src/notepad/loaders/loadCertificatePage.ts

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/client";

export type LoadedCertificate = {
  mysteryName: string;
  dateCompleted: string;
  gradePercent: number;
};

/**
 * Loads a certificate from the member's BackPocket.
 * Used by the NotePad page viewer.
 *
 * Path:
 *   backPocket/{memberId}/certificates/{certificateId}
 */
export async function loadCertificatePage(
  memberId: string,
  certificateId: string
): Promise<LoadedCertificate | null> {
  const ref = doc(
    db,
    "backPocket",
    memberId,
    "certificates",
    certificateId
  );

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return null;
  }

  const data = snap.data();

  return {
    mysteryName: data.mysteryName,
    dateCompleted: data.dateCompleted,
    gradePercent: data.gradePercent
  };
}
