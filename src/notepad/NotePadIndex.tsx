// src/notepad/NotePadIndex.tsx

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/client";

type NotepadEntry = {
  label: string;
  pageId: string;
};

type Props = {
  memberId: string;
  onOpenPage: (pageId: string) => void;
};

export const NotePadIndex: React.FC<Props> = ({ memberId, onOpenPage }) => {
  const [entries, setEntries] = useState<NotepadEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadIndex() {
      const ref = collection(db, "notepad", memberId, "index");
      const snap = await getDocs(ref);

      const items: NotepadEntry[] = snap.docs.map((doc) => {
        const data = doc.data();
        return {
          label: data.label,
          pageId: data.pageId
        };
      });

      setEntries(items);
      setLoading(false);
    }

    loadIndex();
  }, [memberId]);

  if (loading) {
    return <div className="notepad-loading">Loading your NotePad…</div>;
  }

  return (
    <div className="notepad-index">
      <h1 className="notepad-title">Your NotePad</h1>

      {entries.length === 0 ? (
        <p className="notepad-empty">Your NotePad is empty.</p>
      ) : (
        <ul className="notepad-list">
          {entries.map((entry) => (
            <li key={entry.pageId} className="notepad-item">
              <button
                className="notepad-link"
                onClick={() => onOpenPage(entry.pageId)}
              >
                {entry.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
