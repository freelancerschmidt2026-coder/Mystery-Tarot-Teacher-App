import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLunaPersonaStore = create(
  persist(
    (set) => ({
      selectedGender: 'she',
      selectedVisualPersona: 'Celestial',
      selectedVoicePersonaId: 'CelestialPriestess',
      ownedVoicePersonas: ['CelestialPriestess', 'WarmGuardian', 'BalancedGuide'],
      monthlyFreeVoices: ['CosmicMuse', 'ModernMentor'],
      
      setGender: (gender) => set({ selectedGender: gender }),
      setVisualPersona: (persona) => set({ selectedVisualPersona: persona }),
      setVoicePersona: (personaId) => set({ selectedVoicePersonaId: personaId }),
      addOwnedVoicePersona: (personaId) => set((state) => ({ 
        ownedVoicePersonas: [...new Set([...state.ownedVoicePersonas, personaId])] 
      })),
      setMonthlyFreeVoices: (ids) => set({ monthlyFreeVoices: ids }),
      
      rotateMonthlyFreeVoices: () => {
        // Stub: rotate to a different set of voices
        const allPossible = ['OracleWhisper', 'MysticSage', 'Dreamwalker', 'ModernMentor', 'CosmicMuse'];
        const shuffled = allPossible.sort(() => 0.5 - Math.random());
        set({ monthlyFreeVoices: shuffled.slice(0, 2) });
      }
    }),
    {
      name: 'luna-persona-storage',
    }
  )
);
