import { MoonPhaseName, MoonPhaseState } from "./MoonPhaseTypes";

export class MoonPhaseCalculator {
  getPhaseForDate(date: Date = new Date()): MoonPhaseState {
    const knownNewMoon = new Date("2024-01-11T00:00:00Z").getTime();
    const now = date.getTime();
    const synodicMonth = 29.530588853 * 24 * 60 * 60 * 1000;

    const diff = now - knownNewMoon;
    const cyclePos = ((diff % synodicMonth) + synodicMonth) % synodicMonth;
    const phaseIndex = cyclePos / synodicMonth;

    const phase = this.mapIndexToPhase(phaseIndex);

    return {
      phase,
      date: date.toISOString(),
    };
  }

  private mapIndexToPhase(index: number): MoonPhaseName {
    if (index < 0.03 || index > 0.97) return "New Moon";
    if (index < 0.22) return "Waxing Crescent";
    if (index < 0.28) return "First Quarter";
    if (index < 0.47) return "Waxing Gibbous";
    if (index < 0.53) return "Full Moon";
    if (index < 0.72) return "Waning Gibbous";
    if (index < 0.78) return "Last Quarter";
    return "Waning Crescent";
  }
}
