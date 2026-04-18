// src/engine/luna/completion/tier1Completion.ts

import { tier1CertificateConfig } from "../certificates/tier1Certificate";

export type TierProgress = {
  lessonsCompleted: number;
  quizzesCompleted: number;
  finalPracticeCompleted: boolean;
  totalLessons: number;
  totalQuizzes: number;
  averageScorePercent: number;
};

export type Tier1CompletionEvent = {
  type: "TIER1_COMPLETED";
  memberId: string;
  mysteryName: string;
  dateCompleted: string;
  gradePercent: number;
};

/**
 * Checks if Tier 1 is fully completed.
 */
export function isTier1Complete(progress: TierProgress): boolean {
  return (
    progress.lessonsCompleted >= progress.totalLessons &&
    progress.quizzesCompleted >= progress.totalQuizzes &&
    progress.finalPracticeCompleted
  );
}

/**
 * Builds the event object that will be used by the UI and CRM.
 */
export function buildTier1CompletionEvent(
  memberId: string,
  mysteryName: string,
  progress: TierProgress,
  date: Date
): Tier1CompletionEvent {
  return {
    type: "TIER1_COMPLETED",
    memberId,
    mysteryName,
    dateCompleted: date.toISOString(),
    gradePercent: Math.round(progress.averageScorePercent)
  };
}

/**
 * Main handler for Tier 1 completion.
 * This triggers:
 * - Certificate popup
 * - Confetti celebration
 * - 75 clickable question marks
 * - Hidden prize logic
 * - BackPocket save (when user clicks Save)
 * - Notepad index update
 * - Questionnaire popup
 */
export function onTier1Completed(
  event: Tier1CompletionEvent,
  options: {
    showCertificatePopup: (args: {
      config: typeof tier1CertificateConfig;
      event: Tier1CompletionEvent;
    }) => void;

    saveCertificateToBackPocket: (args: {
      memberId: string;
      certificateId: string;
      event: Tier1CompletionEvent;
    }) => Promise<void>;

    updateNotepadIndex: (args: {
      memberId: string;
      certificateLabel: string;
      pageId: string;
    }) => Promise<void>;

    logToCRM: (args: Tier1CompletionEvent) => Promise<void>;
  }
) {
  // Log completion to CRM
  void options.logToCRM(event);

  // Show the certificate popup UI
  options.showCertificatePopup({
    config: tier1CertificateConfig,
    event
  });

  // Saving to BackPocket + Notepad index will be triggered
  // from the UI "Save to BackPocket" button.
}

/**
 * Called when the user clicks "Save to BackPocket" on the certificate popup.
 */
export async function handleTier1CertificateSave(
  event: Tier1CompletionEvent,
  options: {
    saveCertificateToBackPocket: (args: {
      memberId: string;
      certificateId: string;
      event: Tier1CompletionEvent;
    }) => Promise<void>;

    updateNotepadIndex: (args: {
      memberId: string;
      certificateLabel: string;
      pageId: string;
    }) => Promise<void>;
  }
) {
  // Save certificate
  await options.saveCertificateToBackPocket({
    memberId: event.memberId,
    certificateId: tier1CertificateConfig.id,
    event
  });

  // Add to Notepad index
  await options.updateNotepadIndex({
    memberId: event.memberId,
    certificateLabel: "Tier 1 Certificate of Achievement",
    pageId: "tier1_certificate_page"
  });
}
