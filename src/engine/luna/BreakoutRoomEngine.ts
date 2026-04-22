// src/engine/luna/BreakoutRoomEngine.ts

export interface BreakoutRoomAccess {
  memberId: string;
  roomId: string;
  expiresAt: string; // ISO date
}

export interface BreakoutRoomEntryLog {
  id: string;
  memberId: string;
  roomId: string;
  timestamp: string;
}

const STORAGE_KEY_ACCESS = "mystery_breakout_access";
const STORAGE_KEY_LOGS = "mystery_breakout_logs";

function loadAccess(): BreakoutRoomAccess[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY_ACCESS);
  return raw ? JSON.parse(raw) : [];
}

function saveAccess(list: BreakoutRoomAccess[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_ACCESS, JSON.stringify(list));
}

function loadLogs(): BreakoutRoomEntryLog[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY_LOGS);
  return raw ? JSON.parse(raw) : [];
}

function saveLogs(list: BreakoutRoomEntryLog[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(list));
}

export const BreakoutRoomEngine = {
  /**
   * Check if member has valid access.
   */
  hasAccess(memberId: string, roomId: string): boolean {
    const list = loadAccess();
    const entry = list.find(
      (a) => a.memberId === memberId && a.roomId === roomId
    );
    if (!entry) return false;

    return new Date(entry.expiresAt) > new Date();
  },

  /**
   * Grant 6-month access after paying tokens.
   */
  grantAccess(memberId: string, roomId: string): BreakoutRoomAccess {
    const list = loadAccess();

    const expires = new Date();
    expires.setMonth(expires.getMonth() + 6);

    const entry: BreakoutRoomAccess = {
      memberId,
      roomId,
      expiresAt: expires.toISOString()
    };

    list.push(entry);
    saveAccess(list);

    return entry;
  },

  /**
   * Log entry for audit + GateKeeper CRM.
   */
  logEntry(memberId: string, roomId: string) {
    const logs = loadLogs();
    logs.push({
      id: `log-${Date.now()}`,
      memberId,
      roomId,
      timestamp: new Date().toISOString()
    });
    saveLogs(logs);
  }
};

export default BreakoutRoomEngine;
