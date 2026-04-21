// src/engine/luna/tarotPageGenerator.ts

import { LunaThemeEngine } from "./LunaThemeEngine";
import { TarotInterpretationEngine } from "./tarotInterpretationEngine";
import { QuestionUnderstandingEngine } from "./questionUnderstandingEngine";
import { SpreadSelectionEngine, SpreadDefinition } from "./spreadSelectionEngine";
import { NotebookPage } from "../../notepad/pages/PageSystem";

export interface TarotPageGeneratorInput {
  cardNames: string[];
  spreadName?: string;
  question?: string;
  availableSpreads?: SpreadDefinition[];
}

export const LunaTarotPageGenerator = {
  generate(input: TarotPageGeneratorInput): NotebookPage {
    const { cardNames, spreadName, question, availableSpreads = [] } = input;

    // 1. Analyze the question (topic + time focus)
    const questionAnalysis = QuestionUnderstandingEngine.analyze(question || "");

    // 2. Select the spread (topic → depth → default)
    const selectedSpread =
      SpreadSelectionEngine.selectSpread(availableSpreads, {
        topic: questionAnalysis.topic,
        depth: "standard",
      }) || null;

    // 3. Interpret the cards
    const interpretation = TarotInterpretationEngine.interpret({
      cards: cardNames,
      spreadName: selectedSpread?.name || spreadName,
      question,
    });

    // 4. Determine Luna theme
    const themeSignal =
      LunaThemeEngine.fromTarotCards(cardNames) ||
      LunaThemeEngine.fromSpread(selectedSpread?.name || spreadName);

    // 5. Build page content
    const spreadTitle = selectedSpread?.name || spreadName || "Tarot Reading";

    const cardList = cardNames.map((c) => `• ${c}`).join("\n");

    const spreadPositions = selectedSpread
      ? selectedSpread.positions.map((p, i) => `• ${p}: ${cardNames[i] || "—"}`).join("\n")
      : null;

    const contentSections = [
      `### Cards Drawn\n${cardList}`,
      spreadPositions ? `\n### Spread Positions\n${spreadPositions}` : "",
      `\n### Interpretation Summary\n${interpretation.summary}`,
      `\n### Themes\n${interpretation.themes.join(", ")}`,
      `\n### Tone\n${interpretation.tone}`,
      question
        ? `\n### Your Question\n${question}`
        : "",
    ].join("\n");

    // 6. Return a full NotebookPage object
    return {
      id: `tarot-${Date.now()}`,
      title: `${spreadTitle} — Tarot Reading`,
      content: contentSections,
      lunaTheme: themeSignal.themeId,
      lunaThemeReason: themeSignal.reason,
      metadata: {
        cards: cardNames,
        spread: selectedSpread?.id || spreadName || null,
        question,
        themes: interpretation.themes,
        tone: interpretation.tone,
        topic: questionAnalysis.topic,
        timeFocus: questionAnalysis.timeFocus,
      },
    };
  },
};

export default LunaTarotPageGenerator;
