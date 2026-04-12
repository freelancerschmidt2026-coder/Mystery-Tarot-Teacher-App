import { useNotePadStore } from '../../state/NotePadState/notePadStore';

export const saveReadingEngine = {
  saveReading: (readingData) => {
    const { 
      id, 
      timestamp, 
      question, 
      deckUsed, 
      spreadUsed, 
      cards, 
      interpretation, 
      patterns, 
      outcome, 
      evolutionNotes 
    } = readingData;

    // 1. Save to NotePad
    const formattedDate = new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const content = `
# Luna Reading – ${formattedDate}

## The Question
> ${question}

## The Cards
${cards.map(card => `- **${card.name}** (${card.isReversed ? 'Reversed' : 'Upright'}): ${card.meaning}`).join('\n')}

## Patterns & Insights
- **Dominant Element:** ${patterns.suitDominance}
- **Elemental Balance:** ${patterns.elementalBalance}
${patterns.repeatingNumbers.length > 0 ? `- **Repeating Numbers:** ${patterns.repeatingNumbers.join(', ')}` : ''}
${patterns.combinations.length > 0 ? `- **Key Combinations:** ${patterns.combinations.join(', ')}` : ''}

## Interpretation
${interpretation.narrative}

## Outcome
**${outcome}**

---
*Deck: ${deckUsed} | Spread: ${spreadUsed}*
    `.trim();

    useNotePadStore.getState().addNote({
      id: `luna-${id}`,
      title: `Reading – ${formattedDate}`,
      content,
      category: "Luna Readings",
      createdAt: timestamp,
      pageNumber: 0,
      meta: { deck: deckUsed, spread: spreadUsed, question }
    });

    // 2. Save to Luna Reading Log
    const log = JSON.parse(localStorage.getItem('lunaReadingLog') || '[]');
    log.push(readingData);
    localStorage.setItem('lunaReadingLog', JSON.stringify(log));

    return true;
  }
};
