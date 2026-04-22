// src/engine/luna/MemberEconomyLedgerEngine.ts

export interface LedgerEntry {
  id: string;
  memberId: string;
  type:
    | "token_earned"
    | "token_spent"
    | "template_purchase"
    | "deck_sale"
    | "breakout_entry_fee"
    | "cash_out";
  amount: number;
  description: string;
  timestamp: string;
}

const STORAGE_KEY_LEDGER = "mystery_member_ledger";

function loadLedger(): LedgerEntry[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY_LEDGER);
  return raw ? JSON.parse(raw) : [];
}

function saveLedger(list: LedgerEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_LEDGER, JSON.stringify(list));
}

export const MemberEconomyLedgerEngine = {
  /**
   * Add a ledger entry.
   */
  addEntry(params: {
    memberId: string;
    type: LedgerEntry["type"];
    amount: number;
    description: string;
  }): LedgerEntry {
    const list = loadLedger();

    const entry: LedgerEntry = {
      id: `ledger-${Date.now()}`,
      memberId: params.memberId,
      type: params.type,
      amount: params.amount,
      description: params.description,
      timestamp: new Date().toISOString()
    };

    list.push(entry);
    saveLedger(list);

    return entry;
  },

  /**
   * Get all ledger entries for a member.
   */
  getMemberLedger(memberId: string): LedgerEntry[] {
    return loadLedger().filter((e) => e.memberId === memberId);
  }
};

export default MemberEconomyLedgerEngine;
