// src/engine/luna/SafeNameEngine.ts

export interface SafeNameResult {
  original: string;
  safe: string;
  isValid: boolean;
  reasons: string[];
}

const MAX_LENGTH = 80;

export const SafeNameEngine = {
  normalize(name: string): string {
    let result = name.trim();

    // Replace multiple spaces with single
    result = result.replace(/\s{2,}/g, " ");

    // Remove control characters
    result = result.replace(/[\u0000-\u001F]/g, "");

    return result;
  },

  validate(name: string): SafeNameResult {
    const reasons: string[] = [];
    const safe = this.normalize(name);

    if (!safe) {
      reasons.push("Name is empty after normalization.");
    }

    if (safe.length > MAX_LENGTH) {
      reasons.push(`Name exceeds maximum length of ${MAX_LENGTH} characters.`);
    }

    if (/[\/\\]/.test(safe)) {
      reasons.push("Name contains slash characters, which are not allowed.");
    }

    return {
      original: name,
      safe,
      isValid: reasons.length === 0,
      reasons
    };
  }
};

export default SafeNameEngine;
