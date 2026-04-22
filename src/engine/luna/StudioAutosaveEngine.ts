// src/engine/luna/StudioAutosaveEngine.ts

export interface AutosaveRecord {
  id: string;
  deckId: string;
  memberId: string;
  snapshot: unknown;
  timestamp: string;
}

const STORAGE_KEY_AUTOSAVE = "mystery_studio_autosave";

function loadAutosaves(): AutosaveRecord[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY_AUTOSAVE);
  return raw ? JSON.parse(raw) : [];
}

function saveAutosaves(list: AutosaveRecord[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_AUTOSAVE, JSON.stringify(list));
}

export const StudioAutosaveEngine = {
  saveSnapshot(params: {
    deckId: string;
    memberId: string;
    snapshot: unknown;
  }): AutosaveRecord {
    const list = loadAutosaves();

    const entry: AutosaveRecord = {
      id: `auto-${Date.now()}`,
      deckId: params.deckId,
      memberId: params.memberId,
      snapshot: params.snapshot,
      timestamp: new Date().toISOString()
    };

    list.push(entry);
    saveAutosaves(list);

    return entry;
  },

  getLatest(deckId: string): AutosaveRecord | null {
    return (
      loadAutosaves()
        .filter((a) => a.deckId === deckId)
        .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))[0] || null
    );
  }
};

export default StudioAutosaveEngine;
