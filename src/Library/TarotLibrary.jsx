import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Book, 
  Search, 
  Sparkles, 
  Moon, 
  Sun, 
  Wind, 
  Droplets, 
  Flame, 
  Mountain, 
  Scroll, 
  History, 
  Target, 
  Save, 
  ArrowLeft, 
  ChevronRight,
  Info,
  Layers,
  Star,
  Compass
} from 'lucide-react';
import { TAROT_CARDS } from '../FlashCards/TarotData';
import './tarotLibrary.css';

const SYMBOL_DICTIONARY = [
  {
    name: "White Rose",
    meaning: "Purity, innocence, and a fresh start. It represents the untainted soul at the beginning of its journey.",
    variations: "Sometimes depicted as a red rose (passion) or a withered rose (loss of innocence).",
    history: "In medieval symbolism, the white rose was associated with the Virgin Mary and spiritual purity.",
    usage: "Most famously held by The Fool in the Rider-Waite-Smith deck."
  },
  {
    name: "Infinity Symbol (Lemniscate)",
    meaning: "Eternal life, infinite potential, and the continuous cycle of energy.",
    variations: "Often appears as a halo or a belt.",
    history: "Mathematically formalized in the 17th century, but used in esoteric traditions for much longer.",
    usage: "Seen above the heads of The Magician and the figure in the Strength card."
  },
  {
    name: "Pillars (Black and White)",
    meaning: "Duality, balance, and the threshold between the conscious and subconscious.",
    variations: "Sometimes labeled 'B' (Boaz) and 'J' (Jachin).",
    history: "References the pillars of Solomon's Temple in Jerusalem.",
    usage: "Prominent in The High Priestess and The Hierophant cards."
  },
  {
    name: "Water",
    meaning: "The subconscious, emotions, intuition, and the flow of life.",
    variations: "Still water (peace), rushing water (emotional turmoil), or a single stream.",
    history: "Universally associated with the feminine principle and the depths of the psyche.",
    usage: "Found in the Ace of Cups, The Moon, and Temperance."
  },
  {
    name: "Mountain",
    meaning: "Challenges, spiritual heights, and the journey ahead.",
    variations: "Snow-capped (purity of thought) or jagged (difficulty).",
    history: "Symbol of the divine and the place where heaven meets earth in many cultures.",
    usage: "Seen in the background of The Fool, The Hermit, and many Minor Arcana cards."
  },
  {
    name: "Sun",
    meaning: "Vitality, enlightenment, truth, and conscious awareness.",
    variations: "A smiling sun (benevolence) or a sun with rays (energy).",
    history: "Ancient symbol of the divine and the source of all life.",
    usage: "Central to The Sun card, also appears in Death and Temperance."
  },
  {
    name: "Moon",
    meaning: "Intuition, the subconscious, dreams, and hidden truths.",
    variations: "Full moon, crescent, or a moon with a face.",
    history: "Associated with the feminine, the tides, and the mysterious depths of the mind.",
    usage: "Prominent in The Moon, The High Priestess, and the Eight of Cups."
  },
  {
    name: "Lion",
    meaning: "Strength, passion, courage, and the animal nature.",
    variations: "A roaring lion or a tamed lion.",
    history: "Symbol of royalty, solar power, and the zodiac sign Leo.",
    usage: "Key figure in the Strength card and the Wheel of Fortune."
  },
  {
    name: "Angel",
    meaning: "Divine guidance, higher consciousness, and spiritual intervention.",
    variations: "Archangels (Michael, Gabriel, Raphael) or generic winged figures.",
    history: "Messengers of God in Abrahamic traditions, representing the bridge between worlds.",
    usage: "Seen in The Lovers, Temperance, and Judgement."
  },
  {
    name: "Snake",
    meaning: "Wisdom, temptation, transformation, and the kundalini energy.",
    variations: "Ouroboros (eternity) or a snake in a tree.",
    history: "Dual symbol of healing (caduceus) and deception (Eden).",
    usage: "Appears in The Lovers and the Wheel of Fortune."
  }
];

const TarotLibrary = ({ onNavigate = () => {} }) => {
  const [activeSection, setActiveSection] = useState('major');
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSuit, setActiveSuit] = useState('wands');

  const filteredSymbols = useMemo(() => {
    return SYMBOL_DICTIONARY.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.meaning.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSaveToNotepad = (type, item) => {
    const savedNotes = localStorage.getItem('finder_notes');
    const notes = savedNotes ? JSON.parse(savedNotes) : [];
    
    let noteText = '';
    let section = '';
    
    if (type === 'card') {
      noteText = `[Library Entry] ${item.name}\n\nKeywords: ${item.keywords.join(', ')}\nUpright: ${item.uprightMeaning}\nReversed: ${item.reversedMeaning}\nArchetype: ${item.archetype}`;
      section = 'Saved Cards';
    } else if (type === 'symbol') {
      noteText = `[Symbol Dictionary] ${item.name}\n\nMeaning: ${item.meaning}\nTarot Usage: ${item.usage}`;
      section = 'Saved Symbols';
    } else {
      noteText = `[Research Note] ${item.title}\n\n${item.content}`;
      section = 'Research Notes';
    }

    const newNote = {
      id: Date.now(),
      text: noteText,
      page: 'tarot-library',
      section: section,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('finder_notes', JSON.stringify([...notes, newNote]));
    alert(`${item.name || item.title} added to NotePad!`);
  };

  const renderCardGrid = (arcana, suit = null) => {
    const cards = TAROT_CARDS.filter(c => {
      if (arcana === 'major') return c.arcana === 'major';
      return c.arcana === 'minor' && c.suit === suit;
    });

    return (
      <div className="library-grid">
        {cards.map(card => (
          <motion.div 
            key={card.id}
            className="library-card-item"
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => setSelectedCard(card)}
          >
            <div className="card-item-number">{card.arcana === 'major' ? card.number : ''}</div>
            <div className="card-item-name">{card.name}</div>
            <div className="card-item-keywords">{card.keywords.slice(0, 2).join(', ')}</div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderCardDetail = () => {
    if (!selectedCard) return null;

    return (
      <motion.div 
        className="card-detail-view"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
      >
        <button className="back-btn" onClick={() => setSelectedCard(null)}>
          <ArrowLeft size={18} /> Back to Library
        </button>

        <div className="detail-header">
          <div className="detail-title-group">
            <h1 className="detail-title">{selectedCard.name}</h1>
            <span className="detail-subtitle">
              {selectedCard.arcana === 'major' ? `Major Arcana • ${selectedCard.number}` : `Minor Arcana • ${selectedCard.suit}`}
            </span>
          </div>
          <button className="save-btn" onClick={() => handleSaveToNotepad('card', selectedCard)}>
            <Save size={18} /> Add to NotePad
          </button>
        </div>

        <div className="detail-grid">
          <div className="detail-main">
            <section className="detail-section">
              <h3><Sparkles size={16} /> Keywords</h3>
              <div className="keyword-pills">
                {selectedCard.keywords.map(k => <span key={k} className="keyword-pill">{k}</span>)}
              </div>
            </section>

            <section className="detail-section">
              <h3><Sun size={16} /> Upright Meaning</h3>
              <p>{selectedCard.uprightMeaning}</p>
            </section>

            <section className="detail-section">
              <h3><Moon size={16} /> Reversed Meaning</h3>
              <p>{selectedCard.reversedMeaning}</p>
            </section>

            <section className="detail-section">
              <h3><Layers size={16} /> Symbol Breakdown</h3>
              <p>{selectedCard.visualDescription}</p>
              <p className="mt-2 italic opacity-80">{selectedCard.designInterpretation}</p>
            </section>
          </div>

          <div className="detail-sidebar">
            <div className="sidebar-stat">
              <label>Archetype</label>
              <span>{selectedCard.archetype}</span>
            </div>
            <div className="sidebar-stat">
              <label>Element</label>
              <span>{selectedCard.element}</span>
            </div>
            <div className="sidebar-stat">
              <label>Numerology</label>
              <span>{selectedCard.numerology}</span>
            </div>
            <div className="sidebar-stat">
              <label>Emotional Tone</label>
              <span>{selectedCard.emotionalTone}</span>
            </div>
            {selectedCard.arcana === 'minor' && (
              <div className="sidebar-stat">
                <label>Suit Energy</label>
                <span>{selectedCard.suitEnergy}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderSymbolDictionary = () => (
    <div className="symbol-dictionary">
      <div className="dictionary-header">
        <h2 className="section-title">Symbol Dictionary</h2>
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search symbols..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="symbol-list">
        {filteredSymbols.map(symbol => (
          <motion.div 
            key={symbol.name}
            className="symbol-item"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="symbol-item-header">
              <h3>{symbol.name}</h3>
              <button className="icon-btn" onClick={() => handleSaveToNotepad('symbol', symbol)}>
                <Save size={16} />
              </button>
            </div>
            <p className="symbol-meaning">{symbol.meaning}</p>
            <div className="symbol-meta">
              <div className="meta-group">
                <label>Variations</label>
                <p>{symbol.variations}</p>
              </div>
              <div className="meta-group">
                <label>History</label>
                <p>{symbol.history}</p>
              </div>
              <div className="meta-group">
                <label>Tarot Usage</label>
                <p>{symbol.usage}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderStaticSection = (title, content) => (
    <div className="static-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <button className="save-btn" onClick={() => handleSaveToNotepad('research', { title, content })}>
          <Save size={18} /> Save to Research
        </button>
      </div>
      <div className="section-content">
        {content}
      </div>
    </div>
  );

  const sections = {
    major: { label: 'Major Arcana', icon: <Star size={18} /> },
    minor: { label: 'Minor Arcana', icon: <Layers size={18} /> },
    symbols: { label: 'Symbols', icon: <Compass size={18} /> },
    numerology: { label: 'Numerology', icon: <Target size={18} /> },
    astrology: { label: 'Astrology', icon: <Moon size={18} /> },
    archetypes: { label: 'Archetypes', icon: <Sparkles size={18} /> },
    history: { label: 'History', icon: <History size={18} /> }
  };

  return (
    <div className="tarot-library-container">
      <aside className="library-sidebar">
        <div className="sidebar-logo">
          <Book size={24} />
          <span>Tarot Library</span>
        </div>
        <nav className="library-nav">
          {Object.entries(sections).map(([id, { label, icon }]) => (
            <button 
              key={id}
              className={`nav-item ${activeSection === id ? 'active' : ''}`}
              onClick={() => {
                setActiveSection(id);
                setSelectedCard(null);
              }}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="library-main">
        <AnimatePresence mode="wait">
          {selectedCard ? (
            renderCardDetail()
          ) : (
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="section-view"
            >
              {activeSection === 'major' && (
                <>
                  <h2 className="section-title">The Major Arcana</h2>
                  <p className="section-desc">The 22 archetypal stages of the Fool's Journey.</p>
                  {renderCardGrid('major')}
                </>
              )}

              {activeSection === 'minor' && (
                <>
                  <h2 className="section-title">The Minor Arcana</h2>
                  <div className="suit-tabs">
                    {['wands', 'cups', 'swords', 'pentacles'].map(suit => (
                      <button 
                        key={suit}
                        className={`suit-tab ${activeSuit === suit ? 'active' : ''}`}
                        onClick={() => setActiveSuit(suit)}
                      >
                        {suit === 'wands' && <Flame size={14} />}
                        {suit === 'cups' && <Droplets size={14} />}
                        {suit === 'swords' && <Wind size={14} />}
                        {suit === 'pentacles' && <Mountain size={14} />}
                        {suit.charAt(0).toUpperCase() + suit.slice(1)}
                      </button>
                    ))}
                  </div>
                  {renderCardGrid('minor', activeSuit)}
                </>
              )}

              {activeSection === 'symbols' && renderSymbolDictionary()}

              {activeSection === 'numerology' && renderStaticSection('Tarot Numerology', (
                <div className="rich-content">
                  <p>Numerology is the backbone of the Tarot's structure, providing a mathematical framework for the spiritual journey.</p>
                  <div className="num-grid">
                    <div className="num-item"><strong>0:</strong> The Void, Infinite Potential, The Source.</div>
                    <div className="num-item"><strong>1:</strong> New Beginnings, Focus, Individuality, The Seed.</div>
                    <div className="num-item"><strong>2:</strong> Duality, Balance, Reflection, Choice.</div>
                    <div className="num-item"><strong>3:</strong> Creativity, Growth, Expression, The Harvest.</div>
                    <div className="num-item"><strong>4:</strong> Structure, Foundation, Stability, Order.</div>
                    <div className="num-item"><strong>5:</strong> Conflict, Change, Instability, Challenge.</div>
                    <div className="num-item"><strong>6:</strong> Harmony, Communication, Cooperation, Healing.</div>
                    <div className="num-item"><strong>7:</strong> Reflection, Assessment, Spirituality, Wisdom.</div>
                    <div className="num-item"><strong>8:</strong> Power, Manifestation, Action, Karma.</div>
                    <div className="num-item"><strong>9:</strong> Completion, Fulfillment, Attainment, Culmination.</div>
                    <div className="num-item"><strong>10:</strong> Finality, Rebirth, The End of a Cycle.</div>
                  </div>
                </div>
              ))}

              {activeSection === 'astrology' && renderStaticSection('Tarot Astrology', (
                <div className="rich-content">
                  <p>The Tarot and Astrology are deeply intertwined, with each card corresponding to a planet, zodiac sign, or element.</p>
                  <div className="astro-grid">
                    <div className="astro-item"><strong>The Fool:</strong> Uranus (Air)</div>
                    <div className="astro-item"><strong>The Magician:</strong> Mercury</div>
                    <div className="astro-item"><strong>The High Priestess:</strong> The Moon</div>
                    <div className="astro-item"><strong>The Empress:</strong> Venus</div>
                    <div className="astro-item"><strong>The Emperor:</strong> Aries</div>
                    <div className="astro-item"><strong>The Hierophant:</strong> Taurus</div>
                    <div className="astro-item"><strong>The Lovers:</strong> Gemini</div>
                    <div className="astro-item"><strong>The Chariot:</strong> Cancer</div>
                    <div className="astro-item"><strong>Strength:</strong> Leo</div>
                    <div className="astro-item"><strong>The Hermit:</strong> Virgo</div>
                    <div className="astro-item"><strong>Wheel of Fortune:</strong> Jupiter</div>
                    <div className="astro-item"><strong>Justice:</strong> Libra</div>
                    <div className="astro-item"><strong>The Hanged Man:</strong> Neptune (Water)</div>
                    <div className="astro-item"><strong>Death:</strong> Scorpio</div>
                    <div className="astro-item"><strong>Temperance:</strong> Sagittarius</div>
                    <div className="astro-item"><strong>The Devil:</strong> Capricorn</div>
                    <div className="astro-item"><strong>The Tower:</strong> Mars</div>
                    <div className="astro-item"><strong>The Star:</strong> Aquarius</div>
                    <div className="astro-item"><strong>The Moon:</strong> Pisces</div>
                    <div className="astro-item"><strong>The Sun:</strong> The Sun</div>
                    <div className="astro-item"><strong>Judgement:</strong> Pluto (Fire)</div>
                    <div className="astro-item"><strong>The World:</strong> Saturn (Earth)</div>
                  </div>
                </div>
              ))}

              {activeSection === 'archetypes' && renderStaticSection('Archetypal Wisdom', (
                <div className="rich-content">
                  <p>Archetypes are universal, mythic characters that reside within the collective unconscious. The Tarot serves as a gallery of these primal energies.</p>
                  <div className="archetype-list">
                    <div className="archetype-item">
                      <h4>The Hero</h4>
                      <p>The journey of self-discovery and overcoming obstacles (The Chariot).</p>
                    </div>
                    <div className="archetype-item">
                      <h4>The Shadow</h4>
                      <p>The hidden, repressed aspects of the self (The Devil).</p>
                    </div>
                    <div className="archetype-item">
                      <h4>The Wise Old Man</h4>
                      <p>Spiritual guidance and inner wisdom (The Hermit).</p>
                    </div>
                  </div>
                </div>
              ))}

              {activeSection === 'history' && renderStaticSection('Historical Notes', (
                <div className="rich-content">
                  <p>The Tarot's history is a blend of documented fact and esoteric mystery.</p>
                  <ul className="history-timeline">
                    <li><strong>15th Century:</strong> First appearance in Italy as a card game (Tarocchini).</li>
                    <li><strong>18th Century:</strong> Antoine Court de Gébelin links Tarot to Ancient Egypt.</li>
                    <li><strong>1909:</strong> Publication of the Rider-Waite-Smith deck, revolutionizing Tarot with illustrated Minor Arcana.</li>
                    <li><strong>Modern Era:</strong> Tarot evolves into a tool for psychological insight and personal growth.</li>
                  </ul>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default TarotLibrary;
