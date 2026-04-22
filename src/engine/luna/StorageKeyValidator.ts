// src/engine/luna/StorageKeyValidator.ts

export interface StorageKeyResult {
  original: string;
  normalized: string;
  isValid: boolean;
  reasons: string[];
}

const KEY_PATTERN = /^mystery_[a-z0-9_]+$/;

export const StorageKeyValidator = {
  normalize(key: string): string {
    return key.trim().toLowerCase().replace(/\s+/g, "_");
  },

  validate(key: string): StorageKeyResult {
    const reasons: string[] = [];
    const normalized = this.normalize(key);

    if (!KEY_PATTERN.test(normalized)) {
      reasons.push(
        'Storage key must match pattern "mystery_<module>_<entity>" and contain only lowercase letters, numbers, and underscores.'
      );
    }

    return {
      original: key,
      normalized,
      isValid: reasons.length === 0,
      reasons
    };
  }
};

export default StorageKeyValidator;
