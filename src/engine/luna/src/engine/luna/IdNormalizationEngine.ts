// src/engine/luna/IdNormalizationEngine.ts

export interface IdResult {
  original: string;
  normalized: string;
}

export const IdNormalizationEngine = {
  normalize(raw: string): IdResult {
    const original = raw;

    let normalized = raw.trim().toLowerCase();

    // Replace spaces with dashes
    normalized = normalized.replace(/\s+/g, "-");

    // Remove illegal characters
    normalized = normalized.replace(/[^a-z0-9\-_.]/g, "");

    // Collapse multiple dashes
    normalized = normalized.replace(/-+/g, "-");

    return { original, normalized };
  }
};

export default IdNormalizationEngine;
