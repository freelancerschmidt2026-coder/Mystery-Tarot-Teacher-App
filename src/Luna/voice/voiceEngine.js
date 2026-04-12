import { useLunaPersonaStore } from '../state/lunaPersonaStore';
import { allVoiceProfiles } from './voicePersonaProfiles';

export const voiceEngine = {
  setLunaVoice: ({ gender, personaId }) => {
    const store = useLunaPersonaStore.getState();
    store.setGender(gender);
    store.setVoicePersona(personaId);
  },

  getCurrentVoice: () => {
    const { selectedGender, selectedVoicePersonaId } = useLunaPersonaStore.getState();
    const genderProfiles = allVoiceProfiles[selectedGender] || allVoiceProfiles.she;
    return genderProfiles[selectedVoicePersonaId] || Object.values(genderProfiles)[0];
  },

  applyVoiceToneForContext: (text, context = "default") => {
    const voice = voiceEngine.getCurrentVoice();
    
    // Context mapping
    const contextMap = {
      reading: {
        tone: "ceremonial, slow, reflective",
        style: voice.readingStyle
      },
      design: {
        tone: "creative, collaborative",
        style: voice.designStudioStyle
      },
      horoscope: {
        tone: "soft, insightful",
        style: "Insightful and gentle"
      },
      ritual: {
        tone: "reverent, sacred",
        style: "Sacred and grounded"
      },
      default: {
        tone: voice.toneProfile,
        style: "Standard"
      }
    };

    const settings = contextMap[context] || contextMap.default;

    return {
      text,
      context,
      tone: settings.tone,
      voiceName: voice.label,
      rhythm: voice.speechRhythm,
      intensity: voice.ceremonialIntensity,
      style: settings.style
    };
  }
};
