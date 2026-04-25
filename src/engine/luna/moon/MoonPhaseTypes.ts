export type MoonPhaseName =
  | "New Moon"
  | "Waxing Crescent"
  | "First Quarter"
  | "Waxing Gibbous"
  | "Full Moon"
  | "Waning Gibbous"
  | "Last Quarter"
  | "Waning Crescent";

export interface MoonPhaseState {
  phase: MoonPhaseName;
  date: string;
}

export interface MoonPhaseEffectsProfile {
  uiThemeTag: string;
  lunaMoodBias: string;
  ritualBias: string[];
  deckBias: string[];
}
