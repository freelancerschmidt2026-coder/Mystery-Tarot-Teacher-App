export const spreadSelectionEngine = {
  evaluateSpread: (spreadId, category) => {
    let isMismatch = false;
    if (spreadId === 'one-card' && category === 'spiritual') {
      isMismatch = true; // Spiritual needs more depth
    }
    return { isMismatch };
  }
};
