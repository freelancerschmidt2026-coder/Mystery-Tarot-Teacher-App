import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, PenTool, Sparkles, CheckCircle, Save, ArrowRight, GraduationCap, Target, List, Zap, Bookmark, BrainCircuit } from 'lucide-react';
import { COURSE_DATA } from '../../Courses/CourseData';
import './workbook.css';

const MysteryTarotWorkbook = ({ onNavigate, initialSection }) => {
  const [activePart, setActivePart] = useState(initialSection || 1);
  const [activeExercise, setActiveExercise] = useState(0);

  useEffect(() => {
    if (initialSection) {
      setActivePart(initialSection);
    }
  }, [initialSection]);
  const [workbookData, setWorkbookData] = useState(() => {
    const saved = localStorage.getItem('mystery_tarot_workbook_data');
    return saved ? JSON.parse(saved) : {};
  });
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('mystery_tarot_workbook_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const courseIds = Object.keys(COURSE_DATA).sort((a, b) => parseInt(a) - parseInt(b));
  const currentCourse = COURSE_DATA[activePart];
  
  // Auto-save workbook data
  useEffect(() => {
    localStorage.setItem('mystery_tarot_workbook_data', JSON.stringify(workbookData));
  }, [workbookData]);

  // Auto-save bookmarks
  useEffect(() => {
    localStorage.setItem('mystery_tarot_workbook_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const getExercisesForPart = (part) => {
    const course = COURSE_DATA[part];
    const lesson1 = course?.lessons[0] || "Foundational Concepts";
    const lesson2 = course?.lessons[1] || "Symbolic Exploration";
    const lesson3 = course?.lessons[2] || "Practical Application";
    const prompts = course?.reflectionPrompts || ["How does this lesson resonate with you?", "What is your key takeaway?"];
    const keywords = course?.backpocketKeywords || ["Insight", "Wisdom", "Growth"];
    
    return [
      {
        title: "Archetypal Resonance",
        overview: `Deepen your connection with the core energies of ${lesson1}.`,
        objective: "To identify personal manifestations of archetypal patterns in daily life.",
        instructions: [
          `Find a quiet space to meditate on the themes of ${lesson1}.`,
          "Observe your thoughts and feelings without judgment.",
          `Recall a situation from the last 48 hours that mirrors the keywords: ${keywords.slice(0, 2).join(', ')}.`
        ],
        practice: `Draw one card and write down three ways it relates to the concept of ${lesson1}.`,
        reflectionPrompts: [
          prompts[0] || "How does this archetype challenge your current perspective?",
          "What hidden strength does this energy reveal to you?"
        ],
        challenge: `Live as the primary archetype of ${lesson1} for one hour today. Notice how your interactions change.`,
        type: "foundational",
        lessonId: `c${part}-l1`
      },
      {
        title: "Symbolic Synthesis",
        overview: `Explore the visual language of ${lesson2} through personal interpretation.`,
        objective: "To develop a unique symbolic vocabulary based on intuition and study.",
        instructions: [
          `Select a card that resonates with the themes of ${lesson2}.`,
          "Focus on a single symbol within the image (e.g., a bird, a mountain, a color).",
          "Free-write about what this symbol represents to you personally."
        ],
        practice: "Create a small sketch or collage representing your interpretation of the symbol.",
        reflectionPrompts: [
          prompts[1] || "Why did this specific symbol catch your attention?",
          `How does this symbol connect to the ${keywords[2] || 'core'} energy of this course?`
        ],
        challenge: "Find this symbol in the 'real world' today and note the context.",
        type: "symbolic",
        lessonId: `c${part}-l2`
      },
      {
        title: "Practical Integration",
        overview: `Apply the theoretical knowledge of ${lesson3} to real-world scenarios.`,
        objective: "To bridge the gap between esoteric study and practical wisdom.",
        instructions: [
          `Review the learning objectives for ${course?.title || 'this course'}.`,
          "Identify one area of your life where these teachings are most needed.",
          "Formulate a specific action plan for the coming week."
        ],
        practice: "Perform a 3-card spread focused on 'Action, Obstacle, Outcome' for your integration plan.",
        reflectionPrompts: [
          "What is the biggest hurdle to integrating this knowledge?",
          "How will you know when you have successfully embodied these teachings?"
        ],
        challenge: `Teach one concept from ${lesson3} to a friend or journal as if you were explaining it to a student.`,
        type: "practical",
        lessonId: `c${part}-l3`
      }
    ];
  };

  const exercises = getExercisesForPart(activePart);

  const handleInputChange = (key, value) => {
    setWorkbookData(prev => ({ ...prev, [key]: value }));
  };

  const toggleBookmark = () => {
    const bookmarkId = `part-${activePart}-ex-${activeExercise}`;
    if (bookmarks.includes(bookmarkId)) {
      setBookmarks(bookmarks.filter(id => id !== bookmarkId));
    } else {
      setBookmarks([...bookmarks, bookmarkId]);
    }
  };

  const handleSaveToNotepad = (title, content, section, lessonId) => {
    if (!content || !content.trim()) return;

    const savedNotes = localStorage.getItem('finder_notes');
    const notes = savedNotes ? JSON.parse(savedNotes) : [];
    
    // Save to Workbook Notes
    const workbookNote = {
      id: Date.now(),
      text: `${title}\n\n${content}`,
      page: 'course-workbook',
      section: section || 'Workbook Notes',
      timestamp: new Date().toISOString()
    };

    let updatedNotes = [...notes, workbookNote];

    // If linked to a lesson, also save to Course Notes
    if (lessonId) {
      const courseNote = {
        id: Date.now() + 1,
        text: `[From Workbook] ${title}\n\n${content}`,
        page: lessonId,
        section: 'Course Notes',
        timestamp: new Date().toISOString()
      };
      updatedNotes.push(courseNote);
    }

    localStorage.setItem('finder_notes', JSON.stringify(updatedNotes));

    if (onNavigate) {
      onNavigate('notepad');
    }
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

  const currentEx = exercises[activeExercise];
  const inputKey = `part-${activePart}-ex-${activeExercise}`;
  const isBookmarked = bookmarks.includes(inputKey);

  return (
    <div className="workbook-container">
      {/* Side Navigation */}
      <aside className="workbook-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Workbook</h2>
          <p className="sidebar-subtitle">Mystery Tarot Teacher</p>
        </div>
        <nav className="sidebar-nav">
          {courseIds.map(id => (
            <div key={id} className="nav-section">
              <div className="nav-section-header">Section {romanize(parseInt(id))}</div>
              {exercises.map((ex, idx) => (
                <button
                  key={idx}
                  className={`nav-exercise-btn ${activePart === parseInt(id) && activeExercise === idx ? 'active' : ''}`}
                  onClick={() => {
                    setActivePart(parseInt(id));
                    setActiveExercise(idx);
                  }}
                >
                  {idx + 1}. {ex.title}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="workbook-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activePart}-${activeExercise}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="workbook-page"
          >
            <header className="page-header">
              <div className="flex justify-between items-start">
                <div>
                  <div className="page-label">Section {romanize(activePart)} • Exercise {activeExercise + 1}</div>
                  <h1 className="page-title">{currentEx.title}</h1>
                </div>
                <button 
                  className={`p-2 rounded-full transition-colors ${isBookmarked ? 'text-yellow-500 bg-yellow-500/10' : 'text-white/30 hover:text-white/60'}`}
                  onClick={toggleBookmark}
                  title="Bookmark Exercise"
                >
                  <Bookmark size={24} fill={isBookmarked ? "currentColor" : "none"} />
                </button>
              </div>
            </header>

            <div className="workbook-content-grid">
              <div className="exercise-details">
                <section className="mb-8">
                  <h3 className="exercise-title"><Sparkles size={18} /> Overview</h3>
                  <p className="exercise-description">{currentEx.overview}</p>
                </section>

                <section className="mb-8">
                  <h3 className="exercise-title"><Target size={18} /> Objective</h3>
                  <p className="exercise-description">{currentEx.objective}</p>
                </section>

                <section className="mb-8">
                  <h3 className="exercise-title"><List size={18} /> Instructions</h3>
                  <ul className="list-decimal pl-5 space-y-2 opacity-80">
                    {currentEx.instructions.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </section>

                <section className="mb-8">
                  <h3 className="exercise-title"><Zap size={18} /> Practice Activity</h3>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-lg italic">
                    {currentEx.practice}
                  </div>
                </section>

                <section className="mb-8">
                  <h3 className="exercise-title"><Zap size={18} /> Optional Challenge</h3>
                  <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg text-yellow-200/80 text-sm">
                    <strong>Challenge:</strong> {currentEx.challenge}
                  </div>
                </section>
              </div>

              <div className="exercise-workspace">
                <div className="exercise-card">
                  <h3 className="exercise-title"><PenTool size={20} /> Reflection & Practice</h3>
                  
                  {currentEx.reflectionPrompts.map((prompt, i) => (
                    <div key={i} className="exercise-input-group">
                      <label className="input-label">{prompt}</label>
                      <textarea
                        className="workbook-textarea"
                        placeholder="Write your reflection here..."
                        value={workbookData[`${inputKey}-prompt-${i}`] || ''}
                        onChange={(e) => handleInputChange(`${inputKey}-prompt-${i}`, e.target.value)}
                      />
                      <div className="flex justify-end mt-2">
                        <button 
                          className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                          onClick={() => handleSaveToNotepad(
                            `Reflection: ${currentEx.title} (Prompt ${i+1})`,
                            workbookData[`${inputKey}-prompt-${i}`],
                            'Reflection Archive',
                            currentEx.lessonId
                          )}
                        >
                          <Save size={12} /> Save to Archive
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="exercise-input-group mt-8 pt-8 border-t border-white/10">
                    <label className="input-label">General Exercise Notes</label>
                    <textarea
                      className="workbook-textarea"
                      placeholder="Combine your insights or record additional notes..."
                      value={workbookData[inputKey] || ''}
                      onChange={(e) => handleInputChange(inputKey, e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-4 mt-6">
                    <button 
                      className="save-to-notepad-btn w-full justify-center"
                      onClick={() => handleSaveToNotepad(
                        `Workbook: Section ${romanize(activePart)} - ${currentEx.title}`,
                        workbookData[inputKey],
                        'Workbook Notes',
                        currentEx.lessonId
                      )}
                    >
                      <Save size={16} />
                      Save Full Exercise to NotePad
                    </button>

                    <div className="flex gap-2">
                      <button 
                        className="action-btn secondary flex-1 justify-center text-xs"
                        onClick={() => onNavigate('course-book')}
                      >
                        <Book size={14} />
                        Open Related Chapter
                      </button>
                      <button 
                        className="action-btn secondary flex-1 justify-center text-xs"
                        onClick={() => onNavigate(`course-${activePart}-overview`)}
                      >
                        <GraduationCap size={14} />
                        Review Course
                      </button>
                      <button 
                        className="action-btn secondary flex-1 justify-center text-xs"
                        onClick={() => onNavigate('luna-testing')}
                      >
                        <GraduationCap size={14} />
                        Testing Out
                      </button>
                      <button 
                        className="action-btn secondary flex-1 justify-center text-xs"
                        onClick={() => onNavigate('luna-mentor')}
                      >
                        <BrainCircuit size={14} />
                        Ask Luna
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center opacity-50 text-xs">
              <span>Section Progress</span>
              <div className="flex gap-1">
                {exercises.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1 w-8 rounded-full ${i <= activeExercise ? 'bg-yellow-500' : 'bg-white/20'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default MysteryTarotWorkbook;
