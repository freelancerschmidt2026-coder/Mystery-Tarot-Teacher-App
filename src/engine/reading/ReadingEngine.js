// ReadingEngine.js
// Core reading engine that orchestrates all subsystems

import { DeckEngine } from "../deck/DeckEngine.js";
import { SpreadEngine } from "../spread/SpreadEngine.js";
import { ModeEngine } from "../mode/ModeEngine.js";
import { LunaIntuitionEngine } from "../luna/LunaIntuitionEngine.js";
import { LunaEmotionalEngine } from "../luna/LunaEmotionalEngine.js";
import { LunaLogicEngine } from "../luna/LunaLogicEngine.js";

export const ReadingEngine = {
  performReading({ deck, spread, mode, questionType }) {
    const cards = DeckEngine.draw(deck, SpreadEngine.getSpread(spread).length);
    const modeProfile = ModeEngine.getModeProfile(mode);
    const intuition = LunaIntuitionEngine.generateIntuitionProfile({ spread, deck, mode });
    const emotional = LunaEmotionalEngine.evaluateEmotionalAlignment({ questionType, mode });
    const logic = LunaLogicEngine.evaluateLogic({ cards, spread, mode });

    return {
      cards,
      modeProfile,
      intuition,
      emotional,
      logic,
      createdAt: new Date().toISOString()
    };
  }
};
