// src/engine/luna/LunaEngineDiagnostics.ts

import { LunaEngineManifest } from "./LunaEngineManifest";
import { PathSanitizationEngine } from "./PathSanitizationEngine";
import { SafeNameEngine } from "./SafeNameEngine";
import { StorageKeyValidator } from "./StorageKeyValidator";
import { IdNormalizationEngine } from "./IdNormalizationEngine";

export interface DiagnosticsReport {
  missingFiles: string[];
  invalidPaths: string[];
  invalidNames: string[];
  invalidStorageKeys: string[];
  normalizedIds: Record<string, string>;
}

export const LunaEngineDiagnostics = {
  run(): DiagnosticsReport {
    const missingFiles: string[] = [];
    const invalidPaths: string[] = [];
    const invalidNames: string[] = [];
    const invalidStorageKeys: string[] = [];
    const normalizedIds: Record<string, string> = {};

    LunaEngineManifest.forEach((entry) => {
      const path = `src/engine/luna/${entry.file}`;

      const pathCheck = PathSanitizationEngine.validate(path);
      if (!pathCheck.isValid) invalidPaths.push(path);

      const nameCheck = SafeNameEngine.validate(entry.name);
      if (!nameCheck.isValid) invalidNames.push(entry.name);

      const keyCheck = StorageKeyValidator.validate(`mystery_${entry.name.toLowerCase()}`);
      if (!keyCheck.isValid) invalidStorageKeys.push(entry.name);

      const idCheck = IdNormalizationEngine.normalize(entry.name);
      normalizedIds[entry.name] = idCheck.normalized;
    });

    return {
      missingFiles,
      invalidPaths,
      invalidNames,
      invalidStorageKeys,
      normalizedIds
    };
  }
};

export default LunaEngineDiagnostics;
