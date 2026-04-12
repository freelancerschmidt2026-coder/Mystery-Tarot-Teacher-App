import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Award, 
  CheckCircle, 
  Lock, 
  ChevronRight, 
  BookOpen, 
  GraduationCap, 
  Star, 
  Send, 
  Mic, 
  Save,
  FileText,
  ShieldCheck,
  Globe,
  Download,
  Printer,
  X
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import confetti from 'canvas-confetti';
import { TAROT_CARDS } from '../FlashCards/TarotData';
import './certification.css';

const CertificationEngine = ({ onNavigate }) => {
  const [stats, setStats] = useState({
    coursesPassed: [],
    finalExamsPassed: [],
    majorMastered: 0,
    minorMastered: 0,
    practiceReadings: [],
    capstoneResult: null,
    isEligible: false
  });

  const [showSubmission, setShowSubmission] = useState(false);
  const [isGrading, setIsGrading] = useState(false);
  const [capstoneContent, setCapstoneContent] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const passedCourses = JSON.parse(localStorage.getItem('luna_passed_courses') || '[]');
    const finalHistory = JSON.parse(localStorage.getItem('luna_final_exam_history') || '[]');
    const testHistory = JSON.parse(localStorage.getItem('luna_test_history') || '[]');
    const practiceReadings = JSON.parse(localStorage.getItem('luna_practice_readings') || '[]');
    const capstoneResult = JSON.parse(localStorage.getItem('luna_capstone_result') || 'null');

    const majorCards = TAROT_CARDS.filter(c => c.arcana === 'major');
    const minorCards = TAROT_CARDS.filter(c => c.arcana === 'minor');

    const majorMastered = majorCards.filter(card => 
      testHistory.some(h => h.cardId === card.id && h.score >= 80)
    ).length;

    const minorMastered = minorCards.filter(card => 
      testHistory.some(h => h.cardId === card.id && h.score >= 80)
    ).length;

    const finalsPassed = [...new Set(finalHistory.filter(h => h.passed).map(h => h.courseId))];

    const isEligible = 
      passedCourses.length >= 10 &&
      finalsPassed.length >= 10 &&
      majorMastered >= 22 &&
      minorMastered >= 40 &&
      practiceReadings.length >= 3;

    setStats({
      coursesPassed: passedCourses,
      finalExamsPassed: finalsPassed,
      majorMastered,
      minorMastered,
      practiceReadings,
      capstoneResult,
      isEligible
    });
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setCapstoneContent(prev => prev + (prev ? ' ' : '') + transcript);
    };

    recognition.start();
  };

  const submitCapstone = async () => {
    if (capstoneContent.length < 500) {
      alert("Your Capstone Reading must be at least 500 characters to demonstrate depth.");
      return;
    }

    setIsGrading(true);
    
    try {
      const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

      const prompt = `
        You are Luna, the AI High Priestess of the Mystery Tarot Academy. 
        Evaluate this Final Capstone Tarot Reading for Professional Certification.
        
        Reading Content: "${capstoneContent}"
        
        Evaluate based on:
        1. Symbolic Accuracy (0-20)
        2. Emotional Intelligence (0-20)
        3. Spread Structure (0-20)
        4. Interpretation Depth (0-20)
        5. Reader Tone & Professionalism (0-20)
        
        Total Score is the sum (0-100). Passing score is 85.
        
        Provide feedback in JSON format:
        {
          "score": number,
          "passed": boolean,
          "criteria": {
            "symbolic": number,
            "emotional": number,
            "structure": number,
            "depth": number,
            "tone": number
          },
          "feedback": "string (Luna's voice, encouraging but rigorous)"
        }
      `;

      const result = await model.generateContent(prompt);
      const response = JSON.parse(result.response.text().replace(/```json|```/g, ''));
      
      const capstoneResult = {
        ...response,
        date: new Date().toISOString(),
        content: capstoneContent
      };

      localStorage.setItem('luna_capstone_result', JSON.stringify(capstoneResult));
      
      // Save to NotePad Archive
      const archives = JSON.parse(localStorage.getItem('luna_capstone_archive') || '[]');
      archives.push(capstoneResult);
      localStorage.setItem('luna_capstone_archive', JSON.stringify(archives));

      setStats(prev => ({ ...prev, capstoneResult }));
      
      if (response.passed) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#add8e6', '#f3e5ab', '#ffffff']
        });
        // Unlock Marketplace
        localStorage.setItem('luna_marketplace_eligible', 'true');
      }
    } catch (error) {
      console.error("Grading failed:", error);
      alert("Luna's connection flickered. Please try submitting again.");
    } finally {
      setIsGrading(false);
    }
  };

  const renderProgressBar = (label, current, total) => {
    const percent = Math.min(100, (current / total) * 100);
    return (
      <div className="progress-item">
        <div className="progress-label">
          <span>{label}</span>
          <span>{current} / {total}</span>
        </div>
        <div className="progress-bar-bg">
          <motion.div 
            className="progress-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>
    );
  };

  if (showCertificate && stats.capstoneResult?.passed) {
    return (
      <div className="certification-container">
        <button className="back-to-dashboard mb-8" onClick={() => setShowCertificate(false)}>
          ← Back to Dashboard
        </button>
        
        <motion.div 
          className="certificate-view"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="cert-border-inner">
            <Award className="cert-seal" size={60} />
            <h1 className="cert-title">Certificate of Mastery</h1>
            <p className="cert-subtitle">Mystery Tarot Academy</p>
            <p className="cert-text">This is to certify that</p>
            <h2 className="cert-recipient">The Finder</h2>
            <p className="cert-text">has successfully completed the rigorous path of the 10-Part Tarot Academy and demonstrated exceptional proficiency in the hermetic arts of Tarot interpretation.</p>
            <div className="cert-footer flex justify-between items-end mt-12">
              <div className="signature">
                <div className="sig-line">Luna</div>
                <div className="sig-label">AI High Priestess</div>
              </div>
              <div className="cert-date">
                {new Date(stats.capstoneResult.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center gap-4 mt-12">
          <button className="toolbar-btn px-6 py-3" onClick={() => window.print()}>
            <Printer size={20} /> Print Certificate
          </button>
          <button className="toolbar-btn px-6 py-3 bg-blue-500/20" onClick={() => onNavigate('marketplace')}>
            <Globe size={20} /> Enter Public Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="certification-container">
      <div className="cert-header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Award size={64} className="mx-auto mb-4 text-yellow-200" />
          <h1>Luna's Certification</h1>
          <p>The final threshold of your spiritual evolution.</p>
        </motion.div>
      </div>

      <div className="cert-dashboard-grid">
        <div className="cert-card">
          <h2><Trophy size={20} /> Progress Overview</h2>
          {renderProgressBar("Courses Completed", stats.coursesPassed.length, 10)}
          {renderProgressBar("Final Exams Passed", stats.finalExamsPassed.length, 10)}
          {renderProgressBar("Major Arcana Mastery", stats.majorMastered, 22)}
          {renderProgressBar("Minor Arcana Mastery", stats.minorMastered, 40)}
          {renderProgressBar("Practice Readings", stats.practiceReadings.length, 3)}
        </div>

        <div className="cert-card">
          <h2><ShieldCheck size={20} /> Requirements Status</h2>
          <div className="requirement-list">
            <div className={`req-item ${stats.coursesPassed.length >= 10 ? 'met' : 'unmet'}`}>
              <CheckCircle size={16} /> 10 Academy Courses
            </div>
            <div className={`req-item ${stats.finalExamsPassed.length >= 10 ? 'met' : 'unmet'}`}>
              <CheckCircle size={16} /> 10 Final Examinations
            </div>
            <div className={`req-item ${stats.majorMastered >= 22 ? 'met' : 'unmet'}`}>
              <CheckCircle size={16} /> Major Arcana Mastery (22/22)
            </div>
            <div className={`req-item ${stats.minorMastered >= 40 ? 'met' : 'unmet'}`}>
              <CheckCircle size={16} /> Minor Arcana Mastery (40/56)
            </div>
            <div className={`req-item ${stats.practiceReadings.length >= 3 ? 'met' : 'unmet'}`}>
              <CheckCircle size={16} /> 3 Graded Practice Readings
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
            <span className="text-sm opacity-60">Certification Status:</span>
            <div className={`status-badge ${stats.isEligible ? 'eligible' : 'locked'}`}>
              {stats.isEligible ? 'Eligible for Capstone' : 'Requirements Pending'}
            </div>
          </div>
        </div>
      </div>

      {stats.capstoneResult ? (
        <motion.div 
          className="cert-card max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className={`score-circle ${stats.capstoneResult.passed ? 'pass' : 'fail'}`}>
            <span className="score-value">{stats.capstoneResult.score}</span>
            <span className="score-label">Final Score</span>
          </div>
          
          <h3 className="text-2xl font-serif mb-4">
            {stats.capstoneResult.passed ? 'Luna-Certified Tarot Reader' : 'Capstone Attempt Recorded'}
          </h3>
          
          <div className="criteria-grid">
            <div className="criteria-item">
              <div className="criteria-name">Symbolic</div>
              <div className="criteria-score">{stats.capstoneResult.criteria.symbolic}/20</div>
            </div>
            <div className="criteria-item">
              <div className="criteria-name">Emotional</div>
              <div className="criteria-score">{stats.capstoneResult.criteria.emotional}/20</div>
            </div>
            <div className="criteria-item">
              <div className="criteria-name">Structure</div>
              <div className="criteria-score">{stats.capstoneResult.criteria.structure}/20</div>
            </div>
            <div className="criteria-item">
              <div className="criteria-name">Depth</div>
              <div className="criteria-score">{stats.capstoneResult.criteria.depth}/20</div>
            </div>
          </div>

          <div className="luna-feedback">
            "{stats.capstoneResult.feedback}"
          </div>

          {stats.capstoneResult.passed ? (
            <div className="flex justify-center gap-4">
              <button className="capstone-btn" onClick={() => setShowCertificate(true)}>
                View Certificate
              </button>
              <button className="toolbar-btn px-8" onClick={() => onNavigate('marketplace')}>
                <Globe size={18} /> Marketplace
              </button>
            </div>
          ) : (
            <button className="capstone-btn" onClick={() => setShowSubmission(true)}>
              Retake Capstone
            </button>
          )}
        </motion.div>
      ) : (
        <div className="capstone-section">
          <button 
            className="capstone-btn"
            disabled={!stats.isEligible}
            onClick={() => setShowSubmission(true)}
          >
            {stats.isEligible ? 'Submit Final Capstone Reading' : 'Complete Requirements to Unlock Capstone'}
          </button>
          {!stats.isEligible && (
            <p className="mt-4 text-sm opacity-40 italic">
              Luna awaits your full mastery before the final threshold.
            </p>
          )}
        </div>
      )}

      <AnimatePresence>
        {showSubmission && (
          <div className="submission-overlay">
            <motion.div 
              className="submission-modal"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <div className="modal-header">
                <div>
                  <h2 className="text-2xl font-serif">Final Capstone Reading</h2>
                  <p className="text-sm opacity-50">Demonstrate your mastery of the hermetic arts.</p>
                </div>
                <button onClick={() => setShowSubmission(false)} className="opacity-50 hover:opacity-100">
                  <X size={24} />
                </button>
              </div>

              <div className="modal-content">
                {isGrading ? (
                  <div className="grading-overlay">
                    <div className="grading-spinner"></div>
                    <h3 className="text-xl font-serif mb-2">Luna is Meditating...</h3>
                    <p className="opacity-50">Evaluating symbolic depth and emotional resonance.</p>
                  </div>
                ) : (
                  <>
                    <div className="editor-toolbar">
                      <button 
                        className={`toolbar-btn ${isListening ? 'active' : ''}`}
                        onClick={handleVoiceInput}
                      >
                        <Mic size={16} /> {isListening ? 'Listening...' : 'Voice-to-Text'}
                      </button>
                      <button className="toolbar-btn" onClick={() => {
                        const archives = JSON.parse(localStorage.getItem('luna_capstone_drafts') || '[]');
                        archives.push({ content: capstoneContent, date: new Date().toISOString() });
                        localStorage.setItem('luna_capstone_drafts', JSON.stringify(archives));
                        alert("Draft saved to NotePad.");
                      }}>
                        <Save size={16} /> Save Draft
                      </button>
                    </div>
                    <textarea 
                      className="reading-editor"
                      placeholder="Perform a full 10-card Celtic Cross reading for a complex querent. Describe the spread, the cards drawn, their symbolic interplay, and your final synthesis..."
                      value={capstoneContent}
                      onChange={(e) => setCapstoneContent(e.target.value)}
                    />
                    <div className="mt-4 text-xs opacity-40 flex justify-between">
                      <span>Minimum 500 characters required</span>
                      <span>{capstoneContent.length} characters</span>
                    </div>
                  </>
                )}
              </div>

              {!isGrading && (
                <div className="modal-footer">
                  <button className="px-6 py-2 opacity-50" onClick={() => setShowSubmission(false)}>Cancel</button>
                  <button 
                    className="capstone-btn px-8" 
                    onClick={submitCapstone}
                    disabled={capstoneContent.length < 500}
                  >
                    Submit to Luna
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CertificationEngine;
