import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Award, 
  Star, 
  TrendingUp, 
  CheckCircle, 
  Lock, 
  Sparkles, 
  MessageSquare, 
  BookOpen, 
  GraduationCap,
  ChevronRight,
  ShieldCheck,
  Zap,
  BarChart3
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { TAROT_CARDS } from '../../FlashCards/TarotData';
import './ranking.css';

const RANK_TIERS = [
  { id: 'novice', name: 'Novice Reader', icon: <Star size={24} />, minReadings: 0, minScore: 0, minMastery: 0, minCourses: 0 },
  { id: 'adept', name: 'Adept Reader', icon: <TrendingUp size={24} />, minReadings: 5, minScore: 70, minMastery: 10, minCourses: 2 },
  { id: 'skilled', name: 'Skilled Reader', icon: <Zap size={24} />, minReadings: 15, minScore: 75, minMastery: 25, minCourses: 5 },
  { id: 'expert', name: 'Expert Reader', icon: <Award size={24} />, minReadings: 30, minScore: 80, minMastery: 50, minCourses: 8 },
  { id: 'master', name: 'Master Reader', icon: <Trophy size={24} />, minReadings: 50, minScore: 85, minMastery: 78, minCourses: 10 },
  { id: 'elite', name: 'Luna-Certified Elite', icon: <ShieldCheck size={24} />, minReadings: 75, minScore: 90, minMastery: 78, minCourses: 10, requiresCert: true },
];

const ReaderRanking = ({ onNavigate = () => {} }) => {
  const [stats, setStats] = useState({
    readingsCount: 0,
    avgScore: 0,
    masteryCount: 0,
    coursesCount: 0,
    isCertified: false,
    completionSpeed: 'Normal', // Mocked or calculated
    practiceQuality: 0
  });

  const [currentRank, setCurrentRank] = useState(RANK_TIERS[0]);
  const [nextRank, setNextRank] = useState(RANK_TIERS[1]);
  const [lunaGuidance, setLunaGuidance] = useState('');
  const [isLoadingGuidance, setIsLoadingGuidance] = useState(false);

  useEffect(() => {
    calculateStats();
  }, []);

  const calculateStats = () => {
    const testHistory = JSON.parse(localStorage.getItem('luna_test_history') || '[]');
    const passedCourses = JSON.parse(localStorage.getItem('luna_passed_courses') || '[]');
    const practiceReadings = JSON.parse(localStorage.getItem('luna_practice_readings') || '[]');
    const capstoneResult = JSON.parse(localStorage.getItem('luna_capstone_result') || 'null');
    
    // Mastery: cards with score >= 80
    const masteryCount = TAROT_CARDS.filter(card => 
      testHistory.some(h => h.cardId === card.id && h.score >= 80)
    ).length;

    const readingsCount = practiceReadings.length + (capstoneResult ? 1 : 0);
    
    const allScores = [
      ...testHistory.map(h => h.score),
      ...practiceReadings.map(r => r.score || 0),
      ...(capstoneResult ? [capstoneResult.score] : [])
    ];
    
    const avgScore = allScores.length > 0 
      ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) 
      : 0;

    const isCertified = capstoneResult?.passed || false;
    const coursesCount = passedCourses.length;

    const newStats = {
      readingsCount,
      avgScore,
      masteryCount,
      coursesCount,
      isCertified,
      completionSpeed: coursesCount > 5 ? 'Swift' : 'Steady',
      practiceQuality: avgScore
    };

    setStats(newStats);
    determineRank(newStats);
  };

  const determineRank = (currentStats) => {
    let rankIndex = 0;
    for (let i = RANK_TIERS.length - 1; i >= 0; i--) {
      const tier = RANK_TIERS[i];
      const metReadings = currentStats.readingsCount >= tier.minReadings;
      const metScore = currentStats.avgScore >= tier.minScore;
      const metMastery = currentStats.masteryCount >= tier.minMastery;
      const metCourses = currentStats.coursesCount >= tier.minCourses;
      const metCert = tier.requiresCert ? currentStats.isCertified : true;

      if (metReadings && metScore && metMastery && metCourses && metCert) {
        rankIndex = i;
        break;
      }
    }

    const rank = RANK_TIERS[rankIndex];
    setCurrentRank(rank);
    setNextRank(RANK_TIERS[rankIndex + 1] || null);
    
    // Save rank to localStorage for marketplace/profile
    localStorage.setItem('luna_reader_rank', JSON.stringify({
      id: rank.id,
      name: rank.name,
      index: rankIndex
    }));

    fetchLunaGuidance(rank, currentStats);
  };

  const fetchLunaGuidance = async (rank, currentStats) => {
    setIsLoadingGuidance(true);
    try {
      const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

      const prompt = `
        You are Luna, the AI High Priestess of the Mystery Tarot Academy.
        A student is currently ranked as a "${rank.name}".
        
        Their stats:
        - Readings Completed: ${currentStats.readingsCount}
        - Average Score: ${currentStats.avgScore}%
        - Card Mastery: ${currentStats.masteryCount}/78
        - Courses Completed: ${currentStats.coursesCount}/10
        - Certified: ${currentStats.isCertified ? 'Yes' : 'No'}
        
        Provide a short, mystical, and encouraging guidance (max 3 sentences) on how they can ascend to the next rank or deepen their practice. 
        Focus on their weakest area.
      `;

      const result = await model.generateContent(prompt);
      setLunaGuidance(result.response.text());
    } catch (error) {
      console.error("Luna's guidance failed:", error);
      setLunaGuidance("The stars are veiled today, but your path remains clear: continue your studies and the wisdom will follow.");
    } finally {
      setIsLoadingGuidance(false);
    }
  };

  const calculateProgress = () => {
    if (!nextRank) return 100;
    
    // Simple average of progress across 4 main metrics
    const pReadings = Math.min(100, (stats.readingsCount / nextRank.minReadings) * 100) || 0;
    const pScore = Math.min(100, (stats.avgScore / nextRank.minScore) * 100) || 0;
    const pMastery = Math.min(100, (stats.masteryCount / nextRank.minMastery) * 100) || 0;
    const pCourses = Math.min(100, (stats.coursesCount / nextRank.minCourses) * 100) || 0;
    
    return Math.round((pReadings + pScore + pMastery + pCourses) / 4);
  };

  return (
    <div className="ranking-container">
      <div className="ranking-header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <BarChart3 size={48} className="mx-auto mb-4 text-blue-200" />
          <h1>Reader Ranking</h1>
          <p>Your evolution within the hermetic hierarchy.</p>
        </motion.div>
      </div>

      <div className="current-rank-display">
        <motion.div 
          className="rank-badge-large"
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12 }}
        >
          {currentRank.icon}
        </motion.div>
        <h2 className="rank-title">{currentRank.name}</h2>
        
        {nextRank && (
          <div className="rank-progress-section">
            <div className="rank-progress-labels">
              <span>Progress to {nextRank.name}</span>
              <span>{calculateProgress()}%</span>
            </div>
            <div className="rank-progress-bar-bg">
              <motion.div 
                className="rank-progress-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${calculateProgress()}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="ranking-grid">
        <div className="ranking-card">
          <h2><BarChart3 size={20} /> Reading Statistics</h2>
          <div className="stats-list">
            <div className="stat-item">
              <span className="stat-label">Readings Completed</span>
              <span className="stat-value">{stats.readingsCount}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Average Luna Score</span>
              <span className="stat-value">{stats.avgScore}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Card Mastery</span>
              <span className="stat-value">{stats.masteryCount} / 78</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Courses Completed</span>
              <span className="stat-value">{stats.coursesCount} / 10</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Completion Speed</span>
              <span className="stat-value">{stats.completionSpeed}</span>
            </div>
          </div>
        </div>

        <div className="ranking-card">
          <h2><ShieldCheck size={20} /> Next Rank Requirements</h2>
          {nextRank ? (
            <div className="requirements-list">
              <div className={`req-item ${stats.readingsCount >= nextRank.minReadings ? 'met' : 'unmet'}`}>
                {stats.readingsCount >= nextRank.minReadings ? <CheckCircle size={14} /> : <Lock size={14} />}
                {nextRank.minReadings} Readings Completed
              </div>
              <div className={`req-item ${stats.avgScore >= nextRank.minScore ? 'met' : 'unmet'}`}>
                {stats.avgScore >= nextRank.minScore ? <CheckCircle size={14} /> : <Lock size={14} />}
                {nextRank.minScore}% Average Score
              </div>
              <div className={`req-item ${stats.masteryCount >= nextRank.minMastery ? 'met' : 'unmet'}`}>
                {stats.masteryCount >= nextRank.minMastery ? <CheckCircle size={14} /> : <Lock size={14} />}
                {nextRank.minMastery} Cards Mastered
              </div>
              <div className={`req-item ${stats.coursesCount >= nextRank.minCourses ? 'met' : 'unmet'}`}>
                {stats.coursesCount >= nextRank.minCourses ? <CheckCircle size={14} /> : <Lock size={14} />}
                {nextRank.minCourses} Courses Completed
              </div>
              {nextRank.requiresCert && (
                <div className={`req-item ${stats.isCertified ? 'met' : 'unmet'}`}>
                  {stats.isCertified ? <CheckCircle size={14} /> : <Lock size={14} />}
                  Luna Certification
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Sparkles className="mx-auto mb-4 text-yellow-200" size={32} />
              <p className="font-serif italic">You have reached the pinnacle of the Academy.</p>
            </div>
          )}
        </div>
      </div>

      <div className="luna-guidance-section">
        <div className="luna-guidance-card">
          <div className="luna-guidance-header">
            <Sparkles size={20} className="text-blue-300" />
            <h3 className="font-serif text-blue-200">Luna's Guidance</h3>
          </div>
          <div className="luna-guidance-content">
            {isLoadingGuidance ? (
              <div className="guidance-loading">
                <div className="guidance-spinner"></div>
                <span>Luna is consulting the oracle...</span>
              </div>
            ) : (
              <p>"{lunaGuidance}"</p>
            )}
          </div>
        </div>
      </div>

      <div className="rank-tiers-list">
        <h3 className="text-xs uppercase tracking-widest opacity-40 mb-4">The Hierarchical Path</h3>
        {RANK_TIERS.map((tier, idx) => {
          const isActive = currentRank.id === tier.id;
          const isLocked = stats.readingsCount < tier.minReadings || 
                           stats.avgScore < tier.minScore || 
                           stats.masteryCount < tier.minMastery || 
                           stats.coursesCount < tier.minCourses ||
                           (tier.requiresCert && !stats.isCertified);
          
          return (
            <div key={tier.id} className={`tier-item ${isActive ? 'active' : ''} ${isLocked && !isActive ? 'locked' : ''}`}>
              <div className="flex items-center gap-3">
                <span className="opacity-30 text-xs">{idx + 1}</span>
                <div className="scale-75">{tier.icon}</div>
                <span>{tier.name}</span>
              </div>
              {isActive && <span className="text-[10px] uppercase font-bold text-yellow-200">Current</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReaderRanking;
