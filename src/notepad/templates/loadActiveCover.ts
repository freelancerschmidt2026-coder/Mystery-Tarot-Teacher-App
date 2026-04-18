// src/notepad/templates/loadActiveCover.ts

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/client";

export async function loadActiveCover(memberId: string): Promise<string | null> {
  const ref = doc(db, "notepad", memberId, "settings", "cover");
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return snap.data().activeCover || null;
}
