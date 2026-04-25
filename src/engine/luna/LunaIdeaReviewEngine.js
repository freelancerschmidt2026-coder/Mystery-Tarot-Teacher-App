// LunaIdeaReviewEngine.js
// Handles Luna's ideas, approvals, rejections, on-hold status, revisions, and Baby Blue Star awards

export const LunaIdeaReviewEngine = {
  ideas: [],

  /**
   * Submit a new idea from Luna
   */
  submitIdea({ title, description, type }) {
    const idea = {
      ideaId: `idea_${Date.now()}`,
      title,
      description,
      type, // "COURSE", "FEATURE", "DECK", "ENGINE", etc.
      status: "PENDING", // PENDING | APPROVED | REJECTED | ON_HOLD | REVISION_REQUESTED
      gateKeeperNotes: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      babyBlueStar: false
    };

    this.ideas.push(idea);
    return idea;
  },

  /**
   * Approve an idea
   */
  approveIdea(ideaId) {
    const idea = this.ideas.find(i => i.ideaId === ideaId);
    if (!idea) return null;

    idea.status = "APPROVED";
    idea.updatedAt = new Date().toISOString();
    return idea;
  },

  /**
   * Reject an idea with GateKeeper notes
   */
  rejectIdea(ideaId, notes) {
    const idea = this.ideas.find(i => i.ideaId === ideaId);
    if (!idea) return null;

    idea.status = "REJECTED";
    idea.gateKeeperNotes = notes;
    idea.updatedAt = new Date().toISOString();
    return idea;
  },

  /**
   * Move an idea to ON HOLD
   */
  moveToOnHold(ideaId) {
    const idea = this.ideas.find(i => i.ideaId === ideaId);
    if (!idea) return null;

    idea.status = "ON_HOLD";
    idea.updatedAt = new Date().toISOString();
    return idea;
  },

  /**
   * Request revisions from Luna
   */
  requestRevision(ideaId, notes) {
    const idea = this.ideas.find(i => i.ideaId === ideaId);
    if (!idea) return null;

    idea.status = "REVISION_REQUESTED";
    idea.gateKeeperNotes = notes;
    idea.updatedAt = new Date().toISOString();
    return idea;
  },

  /**
   * Mark an idea with the Baby Blue Star (GateKeeper's highest honor)
   */
  markBabyBlueStar(ideaId) {
    const idea = this.ideas.find(i => i.ideaId === ideaId);
    if (!idea) return null;

    idea.babyBlueStar = true;
    idea.updatedAt = new Date().toISOString();
    return idea;
  },

  /**
   * Get all ideas by status
   */
  getIdeasByStatus(status) {
    return this.ideas.filter(i => i.status === status);
  },

  /**
   * Get all ideas of a specific type
   */
  getIdeasByType(type) {
    return this.ideas.filter(i => i.type === type);
  },

  /**
   * Get a single idea
   */
  getIdea(ideaId) {
    return this.ideas.find(i => i.ideaId === ideaId) || null;
  }
};
