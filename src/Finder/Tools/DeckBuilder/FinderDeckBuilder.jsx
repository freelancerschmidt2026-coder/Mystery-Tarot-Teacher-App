import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, ArrowLeft, Save } from 'lucide-react';
import './finderDeckBuilder.css';

const FinderDeckBuilder = ({ onSave, onCancel, initialDeck = null }) => {
  const [deckInfo, setDeckInfo] = useState(initialDeck || {
    name: '',
    description: '',
    theme: 'classic'
  });

  const [cards, setCards] = useState(initialDeck?.cards || [
    { id: Date.now(), title: 'Card 1', meaning: '', symbol: '', background: '' }
  ]);

  const [selectedCardId, setSelectedCardId] = useState(cards[0]?.id);

  const selectedCard = cards.find(c => c.id === selectedCardId);

  const handleAddCard = () => {
    const newCard = {
      id: Date.now(),
      title: `Card ${cards.length + 1}`,
      meaning: '',
      symbol: '',
      background: ''
    };
    setCards([...cards, newCard]);
    setSelectedCardId(newCard.id);
  };

  const handleDeleteCard = (id, e) => {
    e.stopPropagation();
    const newCards = cards.filter(c => c.id !== id);
    setCards(newCards);
    if (selectedCardId === id && newCards.length > 0) {
      setSelectedCardId(newCards[0].id);
    }
  };

  const updateCard = (id, field, value) => {
    setCards(cards.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleSaveDeck = () => {
    if (!deckInfo.name.trim()) {
      alert("Please give your deck a name, Finder.");
      return;
    }
    onSave({ ...deckInfo, cards, id: initialDeck?.id || Date.now() });
  };

  return (
    <div className="finder-deck-builder-container">
      <div className="moonlit-glow-bg" />
      
      <header className="builder-header">
        <button className="back-btn" onClick={onCancel}>
          <ArrowLeft size={20} />
          <span>Return to Decks</span>
        </button>
        <h1>Create Your Deck, Finder.</h1>
        <button className="save-deck-btn" onClick={handleSaveDeck}>
          <Save size={20} />
          <span>Save Deck</span>
        </button>
      </header>

      <div className="builder-workspace">
        {/* Section 1: Deck Info */}
        <section className="builder-section deck-info-section">
          <h3>Deck Info</h3>
          <div className="input-group">
            <label>Deck Name</label>
            <input 
              type="text" 
              value={deckInfo.name} 
              onChange={(e) => setDeckInfo({...deckInfo, name: e.target.value})}
              placeholder="Enter deck name..."
            />
          </div>
          <div className="input-group">
            <label>Short Description</label>
            <textarea 
              value={deckInfo.description} 
              onChange={(e) => setDeckInfo({...deckInfo, description: e.target.value})}
              placeholder="What is the purpose of this deck?"
            />
          </div>
          <div className="input-group">
            <label>Theme Selector (Placeholder)</label>
            <select disabled>
              <option>Classic Parchment</option>
              <option>Midnight Blue</option>
            </select>
          </div>
        </section>

        {/* Section 2: Card List */}
        <section className="builder-section card-list-section">
          <div className="section-header">
            <h3>Card List</h3>
            <button className="add-card-btn" onClick={handleAddCard}>
              <Plus size={16} />
              <span>Add Card</span>
            </button>
          </div>
          <div className="cards-vertical-list">
            {cards.map((card, index) => (
              <div 
                key={card.id} 
                className={`card-list-item ${selectedCardId === card.id ? 'active' : ''}`}
                onClick={() => setSelectedCardId(card.id)}
              >
                <span className="card-num">{index + 1}</span>
                <input 
                  type="text"
                  className="card-title-input"
                  value={card.title}
                  onChange={(e) => updateCard(card.id, 'title', e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="card-thumb-placeholder" />
                <button className="delete-card-btn" onClick={(e) => handleDeleteCard(card.id, e)}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Card Editor */}
        <section className="builder-section card-editor-section">
          <h3>Card Editor</h3>
          {selectedCard ? (
            <div className="editor-fields">
              <div className="input-group">
                <label>Card Title</label>
                <input 
                  type="text" 
                  value={selectedCard.title} 
                  onChange={(e) => updateCard(selectedCard.id, 'title', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Card Meaning</label>
                <textarea 
                  value={selectedCard.meaning} 
                  onChange={(e) => updateCard(selectedCard.id, 'meaning', e.target.value)}
                  placeholder="What does this card represent?"
                />
              </div>
              <div className="placeholder-selectors">
                <div className="input-group">
                  <label>Symbol Selector</label>
                  <div className="placeholder-box">Placeholder</div>
                </div>
                <div className="input-group">
                  <label>Background Selector</label>
                  <div className="placeholder-box">Placeholder</div>
                </div>
              </div>
              <button className="save-card-hint" onClick={handleSaveDeck}>
                Save Changes to Deck
              </button>
            </div>
          ) : (
            <div className="no-card-selected">
              <p>Select a card to edit its details.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default FinderDeckBuilder;
