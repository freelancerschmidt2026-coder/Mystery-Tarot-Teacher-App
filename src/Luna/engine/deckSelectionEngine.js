export const deckSelectionEngine = {
  evaluateDeck: (deckId, category) => {
    let isMismatch = false;
    if (deckId === 'marseille' && category === 'love') {
      isMismatch = true; // Marseille is more geometric/intellectual
    }
    if (deckId === 'shadowscapes' && category === 'career') {
      isMismatch = true; // Shadowscapes is very ethereal
    }
    return { isMismatch };
  }
};
