// src/notepad/NotePadRouter.tsx

import React, { useState, useEffect } from "react";
import { NotePadIndex } from "./NotePadIndex";
import { Tier1CertificatePage } from "./pages/Tier1CertificatePage";
import { loadCertificatePage } from "./loaders/loadCertificatePage";

type Props = {
  memberId: string;
};

export const NotePadRouter: React.FC<Props> = ({ memberId }) => {
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const openPage = async (pageId: string) => {
    setActivePageId(pageId);
    setLoading(true);

    // Handle certificate pages
    if (pageId === "tier1_certificate_page") {
      const data = await loadCertificatePage(memberId, "tier1_certificate");
      setPageData(data);
      setLoading(false);
      return;
    }

    // Unknown page fallback
    setPageData(null);
    setLoading(false);
  };

  const goBackToIndex = () => {
    setActivePageId(null);
    setPageData(null);
  };

  // Initial load: show index
  useEffect(() => {
    setActivePageId(null);
  }, [memberId]);

  // Render states
  if (activePageId === null) {
    return <NotePadIndex memberId={memberId} onOpenPage={openPage} />;
  }

  if (loading) {
    return <div className="notepad-loading">Loading page…</div>;
  }

  // Certificate page
  if (activePageId === "tier1_certificate_page" && pageData) {
    return (
      <Tier1CertificatePage
        certificate={pageData}
        onBack={goBackToIndex}
      />
    );
  }

  // Fallback for unknown pages
  return (
    <div className="notepad-unknown-page">
      <button onClick={goBackToIndex}>← Back to Index</button>
      <h2>Page Not Found</h2>
      <p>This NotePad page does not exist yet.</p>
    </div>
  );
};
