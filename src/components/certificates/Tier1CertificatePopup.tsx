// src/components/certificates/Tier1CertificatePopup.tsx

import React, { useState } from "react";
import { TierCertificateConfig } from "../../engine/luna/certificates/tier1Certificate";

type Props = {
  config: TierCertificateConfig;
  mysteryName: string;
  gradePercent: number;
  dateCompleted: string;
  onSaveCertificate: () => Promise<void>;
  onOpenQuestionnaire: () => void;
  onPrizeUnlocked: (prizeId: string) => void;
  onClose: () => void;
};

export const Tier1CertificatePopup: React.FC<Props> = ({
  config,
  mysteryName,
  gradePercent,
  dateCompleted,
  onSaveCertificate,
  onOpenQuestionnaire,
  onPrizeUnlocked,
  onClose
}) => {
  const [hasSaved, setHasSaved] = useState(false);
  const [lunaPlaced, setLunaPlaced] = useState(false);

  const handleSave = async () => {
    await onSaveCertificate();
    setHasSaved(true);
    onOpenQuestionnaire();
  };

  const handleLunaDrop = () => {
    setLunaPlaced(true);
  };

  const handleQuestionMarkClick = (index: number) => {
    const prize = config.prizes[index];
    if (prize) {
      onPrizeUnlocked(prize.id);
    }
  };

  return (
    <div className="tier1-certificate-overlay">
      <div className="tier1-certificate-modal">
        <header className="certificate-header">
          <h1>{config.appName}</h1>
        </header>

        <section className="certificate-body">
          <h2>{config.title}</h2>
          <h3>{config.subtitle}</h3>

          <div className="certificate-main-info">
            <p className="certificate-name">{mysteryName}</p>
            <p className="certificate-date">
              Completed on: {new Date(dateCompleted).toLocaleDateString()}
            </p>
            <p className="certificate-grade">Grade: {gradePercent}%</p>
          </div>

          <div className="certificate-luna-row">
            <div className="luna-icon-draggable">
              <button
                type="button"
                className="luna-icon-button"
                onClick={handleLunaDrop}
              >
                Luna Icon
              </button>
            </div>

            <div className="luna-drop-target">
              <span className={lunaPlaced ? "drop-target active" : "drop-target"}>
                {lunaPlaced ? "Luna placed ✨" : "Drag Luna here"}
              </span>
            </div>
          </div>

          <div className="certificate-signatures">
            <div className="signature-left">
              <div className="signature-name">Luna Mystery</div>
              <div className="signature-role">Mythic Tarot Guide</div>
            </div>
            <div className="signature-right">
              <div className="signature-name">GateKeeper</div>
              <div className="signature-role">Owner – App Creator</div>
            </div>
          </div>
        </section>

        <section className="certificate-question-marks">
          {Array.from({ length: config.celebration.questionMarkCount }).map(
            (_, index) => (
              <button
                key={index}
                type="button"
                className="question-mark-dot"
                onClick={() => handleQuestionMarkClick(index)}
              >
                ?
              </button>
            )
          )}
        </section>

        <footer className="certificate-footer">
          <button type="button" onClick={handleSave} disabled={hasSaved}>
            {hasSaved ? "Saved to BackPocket" : "Save to BackPocket"}
          </button>

          <button type="button" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};
