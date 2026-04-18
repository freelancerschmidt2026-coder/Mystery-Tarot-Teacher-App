// src/notepad/templates/applyTemplateToNotepad.ts

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/client";

export async function applyTemplateToNotepad(
  memberId: string,
  templateId: string
) {
  const ref = doc(db, "notepad", memberId, "settings", "cover");

  await setDoc(ref, {
    activeCover: templateId
  });
}
