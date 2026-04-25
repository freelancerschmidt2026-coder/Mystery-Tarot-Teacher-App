// LunaMeetingEngine.js
// Schedules, logs, and tracks meetings with Luna (voice or text)
// Includes: scheduling, completion, missed meetings, transcripts, and history

export const LunaMeetingEngine = {
  meetings: [],

  /**
   * Schedule a new meeting with Luna
   */
  scheduleMeeting({ date, startTime, endTime, purpose, mode = "TEXT" }) {
    const meeting = {
      meetingId: `mt_${Date.now()}`,
      date,
      startTime,
      endTime,
      purpose,          // e.g., "Idea Review", "Engine Oversight", "Course Planning"
      mode,             // TEXT | VOICE
      status: "SCHEDULED", // SCHEDULED | COMPLETED | MISSED | CANCELLED
      transcript: "",
      notes: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.meetings.push(meeting);
    return meeting;
  },

  /**
   * Add transcript text to a meeting
   */
  appendTranscript(meetingId, text) {
    const meeting = this.meetings.find(m => m.meetingId === meetingId);
    if (!meeting) return null;

    meeting.transcript += `\n${text}`;
    meeting.updatedAt = new Date().toISOString();
    return meeting;
  },

  /**
   * Add GateKeeper notes to a meeting
   */
  addNotes(meetingId, notes) {
    const meeting = this.meetings.find(m => m.meetingId === meetingId);
    if (!meeting) return null;

    meeting.notes = notes;
    meeting.updatedAt = new Date().toISOString();
    return meeting;
  },

  /**
   * Mark a meeting as completed
   */
  markCompleted(meetingId) {
    const meeting = this.meetings.find(m => m.meetingId === meetingId);
    if (!meeting) return null;

    meeting.status = "COMPLETED";
    meeting.updatedAt = new Date().toISOString();
    return meeting;
  },

  /**
   * Mark a meeting as missed
   */
  markMissed(meetingId) {
    const meeting = this.meetings.find(m => m.meetingId === meetingId);
    if (!meeting) return null;

    meeting.status = "MISSED";
    meeting.updatedAt = new Date().toISOString();
    return meeting;
  },

  /**
   * Cancel a meeting
   */
  cancelMeeting(meetingId) {
    const meeting = this.meetings.find(m => m.meetingId === meetingId);
    if (!meeting) return null;

    meeting.status = "CANCELLED";
    meeting.updatedAt = new Date().toISOString();
    return meeting;
  },

  /**
   * Get all meetings
   */
  getAllMeetings() {
    return this.meetings;
  },

  /**
   * Get meetings by status
   */
  getMeetingsByStatus(status) {
    return this.meetings.filter(m => m.status === status);
  },

  /**
   * Get a single meeting
   */
  getMeeting(meetingId) {
    return this.meetings.find(m => m.meetingId === meetingId) || null;
  }
};
