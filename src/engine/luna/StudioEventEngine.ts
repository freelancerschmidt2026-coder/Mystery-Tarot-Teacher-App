// src/engine/luna/StudioEventEngine.ts

export type StudioEventType =
  | "box_opened"
  | "card_focused"
  | "card_edited"
  | "deck_approved"
  | "luna_guided_change"
  | "template_applied"
  | "breakout_room_entered";

export interface StudioEvent {
  id: string;
  type: StudioEventType;
  memberId: string;
  deckId?: string;
  cardId?: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

const STORAGE_KEY_EVENTS = "mystery_studio_events";

function loadEvents(): StudioEvent[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY_EVENTS);
  return raw ? JSON.parse(raw) : [];
}

function saveEvents(list: StudioEvent[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(list));
}

export const StudioEventEngine = {
  record(params: {
    type: StudioEventType;
    memberId: string;
    deckId?: string;
    cardId?: string;
    metadata?: Record<string, unknown>;
  }): StudioEvent {
    const list = loadEvents();

    const event: StudioEvent = {
      id: `evt-${Date.now()}`,
      type: params.type,
      memberId: params.memberId,
      deckId: params.deckId,
      cardId: params.cardId,
      metadata: params.metadata,
      timestamp: new Date().toISOString()
    };

    list.push(event);
    saveEvents(list);

    return event;
  },

  getEventsForMember(memberId: string): StudioEvent[] {
    return loadEvents().filter(e => e.memberId === memberId);
  }
};

export default StudioEventEngine;
