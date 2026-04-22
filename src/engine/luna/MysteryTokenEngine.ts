// src/engine/luna/MysteryTokenEngine.ts

export interface TokenJar {
  memberId: string;
  total: number;
  lastReset: string; // ISO date
}

export interface TokenTransaction {
  id: string;
  memberId: string;
  amount: number;
  type: "earn" | "spend";
  reason: string;
  timestamp: string;
}

const STORAGE_KEY_JARS = "mystery_token_jars";
const STORAGE_KEY_TRANSACTIONS = "mystery_token_transactions";

function loadJars(): TokenJar[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY_JARS);
  return raw ? JSON.parse(raw) : [];
}

function saveJars(jars: TokenJar[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_JARS, JSON.stringify(jars));
}

function loadTransactions(): TokenTransaction[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
  return raw ? JSON.parse(raw) : [];
}

function saveTransactions(tx: TokenTransaction[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(tx));
}

export const MysteryTokenEngine = {
  /**
   * Ensure a jar exists for a member.
   */
  ensureJar(memberId: string): TokenJar {
    const jars = loadJars();
    let jar = jars.find((j) => j.memberId === memberId);

    if (!jar) {
      jar = {
        memberId,
        total: 0,
        lastReset: new Date().toISOString()
      };
      jars.push(jar);
      saveJars(jars);
    }

    return jar;
  },

  /**
   * Earn tokens.
   */
  earn(memberId: string, amount: number, reason: string): TokenJar {
    const jars = loadJars();
    const jar = this.ensureJar(memberId);

    jar.total += amount;

    saveJars(jars);

    const tx = loadTransactions();
    tx.push({
      id: `tx-${Date.now()}`,
      memberId,
      amount,
      type: "earn",
      reason,
      timestamp: new Date().toISOString()
    });
    saveTransactions(tx);

    return jar;
  },

  /**
   * Spend tokens.
   */
  spend(memberId: string, amount: number, reason: string): TokenJar {
    const jars = loadJars();
    const jar = this.ensureJar(memberId);

    jar.total = Math.max(0, jar.total - amount);

    saveJars(jars);

    const tx = loadTransactions();
    tx.push({
      id: `tx-${Date.now()}`,
      memberId,
      amount,
      type: "spend",
      reason,
      timestamp: new Date().toISOString()
    });
    saveTransactions(tx);

    return jar;
  },

  /**
   * Check if member can cash out ($100).
   */
  canCashOut(memberId: string): boolean {
    const jar = this.ensureJar(memberId);
    return jar.total >= 100;
  }
};

export default MysteryTokenEngine;
