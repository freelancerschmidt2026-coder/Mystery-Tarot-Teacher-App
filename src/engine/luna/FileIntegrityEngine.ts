// src/engine/luna/FileIntegrityEngine.ts

import { PathSanitizationEngine, PathValidationResult } from "./PathSanitizationEngine";
import { SafeNameEngine, SafeNameResult } from "./SafeNameEngine";
import { StorageKeyValidator, StorageKeyResult } from "./StorageKeyValidator";
import { IdNormalizationEngine, IdResult } from "./IdNormalizationEngine";

export interface FileIntegrityReport {
  path: PathValidationResult;
  name: SafeNameResult;
  storageKey?: StorageKeyResult;
  id?: IdResult;
  isSafe: boolean;
}

export const FileIntegrityEngine = {
  check(params: {
    path: string;
    name: string;
    storageKey?: string;
    id?: string;
  }): FileIntegrityReport {
    const path = PathSanitizationEngine.validate(params.path);
    const name = SafeNameEngine.validate(params.name);

    let storageKey: StorageKeyResult | undefined;
    if (params.storageKey) {
      storageKey = StorageKeyValidator.validate(params.storageKey);
    }

    let id: IdResult | undefined;
    if (params.id) {
      id = IdNormalizationEngine.normalize(params.id);
    }

    const isSafe =
      path.isValid &&
      name.isValid &&
      (!storageKey || storageKey.isValid);

    return {
      path,
      name,
      storageKey,
      id,
      isSafe
    };
  }
};

export default FileIntegrityEngine;
