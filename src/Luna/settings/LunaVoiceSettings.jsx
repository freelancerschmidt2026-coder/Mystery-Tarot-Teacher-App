import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Mic, 
  Eye, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  Play, 
  Volume2, 
  Moon, 
  Sun, 
  Zap,
  ChevronRight,
  Info
} from 'lucide-react';
import { useLunaPersonaStore } from '../state/lunaPersonaStore';
import { allVoiceProfiles } from '../voice/voicePersonaProfiles';
import './lunaVoiceSettings.css';

const LunaVoiceSettings = () => {
  const { 
    selectedGender, 
    selectedVisualPersona, 
    selectedVoicePersonaId,
    ownedVoicePersonas,
    monthlyFreeVoices,
    setGender,
    setVisualPersona,
    setVoicePersona
  } = useLunaPersonaStore();

  const [previewing, setPreviewing] = useState(null);

  const visualPersonas = [
    { id: 'Celestial', name: 'Celestial Luna', icon: <Sparkles />, desc: 'Ethereal and radiant presence.' },
    { id: 'Shadow', name: 'Shadow Luna', icon: <Moon />, desc: 'Deep, mysterious, and raw.' },
    { id: 'Oracle', name: 'Oracle Luna', icon: <Eye />, desc: 'Ancient wisdom and clarity.' },
    { id: 'Modern', name: 'Modern Luna', icon: <Sun />, desc: 'Direct, clear, and grounded.' }
  ];

  const genders = [
    { id: 'she', name: 'She / Her', icon: <User /> },
    { id: 'he', name: 'He / Him', icon: <User /> },
    { id: 'they', name: 'They / Them', icon: <User /> }
  ];

  const handlePreview = (personaId) => {
    setPreviewing(personaId);
    // Simulate voice playback
    setTimeout(() => setPreviewing(null), 3000);
  };

  const getSuggestedVoices = () => {
    if (selectedVisualPersona === 'Shadow') return ['ShadowVoice', 'ShadowSiren', 'ShadowNeutral'];
    if (selectedVisualPersona === 'Celestial') return ['CosmicGuide', 'CelestialPriestess', 'CosmicBeing'];
    if (selectedVisualPersona === 'Oracle') return ['MysticSage', 'OracleWhisper', 'Dreamwalker'];
    return ['ModernMentor', 'WarmHealer', 'BalancedGuide'];
  };

  const currentVoices = allVoiceProfiles[selectedGender] || {};
  const suggestions = getSuggestedVoices();

  return (
    <div className="luna-settings-container">
      <header className="settings-header">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/20 rounded-2xl text-purple-400">
            <Mic size={24} />
          </div>
          <div>
            <h1>Luna Voice & Persona</h1>
            <p>Define how the High Priestess manifests in your journey.</p>
          </div>
        </div>
      </header>

      <div className="settings-grid">
        {/* Gender Selection */}
        <section className="settings-section">
          <div className="section-title">
            <User size={18} />
            <h2>Gender Identity</h2>
          </div>
          <div className="gender-grid">
            {genders.map(g => (
              <button 
                key={g.id}
                onClick={() => setGender(g.id)}
                className={`gender-btn ${selectedGender === g.id ? 'active' : ''}`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </section>

        {/* Visual Persona */}
        <section className="settings-section">
          <div className="section-title">
            <Eye size={18} />
            <h2>Visual Manifestation</h2>
          </div>
          <div className="visual-grid">
            {visualPersonas.map(p => (
              <button 
                key={p.id}
                onClick={() => setVisualPersona(p.id)}
                className={`visual-btn ${selectedVisualPersona === p.id ? 'active' : ''}`}
              >
                <div className="visual-icon">{p.icon}</div>
                <div className="visual-info">
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                </div>
                {selectedVisualPersona === p.id && <CheckCircle2 className="ml-auto text-purple-400" size={18} />}
              </button>
            ))}
          </div>
        </section>

        {/* Voice Persona */}
        <section className="settings-section wide">
          <div className="section-title">
            <Mic size={18} />
            <h2>Voice Persona</h2>
            <div className="ml-auto flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-50">
              <Zap size={12} className="text-yellow-400" /> Monthly Free Voices Included
            </div>
          </div>
          
          <div className="voice-grid">
            {Object.entries(currentVoices).map(([id, profile]) => {
              const isOwned = ownedVoicePersonas.includes(id) || monthlyFreeVoices.includes(id);
              const isSuggested = suggestions.includes(id);
              const isActive = selectedVoicePersonaId === id;

              return (
                <div 
                  key={id} 
                  className={`voice-card ${isActive ? 'active' : ''} ${!isOwned ? 'locked' : ''}`}
                >
                  <div className="voice-card-header">
                    <div className="voice-name">
                      <h3>{profile.label}</h3>
                      {isSuggested && <span className="suggested-tag">Suggested</span>}
                    </div>
                    <button 
                      onClick={() => handlePreview(id)}
                      className={`preview-btn ${previewing === id ? 'playing' : ''}`}
                      disabled={previewing !== null}
                    >
                      {previewing === id ? <Volume2 size={16} className="animate-pulse" /> : <Play size={16} />}
                    </button>
                  </div>
                  
                  <p className="voice-desc">{profile.toneProfile}</p>
                  
                  <div className="voice-meta">
                    <div className="meta-item">
                      <span className="label">Rhythm:</span> {profile.speechRhythm}
                    </div>
                  </div>

                  {isOwned ? (
                    <button 
                      onClick={() => setVoicePersona(id)}
                      className={`select-btn ${isActive ? 'selected' : ''}`}
                    >
                      {isActive ? 'Active' : 'Select Voice'}
                    </button>
                  ) : (
                    <button className="lock-btn">
                      <Lock size={14} /> Unlock Premium
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <footer className="settings-footer">
        <div className="info-box">
          <Info size={18} className="text-blue-400" />
          <p>Luna's voice adapts contextually. In readings, she will sound more ceremonial; in the Design Studio, she will be more collaborative.</p>
        </div>
      </footer>

      <AnimatePresence>
        {previewing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="voice-preview-toast"
          >
            <Volume2 size={18} />
            <span>“I’m here with you. Let’s explore this together.”</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LunaVoiceSettings;
