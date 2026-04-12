import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, CheckCircle, Lightbulb, ClipboardList, Star, Award, ChevronLeft, MessageSquare, Book, Pocket, FileText, Gamepad2 } from 'lucide-react';
import './courseSyllabus.css';

const CourseSyllabusTemplate = ({ data = null, onBack = () => {}, onSelectLesson = () => {}, onSelectWorksheet = () => {}, onSelectArcade = () => {} }) => {
  if (!data) return <div className="p-20 text-center">Course data not found.</div>;

  const worksheets = data.worksheets ? Object.entries(data.worksheets) : [];

  return (
    <div className="course-syllabus-container">
      <button className="back-to-overview" onClick={onBack}>
        <ChevronLeft size={18} /> Back to Overview
      </button>

      <header className="syllabus-header">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {data.title}: Syllabus
        </motion.h1>
        <p className="syllabus-subtitle">Your path to mastery begins here.</p>
      </header>

      <div className="syllabus-grid">
        <section className="syllabus-section overview">
          <h2><BookOpen size={20} /> Overview</h2>
          <p>{data.overview}</p>
        </section>

        <section className="syllabus-section learning-objectives">
          <h2><CheckCircle size={20} /> What You Will Learn</h2>
          <ul>
            {data.learningObjectives.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>
        </section>

        <section className="syllabus-section lesson-breakdown">
          <h2><ClipboardList size={20} /> Lesson Breakdown</h2>
          <div className="lessons-list">
            {data.lessons.map((lesson, i) => (
              <motion.div 
                key={i} 
                className="lesson-item clickable"
                whileHover={{ scale: 1.02, x: 10 }}
                onClick={() => onSelectLesson && onSelectLesson(i + 1)}
              >
                <span className="lesson-num">Lesson {i + 1}</span>
                <span className="lesson-title">{lesson}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {worksheets.length > 0 && (
          <section className="syllabus-section worksheets">
            <h2><FileText size={20} /> Initiation Worksheets</h2>
            <div className="lessons-list">
              {worksheets.map(([id, ws]) => (
                <motion.div 
                  key={id} 
                  className="lesson-item clickable worksheet-item"
                  whileHover={{ scale: 1.02, x: 10 }}
                  onClick={() => onSelectWorksheet && onSelectWorksheet(id)}
                >
                  <span className="lesson-num">WS</span>
                  <div className="flex flex-col">
                    <span className="lesson-title">{ws.title}</span>
                    <span className="text-xs opacity-50">{ws.subtitle}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        <section className="syllabus-section arcade-preview">
          <h2><Gamepad2 size={20} /> Luna Training Arcade</h2>
          <p className="text-sm opacity-70 mb-4">Practice your skills with mystical mini-games.</p>
          <motion.button 
            className="arcade-launch-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSelectArcade}
          >
            Enter Arcade
          </motion.button>
        </section>

        <div className="syllabus-row">
          <section className="syllabus-section activities required">
            <h2><Star size={20} /> Required Activities</h2>
            <ul>
              {data.requiredActivities.map((act, i) => (
                <li key={i}>{act}</li>
              ))}
            </ul>
          </section>

          <section className="syllabus-section activities optional">
            <h2><Lightbulb size={20} /> Optional Activities</h2>
            <ul>
              {data.optionalActivities.map((act, i) => (
                <li key={i}>{act}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="syllabus-section reflection">
          <h2><MessageSquare size={20} /> Reflection Prompts</h2>
          <ul>
            {data.reflectionPrompts.map((prompt, i) => (
              <li key={i}>{prompt}</li>
            ))}
          </ul>
        </section>

        <div className="syllabus-row">
          <section className="syllabus-section assignments">
            <h2><Book size={20} /> NotePad Assignments</h2>
            <ul>
              {data.notepadAssignments.map((assign, i) => (
                <li key={i}>{assign}</li>
              ))}
            </ul>
          </section>

          <section className="syllabus-section keywords">
            <h2><Pocket size={20} /> BackPocket Keywords</h2>
            <div className="keyword-tags">
              {data.backpocketKeywords.map((word, i) => (
                <span key={i} className="keyword-tag">{word}</span>
              ))}
            </div>
          </section>
        </div>

        <section className="syllabus-section badge-section">
          <div className="badge-card">
            <Award size={48} className="badge-icon" />
            <div className="badge-info">
              <h3>Completion Badge: {data.badgeName}</h3>
              <p>Awarded upon successful completion of all required activities.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseSyllabusTemplate;
