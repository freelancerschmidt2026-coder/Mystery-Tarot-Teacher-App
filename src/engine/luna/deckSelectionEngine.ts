export interface DeckMetadata {
  id: string;
  name: string;
  tags?: string[];
  isDefault?: boolean;
}

export interface DeckSelectionContext {
  preferredDeckId?: string;
  intentTags?: string[];
}

export const DeckSelectionEngine = {
  selectDeck(
    decks: DeckMetadata[],
    context: DeckSelectionContext = {}
  ): DeckMetadata | null {
    if (!decks || decks.length === 0) return null;

    if (context.preferredDeckId) {
      const match = decks.find((d) => d.id === context.preferredDeckId);
      if (match) return match;
    }

    if (context.intentTags && context.intentTags.length > 0) {
      const tagged = decks.find((d) =>
        d.tags?.some((t) => context.intentTags?.includes(t))
      );
      if (tagged) return tagged;
    }

    const defaultDeck = decks.find((d) => d.isDefault);
    if (defaultDeck) return defaultDeck;

    return decks[0];
  },
};

export default DeckSelectionEngine;
