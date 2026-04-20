export interface SpreadDefinition {
  id: string;
  name: string;
  positions: string[];
  tags?: string[];
  isDefault?: boolean;
}

export interface SpreadSelectionContext {
  topic?: "love" | "career" | "self" | "spirituality" | "other";
  depth?: "quick" | "standard" | "deep";
}

export const SpreadSelectionEngine = {
  selectSpread(
    spreads: SpreadDefinition[],
    context: SpreadSelectionContext = {}
  ): SpreadDefinition | null {
    if (!spreads || spreads.length === 0) return null;

    if (context.topic) {
      const match = spreads.find((s) => s.tags?.includes(context.topic!));
      if (match) return match;
    }

    if (context.depth === "quick") {
      const small = spreads.find((s) => s.positions.length <= 3);
      if (small) return small;
    }

    const def = spreads.find((s) => s.isDefault);
    if (def) return def;

    return spreads[0];
  },
};

export default SpreadSelectionEngine;
