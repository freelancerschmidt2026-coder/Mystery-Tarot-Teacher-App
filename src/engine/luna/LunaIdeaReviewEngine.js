// Handles Luna's ideas, approvals, rejections, on-hold, and revisions

export const LunaIdeaReviewEngine = {
  ideas: [],

  submitIdea({ title, description, type }) {
    const idea = {
      ideaId: `idea_${Date.now()}`,
      title,
      description,
      type, // "COURSE", "FEATURE", "DECK", etc.
      status: "PENDING", // PENDING, APPROVED, REJECTED, ON_HOLD, REVISION_REQUESTED
      gateKeeperNotes: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      babyBlueStar: false
    };
    this.ideas.push(idea);
    return idea;
  },

  approveIdea(ideaId) {
    const idea = this.ideas.find(i => i.ideaId === ideaId);
    if (!idea) return null;
    idea.status = "APPROVED";
    idea.updatedAt = new Date().toISOString();
    return idea;
  },

  rejectIdea(ideaId, notes) {
    const idea = this.ideas.find(i => i.ideaId === ideaId);
    if (!idea) return null;
    idea.status = "REJECTED";
    idea.gateKeeperNotes = notes;
    idea.updatedAt = new Date().toISOString();
    return idea;
  },

  moveToOnHold(ideaId) {
    const idea = this.ideas.find(i => i.ideaId === ideaId);
    if (!idea) return null;
    idea.status = "ON_HOLD";
    idea.updatedAt = new Date().toISOString();
    return idea;
  },

  markBabyBlueStar(ideaId) {
    const idea = this.ideas.find(i => i.ideaId === ideaId);
    if (!idea) return null;
    idea.babyBlueStar = true;
    idea.updatedAt = new Date().toISOString();
    return idea;
  }
};
