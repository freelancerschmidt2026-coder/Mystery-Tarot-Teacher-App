import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Trophy, Star, Lock, Gamepad2, Sparkles } from 'lucide-react';
import { GAMES } from './GameRegistry';
import './gameArcade.css';

const GameArcade = ({ onBack }) => {
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [completedGames, setCompletedGames] = useState({});

  const handleGameComplete = (gameId, score) => {
    setCompletedGames(prev => ({
      ...prev,
      [gameId]: { score, completedAt: new Date().toISOString() }
    }));
    setSelectedGameId(null);
  };

  const renderGameList = () => (
    <div className="arcade-container">
      <header className="arcade-header">
        <div className="arcade-title-group">
          <Gamepad2 className="arcade-icon" size={40} />
          <div>
            <h1>Luna's Training Arcade</h1>
            <p>Hone your intuition through mystical challenges.</p>
          </div>
        </div>
        <div className="arcade-stats">
          <div className="stat-item">
            <Trophy size={20} />
            <span>{Object.keys(completedGames).length} Mastered</span>
          </div>
        </div>
      </header>

      <div className="arcade-grid">
        {Object.values(GAMES).map((game) => {
          const stats = completedGames[game.id];
          return (
            <motion.div 
              key={game.id}
              className={`game-card ${stats ? 'completed' : ''}`}
              whileHover={{ scale: 1.02, translateY: -5 }}
              onClick={() => setSelectedGameId(game.id)}
            >
              <div className="game-card-icon">
                <Sparkles size={24} />
              </div>
              <div className="game-card-content">
                <h3>{game.title}</h3>
                <p>{game.description}</p>
              </div>
              <div className="game-card-footer">
                {stats ? (
                  <div className="game-status mastered">
                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                    <span>{stats.score}% Mastery</span>
                  </div>
                ) : (
                  <div className="game-status play">
                    <Play size={14} />
                    <span>Enter Challenge</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const SelectedGame = selectedGameId ? GAMES[selectedGameId].component : null;

  return (
    <div className="arcade-root">
      <AnimatePresence mode="wait">
        {!selectedGameId ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderGameList()}
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="game-viewport"
          >
            <Suspense fallback={<div className="loading-mystical">Consulting the Oracle...</div>}>
              <SelectedGame 
                onComplete={(score) => handleGameComplete(selectedGameId, score)}
                onBack={() => setSelectedGameId(null)}
              />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameArcade;
