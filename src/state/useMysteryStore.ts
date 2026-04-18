import { create } from "zustand";

interface MysteryStore {
  // --- Core NotePad Identity ---
  mysteryName: string;
  setMysteryName: (name: string) => void;

  // --- Cover Template Selection ---
  selectedCoverTemplate: string;
  setSelectedCoverTemplate: (template: string) => void;

  // --- Threshold Animation State ---
  coverAnimationState: "closed" | "opening" | "open";
  setCoverAnimationState: (state: "closed" | "opening" | "open") => void;

  // --- Reserved for Future Magical Systems ---
  // Luna’s template engine
  // Questionnaire system
  // Monetization logic
  // Clarification rituals
  // Template marketplace
  // Course generator
  // Tarot training modules
}

export const useMysteryStore = create<MysteryStore>((set) => ({
  // Default Finder identity
  mysteryName: "Finder",
  setMysteryName: (name) => set({ mysteryName: name }),

  // Default cover template
  selectedCoverTemplate: "default",
  setSelectedCoverTemplate: (template) =>
    set({ selectedCoverTemplate: template }),

  // Default animation state
  coverAnimationState: "closed",
  setCoverAnimationState: (state) =>
    set({ coverAnimationState: state }),

  // Future magical systems will be added here
}));
