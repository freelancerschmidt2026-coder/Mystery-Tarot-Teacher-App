import React, { useState } from 'react';
import './finderDecks.css';

const FinderDecks = ({ decks = [], onCreateDeck, onEditDeck, onOpenPreview }) => {
  return (
    <div className="finder-decks-container">
      <header className="finder-decks-header">
        <h2>Finder's Decks</h2>
        <p>Manage your collections, Finder.</p>
      </header>

      <div className="finder-decks-actions">
        <button className="create-deck-btn" onClick={onCreateDeck}>
          Create a New Deck
        </button>
      </div>

      <div className="finder-decks-list">
        {decks.length === 0 ? (
          <div className="empty-decks">
            <p>You haven't created any decks yet.</p>
            <div className="placeholder-deck-card" />
            <div className="placeholder-deck-card" />
            <div className="placeholder-deck-card" />
          </div>
        ) : (
          <div className="decks-grid">
            {decks.map((deck) => (
              <div key={deck.id} className="finder-deck-card">
                <div className="deck-card-glow" />
                <div className="deck-card-content" onClick={() => onEditDeck(deck)}>
                  <span className="deck-card-num">{deck.cards?.length || 0} Cards</span>
                  <h3 className="deck-card-title">{deck.name}</h3>
                  <p className="deck-card-desc">{deck.description}</p>
                </div>
                <button 
                  className="deck-preview-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenPreview(deck);
                  }}
                >
                  Preview Deck
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinderDecks;
