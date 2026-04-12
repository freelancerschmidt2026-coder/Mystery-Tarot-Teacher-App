import React from "react";
import "./PrizeRevealPopup.css";
import { useNavigate } from "react-router-dom";
import { unlockIndexEntry } from "../utils/indexUnlock";

export default function PrizeRevealPopup({ title, reward, description, onClose }) {
  const navigate = useNavigate();

  function handleOpenMystery() {
    // Unlock NotePad entries
    unlockIndexEntry("Question Marks Mystery");
    unlockIndexEntry("How to Use Your Free Mystery Course");

    // If the prize is a course, go to the Mystery Teacher Room
    if (reward.includes("Course") || reward.includes("Lesson")) {
      navigate("/mystery-teacher-prize-room");
    } else {
      navigate("/notepad");
    }

    onClose();
  }

  return (
    <div className="prize-popup-overlay" onClick={onClose}>
      <div className="prize-popup-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="prize-title">{title}</h2>
        <p className="prize-reward">{reward}</p>
        <p className="prize-description">{description}</p>

        <button className="open-mystery-btn" onClick={handleOpenMystery}>
          Open Mystery
        </button>
      </div>
    </div>
  );
}
