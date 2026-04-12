import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home,
  Book, 
  GraduationCap, 
  Trophy, 
  Palette, 
  User, 
  ShoppingBag, 
  Settings, 
  Menu,
  ChevronLeft,
  ChevronRight,
  Layout,
  Gift,
  HelpCircle
} from 'lucide-react';
import IndexExplanationPopup from '../IndexExplanationPopup';
import { indexDescriptions } from '../../data/indexDescriptions';
import '../../styles/lunaSidebar.css';

const LunaSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeExplanation, setActiveExplanation] = useState(null);

  // Simulated prizes check
  const hasPrizes = true; 

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
    { id: 'notepad', label: 'Note Pad', icon: <Book size={20} />, path: '/notepad' },
    { id: 'training', label: 'Training Studio', icon: <GraduationCap size={20} />, path: '/training' },
    { id: 'showcase', label: 'Showcase Room', icon: <Trophy size={20} />, path: '/showcase' },
    { id: 'design', label: 'Design Studio', icon: <Palette size={20} />, path: '/design' },
    { id: 'personas', label: 'Luna Personas', icon: <User size={20} />, path: '/luna-personas' },
    { id: 'marketplace', label: 'Marketplace', icon: <ShoppingBag size={20} />, path: '/marketplace' },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  if (hasPrizes) {
    menuItems.splice(2, 0, { id: 'mystery-prizes', label: 'Mystery Prizes Won', icon: <Gift size={20} />, path: '/mystery-prizes' });
  }

  return (
    <aside className={`luna-sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <div className="sidebar-header">
        {!isCollapsed && <h2>Luna Studio</h2>}
        <button 
          className="toggle-btn" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand Menu" : "Collapse Menu"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {!isCollapsed && (
          <div className="section-label" style={{ 
            padding: '0 10px', 
            margin: '10px 0 5px', 
            fontSize: '0.65rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em', 
            color: 'rgba(0, 153, 255, 0.5)',
            fontWeight: '700'
          }}>
            Luna's Building
          </div>
        )}
        {menuItems.map((item) => (
          <React.Fragment key={item.id}>
            <NavLink 
              to={item.path} 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="icon">{item.icon}</div>
              {!isCollapsed && <span className="label">{item.label}</span>}
              {isCollapsed && <div className="tooltip">{item.label}</div>}
            </NavLink>

            {item.id === 'design' && !isCollapsed && (
              <li className="dropdown" style={{ listStyle: 'none', paddingLeft: '40px', marginTop: '-8px', marginBottom: '8px' }}>
                <button className="dropdown-toggle" style={{ background: 'transparent', border: 'none', color: 'rgba(0, 153, 255, 0.5)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: '600' }}>
                  Design Options ▾
                </button>
                <ul className="dropdown-menu" style={{ listStyle: 'none', padding: '8px 0', margin: 0 }}>
                  <li>
                    <button 
                      data-popup="borders"
                      onClick={() => window.dispatchEvent(new CustomEvent('open-design-popup', { detail: 'Borders' }))}
                      style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '4px 0' }}
                    >
                      Borders
                    </button>
                  </li>
                  <li>
                    <button 
                      data-popup="templates"
                      onClick={() => window.dispatchEvent(new CustomEvent('open-design-popup', { detail: 'Templates' }))}
                      style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '4px 0' }}
                    >
                      Templates
                    </button>
                  </li>
                  <li>
                    <button 
                      data-popup="symbols"
                      onClick={() => window.dispatchEvent(new CustomEvent('open-design-popup', { detail: 'Symbols' }))}
                      style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '4px 0' }}
                    >
                      Symbols
                    </button>
                  </li>
                  <li>
                    <button 
                      data-popup="animated"
                      onClick={() => window.dispatchEvent(new CustomEvent('open-design-popup', { detail: 'Animated Elements' }))}
                      style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '4px 0' }}
                    >
                      Animated Elements
                    </button>
                  </li>
                </ul>
              </li>
            )}

            {item.id === 'notepad' && !isCollapsed && (
              <li className="dropdown" style={{ listStyle: 'none', paddingLeft: '40px', marginTop: '-8px', marginBottom: '8px' }}>
                <button className="dropdown-toggle" style={{ background: 'transparent', border: 'none', color: 'rgba(0, 153, 255, 0.5)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: '600' }}>
                  Index Explanations ▾
                </button>
                <ul className="dropdown-menu" style={{ listStyle: 'none', padding: '8px 0', margin: 0 }}>
                  {Object.keys(indexDescriptions).map(cat => (
                    <li key={cat}>
                      <button 
                        onClick={() => setActiveExplanation(cat)}
                        style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '4px 0' }}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </React.Fragment>
        ))}
      </nav>

      {activeExplanation && (
        <IndexExplanationPopup 
          category={activeExplanation} 
          onClose={() => setActiveExplanation(null)} 
        />
      )}
    </aside>
  );
};

export default LunaSidebar;
