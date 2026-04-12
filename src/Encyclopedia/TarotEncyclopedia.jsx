import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Book, 
  History, 
  Globe, 
  Zap, 
  Hash, 
  Layers, 
  ChevronRight, 
  ArrowLeft, 
  Save, 
  Columns,
  Sparkles,
  Library,
  Compass,
  ScrollText
} from 'lucide-react';
import { TAROT_CARDS } from '../FlashCards/TarotData';
import './encyclopedia.css';

const ENCYCLOPEDIA_SECTIONS = [
  { id: 'major-advanced', title: 'Major Arcana (Advanced)', icon: <Sparkles size={20} />, desc: 'Deep archetypal and esoteric analysis of the 22 Keys.' },
  { id: 'minor-advanced', title: 'Minor Arcana (Advanced)', icon: <Layers size={20} />, desc: 'Elemental and numerological mastery of the four suits.' },
  { id: 'symbol-origins', title: 'Symbol Origins', icon: <Compass size={20} />, desc: 'The etymology and evolution of sacred geometry and iconography.' },
  { id: 'historical-evolution', title: 'Historical Evolution', icon: <History size={20} />, desc: 'From Mamluk cards to modern digital decks.' },
  { id: 'cultural-variations', title: 'Cultural Variations', icon: <Globe size={20} />, desc: 'How different traditions interpret the sacred archetypes.' },
  { id: 'archetypes-mythology', title: 'Archetypes & Mythology', icon: <Book size={20} />, desc: 'Cross-cultural mythological parallels in the Tarot.' },
  { id: 'comparative-systems', title: 'Comparative Tarot Systems', icon: <Columns size={20} />, desc: 'RWS vs. Thoth vs. Marseilles and beyond.' },
  { id: 'advanced-numerology', title: 'Advanced Numerology', icon: <Hash size={20} />, desc: 'The mathematical architecture of the deck.' },
  { id: 'advanced-elemental', title: 'Advanced Elemental Theory', icon: <Zap size={20} />, desc: 'The alchemy of Fire, Water, Air, and Earth.' },
  { id: 'cross-deck-symbolism', title: 'Cross-Deck Symbolism', icon: <ScrollText size={20} />, desc: 'Tracing symbols across centuries of deck design.' }
];

const TarotEncyclopedia = ({ onNavigate = () => {} }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [activePage, setActivePage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all'); // all, beginner, intermediate, advanced
  const [compareMode, setCompareMode] = useState(false);
  const [compareCard, setCompareCard] = useState(null);

  const filteredCards = useMemo(() => {
    return TAROT_CARDS.filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          card.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          card.visualDescription.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Level filter logic (mocked for now, assuming all are advanced in the encyclopedia)
      const matchesLevel = levelFilter === 'all' || levelFilter === 'advanced';
      
      return matchesSearch && matchesLevel;
    });
  }, [searchQuery, levelFilter]);

  const handleSaveToNotepad = (content, section) => {
    const savedNotes = localStorage.getItem('finder_notes');
    const notes = savedNotes ? JSON.parse(savedNotes) : [];
    
    const newNote = {
      id: Date.now(),
      text: content,
      page: 'tarot-encyclopedia',
      section: section,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('finder_notes', JSON.stringify([...notes, newNote]));
    alert(`Research saved to NotePad under ${section}!`);
  };

  const renderSectionList = () => (
    <div className="encyclopedia-home">
      <header className="encyclopedia-header">
        <h1>Tarot Encyclopedia</h1>
        <p>The research-grade vault of advanced symbolic and historical wisdom.</p>
        
        <div className="encyclopedia-controls">
          <div className="search-bar">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search symbols, archetypes, elements..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <Filter size={18} />
            <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </header>

      <div className="section-grid">
        {ENCYCLOPEDIA_SECTIONS.map(section => (
          <motion.button
            key={section.id}
            className="section-card"
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveSection(section)}
          >
            <div className="section-icon">{section.icon}</div>
            <div className="section-info">
              <h3>{section.title}</h3>
              <p>{section.desc}</p>
            </div>
            <ChevronRight size={20} className="section-arrow" />
          </motion.button>
        ))}
      </div>
    </div>
  );

  const renderAdvancedCardList = (arcanaType) => (
    <div className="advanced-card-list">
      <button className="back-btn" onClick={() => setActiveSection(null)}>
        <ArrowLeft size={18} /> Back to Encyclopedia
      </button>
      <header className="section-header">
        <h2>{arcanaType === 'major' ? 'Major Arcana (Advanced)' : 'Minor Arcana (Advanced)'}</h2>
        <p>Esoteric depths and archetypal resonances.</p>
      </header>

      <div className="card-grid">
        {TAROT_CARDS.filter(c => c.arcana === arcanaType).map(card => (
          <motion.button
            key={card.id}
            className="advanced-card-item"
            whileHover={{ scale: 1.03 }}
            onClick={() => setActivePage(card)}
          >
            <div className="card-item-name">{card.name}</div>
            <div className="card-item-meta">{card.element} • {card.arcana}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );

  const renderCardPage = (card) => (
    <div className="encyclopedia-page">
      <div className="page-nav">
        <button className="back-btn" onClick={() => setActivePage(null)}>
          <ArrowLeft size={18} /> Back to List
        </button>
        <div className="page-actions">
          <button className="action-btn compare" onClick={() => setCompareMode(true)}>
            <Columns size={18} /> Compare
          </button>
          <button className="action-btn save" onClick={() => handleSaveToNotepad(`Advanced Research: ${card.name}\n\n${card.visualDescription}`, 'Encyclopedia Notes')}>
            <Save size={18} /> Save to NotePad
          </button>
        </div>
      </div>

      <header className="page-header">
        <div className="page-title-group">
          <h1>{card.name}</h1>
          <p className="page-subtitle">Archetype: {card.arcana === 'major' ? 'Universal Key' : 'Elemental Force'}</p>
        </div>
        <div className="page-meta-badges">
          <span className="badge">{card.element}</span>
          <span className="badge">{card.arcana} Arcana</span>
        </div>
      </header>

      <div className="page-content">
        <section className="content-block overview">
          <h3>Esoteric Overview</h3>
          <p>{card.visualDescription}</p>
        </section>

        <div className="content-grid">
          <section className="content-block">
            <h3>Symbolic Origins</h3>
            <p>Tracing the iconography of {card.name} back to its Renaissance roots and beyond. The visual language here speaks of {card.keywords.join(', ')}.</p>
          </section>
          
          <section className="content-block">
            <h3>Advanced Numerology</h3>
            <p>The mathematical significance of this card within the deck's structure. How its number resonates with the overall sequence of the Fool's Journey.</p>
          </section>
        </div>

        <section className="content-block symbol-chart">
          <h3>Visual Symbol Chart</h3>
          <div className="symbol-grid">
            {card.keywords.map(keyword => (
              <div key={keyword} className="symbol-item">
                <div className="symbol-dot"></div>
                <div className="symbol-name">{keyword}</div>
                <div className="symbol-desc">Advanced esoteric interpretation of this keyword in the context of {card.name}.</div>
              </div>
            ))}
          </div>
        </section>

        <section className="content-block comparative">
          <h3>Comparative Systems</h3>
          <div className="comparison-table">
            <div className="table-row header">
              <div>System</div>
              <div>Interpretation</div>
            </div>
            <div className="table-row">
              <div>Rider-Waite-Smith</div>
              <div>Standard archetypal representation.</div>
            </div>
            <div className="table-row">
              <div>Thoth</div>
              <div>Heavy emphasis on astrological and qabalistic correspondences.</div>
            </div>
            <div className="table-row">
              <div>Marseilles</div>
              <div>Raw, unadorned symbolic power.</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const renderGenericSection = (section) => (
    <div className="generic-section">
      <button className="back-btn" onClick={() => setActiveSection(null)}>
        <ArrowLeft size={18} /> Back to Encyclopedia
      </button>
      <header className="section-header">
        <h2>{section.title}</h2>
        <p>{section.desc}</p>
      </header>

      <div className="research-content">
        <section className="content-block">
          <h3>Deep-Dive Analysis</h3>
          <p>This section explores the intricate details of {section.title.toLowerCase()}. We delve into the historical records, cultural variations, and advanced theoretical frameworks that define this aspect of the Tarot.</p>
          <p className="mt-4 opacity-70 italic">Further research material is being indexed by Luna. Check back as your intuition grows.</p>
        </section>
        
        <button 
          className="save-research-btn"
          onClick={() => handleSaveToNotepad(`Research Topic: ${section.title}\n\n${section.desc}`, 'Symbol Research')}
        >
          <Save size={18} /> Save Research to NotePad
        </button>
      </div>
    </div>
  );

  return (
    <div className="tarot-encyclopedia">
      <div className="encyclopedia-atmosphere">
        <div className="dust-particles"></div>
      </div>

      <div className="encyclopedia-container">
        <AnimatePresence mode="wait">
          {!activeSection && !activePage && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {renderSectionList()}
            </motion.div>
          )}

          {activeSection && !activePage && (
            <motion.div key="section" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {activeSection.id === 'major-advanced' ? renderAdvancedCardList('major') : 
               activeSection.id === 'minor-advanced' ? renderAdvancedCardList('minor') : 
               renderGenericSection(activeSection)}
            </motion.div>
          )}

          {activePage && (
            <motion.div key="page" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              {renderCardPage(activePage)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {compareMode && (
        <div className="compare-overlay">
          <div className="compare-modal">
            <header>
              <h3>Compare Cards</h3>
              <button onClick={() => setCompareMode(false)}>Close</button>
            </header>
            <div className="compare-body">
              <p className="opacity-50 italic">Select another card to compare with {activePage?.name}...</p>
              <div className="compare-search">
                <Search size={16} />
                <input type="text" placeholder="Search card..." />
              </div>
              <div className="compare-list">
                {TAROT_CARDS.slice(0, 10).map(c => (
                  <button key={c.id} className="compare-item" onClick={() => {
                    handleSaveToNotepad(`Comparison: ${activePage?.name} vs ${c.name}\n\nComparative analysis of archetypes and elements.`, 'Saved Comparisons');
                    setCompareMode(false);
                  }}>
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TarotEncyclopedia;
