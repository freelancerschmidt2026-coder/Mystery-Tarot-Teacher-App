// src/engine/luna/LunaEngineLayers.ts

export type LunaEngineLayer =
  | "foundation"
  | "core"
  | "intelligence"
  | "economy"
  | "store"
  | "notepad"
  | "export"
  | "breakout";

export const LunaEngineLayers: Record<LunaEngineLayer, string[]> = {
  foundation: [
    "PathSanitizationEngine",
    "SafeNameEngine",
    "StorageKeyValidator",
    "IdNormalizationEngine",
    "FileIntegrityEngine"
  ],
  core: [
    "StudioDeckEngine",
    "TarotBoxEngine",
    "CardFlipEngine",
    "CardArtEngine",
    "TemplateApplicationEngine",
    "TemplateRotationEngine",
    "TemplateVariantEngine",
    "TemplateMetadataEngine",
    "DeckBoxAnimationEngine",
    "DeckProgressEngine",
    "StudioUndoRedoEngine",
    "StudioAutosaveEngine",
    "StudioEventEngine",
    "VoiceCommandEngine"
  ],
  intelligence: [
    "EmotionEngine",
    "SuggestionEngine",
    "CreativeDirectionEngine",
    "CardMeaningAnalysisEngine",
    "DeckConsistencyEngine",
    "DesignSessionEngine",
    "ThemeEngine"
  ],
  economy: [
    "MysteryTokenEngine",
    "MemberEconomyLedgerEngine"
  ],
  store: [
    "StoreListingEngine",
    "MysteryDeckApprovalEngine",
    "TemplatePricingEngine"
  ],
  notepad: [
    "NotepadIntegrationEngine"
  ],
  export: [
    "DeckExportEngine"
  ],
  breakout: [
    "BreakoutRoomEngine"
  ]
};
