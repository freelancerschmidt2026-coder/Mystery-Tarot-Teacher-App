import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Award, BookOpen, CheckCircle, Lock, Edit3, Save, X, Trash2, History, Star, ShieldCheck, GraduationCap, Trophy } from 'lucide-react';
import { TAROT_CARDS } from '../FlashCards/TarotData';
import './readerProfile.css';

const ReaderProfile = () => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('reader_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Seeker',
      pronouns: 'They/Them',
      decks: ['The Mystery Deck'],
      specialties: ['Intuitive Reading'],
      certificationLevel: 'Novice Finder'
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [testHistory, setTestHistory] = useState(() => {
    const saved = localStorage.getItem('luna_test_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [courseProgress, setCourseProgress] = useState(() => {
    const saved = localStorage.getItem('finder_course_progress');
    return saved ? JSON.parse(saved) : {};
  });

  const [rank, setRank] = useState(() => {
    const saved = localStorage.getItem('luna_reader_rank');
    return saved ? JSON.parse(saved) : { id: 'novice', name: 'Novice Reader', index: 0 };
  });

  const [activeTitle, setActiveTitle] = useState(() => {
    return localStorage.getItem('luna_active_title') || 'Student of the Arcana';
  });

  const [earnedBadges, setEarnedBadges] = useState(() => {
    return JSON.parse(localStorage.getItem('luna_earned_badges') || '[]');
  });

  useEffect(() => {
    localStorage.setItem('reader_profile', JSON.stringify(profile));
  }, [profile]);

  // Unlock Logic
  const totalCards = TAROT_CARDS.length;
  const masteredCards = TAROT_CARDS.filter(card => 
    testHistory.some(h => h.cardId === card.id && h.score >= 80)
  ).length;
  
  const coursesCompleted = Object.values(courseProgress).filter(v => v === true).length;
  const totalCourses = 10; // Based on CourseData.js

  const hasPassedExams = testHistory.some(h => h.type === 'Oral Exam') && testHistory.some(h => h.type === 'Written Exam');
  
  const isUnlocked = masteredCards === totalCards && coursesCompleted === totalCourses && hasPassedExams;

  // For Demo/Testing purposes, let's add a "Force Unlock" toggle if needed, 
  // but for now we follow the rules.
  
  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setProfile({
      ...profile,
      name: formData.get('name'),
      pronouns: formData.get('pronouns'),
      specialties: formData.get('specialties').split(',').map(s => s.trim()),
    });
    setIsEditing(false);
  };

  if (!isUnlocked) {
    return (
      <div className="reader-profile-locked">
        <motion.div 
          className="lock-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="lock-icon-wrapper">
            <Lock size={48} className="text-amber-400" />
          </div>
          <h2 className="text-2xl font-serif text-amber-200 mb-4">Reader Profile Locked</h2>
          <p className="opacity-70 mb-8 text-center max-w-md">
            The full Reader Profile is a mark of a Master Finder. Complete your training to unlock your official certification.
          </p>
          
          <div className="requirements-list">
            <div className={`requirement-item ${coursesCompleted === totalCourses ? 'completed' : ''}`}>
              <BookOpen size={18} />
              <span>Courses Completed: {coursesCompleted} / {totalCourses}</span>
              {coursesCompleted === totalCourses && <CheckCircle size={16} className="text-green-400 ml-auto" />}
            </div>
            <div className={`requirement-item ${masteredCards === totalCards ? 'completed' : ''}`}>
              <Award size={18} />
              <span>Card Mastery: {masteredCards} / {totalCards}</span>
              {masteredCards === totalCards && <CheckCircle size={16} className="text-green-400 ml-auto" />}
            </div>
            <div className={`requirement-item ${hasPassedExams ? 'completed' : ''}`}>
              <ShieldCheck size={18} />
              <span>Exams Passed (Oral & Written)</span>
              {hasPassedExams && <CheckCircle size={16} className="text-green-400 ml-auto" />}
            </div>
          </div>

          <div className="mt-8 p-4 bg-amber-900/20 border border-amber-500/30 rounded-lg text-xs italic text-amber-200/70">
            "Only when the Fool has walked the entire path can the true Reader be revealed." — Luna
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="reader-profile-container">
      <header className="profile-header">
        <div className="profile-avatar">
          <User size={40} />
        </div>
        <div className="profile-main-info">
          {isEditing ? (
            <form onSubmit={handleSave} className="edit-form">
              <div className="flex gap-4 mb-4">
                <input name="name" defaultValue={profile.name} placeholder="Name" className="profile-input" required />
                <input name="pronouns" defaultValue={profile.pronouns} placeholder="Pronouns" className="profile-input" />
              </div>
              <textarea name="specialties" defaultValue={profile.specialties.join(', ')} placeholder="Specialties (comma separated)" className="profile-textarea" />
              <div className="flex gap-2">
                <button type="submit" className="save-btn"><Save size={16} /> Save</button>
                <button type="button" onClick={() => setIsEditing(false)} className="cancel-btn"><X size={16} /> Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-serif text-blue-200">{profile.name}</h1>
                <span className="text-sm opacity-50 italic">({profile.pronouns})</span>
                <button onClick={() => setIsEditing(true)} className="edit-icon-btn"><Edit3 size={16} /></button>
              </div>
              <div className="text-blue-300 font-serif italic tracking-wider mb-2">{activeTitle}</div>
              <div className="certification-badge">
                <ShieldCheck size={16} /> {profile.certificationLevel}
              </div>
              <div className="rank-badge-profile mt-2">
                <Trophy size={14} className="text-yellow-200" /> {rank.name}
              </div>
              <div className="specialties-tags">
                {profile.specialties.map(s => <span key={s} className="specialty-tag">{s}</span>)}
              </div>
            </>
          )}
        </div>
      </header>

      <div className="profile-grid">
        {/* Left Column: Stats & Badges */}
        <div className="profile-column">
          <section className="profile-section">
            <h3 className="section-title"><GraduationCap size={18} /> Academic Standing</h3>
            <div className="stats-card">
              <div className="stat-item">
                <span className="stat-label">Courses</span>
                <span className="stat-value">{coursesCompleted}/10</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Mastery</span>
                <span className="stat-value">{masteredCards}/{totalCards}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Avg Grade</span>
                <span className="stat-value">
                  {testHistory.length > 0 
                    ? Math.round(testHistory.reduce((a, b) => a + b.score, 0) / testHistory.length) 
                    : 0}%
                </span>
              </div>
            </div>
          </section>

          <section className="profile-section">
            <h3 className="section-title"><Award size={18} /> Earned Badges</h3>
            <div className="badges-grid">
              {earnedBadges.length === 0 ? (
                <p className="text-[10px] opacity-40 italic">No badges earned yet.</p>
              ) : (
                earnedBadges.slice(0, 8).map(id => (
                  <div key={id} className="badge-item">
                    <Star size={20} />
                    <span>{id.replace(/-/g, ' ').toUpperCase()}</span>
                  </div>
                ))
              )}
              {earnedBadges.length > 8 && <p className="text-[10px] opacity-40 mt-2">See achievements for more</p>}
            </div>
          </section>

          <section className="profile-section">
            <h3 className="section-title"><Layers size={18} /> Registered Decks</h3>
            <div className="decks-list">
              {profile.decks.map(deck => (
                <div key={deck} className="deck-item">
                  <Layers size={14} /> <span>{deck}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: History & Evaluations */}
        <div className="profile-column">
          <section className="profile-section">
            <h3 className="section-title"><History size={18} /> Testing History</h3>
            <div className="history-list">
              {testHistory.slice(0, 5).map(test => (
                <div key={test.id} className="history-item">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">{test.cardName || test.type}</span>
                    <span className={`score ${test.score >= 80 ? 'pass' : 'fail'}`}>{test.score}%</span>
                  </div>
                  <div className="text-[10px] opacity-50">{new Date(test.date).toLocaleDateString()} • {test.type}</div>
                </div>
              ))}
              {testHistory.length > 5 && <p className="text-center text-[10px] opacity-40 mt-2">See NotePad for full history</p>}
            </div>
          </section>

          <section className="profile-section">
            <h3 className="section-title"><MessageSquare size={18} /> Luna Evaluations</h3>
            <div className="evaluations-list">
              {testHistory.filter(h => h.feedback).slice(0, 3).map(evalItem => (
                <div key={evalItem.id} className="evaluation-item">
                  <div className="eval-meta">
                    <span className="font-bold">{evalItem.cardName}</span>
                    <span className="opacity-50">{new Date(evalItem.date).toLocaleDateString()}</span>
                  </div>
                  <p className="eval-text italic">"{evalItem.feedback}"</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReaderProfile;
