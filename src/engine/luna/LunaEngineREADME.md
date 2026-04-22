# Mystery Tarot Teacher — Luna Engine

The **Luna Engine** is the logic layer that powers the Mystery Tarot Teacher Studio:

- Tarot deck creation
- Template application
- Luna’s creative intelligence
- Member economy + store
- Notepad + export
- Breakout rooms
- Safety + integrity

It is **UI‑agnostic**: no React, no rendering, just pure TypeScript logic.

---

## Layers

### 1. Foundation

Protects the system from malformed input and structural corruption.

- `PathSanitizationEngine`
- `SafeNameEngine`
- `StorageKeyValidator`
- `IdNormalizationEngine`
- `FileIntegrityEngine`

### 2. Core Studio

Drives the Studio experience.

- `StudioDeckEngine`
- `TarotBoxEngine`
- `CardFlipEngine`
- `CardArtEngine`
- `TemplateApplicationEngine`
- `TemplateRotationEngine`
- `TemplateVariantEngine`
- `TemplateMetadataEngine`
- `DeckBoxAnimationEngine`
- `DeckProgressEngine`
- `StudioUndoRedoEngine`
- `StudioAutosaveEngine`
- `StudioEventEngine`
- `VoiceCommandEngine`

### 3. Intelligence

Luna’s “mind” — analysis, suggestions, direction.

- `EmotionEngine`
- `SuggestionEngine`
- `CreativeDirectionEngine`
- `CardMeaningAnalysisEngine`
- `DeckConsistencyEngine`
- `DesignSessionEngine`
- `ThemeEngine`

### 4. Economy

- `MysteryTokenEngine`
- `MemberEconomyLedgerEngine`

### 5. Store

- `StoreListingEngine`
- `MysteryDeckApprovalEngine`
- `TemplatePricingEngine`

### 6. Notepad

- `NotepadIntegrationEngine`

### 7. Export

- `DeckExportEngine`

### 8. Breakout

- `BreakoutRoomEngine`

---

## Entry points

### Unified exports

Use:

```ts
import {
  StudioDeckEngine,
  CardArtEngine,
  EmotionEngine,
  SuggestionEngine,
  FileIntegrityEngine
} from "./engine/luna";
