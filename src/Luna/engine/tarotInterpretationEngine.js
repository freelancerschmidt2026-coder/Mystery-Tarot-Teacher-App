import { tarotKeywords } from "../knowledge/tarotKeywords";
import { tarotCombinations } from "../knowledge/tarotCombinations";
import { tarotPatterns } from "../knowledge/tarotPatterns";

export const tarotInterpretationEngine = {
  interpretCards: (cards, question) => {
    // 1. Keywords and Meanings
    const cardInterpretations = cards.map(card => {
      const keywords = tarotKeywords[card.id] || { upright: [], reversed: [], element: "Unknown", number: 0 };
      const meaning = card.isReversed ? keywords.reversed.join(", ") : keywords.upright.join(", ");
      return {
        name: card.name,
        meaning,
        element: keywords.element,
        number: keywords.number
      };
    });

    // 2. Combinations
    const cardIds = cards.map(c => c.id);
    const combinations = tarotCombinations.filter(combo => 
      combo.cards.every(id => cardIds.includes(id))
    );

    // 3. Patterns
    const numbers = cardInterpretations.map(c => c.number);
    const repeatingNumbers = numbers.filter((num, index) => numbers.indexOf(num) !== index);
    const numberMeanings = repeatingNumbers.map(num => tarotPatterns.repeatingNumbers[num]);

    const elements = cardInterpretations.map(c => c.element);
    const elementCounts = elements.reduce((acc, el) => {
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {});
    const dominantElement = Object.keys(elementCounts).reduce((a, b) => elementCounts[a] > elementCounts[b] ? a : b);
    const elementMeaning = tarotPatterns.elementalLogic[dominantElement];

    // 4. Narrative Logic (Simulated)
    const narrative = `The journey begins with ${cardInterpretations[0].name}, suggesting ${cardInterpretations[0].meaning}. As we move forward, ${cardInterpretations[1]?.name || 'the next card'} reveals ${cardInterpretations[1]?.meaning || 'further insights'}.`;
    const outcome = `The final insight suggests a path of ${dominantElement.toLowerCase()} and the resonance of ${cardInterpretations[cardInterpretations.length - 1].name}.`;

    // 5. Ethical Boundaries Check (Ensure no advice)
    const finalInterpretation = {
      cardInterpretations,
      narrative,
      outcome,
      patterns: {
        repeatingNumbers: [...new Set(repeatingNumbers)],
        suitDominance: dominantElement,
        elementalBalance: elementMeaning,
        warnings: combinations.filter(c => c.type === 'warning').map(c => c.meaning),
        surprises: combinations.filter(c => c.type === 'surprise').map(c => c.meaning),
        combinations: combinations.map(c => c.name),
      },
      disclaimer: "Luna provides insights and interpretations based on the cards and their patterns. She does not offer advice or influence your decisions."
    };

    return finalInterpretation;
  }
};
