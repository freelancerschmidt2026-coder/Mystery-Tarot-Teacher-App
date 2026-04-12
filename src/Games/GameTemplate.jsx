import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, RefreshCcw, ArrowLeft, Trophy, Star } from 'lucide-react';
import './gameTemplate.css';

const GameTemplate = ({ title, description, children, onComplete, onBack, score, isFinished, remediationData, onRetry }) => {
  return (
    <div className="game-container">
      <header className="game-header">
        <button className="game-back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Back to Arcade</span>
        </button>
        <div className="game-title-group">
          <h1>{title}</h1>
          <p className="game-subtitle">{description}</p>
        </div>
      </header>

      <main className="game-content">
        {!isFinished ? (
          <div className="game-play-area">
            {children}
          </div>
        ) : (
          <motion.div 
            className="game-results-overlay"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className={`result-score ${score >= 80 ? 'pass' : 'fail'}`}>
              <div className="score-circle">
                <span className="score-num">{score}%</span>
                <span className="score-label">Mastery</span>
              </div>
            </div>

            <div className="result-message">
              {score >= 80 ? (
                <>
                  <h2 className="text-green-400 flex items-center justify-center gap-2">
                    <Trophy size={24} /> Victory Achieved!
                  </h2>
                  <p>Your intuition is sharp, Finder. You have mastered this challenge.</p>
                  <div className="star-rating">
                    {[...Array(3)].map((_, i) => (
                      <Star key={i} size={32} fill={i < Math.floor(score/33) ? "#fbbf24" : "none"} color="#fbbf24" />
                    ))}
                  </div>
                  <button className="game-action-btn primary" onClick={() => onComplete(score)}>
                    Claim Rewards & Continue
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-red-400 flex items-center justify-center gap-2">
                    <AlertCircle size={24} /> Remediation Required
                  </h2>
                  <p>The cards whisper of a need for deeper study. Luna is here to guide you.</p>
                  
                  <div className="remediation-section">
                    <h3>Luna's Insights</h3>
                    <div className="remediation-list">
                      {remediationData?.map((item, idx) => (
                        <div key={idx} className="remediation-item">
                          <p className="rem-q"><strong>Challenge:</strong> {item.question}</p>
                          <p className="rem-insight"><strong>Insight:</strong> {item.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="game-action-btn secondary" onClick={onRetry}>
                    <RefreshCcw size={18} /> Try Again
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default GameTemplate;
