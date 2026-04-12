import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, GraduationCap, Sparkles, Scroll, Lightbulb, History, Target, PenTool, Bookmark, ChevronRight, BrainCircuit } from 'lucide-react';
import { COURSE_DATA } from '../../Courses/CourseData';
import './courseBook.css';

const MysteryTarotCourseBook = ({ onNavigate }) => {
  const [activePart, setActivePart] = useState(1);
  const [activeChapter, setActiveChapter] = useState(0);
  const [reflections, setReflections] = useState({});

  const courseIds = Object.keys(COURSE_DATA).sort((a, b) => parseInt(a) - parseInt(b));
  const currentCourse = COURSE_DATA[activePart];
  const currentLesson = currentCourse.lessons[activeChapter];

  const handleOpenLesson = () => {
    if (onNavigate) {
      onNavigate(`course-${activePart}-lesson-${activeChapter}`);
    }
  };

  const handleSaveReflection = (text) => {
    const key = `part-${activePart}-chapter-${activeChapter}`;
    setReflections(prev => ({ ...prev, [key]: text }));
    // In a real app, we'd save this to a database or localStorage
  };

  const romanize = (num) => {
    const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    let roman = '';
    for (let i in lookup) {
      while (num >= lookup[i]) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  };

  return (
    <div className="course-book-container">
      {/* Side Navigation */}
      <aside className="book-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Course Book</h2>
          <p className="sidebar-subtitle">Mystery Tarot Teacher</p>
        </div>
        <nav className="sidebar-nav">
          {courseIds.map(id => (
            <div key={id} className="nav-part">
              <div className="nav-part-header">Part {romanize(parseInt(id))}</div>
              {COURSE_DATA[id].lessons.map((lesson, idx) => (
                <button
                  key={idx}
                  className={`nav-chapter-btn ${activePart === parseInt(id) && activeChapter === idx ? 'active' : ''}`}
                  onClick={() => {
                    setActivePart(parseInt(id));
                    setActiveChapter(idx);
                  }}
                >
                  {idx + 1}. {lesson}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="book-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activePart}-${activeChapter}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="book-page"
          >
            <header className="page-header">
              <div className="page-part-label">Part {romanize(activePart)} • Chapter {activeChapter + 1}</div>
              <h1 className="page-title">{currentLesson}</h1>
              <div className="page-actions">
                <button className="action-btn primary" onClick={handleOpenLesson}>
                  <GraduationCap size={18} />
                  Open Related Lesson
                </button>
                <button className="action-btn secondary" onClick={() => onNavigate('luna-testing')}>
                  <GraduationCap size={18} />
                  Testing Out
                </button>
                <button className="action-btn secondary" onClick={() => onNavigate('luna-mentor')}>
                  <BrainCircuit size={18} />
                  Ask Luna
                </button>
                <button className="action-btn secondary">
                  <Bookmark size={18} />
                  Bookmark Page
                </button>
              </div>
            </header>

            <div className="page-content">
              <section className="chapter-section">
                <h3 className="section-title"><Scroll size={20} /> Overview</h3>
                <div className="section-content">
                  <p>
                    In this chapter, we delve into the profound mysteries of <strong>{currentLesson}</strong>. 
                    As a core component of <em>{currentCourse.title}</em>, this exploration focuses on 
                    {currentCourse.learningObjectives[activeChapter % currentCourse.learningObjectives.length].toLowerCase()}.
                  </p>
                  <p className="mt-4">
                    {currentCourse.overview}
                  </p>
                </div>
              </section>

              <section className="chapter-section">
                <h3 className="section-title"><Lightbulb size={20} /> Key Concepts</h3>
                <div className="section-content">
                  <ul className="concept-list">
                    {currentCourse.backpocketKeywords?.slice(0, 3).map((keyword, i) => (
                      <li key={i} className="concept-item">
                        <span className="concept-name">{keyword}</span>
                        <p className="text-sm opacity-70">
                          A fundamental pillar of this lesson, representing the {keyword.toLowerCase()} aspect of the tarot journey.
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="chapter-section">
                <h3 className="section-title"><Sparkles size={20} /> Symbolic Themes</h3>
                <div className="section-content">
                  <p>
                    The symbolism in this chapter revolves around the archetypal energy of {currentLesson}. 
                    We examine how the visual language of the cards communicates deep spiritual truths through 
                    metaphor and artistic expression.
                  </p>
                </div>
              </section>

              <section className="chapter-section">
                <h3 className="section-title"><History size={20} /> Historical Notes</h3>
                <div className="section-content">
                  <p>
                    Historically, the concepts explored here have roots in Renaissance philosophy and 
                    the evolution of esoteric traditions. The {currentLesson} has been interpreted 
                    by masters throughout the centuries, each adding a layer to its rich tapestry.
                  </p>
                </div>
              </section>

              <section className="chapter-section">
                <h3 className="section-title"><Target size={20} /> Practical Application</h3>
                <div className="section-content">
                  <p>
                    To apply these teachings, focus on {currentCourse.learningObjectives[0].toLowerCase()}. 
                    Try incorporating the following into your daily practice:
                  </p>
                  <ul className="list-disc pl-5 mt-3 space-y-2">
                    {currentCourse.requiredActivities?.map((activity, i) => (
                      <li key={i}>{activity}</li>
                    ))}
                  </ul>
                </div>
              </section>

              <div className="reflection-box">
                <h3 className="reflection-title"><PenTool size={20} /> Reflection Questions</h3>
                <div className="reflection-content">
                  {currentCourse.reflectionPrompts?.map((prompt, i) => (
                    <div key={i} className="mb-6">
                      <p className="reflection-prompt">{prompt}</p>
                      <textarea
                        className="reflection-input"
                        placeholder="Record your insights here..."
                        value={reflections[`part-${activePart}-chapter-${activeChapter}-q-${i}`] || ''}
                        onChange={(e) => handleSaveReflection(e.target.value, i)}
                      />
                      <button 
                        className="mt-2 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                        onClick={() => {
                          if (onNavigate) onNavigate('course-book-save-reflection');
                        }}
                      >
                        <Sparkles size={12} /> Add to NotePad
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default MysteryTarotCourseBook;
