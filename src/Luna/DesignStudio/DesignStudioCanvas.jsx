import React from 'react';
import { motion } from 'motion/react';

const DesignStudioCanvas = ({ cardConfig, setCardConfig, isFlipped, setIsFlipped }) => {
  const handleSymbolUpdate = (id, updates) => {
    setCardConfig(prev => ({
      ...prev,
      symbols: prev.symbols.map(s => s.id === id ? { ...s, ...updates } : s)
    }));
  };

  const handleRemoveSymbol = (id) => {
    setCardConfig(prev => ({
      ...prev,
      symbols: prev.symbols.filter(s => s.id !== id)
    }));
  };

  return (
    <div className="canvas-wrapper">
      <motion.div 
        className={`card-preview ${isFlipped ? 'flipped' : ''}`}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <div className="card-front" style={{ backgroundColor: cardConfig.bgColor, borderColor: cardConfig.borderColor }}>
          <div className="card-border-ornament top"></div>
          <div className="card-border-ornament bottom"></div>
          
          <div className="card-header-info">
            <span className="card-number">{cardConfig.number}</span>
          </div>

          <div className="card-symbols-layer" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            {cardConfig.symbols.map(s => (
              <motion.div 
                key={s.id} 
                className="placed-symbol" 
                drag
                dragMomentum={false}
                onDragEnd={(e, info) => {
                  // Basic coordinate update logic - in a real app we'd calculate % based on container
                  // For now we just let motion handle the visual drag
                }}
                style={{ 
                  position: 'absolute',
                  left: `${s.x}%`, 
                  top: `${s.y}%`,
                  cursor: 'grab',
                  filter: s.colorFilter || 'none',
                  transform: `translate(-50%, -50%) rotate(${s.rotation || 0}deg) scale(${s.scale || 1})`
                }}
              >
                {s.src ? (
                  <img 
                    src={s.src} 
                    alt={s.name} 
                    style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span style={{ fontSize: '40px' }}>{s.icon}</span>
                )}
                
                {/* Simple controls overlay could go here */}
              </motion.div>
            ))}
          </div>

          <div className="card-footer-info">
            <h2 style={{ fontFamily: cardConfig.font }}>{cardConfig.title}</h2>
          </div>
        </div>

        {/* Back Side */}
        <div className="card-back" style={{ backgroundColor: cardConfig.bgColor, borderColor: cardConfig.borderColor }}>
          <div className="back-pattern">
            {/* If a cover symbol is selected for the back, show it here */}
            {cardConfig.backSymbol ? (
               <img 
                src={cardConfig.backSymbol.src} 
                alt="Back Symbol" 
                style={{ width: '120px', height: '120px', objectFit: 'contain', filter: cardConfig.backSymbol.colorFilter || 'none' }}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="default-back-pattern">✨</div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DesignStudioCanvas;
