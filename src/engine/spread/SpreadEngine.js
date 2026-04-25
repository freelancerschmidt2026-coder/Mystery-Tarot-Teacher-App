// SpreadEngine.js
// Defines spreads, slot positions, and spread metadata

export const SpreadEngine = {
  spreads: {},

  registerSpread(name, positions) {
    this.spreads[name] = positions;
  },

  getSpread(name) {
    return this.spreads[name] || null;
  }
};
