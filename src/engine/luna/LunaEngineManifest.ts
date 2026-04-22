// src/engine/luna/LunaEngineManifest.ts

export interface EngineManifestEntry {
  name: string;
  file: string;
  layer: "foundation" | "core" | "intelligence" | "economy" | "store" | "notepad" | "export" | "breakout";
  description: string;
}

export const LunaEngineManifest: EngineManifestEntry[] = [
  // FOUNDATION
  { name: "PathSanitizationEngine", file: "PathSanitizationEngine.ts", layer: "foundation", description: "Sanitizes and validates file paths." },
  { name: "SafeNameEngine", file: "SafeNameEngine.ts", layer: "foundation", description: "Normalizes and validates user-facing names." },
  { name: "StorageKeyValidator", file: "StorageKeyValidator.ts", layer: "foundation", description: "Ensures LocalStorage keys follow safe patterns." },
  { name: "IdNormalizationEngine", file: "IdNormalizationEngine.ts", layer: "foundation", description: "Normalizes IDs into safe tokens." },
  { name: "FileIntegrityEngine", file: "FileIntegrityEngine.ts", layer: "foundation", description: "High-level integrity checks for paths, names, keys, and IDs." },

  // CORE
  { name: "StudioDeckEngine", file: "StudioDeckEngine.ts", layer: "core", description: "Master controller for the Studio." },
  { name: "TarotBoxEngine", file: "TarotBoxEngine.ts", layer: "core", description: "Controls tarot box stacking and focus." },
  { name: "CardFlipEngine", file: "CardFlipEngine.ts", layer: "core", description: "Manages upright/reversed flip state." },
  { name: "CardArtEngine", file: "CardArtEngine.ts", layer: "core", description: "Stores and updates card art metadata." },
  { name: "TemplateApplicationEngine", file: "TemplateApplicationEngine.ts", layer: "core", description: "Applies templates to cards." },
  { name: "TemplateRotationEngine", file: "TemplateRotationEngine.ts", layer: "core", description: "Cycles template variants." },
  { name: "TemplateVariantEngine", file: "TemplateVariantEngine.ts", layer: "core", description: "Manages template variant definitions." },
  { name: "TemplateMetadataEngine", file: "TemplateMetadataEngine.ts", layer: "core", description: "Stores template metadata." },
  { name: "DeckBoxAnimationEngine", file: "DeckBoxAnimationEngine.ts", layer: "core", description: "Provides animation states for the tarot box." },
  { name: "DeckProgressEngine", file: "DeckProgressEngine.ts", layer: "core", description: "Tracks deck completion progress." },
  { name: "StudioUndoRedoEngine", file: "StudioUndoRedoEngine.ts", layer: "core", description: "Undo/redo snapshot manager." },
  { name: "StudioAutosaveEngine", file: "StudioAutosaveEngine.ts", layer: "core", description: "Autosave snapshots." },
  { name: "StudioEventEngine", file: "StudioEventEngine.ts", layer: "core", description: "Records Studio events." },
  { name: "VoiceCommandEngine", file: "VoiceCommandEngine.ts", layer: "core", description: "Parses voice commands." },

  // INTELLIGENCE
  { name: "EmotionEngine", file: "EmotionEngine.ts", layer: "intelligence", description: "Evaluates emotional context." },
  { name: "SuggestionEngine", file: "SuggestionEngine.ts", layer: "intelligence", description: "Generates Luna suggestions." },
  { name: "CreativeDirectionEngine", file: "CreativeDirectionEngine.ts", layer: "intelligence", description: "Provides creative direction suggestions." },
  { name: "CardMeaningAnalysisEngine", file: "CardMeaningAnalysisEngine.ts", layer: "intelligence", description: "Analyzes upright/reversed meanings." },
  { name: "DeckConsistencyEngine", file: "DeckConsistencyEngine.ts", layer: "intelligence", description: "Scores deck consistency." },
  { name: "DesignSessionEngine", file: "DesignSessionEngine.ts", layer: "intelligence", description: "Tracks Luna-guided design sessions." },
  { name: "ThemeEngine", file: "ThemeEngine.ts", layer: "intelligence", description: "Manages deck-wide themes." },

  // ECONOMY
  { name: "MysteryTokenEngine", file: "MysteryTokenEngine.ts", layer: "economy", description: "Manages token earning/spending." },
  { name: "MemberEconomyLedgerEngine", file: "MemberEconomyLedgerEngine.ts", layer: "economy", description: "Tracks financial ledger entries." },

  // STORE
  { name: "StoreListingEngine", file: "StoreListingEngine.ts", layer: "store", description: "Manages store listings." },
  { name: "MysteryDeckApprovalEngine", file: "MysteryDeckApprovalEngine.ts", layer: "store", description: "Evaluates deck approval." },
  { name: "TemplatePricingEngine", file: "TemplatePricingEngine.ts", layer: "store", description: "Calculates template pricing." },

  // NOTEPAD
  { name: "NotepadIntegrationEngine", file: "NotepadIntegrationEngine.ts", layer: "notepad", description: "Adds pages to the Notepad." },

  // EXPORT
  { name: "DeckExportEngine", file: "DeckExportEngine.ts", layer: "export", description: "Creates export payloads." },

  // BREAKOUT
  { name: "BreakoutRoomEngine", file: "BreakoutRoomEngine.ts", layer: "breakout", description: "Manages breakout room access." }
];
