// MemberEngine.js
// Handles member profiles, preferences, and reading history

export const MemberEngine = {
  members: [],

  createMember({ name, email }) {
    const member = {
      memberId: `mem_${Date.now()}`,
      name,
      email,
      preferences: {},
      history: []
    };
    this.members.push(member);
    return member;
  },

  updatePreferences(memberId, prefs) {
    const member = this.members.find(m => m.memberId === memberId);
    if (!member) return null;

    member.preferences = { ...member.preferences, ...prefs };
    return member;
  },

  addReadingToHistory(memberId, reading) {
    const member = this.members.find(m => m.memberId === memberId);
    if (!member) return null;

    member.history.push(reading);
    return member;
  }
};
