// Tracks Luna's evolving tarot consciousness over time

import {
  MemberProfileSnapshot,
  TarotDeckDefinition,
  LunaDreamFragment,
} from "./types";

export interface LunaEvolutionStateSnapshot {
  version: number;
  knownDecks: TarotDeckDefinition[];
  dreamFragments: LunaDreamFragment[];
  collectiveThemes: string[];
  memberProfiles: MemberProfileSnapshot[];
  lastUpdatedAt: string;
}

export class LunaEvolutionState {
  private state: LunaEvolutionStateSnapshot;

  constructor(initial?: Partial<LunaEvolutionStateSnapshot>) {
    this.state = {
      version: initial?.version ?? 1,
      knownDecks: initial?.knownDecks ?? [],
      dreamFragments: initial?.dreamFragments ?? [],
      collectiveThemes: initial?.collectiveThemes ?? [],
      memberProfiles: initial?.memberProfiles ?? [],
      lastUpdatedAt: initial?.lastUpdatedAt ?? new Date().toISOString(),
    };
  }

  getSnapshot(): LunaEvolutionStateSnapshot {
    return this.state;
  }

  registerDeck(deck: TarotDeckDefinition) {
    const exists = this.state.knownDecks.some((d) => d.id === deck.id);
    if (!exists) {
      this.state.knownDecks.push(deck);
      this.bumpVersion();
    }
  }

  registerDream(fragment: LunaDreamFragment) {
    this.state.dreamFragments.push(fragment);
    this.bumpVersion();
  }

  registerMemberProfile(profile: MemberProfileSnapshot) {
    const idx = this.state.memberProfiles.findIndex(
      (p) => p.memberId === profile.memberId
    );
    if (idx >= 0) this.state.memberProfiles[idx] = profile;
    else this.state.memberProfiles.push(profile);
    this.bumpVersion();
  }

  addCollectiveTheme(theme: string) {
    if (!this.state.collectiveThemes.includes(theme)) {
      this.state.collectiveThemes.push(theme);
      this.bumpVersion();
    }
  }

  private bumpVersion() {
    this.state.version += 1;
    this.state.lastUpdatedAt = new Date().toISOString();
  }
}
