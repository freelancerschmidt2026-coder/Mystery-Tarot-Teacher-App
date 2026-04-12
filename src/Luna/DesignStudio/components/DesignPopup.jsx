import React, { useState, useRef, useEffect } from "react";
import "./DesignPopup.css";

export default function DesignPopup({ title, children, onClose }) {
  const [position, setPosition] = useState({ x: window.innerWidth - 370, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const popupRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.popup-header')) {
      setIsDragging(true);
      dragStartPos.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStartPos.current.x,
          y: e.clientY - dragStartPos.current.y
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

  return (
    <div 
      ref={popupRef}
      className={`design-popup ${isDragging ? 'dragging' : ''}`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        position: 'fixed'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="popup-header">
        <h3>{title}</h3>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="popup-content">
        {children}
      </div>
    </div>
  );
}
