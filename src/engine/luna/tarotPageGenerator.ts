import { NotebookPage } from "../../notepad/pages/PageSystem";

interface TarotContext {
  cardNames: string[];
  spreadName?: string;
}

export const LunaTarotPageGenerator = {
  generate(context: TarotContext): NotebookPage {
    const seed = Math.floor(Math.random() * 999999);
    const cards = context.cardNames.join(", ");

    const titleBase = context.spreadName || "Tarot Reflection";

    const titleOptions = [
      `${titleBase}: ${cards}`,
      `Message from ${cards}`,
      `Spread Insight: ${titleBase}`,
      `Luna’s Reading: ${cards}`,
    ];

    const contentOptions = [
      "Notice which card keeps pulling your attention. That’s where the story wants to open.",
      "Let each position in the spread speak as a separate voice, then listen for the chorus.",
      "Write what you feel before what you think. The cards are responding to your energy.",
      "This page is a snapshot of your current path—capture it before it shifts.",
    ];

    return {
      id: `luna-tarot-page-${seed}`,
      title: titleOptions[seed % titleOptions.length],
      content: contentOptions[(seed * 3) % contentOptions.length],
    };
  },
};
