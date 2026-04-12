import React from 'react';
import './finderStudio.css';

const FinderStudio = () => {
  return (
    <div className="finder-studio-container">
      <header className="finder-studio-header">
        <h2>Finder's Studio</h2>
        <p>This is your Studio, Finder. More tools will unlock as your journey continues.</p>
      </header>

      <div className="finder-studio-tools">
        <div className="placeholder-tool">
          <span className="tool-label">Color Picker</span>
          <div className="color-swatches">
            <div className="swatch" style={{ backgroundColor: '#2d1b0d' }} />
            <div className="swatch" style={{ backgroundColor: '#add8e6' }} />
            <div className="swatch" style={{ backgroundColor: '#f5e6c4' }} />
          </div>
        </div>

        <div className="placeholder-tool">
          <span className="tool-label">Symbol Selector</span>
          <div className="symbol-grid">
            <div className="symbol-item">☾</div>
            <div className="symbol-item">☼</div>
            <div className="symbol-item">✧</div>
          </div>
        </div>

        <div className="placeholder-tool">
          <span className="tool-label">Background Selector</span>
          <div className="bg-options">
            <div className="bg-option" style={{ backgroundColor: '#000' }} />
            <div className="bg-option" style={{ backgroundColor: '#1a1a1a' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinderStudio;
