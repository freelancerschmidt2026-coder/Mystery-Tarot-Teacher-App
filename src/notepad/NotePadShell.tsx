// src/notepad/NotePadShell.tsx

import React, { useState } from "react";
import { NotePadRouter } from "./NotePadRouter";

// Template Marketplace System
import { TemplateMarketplace } from "./templates/TemplateMarketplace";
import { TemplatePreviewModal } from "./templates/TemplatePreviewModal";
import { savePurchasedTemplate } from "./templates/savePurchasedTemplate";
import { applyTemplateToNotepad } from "./templates/applyTemplateToNotepad";

// Example template list (you will replace with Firestore later)
const PREMIUM_TEMPLATES = [
  {
    id: "cosmic_shimmer",
    name: "Cosmic Shimmer Cover",
    price: 4.99,
    previewUrl: "/covers/cosmic_shimmer.png"
  },
  {
    id: "midnight_chrome",
    name: "Midnight Chrome Cover",
    price: 3.99,
    previewUrl: "/covers/midnight_chrome.png"
  },
  {
    id: "lunar_glass",
    name: "Lunar Glass Cover",
    price: 5.99,
    previewUrl: "/covers/lunar_glass.png"
  }
];

type Props = {
  memberId: string;
  onClose: () => void;
};

export const NotePadShell: React.FC<Props> = ({ memberId, onClose }) => {
  // Marketplace UI state
  const [showMarketplace, setShowMarketplace] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<any | null>(null);

  // Handle purchase + apply
  const handlePurchase = async (templateId: string) => {
    await savePurchasedTemplate(memberId, templateId);
    await applyTemplateToNotepad(memberId, templateId);
    setPreviewTemplate(null);
    setShowMarketplace(false);
  };

  return (
    <div className="notepad-shell">
      {/* Topbar */}
      <header className="notepad-topbar">
        <h1 className="notepad-topbar-title">NotePad</h1>

        <div className="notepad-topbar-actions">
          <button
            className="notepad-marketplace-button"
            onClick={() => setShowMarketplace(true)}
          >
            Covers ✦
          </button>

          <button className="notepad-close-button" onClick={onClose}>
            ✕
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="notepad-sidebar">
        <div className="sidebar-title">Sections</div>

        <ul className="sidebar-list">
          <li className="sidebar-item active">Saved Pages</li>
          <li
            className="sidebar-item"
            onClick={() => setShowMarketplace(true)}
          >
            Premium Covers
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="notepad-content">
        {!showMarketplace && (
          <NotePadRouter memberId={memberId} />
        )}

        {showMarketplace && (
          <TemplateMarketplace
            templates={PREMIUM_TEMPLATES}
            onPreview={(t) => setPreviewTemplate(t)}
          />
        )}
      </main>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onPurchase={handlePurchase}
        />
      )}
    </div>
  );
};
