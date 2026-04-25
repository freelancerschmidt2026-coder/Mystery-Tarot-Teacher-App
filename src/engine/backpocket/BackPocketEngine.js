// BackPocketEngine.js
// Stores saved cards, insights, and reading fragments

export const BackPocketEngine = {
  items: [],

  saveItem({ userId, type, content }) {
    const item = {
      itemId: `bp_${Date.now()}`,
      userId,
      type,
      content,
      savedAt: new Date().toISOString()
    };
    this.items.push(item);
    return item;
  },

  getItems(userId) {
    return this.items.filter(i => i.userId === userId);
  }
};
