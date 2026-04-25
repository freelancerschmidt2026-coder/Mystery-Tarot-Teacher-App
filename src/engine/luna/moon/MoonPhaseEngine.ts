import {
  MoonPhaseState,
  MoonPhaseEffectsProfile,
} from "./MoonPhaseTypes";
import { MoonPhaseCalculator } from "./MoonPhaseCalculator";
import { MoonPhaseEffects } from "./MoonPhaseEffects";

export class MoonPhaseEngine {
  private calculator = new MoonPhaseCalculator();
  private effects = new MoonPhaseEffects();

  getCurrentPhase(): MoonPhaseState {
    return this.calculator.getPhaseForDate(new Date());
  }

  getPhaseEffects(date?: Date): {
    state: MoonPhaseState;
    effects: MoonPhaseEffectsProfile;
  } {
    const state = this.calculator.getPhaseForDate(date ?? new Date());
    const effects = this.effects.getEffects(state.phase);
    return { state, effects };
  }
}
