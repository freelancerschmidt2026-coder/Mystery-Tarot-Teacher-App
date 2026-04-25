// Tracks generated code snippets and their intended location

export const LunaCodeGenerationEngine = {
  generatedSnippets: [],

  proposeFile({ path, description, code }) {
    const snippet = {
      snippetId: `gen_${Date.now()}`,
      path,
      description,
      code,
      status: "PENDING_REVIEW", // PENDING_REVIEW, APPROVED, REJECTED
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.generatedSnippets.push(snippet);
    return snippet;
  },

  approveSnippet(snippetId) {
    const snip = this.generatedSnippets.find(s => s.snippetId === snippetId);
    if (!snip) return null;
    snip.status = "APPROVED";
    snip.updatedAt = new Date().toISOString();
    return snip;
  }
};
