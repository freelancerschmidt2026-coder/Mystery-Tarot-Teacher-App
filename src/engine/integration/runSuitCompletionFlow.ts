import { runSuitCompletionRitual } from "../rituals/suitCompletionRitual";
import { generateCertificate } from "../certificates/generateCertificate";

/**
 * Mystery Tarot Luna - Visual Effects Engine
 * Suit Completion Flow Integration Module
 */

export const runSuitCompletionFlow = (
  masteryPercentage: number,
  visualEffectsEnabled: boolean,
  memberName: string,
  suitName: string,
  saveCertificate: (certificateData: any) => void
): void => {
  // 1. Trigger the ritual sequence
  runSuitCompletionRitual(
    masteryPercentage,
    visualEffectsEnabled,
    () => {
      // 2. When ritual completes (or immediately if effects disabled),
      // generate the official certificate
      const certificateData = generateCertificate(
        memberName,
        suitName,
        masteryPercentage
      );

      // 3. Save the certificate to the Showcase Room
      saveCertificate(certificateData);
    }
  );
};
