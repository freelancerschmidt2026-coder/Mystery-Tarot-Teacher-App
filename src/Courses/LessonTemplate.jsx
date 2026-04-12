import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, CheckCircle } from 'lucide-react';
import './lessonTemplate.css';

const LessonTemplate = ({ title, content, lessonNumber, onBack, onComplete }) => {
  return (
    <motion.div 
      className="lesson-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <header className="lesson-header">
        <button className="lesson-back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Back to Syllabus</span>
        </button>
        <div className="lesson-meta">
          <span className="lesson-number">Lesson {lessonNumber}</span>
          <h1 className="lesson-title">{title}</h1>
        </div>
      </header>

      <div className="lesson-content">
        <div className="lesson-body">
          {content}
        </div>
      </div>

      <footer className="lesson-footer">
        <button className="lesson-complete-btn" onClick={onComplete}>
          <CheckCircle size={20} />
          <span>Complete Lesson</span>
        </button>
      </footer>
    </motion.div>
  );
};

export default LessonTemplate;
