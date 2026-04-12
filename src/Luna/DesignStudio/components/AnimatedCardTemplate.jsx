import React from "react";
import { DraggableSymbol } from "./DraggableSymbol";
import "./AnimatedCardTemplate.css";

export function AnimatedCardTemplate({
  baseTemplateSrc,
  selectedBorder,
  selectedSymbols,
  onSymbolPositionChange
}) {
  return (
    <div className="animated-card-template">
      <div className="card-base">
        <img 
          src={baseTemplateSrc} 
          alt="Card Base" 
          className="card-base-image" 
          referrerPolicy="no-referrer"
        />
        {selectedBorder && (
          <img
            src={selectedBorder.src}
            alt={selectedBorder.label}
            className={`card-border border-anim-${selectedBorder.animation.type}`}
            referrerPolicy="no-referrer"
          />
        )}
        {selectedSymbols.map(symbol => (
          <DraggableSymbol
            key={symbol.instanceId}
            symbol={symbol}
            onPositionChange={(pos) => onSymbolPositionChange(symbol.instanceId, pos)}
          />
        ))}
      </div>
    </div>
  );
}
