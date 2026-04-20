export interface SavedReading {
  id: string;
  createdAt: string;
  cards: string[];
  spreadName?: string;
  notes?: string;
}

export interface SaveReadingStore {
  save: (reading: SavedReading) => void;
  list: () => SavedReading[];
}

const STORAGE_KEY = "luna_saved_readings";

function loadAll(): SavedReading[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedReading[];
  } catch {
    return [];
  }
}

function persist(all: SavedReading[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // ignore
  }
}

export const SaveReadingEngine: SaveReadingStore = {
  save(reading) {
    const all = loadAll();
    const existingIndex = all.findIndex((r) => r.id === reading.id);
    if (existingIndex >= 0) {
      all[existingIndex] = reading;
    } else {
      all.push(reading);
    }
    persist(all);
  },

  list() {
    return loadAll();
  },
};

export default SaveReadingEngine;
