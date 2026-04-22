// src/engine/luna/CardHistoryEngine.ts

export interface CardHistoryEntry {
  id: string;
  cardId: string;
  deckId: string;
  memberId: string;
  changeType: string;
  before: unknown;
  after: unknown;
  timestamp: string;
}

const STORAGE_KEY_HISTORY = "mystery_card_history";

function loadHistory(): CardHistoryEntry[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
  return raw ? JSON.parse(raw) : [];
}

function saveHistory(list: CardHistoryEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(list));
}

export const CardHistoryEngine = {
  record(params: {
    cardId: string;
    deckId: string;
    memberId: string;
    changeType: string;
    before: unknown;
    after: unknown;
  }): CardHistoryEntry {
    const list = loadHistory();

    const entry: CardHistoryEntry = {
      id: `hist-${Date.now()}`,
      cardId: params.cardId,
      deckId: params.deckId,
      memberId: params.memberId,
      changeType: params.changeType,
      before: params.before,
      after: params.after,
      timestamp: new Date().toISOString()
    };

    list.push(entry);
    saveHistory(list);

    return entry;
  },

  getHistoryForCard(cardId: string): CardHistoryEntry[] {
    return loadHistory().filter((h) => h.cardId === cardId);
  }
};

export default CardHistoryEngine;
