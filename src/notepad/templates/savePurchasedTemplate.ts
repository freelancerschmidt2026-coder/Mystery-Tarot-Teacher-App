// src/notepad/templates/savePurchasedTemplate.ts

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/client";

export async function savePurchasedTemplate(memberId: string, templateId: string) {
  const ref = doc(db, "purchasedTemplates", memberId, "covers", templateId);

  await setDoc(ref, {
    templateId,
    purchasedAt: serverTimestamp()
  });
}
