// DeckEngine.js
// Loads decks, shuffles, draws cards, and manages deck metadata

export const DeckEngine = {
  decks: {},

  registerDeck(deckName, cards) {
    this.decks[deckName] = cards;
  },

  shuffle(deckName) {
    const deck = [...this.decks[deckName]];
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  },

  draw(deckName, count = 1) {
    const deck = this.shuffle(deckName);
    return deck.slice(0, count);
  }
};
