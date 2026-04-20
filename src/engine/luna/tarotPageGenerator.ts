import { LunaThemeEngine } from "./LunaThemeEngine";

export const LunaTarotPageGenerator = {
  generate({ cardNames, spreadName }) {
    const themeSignal =
      LunaThemeEngine.fromTarotCards(cardNames) ||
      LunaThemeEngine.fromSpread(spreadName);

    return {
      id: `tarot-${Date.now()}`,
      title: `${spreadName} — Tarot Reading`,
      content: `Cards: ${cardNames.join(", ")}\n\nInterpretation coming soon.`,
      lunaTheme: themeSignal.themeId,
      lunaThemeReason: themeSignal.reason,
    };
  },
};
