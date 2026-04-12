import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  Type, 
  Layout as LayoutIcon, 
  Image as ImageIcon, 
  Box, 
  Save, 
  RotateCw, 
  Sparkles, 
  Layers, 
  ChevronRight, 
  ChevronLeft,
  Plus,
  Trash2,
  Download,
  Eye,
  CheckCircle2,
  Droplets
} from 'lucide-react';
import './designStudio.css';

import { notePadActions } from '../../state/NotePadState/notePadActions';
import { symbolLibrary as mysticSymbols, categories as mysticCategories } from './symbolLibrary';
import { coverTemplates } from './templates/covers/coverTemplates';
import DesignStudioCanvas from './DesignStudioCanvas';

const TarotDesignStudio = ({ onNavigate = () => {} }) => {
  const [activeTab, setActiveTab] = useState('card'); // card, box, covers
  const [selectedTemplate, setSelectedTemplate] = useState('major');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cardConfig, setCardConfig] = useState({
    title: 'The Fool',
    number: '0',
    bgColor: '#1a1a1a',
    borderColor: '#fbbf24',
    borderStyle: 'ornate',
    font: 'Playfair Display',
    symbols: [],
    texture: 'none',
    backSymbol: null,
    globalFilter: 'none'
  });

  const [isFlipped, setIsFlipped] = useState(false);
  const [showBulkSuccess, setShowBulkSuccess] = useState(false);

  const templates = {
    major: { name: 'Major Arcana', icon: <Sparkles size={18} /> },
    minor: { name: 'Minor Arcana', icon: <Layers size={18} /> },
    box: { name: 'Box Template', icon: <Box size={18} /> },
    covers: { name: 'Mystic Covers', icon: <ImageIcon size={18} /> }
  };

  const baseSymbols = [
    { id: 'cup', name: 'Cup', icon: '🏆', category: 'Classic' },
    { id: 'sword', name: 'Sword', icon: '⚔️', category: 'Classic' },
    { id: 'wand', name: 'Wand', icon: '🪄', category: 'Classic' },
    { id: 'pentacle', name: 'Pentacle', icon: '🪙', category: 'Classic' },
    { id: 'sun', name: 'Sun', icon: '☀️', category: 'Celestial' },
    { id: 'moon', name: 'Moon', icon: '🌙', category: 'Celestial' },
    { id: 'star', name: 'Star', icon: '✨', category: 'Celestial' },
    { id: 'eye', name: 'Eye', icon: '👁️', category: 'Mystic' }
  ];

  const allSymbols = [...baseSymbols, ...mysticSymbols];
  const allCategories = ['All', 'Classic', 'Celestial', 'Mystic', 'Mystic Eyes & Geometry (Covers)'];

  const colorFilters = [
    { name: 'None', filter: 'none' },
    { name: 'Neon Blue', filter: 'drop-shadow(0 0 8px #00f) hue-rotate(180deg) brightness(1.2)' },
    { name: 'Neon Pink', filter: 'drop-shadow(0 0 8px #f0f) hue-rotate(300deg) brightness(1.2)' },
    { name: 'Gold', filter: 'sepia(1) saturate(5) brightness(0.8) hue-rotate(5deg)' },
    { name: 'Silver', filter: 'grayscale(1) brightness(1.5) contrast(1.2)' },
    { name: 'Black/White', filter: 'grayscale(1) contrast(2)' },
    { name: 'Rainbow', filter: 'hue-rotate(0deg) saturate(2)', animate: true },
    { name: 'Celestial', filter: 'hue-rotate(240deg) brightness(0.8) saturate(1.5)' }
  ];

  const colorPalettes = [
    { name: 'Midnight Gold', bg: '#050505', accent: '#fbbf24' },
    { name: 'Celestial Blue', bg: '#0a0f1e', accent: '#60a5fa' },
    { name: 'Void Purple', bg: '#0f0a1e', accent: '#a78bfa' },
    { name: 'Sanguine Rose', bg: '#1e0a0a', accent: '#f472b6' }
  ];

  const handleAddSymbol = (symbol) => {
    if (isFlipped) {
      setCardConfig(prev => ({ ...prev, backSymbol: { ...symbol, colorFilter: prev.globalFilter } }));
    } else {
      setCardConfig(prev => ({
        ...prev,
        symbols: [...prev.symbols, { ...symbol, x: 50, y: 50, id: Date.now(), rotation: 0, scale: 1, colorFilter: prev.globalFilter }]
      }));
    }
  };

  const handleApplyTemplate = (template) => {
    const symbol = allSymbols.find(s => s.id === template.defaultSymbol);
    setCardConfig(prev => ({
      ...prev,
      symbols: symbol ? [{ ...symbol, x: 50, y: 50, id: Date.now(), rotation: 0, scale: 1.5 }] : [],
      backSymbol: symbol ? { ...symbol, scale: 2 } : null
    }));
  };

  const handleBulkApply = () => {
    setShowBulkSuccess(true);
    setTimeout(() => setShowBulkSuccess(false), 3000);
    // In a real app, this would trigger a backend process or update a large state object
    console.log("Bulk applying cover design to all 78 cards...");
  };

  const handleSaveToNotepad = () => {
    notePadActions.saveNote({
      title: `Design: ${cardConfig.title}`,
      content: `### Design Studio Creation: ${cardConfig.title}\n\n**Configuration:**\n\`\`\`json\n${JSON.stringify(cardConfig, null, 2)}\n\`\`\``,
      category: 'Design Studio Creations'
    });
    alert('Design saved to NotePad!');
  };

  const filteredSymbols = selectedCategory === 'All' 
    ? allSymbols 
    : allSymbols.filter(s => s.category === selectedCategory);

  return (
    <div className="tarot-design-studio">
      <div className="studio-atmosphere">
        <div className="glow-orb top-right"></div>
        <div className="glow-orb bottom-left"></div>
      </div>

      <div className="studio-container">
        <header className="studio-header">
          <div className="header-info">
            <h1>Tarot Design Studio</h1>
            <p>Architecting the sacred visual language of the Arcana.</p>
          </div>
          <div className="studio-actions">
            <button className="action-btn secondary" onClick={() => setIsFlipped(!isFlipped)}>
              <RotateCw size={18} /> {isFlipped ? 'Show Front' : 'Show Back'}
            </button>
            <button className="action-btn primary" onClick={handleSaveToNotepad}>
              <Save size={18} /> Save to NotePad
            </button>
          </div>
        </header>

        <div className="studio-layout">
          {/* Sidebar Controls */}
          <aside className="studio-sidebar">
            <div className="sidebar-tabs">
              <button 
                className={activeTab === 'card' ? 'active' : ''} 
                onClick={() => setActiveTab('card')}
              >
                Editor
              </button>
              <button 
                className={activeTab === 'covers' ? 'active' : ''} 
                onClick={() => setActiveTab('covers')}
              >
                Covers
              </button>
              <button 
                className={activeTab === 'box' ? 'active' : ''} 
                onClick={() => setActiveTab('box')}
              >
                Box
              </button>
            </div>

            <div className="control-sections">
              {activeTab === 'covers' && (
                <section className="control-group">
                  <label><ImageIcon size={14} /> Cover Templates</label>
                  <div className="template-grid">
                    {coverTemplates.map(t => (
                      <button 
                        key={t.id}
                        className="template-btn"
                        onClick={() => handleApplyTemplate(t)}
                      >
                        <ImageIcon size={18} />
                        <span>{t.name}</span>
                      </button>
                    ))}
                  </div>
                  <button className="bulk-apply-btn" onClick={handleBulkApply}>
                    <Layers size={14} /> Apply to All Cards
                  </button>
                </section>
              )}

              <section className="control-group">
                <label><LayoutIcon size={14} /> Categories</label>
                <select 
                  className="category-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {allCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </section>

              <section className="control-group">
                <label><Droplets size={14} /> Color Filters</label>
                <div className="filter-grid">
                  {colorFilters.map(f => (
                    <button 
                      key={f.name}
                      className={`filter-btn ${cardConfig.globalFilter === f.filter ? 'active' : ''}`}
                      onClick={() => setCardConfig({ ...cardConfig, globalFilter: f.filter })}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </section>

              <section className="control-group">
                <label><Palette size={14} /> Color Palettes</label>
                <div className="palette-list">
                  {colorPalettes.map(p => (
                    <button 
                      key={p.name}
                      className="palette-btn"
                      style={{ '--bg': p.bg, '--accent': p.accent }}
                      onClick={() => setCardConfig({ ...cardConfig, bgColor: p.bg, borderColor: p.accent })}
                    >
                      <div className="swatch-bg"></div>
                      <div className="swatch-accent"></div>
                      <span>{p.name}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="control-group">
                <label><Layers size={14} /> Symbol Library</label>
                <div className="symbol-grid">
                  {filteredSymbols.map(s => (
                    <button 
                      key={s.id} 
                      className="symbol-btn"
                      onClick={() => handleAddSymbol(s)}
                      title={s.name}
                    >
                      {s.src ? (
                        <img src={s.src} alt={s.name} style={{ width: '24px', height: '24px', objectFit: 'contain' }} referrerPolicy="no-referrer" />
                      ) : (
                        s.icon
                      )}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </aside>

          {/* Main Canvas */}
          <main className="studio-canvas">
            <DesignStudioCanvas 
              cardConfig={cardConfig} 
              setCardConfig={setCardConfig} 
              isFlipped={isFlipped} 
              setIsFlipped={setIsFlipped} 
            />

            <div className="canvas-footer">
              <div className="zoom-controls">
                <button><Plus size={16} /></button>
                <span>100%</span>
                <button><Trash2 size={16} onClick={() => setCardConfig({ ...cardConfig, symbols: [], backSymbol: null })} /></button>
              </div>
              <div className="export-actions">
                <button className="export-btn"><Download size={16} /> Export Image</button>
                <button className="export-btn"><Eye size={16} /> Fullscreen</button>
              </div>
            </div>
          </main>
        </div>
      </div>

      <AnimatePresence>
        {showBulkSuccess && (
          <motion.div 
            className="bulk-success-toast"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <CheckCircle2 size={18} />
            <span>Cover design applied to all 78 cards!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TarotDesignStudio;
