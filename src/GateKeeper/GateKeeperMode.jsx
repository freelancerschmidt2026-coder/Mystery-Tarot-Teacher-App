import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Notebook, 
  Pocket, 
  Palette, 
  UserCircle, 
  FilePlus, 
  CreditCard, 
  Library, 
  LogOut, 
  Moon, 
  Settings 
} from 'lucide-react';
import { useDevToggle } from '../Cinematic/Toggle/DevToggle';
import LunaGateKeeperGreeting from './LunaGateKeeperGreeting';
import './gateKeeperMode.css';

const GateKeeperMode = ({ gatekeeper, onLogout }) => {
  const [activeTool, setActiveTool] = useState('dashboard');
  const [hasSeenLunaGateKeeperGreeting, setHasSeenLunaGateKeeperGreeting] = useState(false);
  const { setMode } = useDevToggle();

  const tools = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'notepad', name: 'NotePad', icon: Notebook },
    { id: 'backpocket', name: 'BackPocket', icon: Pocket },
    { id: 'design-studio', name: 'Design Studio', icon: Palette },
    { id: 'luna-creator', name: 'Luna Creator', icon: UserCircle },
    { id: 'template-builder', name: 'Template Builder', icon: FilePlus },
    { id: 'card-creator', name: 'Card Creator', icon: CreditCard },
    { id: 'deck-library', name: 'Deck Library', icon: Library },
  ];

  const handleLogout = () => {
    onLogout();
    setMode('cinematic');
  };

  if (!hasSeenLunaGateKeeperGreeting) {
    return <LunaGateKeeperGreeting onComplete={() => setHasSeenLunaGateKeeperGreeting(true)} />;
  }

  return (
    <div className="gatekeeper-mode-container">
      {/* Sidebar Navigation */}
      <motion.nav 
        className="gatekeeper-sidebar"
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="gatekeeper-sigil-wrapper">
          <motion.div 
            className="gatekeeper-sigil"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <Moon size={40} color="#add8e6" />
          </motion.div>
          <span className="gatekeeper-name">{gatekeeper.name}</span>
          <span className="gatekeeper-role">{gatekeeper.role}</span>
        </div>

        <div className="gatekeeper-nav-items">
          {tools.map((tool) => (
            <button
              key={tool.id}
              className={`gatekeeper-nav-item ${activeTool === tool.id ? 'active' : ''}`}
              onClick={() => setActiveTool(tool.id)}
            >
              <tool.icon size={20} />
              <span>{tool.name}</span>
            </button>
          ))}
        </div>

        <div className="gatekeeper-nav-footer">
          <button className="gatekeeper-nav-item" onClick={() => setMode('cinematic')}>
            <Moon size={20} />
            <span>Return to Cinematic</span>
          </button>
          <button className="gatekeeper-nav-item" onClick={() => setMode('dashboard')}>
            <LayoutDashboard size={20} />
            <span>Return to Dashboard</span>
          </button>
          <button className="gatekeeper-nav-item logout" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </motion.nav>

      {/* Main Content Area */}
      <main className="gatekeeper-main">
        <header className="gatekeeper-header">
          <h1 className="tool-title">{tools.find(t => t.id === activeTool)?.name}</h1>
          <div className="header-actions">
            <button className="icon-btn"><Settings size={20} /></button>
            <div className="user-badge">
              <div className="status-dot" />
              <span>GateKeeper Online</span>
            </div>
          </div>
        </header>

        <section className="tool-viewport">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTool}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="tool-content"
            >
              <div className="placeholder-content">
                <div className="placeholder-card">
                  <h3>{activeTool.replace('-', ' ').toUpperCase()} INTERFACE</h3>
                  <p>GateKeeper access granted. Luna is standing by for asset creation and template generation.</p>
                  <div className="placeholder-grid">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="placeholder-item" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      {/* Floating GateKeeper Sigil (Corner) */}
      <motion.div 
        className="floating-sigil"
        animate={{ 
          boxShadow: ['0 0 20px rgba(173, 216, 230, 0.2)', '0 0 40px rgba(173, 216, 230, 0.5)', '0 0 20px rgba(173, 216, 230, 0.2)']
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Moon size={24} color="#add8e6" />
      </motion.div>
    </div>
  );
};

export default memo(GateKeeperMode);
