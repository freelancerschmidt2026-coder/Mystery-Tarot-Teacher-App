import React, { useState, useEffect } from "react";
import { AnimatedCardTemplate } from "./components/AnimatedCardTemplate";
import { animatedSymbols } from "./models/animatedSymbolConfig";
import { animatedBorders } from "./models/animatedBorderConfig";
import DesignPopup from "./components/DesignPopup";
import "./designStudio.css"; // Reuse existing styles for consistency

export function DesignStudio() {
  const [selectedBorderId, setSelectedBorderId] = useState(null);
  const [selectedSymbolsState, setSelectedSymbolsState] = useState([]);
  const [activePopup, setActivePopup] = useState(null);

  useEffect(() => {
    const handleOpenPopup = (e) => {
      setActivePopup(e.detail);
    };
    window.addEventListener('open-design-popup', handleOpenPopup);
    return () => window.removeEventListener('open-design-popup', handleOpenPopup);
  }, []);

  function closePopup() {
    setActivePopup(null);
  }

  const selectedBorder = animatedBorders.find(b => b.id === selectedBorderId) || null;

  const handleAddSymbol = (symbolConfig) => {
    const instance = {
      instanceId: `sym-${Date.now()}-${Math.random()}`,
      src: symbolConfig.src,
      label: symbolConfig.label,
      animation: symbolConfig.animation,
      size: symbolConfig.defaultSize,
      position: symbolConfig.defaultPosition
    };
    setSelectedSymbolsState(prev => [...prev, instance]);
  };

  const handleSymbolPositionChange = (instanceId, pos) => {
    setSelectedSymbolsState(prev =>
      prev.map(sym =>
        sym.instanceId === instanceId ? { ...sym, position: pos } : sym
      )
    );
  };

  const handleClear = () => {
    setSelectedSymbolsState([]);
    setSelectedBorderId(null);
  };

  const renderPopupContent = () => {
    const category = activePopup?.toLowerCase();
    
    return (
      <div className="popup-template-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {category === 'borders' && animatedBorders.map(border => (
          <button 
            key={border.id} 
            onClick={() => setSelectedBorderId(border.id)}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}
          >
            {border.label}
          </button>
        ))}
        {category === 'symbols' && animatedSymbols.map(sym => (
          <button 
            key={sym.id} 
            onClick={() => handleAddSymbol(sym)}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px', color: '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}
          >
            <img src={sym.src} alt={sym.label} style={{ width: '30px', height: '30px' }} referrerPolicy="no-referrer" />
            <span style={{ fontSize: '0.7rem' }}>{sym.label}</span>
          </button>
        ))}
        {category === 'animated elements' && animatedSymbols.filter(s => s.animation).map(sym => (
          <button 
            key={sym.id} 
            onClick={() => handleAddSymbol(sym)}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px', color: '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}
          >
            <img src={sym.src} alt={sym.label} style={{ width: '30px', height: '30px' }} referrerPolicy="no-referrer" />
            <span style={{ fontSize: '0.7rem' }}>{sym.label}</span>
          </button>
        ))}
        {category === 'templates' && (
          <p style={{ gridColumn: 'span 2', fontSize: '0.8rem', opacity: 0.5, textAlign: 'center' }}>
            Loading base templates...
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="tarot-design-studio">
      <div className="studio-atmosphere">
        <div className="glow-orb top-right"></div>
        <div className="glow-orb bottom-left"></div>
      </div>

      <div className="studio-container">
        {activePopup && (
          <DesignPopup title={activePopup} onClose={closePopup}>
            {renderPopupContent()}
          </DesignPopup>
        )}
        <header className="studio-header">
          <div className="header-info">
            <h1>Animated Deck Studio</h1>
            <p>Crafting living, breathing tarot experiences.</p>
          </div>
          <div className="studio-actions">
            <button className="action-btn secondary" onClick={handleClear}>
              Clear Design
            </button>
            <button className="action-btn primary">
              Save Animated Deck
            </button>
          </div>
        </header>

        <div className="studio-layout">
          <aside className="studio-sidebar">
            <div className="control-sections">
              <section className="control-group">
                <label>Borders</label>
                <div className="template-grid">
                  {animatedBorders.map(border => (
                    <button
                      key={border.id}
                      className={`template-btn ${selectedBorderId === border.id ? 'active' : ''}`}
                      onClick={() => setSelectedBorderId(border.id)}
                    >
                      <span>{border.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="control-group">
                <label>Animated Symbols</label>
                <div className="symbol-grid">
                  {animatedSymbols.map(sym => (
                    <button
                      key={sym.id}
                      className="symbol-btn"
                      onClick={() => handleAddSymbol(sym)}
                      title={sym.label}
                    >
                      <img 
                        src={sym.src} 
                        alt={sym.label} 
                        style={{ width: '32px', height: '32px' }} 
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </aside>

          <main className="studio-canvas">
            <div className="canvas-wrapper">
              <AnimatedCardTemplate
                baseTemplateSrc="https://picsum.photos/seed/tarot/320/512"
                selectedBorder={selectedBorder}
                selectedSymbols={selectedSymbolsState}
                onSymbolPositionChange={handleSymbolPositionChange}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DesignStudio;
