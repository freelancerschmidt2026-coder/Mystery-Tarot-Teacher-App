// src/notepad/NotePadShell.tsx

import React from "react";
import { NotePadRouter } from "./NotePadRouter";

type Props = {
  memberId: string;
  onClose: () => void;
};

export const NotePadShell: React.FC<Props> = ({ memberId, onClose }) => {
  return (
    <div className="notepad-shell">
      {/* Topbar */}
      <header className="notepad-topbar">
        <h1 className="notepad-topbar-title">NotePad</h1>
        <button className="notepad-close-button" onClick={onClose}>
          ✕
        </button>
      </header>

      {/* Sidebar */}
      <aside className="notepad-sidebar">
        <div className="sidebar-title">Sections</div>

        <ul className="sidebar-list">
          <li className="sidebar-item active">Saved Pages</li>
          {/* Future sections can be added here */}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="notepad-content">
        <NotePadRouter memberId={memberId} />
      </main>
    </div>
  );
};
