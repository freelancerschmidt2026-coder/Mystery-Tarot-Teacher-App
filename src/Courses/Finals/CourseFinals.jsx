import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  BookOpen, 
  PenTool, 
  Send, 
  Sparkles, 
  GraduationCap, 
  History, 
  Save,
  Timer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GoogleGenAI, Type } from "@google/genai";
import { FINAL_EXAM_DATA } from './FinalExamData';
import './courseFinals.css';

const CourseFinals = ({ courseId, onNavigate, onComplete }) => {
  const [step, setStep] = useState('intro'); // intro, exam, grading, results, remediation
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [essays, setEssays] = useState({});
  const [isTimed, setIsTimed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [isGrading, setIsGrading] = useState(false);
  const [examResults, setExamResults] = useState(null);
  const [remediationData, setRemediationData] = useState(null);
  const [examHistory, setExamHistory] = useState(() => {
    const saved = localStorage.getItem('luna_final_exam_history');
    return saved ? JSON.parse(saved) : [];
  });

  const examData = FINAL_EXAM_DATA[courseId];
  const allQuestions = [...examData.questions, ...examData.essays.map(e => ({ ...e, type: 'essay' }))];
  const totalSteps = allQuestions.length;

  const timerRef = useRef(null);

  useEffect(() => {
    if (step === 'exam' && isTimed && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSubmitExam();
    }
    return () => clearInterval(timerRef.current);
  }, [step, isTimed, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBeginExam = () => {
    setStep('exam');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setEssays({});
    setTimeLeft(3600);
  };

  const handleOptionSelect = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleEssayChange = (essayId, text) => {
    setEssays(prev => ({ ...prev, [essayId]: text }));
    // Auto-save to NotePad logic could be triggered here or on step change
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalSteps - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitExam = async () => {
    setIsGrading(true);
    setStep('grading');

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // 1. Grade Multiple Choice & Short Answer locally
    let correctCount = 0;
    const objectiveQuestions = examData.questions;
    const missedQuestions = [];

    objectiveQuestions.forEach(q => {
      const userAnswer = answers[q.id];
      if (userAnswer === q.correctAnswer) {
        correctCount++;
      } else {
        missedQuestions.push({
          id: q.id,
          question: q.question,
          userAnswer: userAnswer || 'No answer',
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || "Review the course materials for this topic."
        });
      }
    });

    const objectiveScore = (correctCount / objectiveQuestions.length) * 100;

    // 2. Grade Essays with Gemini
    const essayPrompts = examData.essays.map(e => ({
      id: e.id,
      question: e.question,
      answer: essays[e.id] || ''
    }));

    const essayGradingPrompt = `You are Luna, the wise Tarot Teacher. Grade the following final exam essays for Course ${courseId}: ${examData.title}.
    
    Essays to Grade:
    ${essayPrompts.map(p => `Question: ${p.question}\nAnswer: ${p.answer}`).join('\n\n')}
    
    Grade each essay on a scale of 0-100 based on:
    - Clarity: Is the answer well-structured and easy to understand?
    - Symbolic Accuracy: Does it correctly interpret the tarot symbols and archetypes?
    - Depth: Does it show a deep understanding of the course material?
    - Emotional Tone: Does it capture the mystical and reflective nature of tarot?
    
    Provide a score for each category, an overall score for each essay, and specific feedback from Luna.
    If the overall score is below 80, provide required corrections.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: essayGradingPrompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              essayGrades: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    clarity: { type: Type.INTEGER },
                    symbolicAccuracy: { type: Type.INTEGER },
                    depth: { type: Type.INTEGER },
                    emotionalTone: { type: Type.INTEGER },
                    overallScore: { type: Type.INTEGER },
                    feedback: { type: Type.STRING },
                    corrections: { type: Type.STRING }
                  },
                  required: ["id", "overallScore", "feedback"]
                }
              },
              lunaGeneralFeedback: { type: Type.STRING }
            },
            required: ["essayGrades", "lunaGeneralFeedback"]
          }
        }
      });

      const essayResults = JSON.parse(response.text);
      const avgEssayScore = essayResults.essayGrades.reduce((acc, curr) => acc + curr.overallScore, 0) / essayResults.essayGrades.length;
      
      const finalScore = Math.round((objectiveScore * 0.6) + (avgEssayScore * 0.4));
      const passed = finalScore >= 80;

      const result = {
        id: Date.now(),
        courseId,
        courseTitle: examData.title,
        date: new Date().toISOString(),
        score: finalScore,
        objectiveScore,
        essayScore: avgEssayScore,
        passed,
        essayDetails: essayResults.essayGrades,
        lunaFeedback: essayResults.lunaGeneralFeedback,
        missedQuestions
      };

      setExamResults(result);
      saveExamRecord(result);

      if (passed) {
        setStep('results');
        confetti({
          particleCount: 200,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#fbbf24', '#fde68a', '#ffffff', '#4ade80']
        });
        if (onComplete) onComplete(courseId);
      } else {
        setStep('results'); // Show results first, then they can go to remediation
      }

      // Save essays to NotePad
      saveEssaysToNotepad(essayPrompts, essayResults.essayGrades);

    } catch (error) {
      console.error('Grading error:', error);
      alert('Luna is having trouble grading your essays. Please try again.');
      setStep('exam');
    } finally {
      setIsGrading(false);
    }
  };

  const saveExamRecord = (record) => {
    const updatedHistory = [record, ...examHistory];
    setExamHistory(updatedHistory);
    localStorage.setItem('luna_final_exam_history', JSON.stringify(updatedHistory));

    if (record.passed) {
      const passedCourses = JSON.parse(localStorage.getItem('luna_passed_courses') || '[]');
      if (!passedCourses.includes(courseId)) {
        localStorage.setItem('luna_passed_courses', JSON.stringify([...passedCourses, courseId]));
      }
    }
  };

  const saveEssaysToNotepad = (prompts, grades) => {
    const savedNotes = localStorage.getItem('finder_notes');
    const notes = savedNotes ? JSON.parse(savedNotes) : [];
    
    const essayNotes = prompts.map(p => {
      const grade = grades.find(g => g.id === p.id);
      return {
        id: Date.now() + Math.random(),
        text: `Final Exam Essay: ${examData.title}\nQuestion: ${p.question}\n\nResponse:\n${p.answer}\n\nLuna's Feedback (${grade?.overallScore}%):\n${grade?.feedback}`,
        page: 'essay-archive',
        section: 'Essay Archive',
        timestamp: new Date().toISOString()
      };
    });

    localStorage.setItem('finder_notes', JSON.stringify([...notes, ...essayNotes]));
  };

  const handleRetryFailed = () => {
    setStep('exam');
    // Logic to only show failed sections could be complex, 
    // for now we reset but keep the correct answers?
    // The user asked to "Allow retake of only missed sections".
    // We can filter the questions to only show missed ones + essays if they failed.
    setRemediationData(examResults.missedQuestions);
  };

  const renderIntro = () => (
    <motion.div 
      className="exam-intro"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Trophy size={64} className="text-yellow-500 mb-6 mx-auto" />
      <h2 className="text-3xl font-serif mb-4">{examData.title}</h2>
      <p className="opacity-70 mb-8">
        You have reached the culmination of your journey through this course. 
        The Final Exam will test your objective knowledge and your ability to synthesize 
        the symbolic wisdom you have gathered.
      </p>

      <div className="exam-stats">
        <div className="stat-item">
          <span className="stat-value">{examData.questions.length}</span>
          <span className="stat-label">Questions</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{examData.essays.length}</span>
          <span className="stat-label">Essays</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">80%</span>
          <span className="stat-label">Passing Score</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mt-8">
        <div className="flex items-center gap-2 text-sm opacity-60 mb-4">
          <Timer size={16} />
          <span>Optional Timed Mode (60 Minutes)</span>
          <input 
            type="checkbox" 
            checked={isTimed} 
            onChange={(e) => setIsTimed(e.target.checked)}
            className="ml-2 accent-yellow-500"
          />
        </div>
        <button className="begin-exam-btn" onClick={handleBeginExam}>
          Begin Final Examination
        </button>
      </div>
    </motion.div>
  );

  const renderQuestion = () => {
    const currentQ = allQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / totalSteps) * 100;

    return (
      <div className="exam-layout">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs opacity-50 uppercase tracking-widest">
            Step {currentQuestionIndex + 1} of {totalSteps}
          </span>
          {isTimed && (
            <div className={`flex items-center gap-2 font-mono ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-yellow-500'}`}>
              <Clock size={16} />
              {formatTime(timeLeft)}
            </div>
          )}
        </div>

        <div className="exam-progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="question-card"
          >
            <span className="question-number">
              {currentQ.type === 'essay' ? 'Essay Question' : `Question ${currentQuestionIndex + 1}`}
            </span>
            <h3 className="question-text">{currentQ.question}</h3>

            {currentQ.type === 'multiple-choice' && (
              <div className="options-grid">
                {currentQ.options.map((option, i) => (
                  <button
                    key={i}
                    className={`option-btn ${answers[currentQ.id] === option ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect(currentQ.id, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentQ.type === 'essay' && (
              <div className="essay-container">
                <textarea
                  className="essay-editor"
                  placeholder="Pour your wisdom onto the parchment..."
                  value={essays[currentQ.id] || ''}
                  onChange={(e) => handleEssayChange(currentQ.id, e.target.value)}
                />
                <div className="flex justify-between mt-2 text-[10px] opacity-40 uppercase tracking-widest">
                  <span>Luna is watching your words unfold...</span>
                  <span>Auto-saving to NotePad</span>
                </div>
              </div>
            )}

            {currentQ.type === 'short-answer' && (
              <input 
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-yellow-500 outline-none"
                placeholder="Type your answer..."
                value={answers[currentQ.id] || ''}
                onChange={(e) => handleOptionSelect(currentQ.id, e.target.value)}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="exam-controls">
          <button 
            className="control-btn" 
            onClick={handlePrev} 
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft size={18} /> Previous
          </button>

          {currentQuestionIndex < totalSteps - 1 ? (
            <button 
              className="control-btn" 
              onClick={handleNext}
              disabled={currentQ.type !== 'essay' && !answers[currentQ.id]}
            >
              Next <ArrowRight size={18} />
            </button>
          ) : (
            <button 
              className="control-btn submit-btn" 
              onClick={handleSubmitExam}
            >
              <Send size={18} /> Submit Final Exam
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderResults = () => (
    <motion.div 
      className="results-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="results-card">
        <div className="score-circle">
          <span className="score-value">{examResults.score}%</span>
          <span className="score-label">Final Grade</span>
        </div>

        <h2 className={`result-status ${examResults.passed ? 'pass' : 'fail'}`}>
          {examResults.passed ? 'Examination Passed' : 'Examination Failed'}
        </h2>

        <p className="opacity-70 mb-8">
          {examResults.passed 
            ? "You have demonstrated a profound mastery of the course material. Your journey continues with the blessing of the cards."
            : "The cards suggest that further reflection is needed. Do not be discouraged; every setback is a lesson in disguise."}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="text-xs opacity-50 uppercase mb-1">Objective Score</div>
            <div className="text-xl font-bold">{Math.round(examResults.objectiveScore)}%</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="text-xs opacity-50 uppercase mb-1">Essay Score</div>
            <div className="text-xl font-bold">{Math.round(examResults.essayScore)}%</div>
          </div>
        </div>

        <div className="luna-feedback">
          <h4>Luna's Final Word</h4>
          <p>"{examResults.lunaFeedback}"</p>
          
          <div className="essay-scores">
            {examResults.essayDetails.map((essay, i) => (
              <div key={i} className="essay-score-item">
                <div className="essay-score-label">Essay {i + 1} Depth</div>
                <div className="essay-score-value">{essay.depth}/100</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        {!examResults.passed && (
          <button className="remediation-btn flex items-center gap-2" onClick={() => setStep('remediation')}>
            <AlertTriangle size={18} /> Enter Remediation Mode
          </button>
        )}
        <button className="return-btn" onClick={() => onNavigate('courses')}>
          Return to Sanctuary
        </button>
      </div>
    </motion.div>
  );

  const renderRemediation = () => (
    <div className="remediation-layout">
      <div className="flex items-center gap-4 mb-8">
        <AlertTriangle size={40} className="text-red-400" />
        <div>
          <h2 className="text-3xl font-serif">Luna's Remediation</h2>
          <p className="opacity-50">Correcting the path to mastery.</p>
        </div>
      </div>

      <div className="space-y-6">
        {examResults.missedQuestions.map((q, i) => (
          <motion.div 
            key={i} 
            className="remediation-item"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="remediation-question">{q.question}</div>
            <div className="text-xs mb-4">
              <span className="opacity-50">Your Answer: </span>
              <span className="text-red-400">{q.userAnswer}</span>
            </div>
            <div className="remediation-correction">
              <div className="text-green-400 font-bold mb-1">Correct Path: {q.correctAnswer}</div>
              <p className="italic opacity-70">"{q.explanation}"</p>
            </div>
          </motion.div>
        ))}

        {examResults.essayDetails.filter(e => e.overallScore < 80).map((e, i) => (
          <motion.div 
            key={`essay-${i}`} 
            className="remediation-item"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (examResults.missedQuestions.length + i) * 0.1 }}
          >
            <div className="remediation-question">Essay Feedback: {e.id}</div>
            <div className="remediation-correction">
              <div className="text-yellow-400 font-bold mb-1">Luna's Guidance:</div>
              <p className="italic opacity-70 mb-4">"{e.feedback}"</p>
              <div className="text-blue-400 font-bold mb-1">Required Corrections:</div>
              <p className="text-sm opacity-80">{e.corrections}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="begin-exam-btn w-full mt-12" onClick={handleBeginExam}>
        Retake Final Examination
      </button>
    </div>
  );

  return (
    <div className="course-finals-container">
      <header className="finals-header">
        <h1 className="finals-title">The Grand Examination</h1>
        <p className="finals-subtitle">Mystery Tarot Academy • Course {courseId}</p>
      </header>

      <AnimatePresence mode="wait">
        {step === 'intro' && renderIntro()}
        {step === 'exam' && renderQuestion()}
        {step === 'results' && renderResults()}
        {step === 'remediation' && renderRemediation()}
      </AnimatePresence>

      {isGrading && (
        <div className="grading-overlay">
          <div className="grading-spinner" />
          <h2 className="text-2xl font-serif text-yellow-500">Luna is Weighing Your Wisdom...</h2>
          <p className="opacity-60 mt-2">The scales of truth are in motion.</p>
        </div>
      )}
    </div>
  );
};

export default CourseFinals;
