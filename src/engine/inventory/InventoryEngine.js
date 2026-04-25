// InventoryEngine.js
// Tracks decks, spreads, courses, rituals, and engines

export const InventoryEngine = {
  items: [],

  registerItem({ type, name, metadata }) {
    const item = {
      itemId: `inv_${Date.now()}`,
      type,
      name,
      metadata,
      createdAt: new Date().toISOString()
    };
    this.items.push(item);
    return item;
  },

  getItemsByType(type) {
    return this.items.filter(i => i.type === type);
  }
};
