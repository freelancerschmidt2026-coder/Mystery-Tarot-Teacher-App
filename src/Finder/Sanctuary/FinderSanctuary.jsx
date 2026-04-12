import React from 'react';
import { motion } from 'motion/react';
import { 
  Map, 
  Library, 
  Layout, 
  Sparkles, 
  Award, 
  Trophy, 
  GraduationCap, 
  BookOpen, 
  PenTool, 
  MessageSquare, 
  Play, 
  Calendar, 
  Search, 
  BrainCircuit,
  Star,
  User,
  Moon,
  Palette,
  ShoppingBag,
  Book
} from 'lucide-react';
import { userStore } from "../../state/UserState/userStore";
import './finderSanctuary.css';

const FinderSanctuary = ({ onNavigate = () => {}, onQuickAction = () => {} }) => {
  const user = userStore.getState().user || { name: "Member", level: 1 };
  const finderName = user.name;
  const tiles = [
    { id: 'member-profile', name: 'Your Profile', subtitle: 'Your sacred journey', icon: <User size={24} />, color: 'rgba(255, 255, 255, 0.3)' },
    { id: 'community-constellation', name: 'Constellation', subtitle: 'The collective map', icon: <Star size={24} />, color: 'rgba(167, 139, 250, 0.3)' },
    { id: 'dreamwork', name: 'Dreamwork', subtitle: 'Subconscious exploration', icon: <Moon size={24} />, color: 'rgba(167, 139, 250, 0.3)' },
    { id: 'design-studio', name: 'Design Studio', subtitle: 'Create your Arcana', icon: <Palette size={24} />, color: 'rgba(255, 255, 255, 0.3)' },
    { id: 'addons-store', name: 'Mystery Store', subtitle: 'Premium upgrades', icon: <ShoppingBag size={24} />, color: 'rgba(251, 191, 36, 0.3)' },
    { id: 'marketplace', name: 'Marketplace', subtitle: 'Reader services & art', icon: <ShoppingBag size={24} />, color: 'rgba(167, 139, 250, 0.3)' },
    { id: 'journey', name: 'Journey Map', subtitle: 'See your path unfold', icon: <Map size={24} />, color: 'rgba(255, 255, 255, 0.3)' },
    { id: 'tarot-library', name: 'Tarot Library', subtitle: 'The collective wisdom', icon: <Library size={24} />, color: 'rgba(251, 191, 36, 0.3)' },
    { id: 'tarot-encyclopedia', name: 'Tarot Encyclopedia', subtitle: 'Deep research vault', icon: <Book size={24} />, color: 'rgba(59, 130, 246, 0.3)' },
    { id: 'spread-builder', name: 'Spread Builder', subtitle: 'Design your own spreads', icon: <Layout size={24} />, color: 'rgba(167, 139, 250, 0.3)' },
    { id: 'ritual-mode', name: 'Rituals', subtitle: 'Sacred reading space', icon: <Sparkles size={24} />, color: 'rgba(244, 114, 182, 0.3)' },
    { id: 'achievements', name: 'Achievements', subtitle: 'Your sacred badges', icon: <Award size={24} />, color: 'rgba(243, 229, 171, 0.3)' },
    { id: 'ranking', name: 'Ranking', subtitle: 'Ascend the hierarchy', icon: <Trophy size={24} />, color: 'rgba(173, 216, 230, 0.3)' },
    { id: 'certification', name: 'Certification', subtitle: 'The final threshold', icon: <Award size={24} />, color: 'rgba(243, 229, 171, 0.3)' },
    { id: 'luna-testing', name: 'Testing Out', subtitle: 'Prove your knowledge', icon: <GraduationCap size={24} />, color: 'rgba(173, 216, 230, 0.3)' },
    { id: 'course-workbook', name: 'Workbook', subtitle: 'Practice and reflection', icon: <PenTool size={24} />, color: 'rgba(251, 191, 36, 0.3)' },
    { id: 'course-book', name: 'Course Book', subtitle: 'The core teachings', icon: <BookOpen size={24} />, color: 'rgba(251, 191, 36, 0.3)' },
  ];

  const quickActions = [
    { id: 'ask-luna', name: 'Ask Luna', icon: <BrainCircuit size={18} />, action: 'luna-mentor' },
    { id: 'continue-course', name: 'Continue Course', icon: <Play size={18} />, action: 'courses' },
    { id: 'daily-ritual', name: 'Daily Ritual', icon: <Sparkles size={18} />, action: 'ritual-mode' },
    { id: 'card-of-the-day', name: 'Card of the Day', icon: <Star size={18} />, action: 'flashcards' },
    { id: 'review-mastery', name: 'Review Mastery', icon: <Search size={18} />, action: 'flashcards' },
  ];

  return (
    <div className="sanctuary-dashboard">
      {/* Atmosphere Elements */}
      <div className="sanctuary-atmosphere">
        <div className="celestial-bg"></div>
        <div className="particle-container">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>
      </div>

      <div className="sanctuary-content">
        <header className="sanctuary-header">
          <motion.div 
            className="welcome-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <h1
              style={{
                background: 'linear-gradient(90deg, #6EC1FF, #FFFFFF, #FFB7E8)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block'
              }}
            >
              Welcome, Finder. To Your Mystery Tarot Teacher
            </h1>
            <p>Your creative sanctuary awaits.</p>
          </motion.div>

          <div className="quick-actions">
            {quickActions.map((action) => (
              <motion.button
                key={action.id}
                className="quick-action-btn"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(action.action)}
              >
                {action.icon}
                <span>{action.name}</span>
              </motion.button>
            ))}
          </div>
        </header>

        <div className="sanctuary-grid">
          {tiles.map((tile) => (
            <motion.button
              key={tile.id}
              className={`sanctuary-tile ${tile.id}-tile`}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: `0 0 40px ${tile.color}`,
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(tile.id)}
            >
              <div className="tile-icon">{tile.icon}</div>
              <div className="tile-info">
                <span className="tile-name">{tile.name}</span>
                <span className="tile-subtitle">{tile.subtitle}</span>
              </div>
              <div className="tile-glow" style={{ background: `radial-gradient(circle at center, ${tile.color}, transparent 70%)` }}></div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinderSanctuary;
