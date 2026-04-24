import React from "react";
import "./spellbook.css";

export const SpellbookPaymentModal = () => {
  return (
    <div className="spellbook-overlay">
      <div className="spellbook">
        <div className="page left">
          <h2>Unlock the Living Deck</h2>
          <p>Watch the cards awaken, evolve, and step into your world.</p>
        </div>
        <div className="page right">
          <button className="purchase-btn">
            Begin the Ritual – $9.99
          </button>
        </div>
      </div>
    </div>
  );
};
