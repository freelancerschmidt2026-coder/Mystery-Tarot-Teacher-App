import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { indexDescriptions } from '../data/indexDescriptions';

export default function IndexExplanationPopup({ category, onClose }) {
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 150, y: window.innerHeight / 2 - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const description = indexDescriptions[category] || "No description available for this category.";

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - offsetRef.current.x,
          y: e.clientY - offsetRef.current.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    offsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  return (
    <div 
      className="index-explanation-popup"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: '300px',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid #00a3ff',
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(0, 163, 255, 0.3), inset 0 0 10px rgba(255, 79, 251, 0.1)',
        zIndex: 3000,
        overflow: 'hidden'
      }}
    >
      <div 
        className="popup-header"
        onMouseDown={handleMouseDown}
        style={{
          padding: '12px 16px',
          background: 'linear-gradient(90deg, rgba(0, 163, 255, 0.2), transparent)',
          borderBottom: '1px solid rgba(0, 163, 255, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'grab'
        }}
      >
        <span style={{ color: '#ff8c00', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase' }}>
          Index Explanation
        </span>
        <button 
          onClick={onClose}
          style={{ background: 'transparent', border: 'none', color: '#6EC1FF', cursor: 'pointer' }}
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="popup-content" style={{ padding: '20px' }}>
        <h3 style={{ color: '#6EC1FF', fontSize: '1.1rem', marginBottom: '12px' }}>{category}</h3>
        <p style={{ color: '#ff8c00', fontSize: '0.9rem', lineHeight: '1.5', opacity: 0.9 }}>
          {description}
        </p>
      </div>
    </div>
  );
}
