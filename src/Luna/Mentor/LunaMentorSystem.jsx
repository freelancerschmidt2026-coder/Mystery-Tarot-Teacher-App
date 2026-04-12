import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  MessageSquare, 
  Mic, 
  Send, 
  BookOpen, 
  Target, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  Heart, 
  Lightbulb, 
  ArrowRight,
  RefreshCw,
  HelpCircle,
  Volume2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import './lunaMentor.css';

import { notePadActions } from '../../state/NotePadState/notePadActions';

const LunaMentorSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [messages, setMessages] = useState([
    { id: 1, type: 'luna', text: "Greetings, seeker. I am Luna, your mentor through the veil of symbols. How does your heart feel today as we begin our study?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [stats, setStats] = useState({
    courseProgress: 0,
    masteryLevel: 0,
    testAverage: 0,
    challenges: []
  });

  const chatEndRef = useRef(null);

  useEffect(() => {
    loadUserData();
    generateRecommendations();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadUserData = () => {
    const courseProgress = JSON.parse(localStorage.getItem('luna_course_progress') || '{}');
    const cardMastery = JSON.parse(localStorage.getItem('luna_card_mastery') || '{}');
    const testHistory = JSON.parse(localStorage.getItem('luna_test_history') || '[]');
    
    const completedCourses = Object.values(courseProgress).filter(c => c.completed).length;
    const masteredCards = Object.values(cardMastery).filter(m => m.mastered).length;
    const avgScore = testHistory.length > 0 
      ? testHistory.reduce((acc, curr) => acc + curr.score, 0) / testHistory.length 
      : 0;

    setStats({
      courseProgress: (completedCourses / 10) * 100,
      masteryLevel: (masteredCards / 78) * 100,
      testAverage: avgScore,
      challenges: identifyChallenges(testHistory, cardMastery)
    });
  };

  const identifyChallenges = (testHistory, cardMastery) => {
    const challenges = [];
    const lowScores = testHistory.filter(t => t.score < 80);
    if (lowScores.length > 0) {
      challenges.push({ type: 'test', label: 'Improve Test Accuracy', detail: 'Focus on Minor Arcana details.' });
    }
    const gaps = 78 - Object.keys(cardMastery).length;
    if (gaps > 20) {
      challenges.push({ type: 'mastery', label: 'Expand Card Knowledge', detail: 'Study the Court Cards.' });
    }
    return challenges;
  };

  const generateRecommendations = () => {
    // Simulated adaptive logic
    const recs = [
      { id: 1, icon: <BookOpen size={16} />, title: "Revisit The High Priestess", desc: "Your recent reflections suggest a deep resonance with intuition. Re-read Lesson 2." },
      { id: 2, icon: <Target size={16} />, title: "Practice: The Celtic Cross", desc: "You've mastered 3-card spreads. It's time to try the foundational 10-card structure." },
      { id: 3, icon: <Lightbulb size={16} />, title: "Symbolic Insight", desc: "Notice the recurring water symbols in your readings. Study the element of Cups today." }
    ];
    setRecommendations(recs);
  };

  const handleSendMessage = async (text = inputValue) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are Luna, a mystical AI Tarot Mentor. 
        The user says: "${text}". 
        Context: User is ${stats.courseProgress}% through the course, ${stats.masteryLevel}% card mastery.
        Provide a mentor-like response that is encouraging, symbolic, and educational. Keep it under 100 words.`,
      });

      const lunaMsg = { id: Date.now() + 1, type: 'luna', text: response.text };
      setMessages(prev => [...prev, lunaMsg]);
      
      // Save to NotePad Emotional Support Archive if it's supportive
      if (response.text.toLowerCase().includes('feel') || response.text.toLowerCase().includes('heart')) {
        saveToArchive(text, response.text);
      }

    } catch (error) {
      console.error("Luna connection error:", error);
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'luna', text: "The stars are clouded for a moment. Let us try again soon." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const saveToArchive = (userText, lunaResponse) => {
    notePadActions.saveNote({
      title: `Luna Insight: ${userText.substring(0, 30)}...`,
      content: `**Seeker:** ${userText}\n\n**Luna:** ${lunaResponse}`,
      category: 'Luna’s Shadow Insights'
    });
  };

  return (
    <div className="mentor-container">
      <header className="mentor-header">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Luna AI Mentor</h1>
          <p>Your guide through the celestial mysteries</p>
        </motion.div>
      </header>

      <div className="mentor-tabs flex justify-center gap-4 mb-8">
        <button 
          className={`px-6 py-2 rounded-full transition-all ${activeTab === 'dashboard' ? 'bg-blue-400/20 text-blue-200 border border-blue-400/30' : 'opacity-50 hover:opacity-100'}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`px-6 py-2 rounded-full transition-all ${activeTab === 'chat' ? 'bg-blue-400/20 text-blue-200 border border-blue-400/30' : 'opacity-50 hover:opacity-100'}`}
          onClick={() => setActiveTab('chat')}
        >
          Mentor Chat
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'dashboard' ? (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="mentor-dashboard-grid"
          >
            <div className="flex flex-col gap-6">
              <div className="mentor-card">
                <h2><TrendingUp size={20} /> Your Progress</h2>
                <div className="mentor-stats-list">
                  <div className="mentor-stat-item">
                    <div className="stat-info">
                      <span>Course Completion</span>
                      <span>{Math.round(stats.courseProgress)}%</span>
                    </div>
                    <div className="stat-progress-bar">
                      <motion.div 
                        className="stat-progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.courseProgress}%` }}
                      />
                    </div>
                  </div>
                  <div className="mentor-stat-item">
                    <div className="stat-info">
                      <span>Card Mastery</span>
                      <span>{Math.round(stats.masteryLevel)}%</span>
                    </div>
                    <div className="stat-progress-bar">
                      <motion.div 
                        className="stat-progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.masteryLevel}%` }}
                        style={{ background: 'linear-gradient(90deg, #f3e5ab, #d4af37)' }}
                      />
                    </div>
                  </div>
                  <div className="mentor-stat-item">
                    <div className="stat-info">
                      <span>Average Test Score</span>
                      <span>{Math.round(stats.testAverage)}%</span>
                    </div>
                    <div className="stat-progress-bar">
                      <motion.div 
                        className="stat-progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.testAverage}%` }}
                        style={{ background: 'linear-gradient(90deg, #4ade80, #22c55e)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mentor-card">
                <h2><AlertCircle size={20} /> Current Challenges</h2>
                <div className="flex flex-col gap-3">
                  {stats.challenges.length > 0 ? stats.challenges.map((c, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-red-400/5 border border-red-400/10 rounded-lg">
                      <div className="text-red-400"><AlertCircle size={16} /></div>
                      <div>
                        <div className="text-sm font-bold">{c.label}</div>
                        <div className="text-xs opacity-60">{c.detail}</div>
                      </div>
                    </div>
                  )) : (
                    <div className="flex items-center gap-3 p-3 bg-green-400/5 border border-green-400/10 rounded-lg">
                      <div className="text-green-400"><CheckCircle2 size={16} /></div>
                      <div className="text-sm">No major challenges detected. You are flowing well.</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mentor-card">
              <div className="flex justify-between items-center mb-6">
                <h2><Sparkles size={20} /> Luna's Recommendations</h2>
                <button className="text-xs text-blue-300 flex items-center gap-1 hover:underline">
                  <RefreshCw size={12} /> Refresh
                </button>
              </div>
              <div className="recommendations-list">
                {recommendations.map(rec => (
                  <div key={rec.id} className="rec-item">
                    <div className="rec-icon">{rec.icon}</div>
                    <div className="rec-content">
                      <h4>{rec.title}</h4>
                      <p>{rec.desc}</p>
                    </div>
                    <ArrowRight size={14} className="ml-auto opacity-30" />
                  </div>
                ))}
              </div>
              <button 
                className="w-full mt-8 py-3 bg-blue-400/10 border border-blue-400/20 rounded-xl text-blue-200 font-serif hover:bg-blue-400/20 transition-all flex items-center justify-center gap-2"
                onClick={() => setActiveTab('chat')}
              >
                <MessageSquare size={18} /> Ask Luna for Help
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mentor-chat-section"
          >
            <div className="mentor-chat-panel">
              <div className="chat-header">
                <div className="luna-status">
                  <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center luna-avatar-glow">
                    <Sparkles size={20} className="text-blue-300" />
                  </div>
                  <div>
                    <div className="font-serif text-blue-200">Luna</div>
                    <div className="flex items-center gap-1 text-[10px] opacity-60">
                      <div className="status-dot" /> Online & Attuned
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white/5 rounded-lg text-blue-300"><Volume2 size={18} /></button>
                  <button className="p-2 hover:bg-white/5 rounded-lg text-blue-300"><HelpCircle size={18} /></button>
                </div>
              </div>

              <div className="chat-messages">
                {messages.map(msg => (
                  <div key={msg.id} className={`message ${msg.type}`}>
                    {msg.text}
                  </div>
                ))}
                {isTyping && (
                  <div className="message luna italic opacity-50">
                    Luna is consulting the cards...
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="chat-input-area">
                <div className="quick-replies">
                  <button className="quick-reply-btn" onClick={() => handleSendMessage("Explain the symbolism of water.")}>Explain Water Symbolism</button>
                  <button className="quick-reply-btn" onClick={() => handleSendMessage("Show me an example of a 3-card spread.")}>Show Spread Example</button>
                  <button className="quick-reply-btn" onClick={() => handleSendMessage("I'm struggling with the Court Cards.")}>Help with Court Cards</button>
                  <button className="quick-reply-btn" onClick={() => handleSendMessage("Explain this differently.")}>Explain Differently</button>
                </div>
                <div className="mt-4 input-wrapper">
                  <button className="chat-btn"><Mic size={18} /></button>
                  <input 
                    type="text" 
                    placeholder="Ask Luna anything..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button 
                    className="chat-btn send"
                    onClick={() => handleSendMessage()}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LunaMentorSystem;
