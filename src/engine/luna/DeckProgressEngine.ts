// src/engine/luna/DeckProgressEngine.ts

export interface DeckProgressState {
  deckId: string;
  totalCards: number;
  editedCards: Set<string>;
}

const STORAGE_KEY_PROGRESS = "mystery_deck_progress";

function loadProgress(): DeckProgressState[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
  return raw ? JSON.parse(raw) : [];
}

function saveProgress(list: DeckProgressState[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(list));
}

export const DeckProgressEngine = {
  init(deckId: string, totalCards: number): DeckProgressState {
    const list = loadProgress();
    let entry = list.find((p) => p.deckId === deckId);

    if (!entry) {
      entry = {
        deckId,
        totalCards,
        editedCards: new Set()
      };
      list.push(entry);
      saveProgress(list);
    }

    return entry;
  },

  markEdited(deckId: string, cardId: string): DeckProgressState {
    const list = loadProgress();
    const entry = list.find((p) => p.deckId === deckId);
    if (!entry) return this.init(deckId, 78);

    entry.editedCards.add(cardId);
    saveProgress(list);
    return entry;
  },

  getCompletionPercent(deckId: string): number {
    const list = loadProgress();
    const entry = list.find((p) => p.deckId === deckId);
    if (!entry) return 0;

    return (entry.editedCards.size / entry.totalCards) * 100;
  },

  isNearingCompletion(deckId: string): boolean {
    return this.getCompletionPercent(deckId) >= 80;
  }
};

export default DeckProgressEngine;
