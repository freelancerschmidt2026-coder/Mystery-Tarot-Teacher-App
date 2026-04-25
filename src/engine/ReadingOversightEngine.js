// Logs reading metrics and scores (1–100%)

export const ReadingOversightEngine = {
  readings: [],

  logReadingSession({
    readingId,
    userId,
    date,
    startTime,
    endTime,
    deck,
    spread,
    mode,
    scores // object with all 1–100% metrics
  }) {
    const durationMs = new Date(`${date}T${endTime}:00`) - new Date(`${date}T${startTime}:00`);
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
      scores,
      createdAt: new Date().toISOString()
    };
    this.readings.push(entry);
    return entry;
  },

  getReadingsByUser(userId) {
    return this.readings.filter(r => r.userId === userId);
  },

  getLowScoreReadings(threshold = 60) {
    return this.readings.filter(r => {
      return Object.values(r.scores).some(v => v < threshold);
    });
  }
};
