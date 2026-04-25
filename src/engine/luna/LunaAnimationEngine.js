// LunaAnimationEngine.js
// Controls animation logic for readings, rituals, and card interactions

export const LunaAnimationEngine = {
  triggerAnimation(type, payload = {}) {
    return {
      animationId: `anim_${Date.now()}`,
      type,
      payload,
      triggeredAt: new Date().toISOString()
    };
  },

  cardFlip(cardId) {
    return this.triggerAnimation("CARD_FLIP", { cardId });
  },

  pixieDustBurst(color) {
    return this.triggerAnimation("PIXIE_DUST", { color });
  },

  ritualGlow(mode) {
    return this.triggerAnimation("RITUAL_GLOW", { mode });
  }
};
