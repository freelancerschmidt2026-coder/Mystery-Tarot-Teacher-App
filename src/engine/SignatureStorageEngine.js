// Stores and retrieves member signatures

export const SignatureStorageEngine = {
  signatures: new Map(), // key: userId, value: signature object

  saveSignature(userId, fullName, fontStyle, fontColor) {
    const signature = {
      signatureId: `sig_${userId}_${Date.now()}`,
      userId,
      fullName,
      fontStyle,
      fontColor,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    };
    this.signatures.set(userId, signature);
    return signature;
  },

  getSignature(userId) {
    return this.signatures.get(userId) || null;
  },

  deactivateSignature(userId) {
    const sig = this.signatures.get(userId);
    if (!sig) return null;
    sig.isActive = false;
    sig.updatedAt = new Date().toISOString();
    this.signatures.set(userId, sig);
    return sig;
  }
};
