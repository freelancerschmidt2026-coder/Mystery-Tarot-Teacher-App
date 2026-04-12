import React from "react";
import "./GoldenRewardPopup.css";
import { motion } from "motion/react";

export default function GoldenRewardPopup({ reward, onClose }) {
  if (!reward) return null;

  return (
    <div className="golden-popup-overlay" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        className="golden-popup-card" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="golden-glow-ring"></div>
        <h2 className="golden-title">Golden Bonus Unlocked</h2>
        <p className="golden-reward-name">{reward.reward}</p>
        <p className="golden-description">{reward.description}</p>

        <button className="golden-claim-btn" onClick={onClose}>
          Claim Bonus
        </button>
      </motion.div>
    </div>
  );
}
