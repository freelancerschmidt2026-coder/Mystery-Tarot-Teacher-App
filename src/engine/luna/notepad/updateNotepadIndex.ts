// src/engine/luna/notepad/updateNotepadIndex.ts

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/client";

export type UpdateNotepadIndexInput = {
  memberId: string;
  certificateLabel: string;
  pageId: string;
};

/**
 * Adds an entry to the member's NotePad Index.
 * Stored under:
 *   notepad/{memberId}/index/{pageId}
 *
 * Example:
 *   certificateLabel: "Tier 1 Certificate of Achievement"
 *   pageId: "tier1_certificate_page"
 */
export async function updateNotepadIndex({
  memberId,
  certificateLabel,
  pageId
}: UpdateNotepadIndexInput): Promise<void> {
  const ref = doc(db, "notepad", memberId, "index", pageId);

  await setDoc(ref, {
    label: certificateLabel,
    pageId,
    createdAt: serverTimestamp()
  });
}
