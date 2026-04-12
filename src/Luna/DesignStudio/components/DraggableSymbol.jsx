import React, { useState } from "react";
import "./AnimatedCardTemplate.css";

export function DraggableSymbol({ symbol, onPositionChange }) {
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = (e) => {
    setDragging(true);
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    
    // We need the parent rect to calculate relative position
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Constrain to 0-1 range
    const clampedX = Math.max(0, Math.min(1, x));
    const clampedY = Math.max(0, Math.min(1, y));
    
    onPositionChange({ x: clampedX, y: clampedY });
  };

  const style = {
    left: `${symbol.position.x * 100}%`,
    top: `${symbol.position.y * 100}%`,
    width: `${symbol.size.width}px`,
    height: `${symbol.size.height}px`
  };

  return (
    <img
      src={symbol.src}
      alt={symbol.label}
      className={`card-symbol symbol-anim-${symbol.animation.type}`}
      style={style}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp} // Safety: stop dragging if mouse leaves the symbol
      draggable={false}
      referrerPolicy="no-referrer"
    />
  );
}
