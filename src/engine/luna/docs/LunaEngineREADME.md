# 🌙 Luna Engine — Core Documentation

The **Luna Engine** is the logic, intelligence, and architectural backbone of the Mystery Tarot Teacher App.  
It is a fully modular, UI‑agnostic engine system designed to power:

- Tarot deck creation  
- Card animation  
- Ritual flows  
- Intelligent suggestions  
- Emotional interpretation  
- Store approvals  
- Token economy  
- Notepad integration  
- Breakout rooms  
- Export systems  

Everything Luna does is handled through **engines** — small, isolated logic modules that never depend on UI frameworks.

---

## 🧱 Engine Architecture Overview

The Luna Engine is divided into **7 major layers**:

### 1. FOUNDATION  
Low‑level safety, validation, and data integrity.

- PathSanitizationEngine  
- SafeNameEngine  
- StorageKeyValidator  
- IdNormalizationEngine  
- FileIntegrityEngine  

### 2. CORE_STUDIO  
Everything related to deck creation and editing.

- StudioDeckEngine  
- TarotBoxEngine  
- CardFlipEngine  
- CardArtEngine  
- TemplateApplicationEngine  
- TemplateRotationEngine  
- TemplateVariantEngine  
- TemplateMetadataEngine  
- DeckBoxAnimationEngine  
- DeckProgressEngine  
- StudioUndoRedoEngine  
- StudioAutosaveEngine  
- StudioEventEngine  
- VoiceCommandEngine  

### 3. INTELLIGENCE  
Luna’s “mind” — emotional, creative, and interpretive engines.

- EmotionEngine  
- SuggestionEngine  
- CreativeDirectionEngine  
- CardMeaningAnalysisEngine  
- DeckConsistencyEngine  
- DesignSessionEngine  
- ThemeEngine  

### 4. ECONOMY  
Token and ledger systems.

- MysteryTokenEngine  
- MemberEconomyLedgerEngine  

### 5. STORE  
Deck approvals, pricing, and listing logic.

- StoreListingEngine  
- MysteryDeckApprovalEngine  
- TemplatePricingEngine  

### 6. NOTEPAD  
Integration with the magical notepad.

- NotepadIntegrationEngine  

### 7. EXPORT  
Deck export logic.

- DeckExportEngine  

### 8. BREAKOUT  
Group reading and breakout room logic.

- BreakoutRoomEngine  

---

## 🧩 Engine Rules

Every engine must follow these rules:

### ✔ 1. UI‑agnostic  
No React, no DOM, no animations — logic only.

### ✔ 2. Pure functions  
No side effects unless explicitly documented.

### ✔ 3. No cross‑layer dependencies  
Higher layers may depend on lower layers, but never the reverse.

### ✔ 4. Every engine must export a clean API  
Example:

```ts
export const DeckProgressEngine = {
  calculateProgress(deck) { ... },
  getMissingElements(deck) { ... }
};
