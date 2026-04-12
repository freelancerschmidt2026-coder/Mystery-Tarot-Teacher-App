import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Award, 
  BookOpen, 
  CheckCircle, 
  History, 
  Sparkles, 
  Trophy, 
  Calendar, 
  Edit3, 
  Save, 
  ChevronRight,
  Star,
  Shield,
  BrainCircuit,
  Heart,
  Moon,
  Sun
} from 'lucide-react';
import { TAROT_CARDS } from '../FlashCards/TarotData';
import './memberProfile.css';

const MemberProfile = ({ onNavigate = () => {} }) => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('reader_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Seeker',
      mysteryName: 'Initiate of the Void',
      joinedDate: new Date().toISOString(),
      avatar: 'https://picsum.photos/seed/tarot-seeker/200/200'
    };
  });

  const [activeTitle, setActiveTitle] = useState(() => localStorage.getItem('luna_active_title') || 'Student of the Arcana');
  const [earnedTitles, setEarnedTitles] = useState(() => JSON.parse(localStorage.getItem('luna_earned_titles') || '["Student of the Arcana"]'));
  const [isEditing, setIsEditing] = useState(false);

  // Data fetching for progress
  const testHistory = useMemo(() => JSON.parse(localStorage.getItem('luna_test_history') || '[]'), []);
  const passedCourses = useMemo(() => JSON.parse(localStorage.getItem('luna_passed_courses') || '[]'), []);
  const earnedBadges = useMemo(() => JSON.parse(localStorage.getItem('luna_earned_badges') || '[]'), []);
  const notes = useMemo(() => JSON.parse(localStorage.getItem('finder_notes') || '[]'), []);
  const practiceReadings = useMemo(() => JSON.parse(localStorage.getItem('luna_practice_readings') || '[]'), []);
  const capstoneResult = useMemo(() => JSON.parse(localStorage.getItem('luna_capstone_result') || 'null'), []);

  // Progress Calculations
  const stats = useMemo(() => {
    const totalCards = TAROT_CARDS.length;
    const masteredCards = TAROT_CARDS.filter(card => 
      testHistory.some(h => h.cardId === card.id && h.score >= 80)
    ).length;

    const ritualCount = notes.filter(n => n.page === 'ritual-mode').length;
    const moonRituals = notes.filter(n => n.page === 'ritual-mode' && n.section === 'Moon Ritual Archive').length;

    return {
      courseProgress: (passedCourses.length / 10) * 100,
      testCount: testHistory.length,
      masteryProgress: (masteredCards / totalCards) * 100,
      ritualCount,
      moonRituals,
      achievementProgress: (earnedBadges.length / 50) * 100, // Assuming 50 total badges
      certProgress: capstoneResult?.passed ? 100 : (passedCourses.length / 10) * 80 // Simplified logic
    };
  }, [testHistory, passedCourses, earnedBadges, notes, capstoneResult]);

  const handleSaveProfile = () => {
    localStorage.setItem('reader_profile', JSON.stringify(profile));
    setIsEditing(false);
  };

  const handleTitleChange = (title) => {
    setActiveTitle(title);
    localStorage.setItem('luna_active_title', title);
  };

  const handleSaveToNotepad = (content, section) => {
    const savedNotes = localStorage.getItem('finder_notes');
    const existingNotes = savedNotes ? JSON.parse(savedNotes) : [];
    
    const newNote = {
      id: Date.now(),
      text: content,
      page: 'member-profile',
      section: section,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('finder_notes', JSON.stringify([...existingNotes, newNote]));
    alert(`Saved to NotePad under ${section}!`);
  };

  return (
    <div className="member-profile-container">
      <div className="profile-atmosphere">
        <div className="celestial-glow"></div>
      </div>

      <div className="profile-content">
        {/* Profile Overview Header */}
        <header className="profile-hero">
          <div className="avatar-wrapper">
            <motion.img 
              src={profile.avatar} 
              alt="Avatar" 
              className="profile-avatar"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            />
            <div className="avatar-ring"></div>
          </div>

          <div className="hero-info">
            <div className="name-group">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                {profile.mysteryName}
              </motion.h1>
              <div className="active-title-badge">
                <Shield size={14} /> {activeTitle}
              </div>
            </div>

            <div className="quick-stats-row">
              <div className="quick-stat">
                <span className="stat-value">{passedCourses.length}</span>
                <span className="stat-label">Courses</span>
              </div>
              <div className="quick-stat">
                <span className="stat-value">{stats.testCount}</span>
                <span className="stat-label">Tests</span>
              </div>
              <div className="quick-stat">
                <span className="stat-value">{earnedBadges.length}</span>
                <span className="stat-label">Badges</span>
              </div>
            </div>
          </div>

          <button className="edit-profile-btn" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <Save size={18} /> : <Edit3 size={18} />}
          </button>
        </header>

        {/* Progress Dashboard */}
        <section className="progress-dashboard">
          <div className="section-header">
            <h2>Path of Mastery</h2>
            <p>Your journey through the sacred mysteries.</p>
          </div>

          <div className="progress-grid">
            <div className="progress-card">
              <div className="progress-info">
                <span className="label">Courses</span>
                <span className="value">{Math.round(stats.courseProgress)}%</span>
              </div>
              <div className="progress-bar-bg">
                <motion.div 
                  className="progress-bar-fill gold"
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.courseProgress}%` }}
                />
              </div>
            </div>

            <div className="progress-card">
              <div className="progress-info">
                <span className="label">Card Mastery</span>
                <span className="value">{Math.round(stats.masteryProgress)}%</span>
              </div>
              <div className="progress-bar-bg">
                <motion.div 
                  className="progress-bar-fill blue"
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.masteryProgress}%` }}
                />
              </div>
            </div>

            <div className="progress-card">
              <div className="progress-info">
                <span className="label">Rituals</span>
                <span className="value">{stats.ritualCount} Complete</span>
              </div>
              <div className="progress-bar-bg">
                <motion.div 
                  className="progress-bar-fill pink"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(stats.ritualCount * 5, 100)}%` }}
                />
              </div>
            </div>

            <div className="progress-card">
              <div className="progress-info">
                <span className="label">Certification</span>
                <span className="value">{Math.round(stats.certProgress)}%</span>
              </div>
              <div className="progress-bar-bg">
                <motion.div 
                  className="progress-bar-fill green"
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.certProgress}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="profile-main-grid">
          {/* Left Column: Info & Titles */}
          <div className="profile-column">
            <section className="info-section">
              <h3>Personal Archives</h3>
              {isEditing ? (
                <div className="edit-form">
                  <div className="input-group">
                    <label>Real Name</label>
                    <input 
                      type="text" 
                      value={profile.name} 
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                  </div>
                  <div className="input-group">
                    <label>Mystery Tarot Name</label>
                    <input 
                      type="text" 
                      value={profile.mysteryName} 
                      onChange={(e) => setProfile({...profile, mysteryName: e.target.value})}
                    />
                  </div>
                  <button className="save-btn" onClick={handleSaveProfile}>Save Changes</button>
                </div>
              ) : (
                <div className="info-display">
                  <div className="info-item">
                    <User size={16} />
                    <div className="info-text">
                      <span className="label">Real Name</span>
                      <span className="value">{profile.name}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <Calendar size={16} />
                    <div className="info-text">
                      <span className="label">Joined Date</span>
                      <span className="value">{new Date(profile.joinedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section className="titles-section">
              <div className="section-header-row">
                <h3>Earned Titles</h3>
                <Trophy size={18} className="text-yellow-400" />
              </div>
              <div className="titles-list">
                {earnedTitles.map(title => (
                  <button 
                    key={title} 
                    className={`title-item ${activeTitle === title ? 'active' : ''}`}
                    onClick={() => handleTitleChange(title)}
                  >
                    {title}
                    {activeTitle === title && <CheckCircle size={14} />}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Insights & Logs */}
          <div className="profile-column">
            <section className="luna-insights-section">
              <div className="section-header-row">
                <h3>Luna's Insights</h3>
                <BrainCircuit size={18} className="text-blue-400" />
              </div>
              <div className="insight-card">
                <div className="insight-header">
                  <Sparkles size={16} />
                  <span>Personalized Guidance</span>
                </div>
                <p className="insight-text italic">
                  "Finder, your connection to the Major Arcana is deepening. I recommend focusing on the elemental dignities in your next practice session to unlock further clarity."
                </p>
                <div className="insight-tags">
                  <span className="tag">Focus: Minor Arcana</span>
                  <span className="tag">Tone: Grounded</span>
                </div>
                <button 
                  className="save-insight-btn"
                  onClick={() => handleSaveToNotepad("Luna Insight: Focus on elemental dignities for Minor Arcana clarity.", "Luna's Insights")}
                >
                  <Save size={14} /> Save Insight
                </button>
              </div>
            </section>

            <section className="ritual-log-section">
              <div className="section-header-row">
                <h3>Ritual Log Archive</h3>
                <History size={18} className="text-pink-400" />
              </div>
              <div className="log-summary">
                <div className="log-item">
                  <Sun size={16} />
                  <span>{stats.ritualCount - stats.moonRituals} Daily Rituals</span>
                </div>
                <div className="log-item">
                  <Moon size={16} />
                  <span>{stats.moonRituals} Moon Rituals</span>
                </div>
              </div>
              <button 
                className="view-log-btn"
                onClick={() => onNavigate('notepad')}
              >
                View Full Log in NotePad <ChevronRight size={14} />
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
