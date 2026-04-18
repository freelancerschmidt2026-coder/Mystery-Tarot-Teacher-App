// src/notepad/pages/Tier1CertificatePage.tsx

import React from "react";

type Props = {
  certificate: {
    mysteryName: string;
    dateCompleted: string;
    gradePercent: number;
  };
  onBack: () => void;
};

export const Tier1CertificatePage: React.FC<Props> = ({
  certificate,
  onBack
}) => {
  return (
    <div className="notepad-certificate-page">
      <button className="back-button" onClick={onBack}>
        ← Back to Index
      </button>

      <h1 className="page-title">Tier 1 Certificate of Achievement</h1>

      <div className="certificate-box">
        <h2 className="certificate-name">{certificate.mysteryName}</h2>

        <p className="certificate-detail">
          Completed on:{" "}
          {new Date(certificate.dateCompleted).toLocaleDateString()}
        </p>

        <p className="certificate-detail">
          Grade: {certificate.gradePercent}%
        </p>

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
      </div>
    </div>
  );
};
