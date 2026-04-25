// ReadingOversightEngine.js
// Logs reading sessions, engine behavior, and 1–100% performance scores

export const ReadingOversightEngine = {
  readings: [],

  /**
   * Log a reading session with full oversight metrics
   */
  logReadingSession({
    readingId,
    userId,
    date,
    startTime,
    endTime,
    deck,
    spread,
    mode,
    engineBehavior = {},
    scores = {}
  }) {
    const durationMs =
      new Date(`${date}T${endTime}:00`) -
      new Date(`${date}T${startTime}:00`);

    const entry = {
      readingId,
      userId,
      date,
      startTime,
      endTime,
      durationMs,
      deck,
      spread,
      mode,

      // Engine behavior logs
      engineBehavior: {
        emotionalEngine: engineBehavior.emotionalEngine || {},
        intuitionEngine: engineBehavior.intuitionEngine || {},
        logicEngine: engineBehavior.logicEngine || {},
        animationEngine: engineBehavior.animationEngine || {},
        ritualEngine: engineBehavior.ritualEngine || {},
        modeEngine: engineBehavior.modeEngine || {},
        spreadEngine: engineBehavior.spreadEngine || {},
        deckEngine: engineBehavior.deckEngine || {}
      },

      // 1–100% scoring system
      scores: {
        clarity: scores.clarity || 0,
        emotionalAlignment: scores.emotionalAlignment || 0,
        intuitionResonance: scores.intuitionResonance || 0,
        cardMeaningIntegrity: scores.cardMeaningIntegrity || 0,
        spreadCoherence: scores.spreadCoherence || 0,
        storytellingDepth: scores.storytellingDepth || 0,
        modeAlignment: scores.modeAlignment || 0,
        ritualFit: scores.ritualFit || 0,
        animationHarmony: scores.animationHarmony || 0,
        pacing: scores.pacing || 0,
        safety: scores.safety || 0,
        memberExperience: scores.memberExperience || 0,
        engineStability: scores.engineStability || 0,
        performance: scores.performance || 0,
        deckSpreadMatch: scores.deckSpreadMatch || 0,
        intuitionConfidence: scores.intuitionConfidence || 0,
        logicIntuitionBalance: scores.logicIntuitionBalance || 0
      },

      createdAt: new Date().toISOString()
    };

    this.readings.push(entry);
    return entry;
  },

  /**
   * Get all readings for a user
   */
  getReadingsByUser(userId) {
    return this.readings.filter(r => r.userId === userId);
  },

  /**
   * Get readings with any score below a threshold
   */
  getLowScoreReadings(threshold = 60) {
    return this.readings.filter(r =>
      Object.values(r.scores).some(v => v < threshold)
    );
  },

  /**
   * Get readings with engine warnings
   */
  getEngineWarnings() {
    return this.readings.filter(r => {
      return (
        r.scores.engineStability < 80 ||
        r.scores.performance < 80 ||
        r.scores.safety < 90
      );
    });
  }
};
