// LunaGitHubUnderstandingEngine.js
// Tracks what Luna "knows" about your repository structure

export const LunaGitHubUnderstandingEngine = {
  repoMap: [],

  registerFile({ path, purpose }) {
    const entry = {
      path,
      purpose,
      registeredAt: new Date().toISOString()
    };

    this.repoMap.push(entry);
    return entry;
  },

  getFilesByPurpose(purpose) {
    return this.repoMap.filter(e => e.purpose === purpose);
  },

  getAllFiles() {
    return this.repoMap;
  }
};
