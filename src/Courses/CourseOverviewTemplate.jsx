import React from 'react';
import { motion } from 'motion/react';
import { Play, FileText, Award, Clock, Users, GraduationCap } from 'lucide-react';
import './courseOverview.css';

const CourseOverviewTemplate = ({ data = null, onStart = () => {}, onViewSyllabus = () => {}, onStartFinal = () => {} }) => {
  if (!data) return <div className="p-20 text-center">Course data not found.</div>;

  return (
    <div className="course-overview-container">
      <motion.div 
        className="course-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="course-title">{data.title}</h1>
        <p className="course-description">{data.overview}</p>
        
        <div className="course-meta">
          <div className="meta-item"><Clock size={16} /> 4 Weeks</div>
          <div className="meta-item"><Users size={16} /> Beginner</div>
          <div className="meta-item"><Award size={16} /> {data.badgeName}</div>
        </div>

        <div className="course-actions">
          <button className="start-course-btn" onClick={onStart}>
            <Play size={18} /> Start Journey
          </button>
          <button className="view-syllabus-btn" onClick={onViewSyllabus}>
            <FileText size={18} /> View Syllabus
          </button>
          <button className="final-exam-btn" onClick={onStartFinal}>
            <GraduationCap size={18} /> Final Exam
          </button>
        </div>
      </motion.div>

      <div className="course-details-grid">
        <section className="details-section">
          <h3>What You Will Learn</h3>
          <ul>
            {data.learningObjectives.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>
        </section>

        <section className="details-section">
          <h3>Course Highlights</h3>
          <div className="highlights-list">
            <div className="highlight-item">
              <span className="highlight-icon">✨</span>
              <span className="highlight-text">Interactive Lessons</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">📓</span>
              <span className="highlight-text">NotePad Integration</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">🎴</span>
              <span className="highlight-text">Deck Building Focus</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseOverviewTemplate;
