// Orchestrator: ties together evolution, deck creation, spreads, boxes, matching, dreams

import {
  TarotDeckDefinition,
  MemberProfileSnapshot,
  TarotSpreadTemplate,
} from "./types";
import { LunaEvolutionState } from "./LunaEvolutionState";
import { TarotArchetypeRegistry } from "./TarotArchetypeRegistry";
import { DeckTemplateGenerator } from "./DeckTemplateGenerator";
import { SpreadGenerator } from "./SpreadGenerator";
import { DeckBoxDesigner } from "./DeckBoxDesigner";
import { MemberDeckMatchingEngine, DeckMatchResult } from "./MemberDeckMatchingEngine";
import { LunaDreamspaceEngine } from "./LunaDreamspaceEngine";

export class LunaTarotCreationEngine {
  private evolution: LunaEvolutionState;
  private archetypes: TarotArchetypeRegistry;
  private deckGenerator: DeckTemplateGenerator;
  private spreadGenerator: SpreadGenerator;
  private boxDesigner: DeckBoxDesigner;
  private matcher: MemberDeckMatchingEngine;
  private dreamspace: LunaDreamspaceEngine;

  constructor(initialState?: Partial<ReturnType<LunaEvolutionState["getSnapshot"]>>) {
    this.evolution = new LunaEvolutionState(initialState);
    this.archetypes = new TarotArchetypeRegistry();
    this.deckGenerator = new DeckTemplateGenerator(this.archetypes);
    this.spreadGenerator = new SpreadGenerator();
    this.boxDesigner = new DeckBoxDesigner();
    this.matcher = new MemberDeckMatchingEngine();
    this.dreamspace = new LunaDreamspaceEngine(this.evolution);
  }

  createDeckForTheme(theme: string): TarotDeckDefinition {
    const baseDeck = this.deckGenerator.createDeckFromTheme(theme);
    const spread = this.spreadGenerator.createSpreadForDeck(baseDeck);
    const withSpread: TarotDeckDefinition = {
      ...baseDeck,
      spreads: [spread],
    };
    const finalDeck = this.boxDesigner.enhanceDeckWithBox(withSpread);
    this.evolution.registerDeck(finalDeck);
    this.evolution.addCollectiveTheme(theme);
    return finalDeck;
  }

  generateDreamAndDeck(): { deck: TarotDeckDefinition; spread: TarotSpreadTemplate } {
    const dream = this.dreamspace.generateDreamFragment();
    const theme = dream.title.replace("A Dream of ", "");
    const deck = this.createDeckForTheme(theme);
    const spread = deck.spreads[0];
    return { deck, spread };
  }

  matchDeckForMember(
    member: MemberProfileSnapshot,
    question: string
  ): DeckMatchResult | null {
    const decks = this.evolution.getSnapshot().knownDecks;
    return this.matcher.findBestDeck(member, question, decks);
  }

  getEvolutionSnapshot() {
    return this.evolution.getSnapshot();
  }
}
