// Master orchestrator for Luna's evolving tarot universe

import { LunaTarotCreationEngine } from "../creation/LunaTarotCreationEngine";
import { LunaDeckService } from "./LunaDeckService";
import { LunaSpreadService } from "./LunaSpreadService";
import { LunaUIBridge } from "./LunaUIBridge";
import { LunaAnimationBridge } from "./LunaAnimationBridge";
import { LunaVoiceBridge } from "./LunaVoiceBridge";

import { LunaRitualEngine } from "../rituals/LunaRitualEngine";
import { LunaRitualUIBridge } from "./LunaRitualUIBridge";
import { LunaRitualVoiceBridge } from "./LunaRitualVoiceBridge";

import { CrossCardStoryEngine } from "../story/CrossCardStoryEngine";
import { CrossCardStoryUIBridge } from "../story/CrossCardStoryUIBridge";
import { CrossCardStoryVoiceBridge } from "../story/CrossCardStoryVoiceBridge";
import { CardStoryRole } from "../story/CrossCardStoryTypes";

import { MoonPhaseEngine } from "../moon/MoonPhaseEngine";

import { LunaPersonalityEngine } from "../personality/LunaPersonalityEngine";
import {
  MemberInteractionSnapshot,
  LunaPersonalityProfile,
} from "../personality/LunaPersonalityTypes";

import { LunaModeManager } from "../modes/LunaModeManager";
import { ModeTriggerContext, ModeProfile } from "../modes/ModeTypes";

import {
  MemberProfileSnapshot,
  TarotDeckDefinition,
  TarotSpreadTemplate,
  TarotCardTemplate,
} from "../creation/types";

import {
  MemberRitualContext,
  RitualTemplate,
} from "../rituals/types";

// ETHEREAL MODE IMPORTS
import { LunaOrchestratorEthereal } from "./LunaOrchestratorEthereal";
import { PastReadingSnapshot } from "../ethereal/EtherealModeTypes";

export interface OrchestratedReadingContext {
  member: MemberProfileSnapshot;
  question: string;
  emotionalState: string;
  animationsEnabled: boolean; // NEW TOGGLE
}

export interface OrchestratedReadingResult {
  deck: TarotDeckDefinition;
  spread: TarotSpreadTemplate;
  cards: TarotCardTemplate[];
  deckBoxUI: ReturnType<LunaUIBridge["convertDeckToUI"]>;
  spreadUI: ReturnType<LunaUIBridge["convertSpreadToUI"]>;
  cardUI: ReturnType<LunaUIBridge["convertCardToUI"]>[];
  cardAnimations: ReturnType<LunaAnimationBridge["getAnimationPhases"]>[];
  storyUI: ReturnType<CrossCardStoryUIBridge["toUI"]>;
  storyVoiceIntro: string;
  storyVoiceOutro: string;
  ritual?: {
    template: RitualTemplate;
    uiSummary: ReturnType<LunaRitualUIBridge["toUISummary"]>;
    uiSteps: ReturnType<LunaRitualUIBridge["toUISteps"]>;
    introLine: string;
    outroLine: string;
  };
  lunaPersonality: LunaPersonalityProfile;
  mode: ModeProfile;
  moon: {
    phase: string;
    uiThemeTag: string;
  };
}

export class LunaOrchestrator {
  private creationEngine = new LunaTarotCreationEngine();
  private deckService = new LunaDeckService(this.creationEngine);
  private spreadService = new LunaSpreadService();
  private uiBridge = new LunaUIBridge();
  private animBridge = new LunaAnimationBridge();
  private voiceBridge = new LunaVoiceBridge();

  private ritualEngine = new LunaRitualEngine();
  private ritualUIBridge = new LunaRitualUIBridge();
  private ritualVoiceBridge = new LunaRitualVoiceBridge();

  private storyEngine = new CrossCardStoryEngine();
  private storyUIBridge = new CrossCardStoryUIBridge();
  private storyVoiceBridge = new CrossCardStoryVoiceBridge();

  private moonEngine = new MoonPhaseEngine();
  private personalityEngine = new LunaPersonalityEngine();
  private modeManager = new LunaModeManager();

  orchestrateReading(
    ctx: OrchestratedReadingContext
  ): OrchestratedReadingResult | any {
    const { member, question, emotionalState } = ctx;

    // 🌙 NEW: ETHEREAL MODE BRANCH
    if (ctx.animationsEnabled === false) {
      const ethereal = new LunaOrchestratorEthereal();

      const pastReadings: PastReadingSnapshot[] =
        member.pastReadings ?? [];

      const current = {
        question,
        emotionalState,
        memberId: member.memberId,
      };

      const lunaInterpretation =
        "Luna’s interpretation will be inserted here.";

      return ethereal.runEtherealReading(
        pastReadings,
        current,
        lunaInterpretation
      );
    }

    // 🌙 CINEMATIC MODE (ORIGINAL LOGIC)
    const { state: moonState, effects: moonEffects } =
      this.moonEngine.getPhaseEffects();

    const interactionSnapshot: MemberInteractionSnapshot = {
      memberId: member.memberId,
      emotionalState,
      questionThemes: member.dominantThemes,
      ritualHistory: [],
      deckUsage: member.preferredDeckIds,
      moonPhase: moonState.phase,
    };

    const lunaPersonality = this.personalityEngine.evolve(
      interactionSnapshot
    );

    const modeContext: ModeTriggerContext = {
      emotionalState,
      questionThemes: member.dominantThemes,
      moonPhase: moonState.phase,
      recentRituals: [],
      recentDecks: member.preferredDeckIds,
    };

    const mode = this.modeManager.getMode(modeContext);

    let deckMatch = this.deckService.matchDeckForMember(member, question);
    if (!deckMatch) {
      const theme = member.dominantThemes[0] ?? "mystery";
      const newDeck = this.deckService.createDeck(theme);
      deckMatch = { deck: newDeck, score: 1, reasons: ["Created new deck"] };
    }

    const deck = deckMatch.deck;
    const spread = this.spreadService.getSpreadForDeck(deck);
    const cards = deck.cards.slice(0, spread.positions.length);

    const deckBoxUI = this.uiBridge.convertDeckToUI(deck);
    const spreadUI = this.uiBridge.convertSpreadToUI(spread);
    const cardUI = cards.map((c) => this.uiBridge.convertCardToUI(c));
    const cardAnimations = cards.map((c) =>
      this.animBridge.getAnimationPhases(c)
    );

    const roles: CardStoryRole[] = cards.map((card, index) => {
      const role =
        index === 0
          ? "PAST"
          : index === 1
          ? "PRESENT"
          : index === cards.length - 1
          ? "FUTURE"
          : "ALLY";
      return { cardId: card.id, role };
    });

    const story = this.storyEngine.createStory(spread.id, roles);
    const storyUI = this.storyUIBridge.toUI(story);
    const storyVoiceIntro = this.storyVoiceBridge.getIntro(story);
    const storyVoiceOutro = this.storyVoiceBridge.getOutro(story);

    const memberRitualContext: MemberRitualContext = {
      memberId: member.memberId,
      emotionalState,
      question,
      dominantThemes: member.dominantThemes,
      moonPhase: moonState.phase,
    };

    const ritualTemplate = this.ritualEngine.matchRitual(
      memberRitualContext
    );

    let ritualBlock:
      | OrchestratedReadingResult["ritual"]
      | undefined = undefined;

    if (ritualTemplate) {
      const steps = this.ritualEngine.getRitualSteps(ritualTemplate);
      ritualBlock = {
        template: ritualTemplate,
        uiSummary: this.ritualUIBridge.toUISummary(ritualTemplate),
        uiSteps: this.ritualUIBridge.toUISteps(steps),
        introLine: this.ritualVoiceBridge.getIntroLine(ritualTemplate),
        outroLine: this.ritualVoiceBridge.getOutroLine(ritualTemplate),
      };
    }

    return {
      deck,
      spread,
      cards,
      deckBoxUI,
      spreadUI,
      cardUI,
      cardAnimations,
      storyUI,
      storyVoiceIntro,
      storyVoiceOutro,
      ritual: ritualBlock,
      lunaPersonality,
      mode,
      moon: {
        phase: moonState.phase,
        uiThemeTag: moonEffects.uiThemeTag,
      },
    };
  }
}
