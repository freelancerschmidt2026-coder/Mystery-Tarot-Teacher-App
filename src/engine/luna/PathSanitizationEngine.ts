// src/engine/luna/PathSanitizationEngine.ts

export interface PathValidationResult {
  original: string;
  sanitized: string;
  isValid: boolean;
  reasons: string[];
}

const ILLEGAL_CHARS = /[<>:"|?*\u0000-\u001F]/g;

export const PathSanitizationEngine = {
  sanitize(path: string): string {
    let result = path.trim();

    // Collapse multiple slashes
    result = result.replace(/\/{2,}/g, "/");

    // Remove illegal characters
    result = result.replace(ILLEGAL_CHARS, "");

    return result;
  },

  validate(path: string): PathValidationResult {
    const reasons: string[] = [];
    const sanitized = this.sanitize(path);

    if (path !== path.trim()) {
      reasons.push("Leading or trailing whitespace detected.");
    }

    if (/\/{2,}/.test(path)) {
      reasons.push("Multiple consecutive slashes detected.");
    }

    if (ILLEGAL_CHARS.test(path)) {
      reasons.push("Illegal characters detected in path.");
    }

    return {
      original: path,
      sanitized,
      isValid: reasons.length === 0,
      reasons
    };
  }
};

export default PathSanitizationEngine;
