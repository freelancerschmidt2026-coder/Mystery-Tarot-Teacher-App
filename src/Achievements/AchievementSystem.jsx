import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Award, 
  Star, 
  CheckCircle, 
  Lock, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Zap, 
  ShieldCheck, 
  Flame, 
  Moon, 
  Eye, 
  Heart, 
  Compass, 
  Crown,
  Search,
  MessageSquare,
  FileText,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TAROT_CARDS } from '../FlashCards/TarotData';
import './achievements.css';

const BADGE_DATA = [
  // Learning Badges
  { id: 'first-step', category: 'learning', name: 'First Step', icon: <BookOpen size={24} />, desc: 'Complete your first course lesson.', req: (stats) => stats.lessonsCompleted >= 1 },
  { id: 'scholar', category: 'learning', name: 'Tarot Scholar', icon: <GraduationCap size={24} />, desc: 'Complete 5 Academy courses.', req: (stats) => stats.coursesCompleted >= 5 },
  { id: 'graduate', category: 'learning', name: 'Academy Graduate', icon: <Trophy size={24} />, desc: 'Complete all 10 Academy courses.', req: (stats) => stats.coursesCompleted >= 10 },
  
  // Mastery Badges
  { id: 'card-aware', category: 'mastery', name: 'Card Aware', icon: <Eye size={24} />, desc: 'Master 10 tarot cards.', req: (stats) => stats.masteredCount >= 10 },
  { id: 'major-master', category: 'mastery', name: 'Major Master', icon: <Award size={24} />, desc: 'Master all 22 Major Arcana cards.', req: (stats) => stats.majorMastered >= 22 },
  { id: 'deck-master', category: 'mastery', name: 'Deck Master', icon: <Crown size={24} />, desc: 'Master all 78 cards in the deck.', req: (stats) => stats.masteredCount >= 78 },
  
  // Testing Badges
  { id: 'perfect-score', category: 'testing', name: 'Perfect Vision', icon: <Zap size={24} />, desc: 'Achieve 100% on any test or exam.', req: (stats) => stats.hasPerfectScore },
  { id: 'consistent', category: 'testing', name: 'Consistent Mind', icon: <CheckCircle size={24} />, desc: 'Score 90%+ on 5 different tests.', req: (stats) => stats.highScoreCount >= 5 },
  
  // Reading Badges
  { id: 'first-reading', category: 'reading', name: 'First Glimpse', icon: <Compass size={24} />, desc: 'Complete your first practice reading.', req: (stats) => stats.readingsCount >= 1 },
  { id: 'practitioner', category: 'reading', name: 'Sacred Practitioner', icon: <Flame size={24} />, desc: 'Complete 10 practice readings.', req: (stats) => stats.readingsCount >= 10 },
  { id: 'certified', category: 'reading', name: 'Luna Certified', icon: <ShieldCheck size={24} />, desc: 'Pass the Final Capstone Reading.', req: (stats) => stats.isCertified },
  
  // Special Badges
  { id: 'night-owl', category: 'special', name: 'Night Owl', icon: <Moon size={24} />, desc: 'Study the mysteries after midnight.', req: (stats) => stats.isNightOwl },
  { id: 'empath', category: 'special', name: 'Empathic Soul', icon: <Heart size={24} />, desc: 'Score 20/20 on Emotional Intelligence.', req: (stats) => stats.maxEmotionalScore >= 20 },
  
  // Secret Badges
  { id: 'luna-favorite', category: 'secret', name: 'Luna\'s Favorite', icon: <Sparkles size={24} />, desc: 'Interact with Luna 50 times.', req: (stats) => stats.lunaInteractions >= 50, isSecret: true, hint: "Luna feels your presence often..." },
  { id: 'deep-diver', category: 'secret', name: 'Deep Diver', icon: <Search size={24} />, desc: 'Write over 2000 characters in a single reading.', req: (stats) => stats.maxReadingLength >= 2000, isSecret: true, hint: "The ink flows like a river..." },
];

const TITLE_DATA = [
  { id: 'student', name: 'Student of the Arcana', req: (stats, badges) => badges.length >= 0 },
  { id: 'keeper', name: 'Keeper of Symbols', req: (stats, badges) => badges.length >= 5 && stats.masteredCount >= 10 },
  { id: 'pathwalker', name: 'Pathwalker', req: (stats, badges) => badges.length >= 10 && stats.coursesCompleted >= 5 },
  { id: 'adept', name: 'Adept of the Veil', req: (stats, badges) => badges.length >= 20 && stats.majorMastered >= 22 },
  { id: 'scholar-title', name: 'Oracle Scholar', req: (stats, badges) => badges.length >= 30 && stats.coursesCompleted >= 10 },
  { id: 'chosen', name: 'Luna\'s Chosen Reader', req: (stats, badges) => stats.isCertified && badges.length >= 40 },
];

const AchievementSystem = ({ onNavigate }) => {
  const [stats, setStats] = useState({
    lessonsCompleted: 0,
    coursesCompleted: 0,
    masteredCount: 0,
    majorMastered: 0,
    readingsCount: 0,
    hasPerfectScore: false,
    highScoreCount: 0,
    isCertified: false,
    isNightOwl: false,
    maxEmotionalScore: 0,
    lunaInteractions: 0,
    maxReadingLength: 0
  });

  const [earnedBadges, setEarnedBadges] = useState([]);
  const [activeTitle, setActiveTitle] = useState('Student of the Arcana');
  const [unlockedTitles, setUnlockedTitles] = useState([]);
  const [newBadge, setNewBadge] = useState(null);

  const calculateStats = useCallback(() => {
    const testHistory = JSON.parse(localStorage.getItem('luna_test_history') || '[]');
    const passedCourses = JSON.parse(localStorage.getItem('luna_passed_courses') || '[]');
    const practiceReadings = JSON.parse(localStorage.getItem('luna_practice_readings') || '[]');
    const capstoneResult = JSON.parse(localStorage.getItem('luna_capstone_result') || 'null');
    const courseProgress = JSON.parse(localStorage.getItem('finder_course_progress') || '{}');
    const interactions = parseInt(localStorage.getItem('luna_interactions_count') || '0');

    const masteredCount = TAROT_CARDS.filter(card => 
      testHistory.some(h => h.cardId === card.id && h.score >= 80)
    ).length;

    const majorMastered = TAROT_CARDS.filter(c => c.arcana === 'major').filter(card => 
      testHistory.some(h => h.cardId === card.id && h.score >= 80)
    ).length;

    const lessonsCompleted = Object.keys(courseProgress).length;
    const coursesCompleted = passedCourses.length;
    const readingsCount = practiceReadings.length + (capstoneResult ? 1 : 0);
    const hasPerfectScore = testHistory.some(h => h.score === 100);
    const highScoreCount = testHistory.filter(h => h.score >= 90).length;
    const isCertified = capstoneResult?.passed || false;
    
    // Night Owl check: current hour between 0 and 4
    const hour = new Date().getHours();
    const isNightOwl = hour >= 0 && hour <= 4;

    const maxEmotionalScore = Math.max(0, ...practiceReadings.map(r => r.criteria?.emotional || 0), capstoneResult?.criteria?.emotional || 0);
    const maxReadingLength = Math.max(0, ...practiceReadings.map(r => r.content?.length || 0), capstoneResult?.content?.length || 0);

    return {
      lessonsCompleted,
      coursesCompleted,
      masteredCount,
      majorMastered,
      readingsCount,
      hasPerfectScore,
      highScoreCount,
      isCertified,
      isNightOwl,
      maxEmotionalScore,
      lunaInteractions: interactions,
      maxReadingLength
    };
  }, []);

  useEffect(() => {
    const currentStats = calculateStats();
    setStats(currentStats);

    const savedBadges = JSON.parse(localStorage.getItem('luna_earned_badges') || '[]');
    const newEarned = BADGE_DATA.filter(badge => badge.req(currentStats)).map(b => b.id);
    
    // Check for newly unlocked badges
    const newlyUnlocked = newEarned.filter(id => !savedBadges.includes(id));
    if (newlyUnlocked.length > 0) {
      const badge = BADGE_DATA.find(b => b.id === newlyUnlocked[0]);
      setNewBadge(badge);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f3e5ab', '#add8e6', '#ffffff']
      });
      
      const updatedBadges = [...new Set([...savedBadges, ...newEarned])];
      localStorage.setItem('luna_earned_badges', JSON.stringify(updatedBadges));
      setEarnedBadges(updatedBadges);

      // Save to history
      const history = JSON.parse(localStorage.getItem('luna_badge_history') || '[]');
      newlyUnlocked.forEach(id => {
        const b = BADGE_DATA.find(x => x.id === id);
        history.push({ id, name: b.name, date: new Date().toISOString() });
      });
      localStorage.setItem('luna_badge_history', JSON.stringify(history));

      setTimeout(() => setNewBadge(null), 5000);
    } else {
      setEarnedBadges(savedBadges);
    }

    const unlocked = TITLE_DATA.filter(title => title.req(currentStats, newEarned)).map(t => t.name);
    setUnlockedTitles(unlocked);

    const savedTitle = localStorage.getItem('luna_active_title');
    if (savedTitle && unlocked.includes(savedTitle)) {
      setActiveTitle(savedTitle);
    } else if (unlocked.length > 0 && !unlocked.includes(activeTitle)) {
      setActiveTitle(unlocked[unlocked.length - 1]);
    }
  }, [calculateStats]);

  const handleTitleSelect = (titleName) => {
    if (unlockedTitles.includes(titleName)) {
      setActiveTitle(titleName);
      localStorage.setItem('luna_active_title', titleName);
      // Update reader profile if it exists
      const profile = JSON.parse(localStorage.getItem('reader_profile') || '{}');
      profile.activeTitle = titleName;
      localStorage.setItem('reader_profile', JSON.stringify(profile));
    }
  };

  const renderCategory = (category, title, icon) => {
    const categoryBadges = BADGE_DATA.filter(b => b.category === category);
    return (
      <div className="badge-category-section" key={category}>
        <h2 className="category-title">{icon} {title}</h2>
        <div className="badges-grid">
          {categoryBadges.map(badge => {
            const isUnlocked = earnedBadges.includes(badge.id);
            const isSecret = badge.isSecret && !isUnlocked;

            return (
              <motion.div 
                key={badge.id}
                className={`badge-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                whileHover={isUnlocked ? { scale: 1.05, y: -5 } : {}}
              >
                <div className="badge-icon-wrapper">
                  {isSecret ? <Lock size={24} className="opacity-30" /> : badge.icon}
                </div>
                <div className="badge-name">
                  {isSecret ? '???' : badge.name}
                </div>
                <div className="badge-desc">
                  {isSecret ? (
                    <span className="badge-secret-hint">Hint: {badge.hint}</span>
                  ) : badge.desc}
                </div>
                {isUnlocked && (
                  <motion.div 
                    className="absolute top-2 right-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <CheckCircle size={14} className="text-green-400" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="achievements-container">
      <div className="achievements-header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Award size={64} className="mx-auto mb-4 text-yellow-200" />
          <h1>Academy Achievements</h1>
          <p>The constellation of your accomplishments in the hermetic arts.</p>
        </motion.div>
      </div>

      <div className="achievement-stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span>Badges Earned</span>
            <span>{earnedBadges.length} / {BADGE_DATA.length}</span>
          </div>
          <div className="stat-progress-bg">
            <motion.div 
              className="stat-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(earnedBadges.length / BADGE_DATA.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <span>Titles Unlocked</span>
            <span>{unlockedTitles.length} / {TITLE_DATA.length}</span>
          </div>
          <div className="stat-progress-bg">
            <motion.div 
              className="stat-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedTitles.length / TITLE_DATA.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="title-selector-card">
        <h3 className="text-xs uppercase tracking-widest opacity-50 mb-2">Active Title</h3>
        <div className="current-title-display">{activeTitle}</div>
        <div className="titles-grid">
          {TITLE_DATA.map(title => {
            const isUnlocked = unlockedTitles.includes(title.name);
            return (
              <button
                key={title.id}
                className={`title-badge ${activeTitle === title.name ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}`}
                onClick={() => handleTitleSelect(title.name)}
                disabled={!isUnlocked}
              >
                {isUnlocked ? title.name : 'Locked Title'}
              </button>
            );
          })}
        </div>
      </div>

      {renderCategory('learning', 'Learning Path', <BookOpen size={20} />)}
      {renderCategory('mastery', 'Card Mastery', <Eye size={20} />)}
      {renderCategory('testing', 'Scholarly Excellence', <Zap size={20} />)}
      {renderCategory('reading', 'Sacred Readings', <Compass size={20} />)}
      {renderCategory('special', 'Special Feats', <Moon size={20} />)}
      {renderCategory('secret', 'Hidden Mysteries', <Sparkles size={20} />)}

      <AnimatePresence>
        {newBadge && (
          <motion.div 
            className="unlock-toast"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
          >
            <div className="toast-icon">
              <Award size={32} />
            </div>
            <div className="toast-content">
              <h4>Achievement Unlocked!</h4>
              <p>{newBadge.name}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementSystem;
