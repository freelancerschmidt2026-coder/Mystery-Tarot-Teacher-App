// Schedules, logs, and tracks meetings with Luna

export const LunaMeetingEngine = {
  meetings: [],

  scheduleMeeting({ date, startTime, endTime, purpose }) {
    const meeting = {
      meetingId: `mt_${Date.now()}`,
      date,
      startTime,
      endTime,
      purpose,
      status: "SCHEDULED", // SCHEDULED, COMPLETED, MISSED, CANCELLED
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.meetings.push(meeting);
    return meeting;
  },

  markCompleted(meetingId) {
    const m = this.meetings.find(x => x.meetingId === meetingId);
    if (!m) return null;
    m.status = "COMPLETED";
    m.updatedAt = new Date().toISOString();
    return m;
  },

  markMissed(meetingId) {
    const m = this.meetings.find(x => x.meetingId === meetingId);
    if (!m) return null;
    m.status = "MISSED";
    m.updatedAt = new Date().toISOString();
    return m;
  }
};
