export const evolutionEngine = {
  evolve: (readingData) => {
    // After each reading, store user preferences and patterns
    const { memberId, deckId, spreadId, questionCategory, cards, numbers, elements } = readingData;

    // Load existing evolution data from localStorage
    const evolutionData = JSON.parse(localStorage.getItem(`luna_evolution_${memberId}`) || '{}');

    // Update member's preferred decks
    const preferredDecks = evolutionData.preferredDecks || {};
    preferredDecks[deckId] = (preferredDecks[deckId] || 0) + 1;
    evolutionData.preferredDecks = preferredDecks;

    // Update preferred spreads
    const preferredSpreads = evolutionData.preferredSpreads || {};
    preferredSpreads[spreadId] = (preferredSpreads[spreadId] || 0) + 1;
    evolutionData.preferredSpreads = preferredSpreads;

    // Update question patterns
    const questionPatterns = evolutionData.questionPatterns || {};
    questionPatterns[questionCategory] = (questionPatterns[questionCategory] || 0) + 1;
    evolutionData.questionPatterns = questionPatterns;

    // Update repeating cards
    const repeatingCards = evolutionData.repeatingCards || {};
    cards.forEach(card => {
      repeatingCards[card.id] = (repeatingCards[card.id] || 0) + 1;
    });
    evolutionData.repeatingCards = repeatingCards;

    // Update repeating numbers
    const repeatingNumbers = evolutionData.repeatingNumbers || {};
    numbers.forEach(num => {
      repeatingNumbers[num] = (repeatingNumbers[num] || 0) + 1;
    });
    evolutionData.repeatingNumbers = repeatingNumbers;

    // Update suit dominance patterns
    const suitDominance = evolutionData.suitDominance || {};
    elements.forEach(el => {
      suitDominance[el] = (suitDominance[el] || 0) + 1;
    });
    evolutionData.suitDominance = suitDominance;

    // VOICE EVOLUTION
    const voiceStats = evolutionData.voiceStats || {
      tonePreferences: {},
      speedPreferences: {},
      warmthPreferences: 0,
      intensityPreferences: 0,
      readingCount: 0
    };

    voiceStats.readingCount += 1;
    // Track current voice settings to learn preferences
    const currentVoice = JSON.parse(localStorage.getItem('luna-persona-storage') || '{}')?.state || {};
    const voicePersona = currentVoice.selectedVoicePersona;
    
    voiceStats.tonePreferences[voicePersona] = (voiceStats.tonePreferences[voicePersona] || 0) + 1;
    
    evolutionData.voiceStats = voiceStats;

    // Save updated evolution data
    localStorage.setItem(`luna_evolution_${memberId}`, JSON.stringify(evolutionData));

    // Return evolution notes for the current reading
    const notes = {
      repeatingCards: cards.filter(c => repeatingCards[c.id] > 1).map(c => c.name),
      repeatingNumbers: numbers.filter(n => repeatingNumbers[n] > 1),
      preferredDeck: Object.keys(preferredDecks).reduce((a, b) => preferredDecks[a] > preferredDecks[b] ? a : b),
      preferredSpread: Object.keys(preferredSpreads).reduce((a, b) => preferredSpreads[a] > preferredSpreads[b] ? a : b)
    };

    // Add voice adaptation note if relevant
    if (voiceStats.readingCount > 5) {
      const topVoice = Object.keys(voiceStats.tonePreferences).reduce((a, b) => voiceStats.tonePreferences[a] > voiceStats.tonePreferences[b] ? a : b);
      notes.voiceAdaptation = `I've noticed you resonate with the ${topVoice} tone. I'll continue to refine my presence for you.`;
    }

    return notes;
  }
};
