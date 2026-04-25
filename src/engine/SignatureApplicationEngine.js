// Applies saved signatures to forms, purchases, certificates

import { SignatureStorageEngine } from "./SignatureStorageEngine.js";

export const SignatureApplicationEngine = {
  usageLog: [],

  applySignatureToContext(userId, contextType, contextId) {
    const signature = SignatureStorageEngine.getSignature(userId);
    if (!signature) {
      return { success: false, reason: "NO_SIGNATURE_FOUND" };
    }

    const usage = {
      usageId: `siguse_${Date.now()}`,
      signatureId: signature.signatureId,
      userId,
      contextType, // "READING", "PURCHASE", "COURSE_CERTIFICATE"
      contextId,
      signedAt: new Date().toISOString()
    };

    this.usageLog.push(usage);

    return {
      success: true,
      signature,
      usage
    };
  }
};
