// src/engine/luna/TemplateMetadataEngine.ts

export interface TemplateMetadata {
  templateId: string;
  deckId: string;
  memberId: string;
  templateName: string;
  purchasedAt: string;
  pricePaid: number;
  scope: "major" | "swords" | "cups" | "coins" | "wands" | "full_deck";
  version: number;
  notes: string;
}

const STORAGE_KEY_METADATA = "mystery_template_metadata";

function loadMetadata(): TemplateMetadata[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY_METADATA);
  return raw ? JSON.parse(raw) : [];
}

function saveMetadata(list: TemplateMetadata[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_METADATA, JSON.stringify(list));
}

export const TemplateMetadataEngine = {
  add(params: {
    templateId: string;
    deckId: string;
    memberId: string;
    templateName: string;
    pricePaid: number;
    scope: TemplateMetadata["scope"];
  }): TemplateMetadata {
    const list = loadMetadata();

    const entry: TemplateMetadata = {
      templateId: params.templateId,
      deckId: params.deckId,
      memberId: params.memberId,
      templateName: params.templateName,
      purchasedAt: new Date().toISOString(),
      pricePaid: params.pricePaid,
      scope: params.scope,
      version: 1,
      notes: ""
    };

    list.push(entry);
    saveMetadata(list);

    return entry;
  },

  updateNotes(templateId: string, notes: string): TemplateMetadata | null {
    const list = loadMetadata();
    const entry = list.find((m) => m.templateId === templateId);
    if (!entry) return null;

    entry.notes = notes;
    saveMetadata(list);
    return entry;
  },

  incrementVersion(templateId: string): TemplateMetadata | null {
    const list = loadMetadata();
    const entry = list.find((m) => m.templateId === templateId);
    if (!entry) return null;

    entry.version += 1;
    saveMetadata(list);
    return entry;
  },

  getForDeck(deckId: string): TemplateMetadata[] {
    return loadMetadata().filter((m) => m.deckId === deckId);
  }
};

export default TemplateMetadataEngine;
