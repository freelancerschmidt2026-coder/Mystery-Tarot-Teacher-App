import React, { useState } from 'react';
import './finderBackPocket.css';

const FinderBackPocket = () => {
  const [items, setItems] = useState([
    { id: 1, type: 'idea', text: 'The moon as a guide' },
    { id: 2, type: 'symbol', text: 'The Silver Key' },
    { id: 3, type: 'keyword', text: 'Mystery' },
    { id: 4, type: 'inspiration', text: 'The first step' },
  ]);

  return (
    <div className="finder-backpocket-container">
      <header className="finder-backpocket-header">
        <h2>Finder's BackPocket</h2>
        <p>Store your inspirations here, Finder.</p>
      </header>

      <div className="finder-backpocket-grid">
        {items.map((item) => (
          <div key={item.id} className="finder-backpocket-card">
            <span className="item-type">{item.type}</span>
            <p className="item-text">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinderBackPocket;
