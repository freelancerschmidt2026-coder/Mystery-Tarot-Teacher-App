// LunaIntuitionEngine.js
// Generates intuition resonance profiles for readings
// Includes: intuition score, pattern detection, signal weighting, and notes

export const LunaIntuitionEngine = {
  /**
   * Generate an intuition profile for a reading
   * spread: "Celtic Cross", "3-Card", etc.
   * deck: "Rider-Waite", "Shadow Deck", etc.
   * mode: "SHADOW", "MANIFESTATION", "HEALING", etc.
   * internalSignals: optional internal data Luna uses
   */
  generateIntuitionProfile({ spread, deck, mode, internalSignals = {} }) {
    // Weighted intuition scoring system
    const weights = {
      spread: 0.25,
      deck: 0.25,
      mode: 0.25,
      internal: 0.25
    };

    // Spread influence
    const spreadScore = this.scoreSpread(spread);

    // Deck influence
    const deckScore = this.scoreDeck(deck);

    // Mode influence
    const modeScore = this.scoreMode(mode);

    // Internal signals influence
    const internalScore = this.scoreInternalSignals(internalSignals);

    // Final weighted intuition resonance score
    const resonanceScore = Math.round(
      spreadScore * weights.spread +
      deckScore * weights.deck +
      modeScore * weights.mode +
      internalScore * weights.internal
    );

    const notes = this.generateNotes({
      spread,
      deck,
      mode,
      resonanceScore
    });

    return {
      resonanceScore,
      notes,
      breakdown: {
        spreadScore,
        deckScore,
        modeScore,
        internalScore
      }
    };
  },

  /**
   * Spread scoring logic
   */
  scoreSpread(spread) {
    const map = {
      "Celtic Cross": 90,
      "3-Card": 75,
      "Past-Present-Future": 80,
      "Shadow Spread": 85,
      "Manifestation Spread": 88
    };
    return map[spread] || 70;
  },

  /**
   * Deck scoring logic
   */
  scoreDeck(deck) {
    const map = {
      "Rider-Waite": 85,
      "Shadow Deck": 92,
      "Light Deck": 88,
      "Oracle Deck": 80
    };
    return map[deck] || 75;
  },

  /**
   * Mode scoring logic
   */
  scoreMode(mode) {
    const map = {
      "SHADOW": 90,
      "MANIFESTATION": 95,
      "HEALING": 88,
      "CLARITY": 85
    };
    return map[mode] || 80;
  },

  /**
   * Internal signals scoring logic
   */
  scoreInternalSignals(signals) {
    if (!signals || Object.keys(signals).length === 0) {
      return 80; // neutral baseline
    }

    let score = 80;

    if (signals.recentPatterns) score += 5;
    if (signals.memberHistory) score += 3;
    if (signals.energyShift) score += 7;
    if (signals.deckAffinity) score += 5;

    return Math.min(score, 100);
  },

  /**
   * Generate intuition notes
   */
  generateNotes({ spread, deck, mode, resonanceScore }) {
    return `Intuition resonance at ${resonanceScore}%. Spread: ${spread}. Deck: ${deck}. Mode: ${mode}.`;
  }
};
