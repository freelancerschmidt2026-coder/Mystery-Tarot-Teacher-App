import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Sparkles, Gamepad2, BookOpen } from 'lucide-react';
import './studyBuddy.css';

const StudyBuddy = ({ onNavigate }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'luna', text: "Greetings, Finder. I am Luna, your guide through the mysteries. How may I assist your studies today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { id: Date.now(), sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Luna response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'luna', 
        text: "Your curiosity is a beacon. Perhaps a quick challenge in the Arcade would sharpen your intuition?" 
      }]);
    }, 1000);
  };

  return (
    <div className="study-buddy-container">
      <header className="study-buddy-header">
        <Sparkles className="luna-sparkle" size={24} />
        <h2>Luna Study Buddy</h2>
      </header>

      <div className="chat-viewport">
        {messages.map(msg => (
          <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-actions">
        <button className="chat-action-btn" onClick={() => onNavigate('arcade')}>
          <Gamepad2 size={18} />
          <span>Play a Game</span>
        </button>
        <button className="chat-action-btn" onClick={() => onNavigate('courses')}>
          <BookOpen size={18} />
          <span>Go to Lessons</span>
        </button>
      </div>

      <div className="chat-input-area">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Luna anything..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>
          <MessageSquare size={18} />
        </button>
      </div>
    </div>
  );
};

export default StudyBuddy;
