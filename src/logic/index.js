// Main logic hub for Luna
// This file connects ALL engines so the app can use them

// Reading Engines
import { ReadingEngine } from "../engine/reading/ReadingEngine.js";
import { ReadingOversightEngine } from "../engine/reading/ReadingOversightEngine.js";

// Deck + Spread + Mode
import { DeckEngine } from "../engine/deck/DeckEngine.js";
import { SpreadEngine } from "../engine/spread/SpreadEngine.js";
import { ModeEngine } from "../engine/mode/ModeEngine.js";

// Luna Engines
import { LunaIntuitionEngine } from "../engine/luna/LunaIntuitionEngine.js";
import { LunaEmotionalEngine } from "../engine/luna/LunaEmotionalEngine.js";
import { LunaLogicEngine } from "../engine/luna/LunaLogicEngine.js";
import { LunaRitualEngine } from "../engine/luna/LunaRitualEngine.js";
import { LunaAnimationEngine } from "../engine/luna/LunaAnimationEngine.js";
import { LunaIdeaReviewEngine } from "../engine/luna/LunaIdeaReviewEngine.js";
import { LunaMeetingEngine } from "../engine/luna/LunaMeetingEngine.js";

// Member + Payment + Inventory
import { MemberEngine } from "../engine/member/MemberEngine.js";
import { PaymentEngine } from "../engine/payment/PaymentEngine.js";
import { InventoryEngine } from "../engine/inventory/InventoryEngine.js";

// BackPocket + NotePad
import { BackPocketEngine } from "../engine/backpocket/BackPocketEngine.js";
import { NotePadEngine } from "../engine/notepad/NotePadEngine.js";

// Forms + Courses
import { FormsEngine } from "../engine/forms/FormsEngine.js";
import { LunaCourseCreationEngine } from "../engine/courses/LunaCourseCreationEngine.js";
import { CoursesProgressEngine } from "../engine/courses/CoursesProgressEngine.js";

// Codegen + GitHub
import { LunaCodeGenerationEngine } from "../engine/codegen/LunaCodeGenerationEngine.js";
import { LunaGitHubUnderstandingEngine } from "../engine/github/LunaGitHubUnderstandingEngine.js";

// Calendar
import { CalendarBookingEngine } from "../engine/calendar/CalendarBookingEngine.js";
import { NoShowRebookEngine } from "../engine/calendar/NoShowRebookEngine.js";

// Export all engines in one object
export const engines = {
  ReadingEngine,
  ReadingOversightEngine,

  DeckEngine,
  SpreadEngine,
  ModeEngine,

  LunaIntuitionEngine,
  LunaEmotionalEngine,
  LunaLogicEngine,
  LunaRitualEngine,
  LunaAnimationEngine,
  LunaIdeaReviewEngine,
  LunaMeetingEngine,

  MemberEngine,
  PaymentEngine,
  InventoryEngine,

  BackPocketEngine,
  NotePadEngine,

  FormsEngine,
  LunaCourseCreationEngine,
  CoursesProgressEngine,

  LunaCodeGenerationEngine,
  LunaGitHubUnderstandingEngine,

  CalendarBookingEngine,
  NoShowRebookEngine
};
