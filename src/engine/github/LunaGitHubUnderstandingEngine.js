// Placeholder: tracks what Luna "knows" about your repo structure

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
  }
};
