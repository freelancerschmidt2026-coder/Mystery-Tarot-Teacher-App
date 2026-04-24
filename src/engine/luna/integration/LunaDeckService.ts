import { LunaTarotCreationEngine } from "../creation/LunaTarotCreationEngine";
import { MemberProfileSnapshot, TarotDeckDefinition } from "../creation/types";

export class LunaDeckService {
  constructor(private creationEngine: LunaTarotCreationEngine) {}

  createDeck(theme: string): TarotDeckDefinition {
    return this.creationEngine.createDeckForTheme(theme);
  }

  createDreamDeck(): TarotDeckDefinition {
    const { deck } = this.creationEngine.generateDreamAndDeck();
    return deck;
  }

  matchDeckForMember(
    member: MemberProfileSnapshot,
    question: string
  ) {
    return this.creationEngine.matchDeckForMember(member, question);
  }

  getAllDecks(): TarotDeckDefinition[] {
    return this.creationEngine.getEvolutionSnapshot().knownDecks;
  }
}
