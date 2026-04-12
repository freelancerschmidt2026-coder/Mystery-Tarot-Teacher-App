import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  Search, 
  Filter, 
  User, 
  Award, 
  Trophy, 
  Shield, 
  ArrowLeft,
  Info,
  Save,
  Users
} from 'lucide-react';
import './constellation.css';

// Mock data for members
const MOCK_MEMBERS = Array.from({ length: 40 }).map((_, i) => ({
  id: `member-${i}`,
  name: [
    'Aether', 'Luna', 'Sol', 'Nova', 'Orion', 'Lyra', 'Cygnus', 'Draco', 
    'Vega', 'Altair', 'Rigel', 'Sirius', 'Antares', 'Spica', 'Pollux', 'Castor'
  ][i % 16] + ` ${i + 100}`,
  rank: Math.floor(Math.random() * 100) + 1,
  title: [
    'Student of the Arcana', 
    'Initiate of the Void', 
    'GateKeeper of the First Key', 
    'Master of the Major Arcana',
    'Celestial Reader'
  ][Math.floor(Math.random() * 5)],
  masteryLevel: Math.floor(Math.random() * 100),
  certified: Math.random() > 0.7,
  coursesCompleted: Math.floor(Math.random() * 11),
  x: Math.random() * 100,
  y: Math.random() * 100,
}));

const CommunityConstellation = ({ onNavigate }) => {
  const [hoveredMember, setHoveredMember] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    minRank: 0,
    title: 'all',
    certified: 'all',
    minMastery: 0
  });

  const filteredMembers = useMemo(() => {
    return MOCK_MEMBERS.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRank = member.rank >= filters.minRank;
      const matchesTitle = filters.title === 'all' || member.title === filters.title;
      const matchesCertified = filters.certified === 'all' || 
                               (filters.certified === 'yes' && member.certified) ||
                               (filters.certified === 'no' && !member.certified);
      const matchesMastery = member.masteryLevel >= filters.minMastery;

      return matchesSearch && matchesRank && matchesTitle && matchesCertified && matchesMastery;
    });
  }, [searchQuery, filters]);

  const handleSaveToNotepad = (content, section) => {
    const savedNotes = localStorage.getItem('finder_notes');
    const notes = savedNotes ? JSON.parse(savedNotes) : [];
    
    const newNote = {
      id: Date.now(),
      text: content,
      page: 'community-constellation',
      section: section,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('finder_notes', JSON.stringify([...notes, newNote]));
    alert(`Observation saved to NotePad under ${section}!`);
  };

  const getStarColor = (title) => {
    switch (title) {
      case 'Student of the Arcana': return '#94a3b8'; // Slate
      case 'Initiate of the Void': return '#60a5fa'; // Blue
      case 'GateKeeper of the First Key': return '#fbbf24'; // Amber
      case 'Master of the Major Arcana': return '#f472b6'; // Pink
      case 'Celestial Reader': return '#a78bfa'; // Violet
      default: return '#fff';
    }
  };

  return (
    <div className="community-constellation">
      <div className="constellation-atmosphere">
        <div className="nebula-glow"></div>
        <div className="star-field">
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={i} 
              className="background-star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="constellation-container">
        <header className="constellation-header">
          <div className="header-title">
            <h1>Community Constellation</h1>
            <p>A cosmic map of the Mystery Academy's collective wisdom.</p>
          </div>

          <div className="constellation-controls">
            <div className="search-box">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search members..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-dropdowns">
              <select 
                value={filters.title} 
                onChange={(e) => setFilters({...filters, title: e.target.value})}
              >
                <option value="all">All Titles</option>
                <option value="Student of the Arcana">Student</option>
                <option value="Initiate of the Void">Initiate</option>
                <option value="GateKeeper of the First Key">GateKeeper</option>
                <option value="Master of the Major Arcana">Master</option>
                <option value="Celestial Reader">Celestial Reader</option>
              </select>
              <select 
                value={filters.certified} 
                onChange={(e) => setFilters({...filters, certified: e.target.value})}
              >
                <option value="all">All Status</option>
                <option value="yes">Certified</option>
                <option value="no">In Training</option>
              </select>
            </div>
          </div>
        </header>

        <div className="constellation-map">
          {filteredMembers.map(member => (
            <motion.div
              key={member.id}
              className="member-star-wrapper"
              style={{
                left: `${member.x}%`,
                top: `${member.y}%`
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.5, zIndex: 10 }}
              onMouseEnter={() => setHoveredMember(member)}
              onMouseLeave={() => setHoveredMember(null)}
              onClick={() => setSelectedMember(member)}
            >
              <div 
                className={`member-star ${member.certified ? 'certified' : ''}`}
                style={{
                  '--star-color': getStarColor(member.title),
                  '--star-brightness': 0.5 + (member.rank / 100),
                  '--star-size': member.certified ? '12px' : '8px'
                }}
              >
                <div className="star-glow"></div>
              </div>
            </motion.div>
          ))}

          <AnimatePresence>
            {hoveredMember && (
              <motion.div 
                className="member-tooltip"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{
                  left: `${hoveredMember.x}%`,
                  top: `${hoveredMember.y}%`
                }}
              >
                <div className="tooltip-header">
                  <span className="name">{hoveredMember.name}</span>
                  {hoveredMember.certified && <Award size={12} className="text-yellow-400" />}
                </div>
                <div className="tooltip-body">
                  <div className="stat">
                    <Trophy size={10} /> Rank {hoveredMember.rank}
                  </div>
                  <div className="stat">
                    <Shield size={10} /> {hoveredMember.title}
                  </div>
                  <div className="mastery-bar">
                    <div className="fill" style={{ width: `${hoveredMember.masteryLevel}%` }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="constellation-footer">
          <div className="legend">
            <div className="legend-item">
              <div className="dot" style={{ background: '#fbbf24' }}></div>
              <span>GateKeeper</span>
            </div>
            <div className="legend-item">
              <div className="dot" style={{ background: '#60a5fa' }}></div>
              <span>Initiate</span>
            </div>
            <div className="legend-item">
              <div className="dot certified"></div>
              <span>Certified</span>
            </div>
          </div>
          <button 
            className="save-observation-btn"
            onClick={() => handleSaveToNotepad("Observations of the Community Constellation: Noted several rising stars in the Initiate rank.", "Constellation Notes")}
          >
            <Save size={16} /> Save Observation
          </button>
        </div>
      </div>

      {/* Member Profile Modal (Mock) */}
      <AnimatePresence>
        {selectedMember && (
          <div className="member-modal-overlay" onClick={() => setSelectedMember(null)}>
            <motion.div 
              className="member-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setSelectedMember(null)}>
                <ArrowLeft size={18} /> Back to Constellation
              </button>
              
              <div className="modal-header">
                <div className="modal-avatar">
                  <User size={48} />
                </div>
                <div className="modal-info">
                  <h2>{selectedMember.name}</h2>
                  <div className="modal-title-badge">
                    <Shield size={14} /> {selectedMember.title}
                  </div>
                </div>
              </div>

              <div className="modal-stats-grid">
                <div className="m-stat">
                  <span className="label">Rank</span>
                  <span className="value">{selectedMember.rank}</span>
                </div>
                <div className="m-stat">
                  <span className="label">Mastery</span>
                  <span className="value">{selectedMember.masteryLevel}%</span>
                </div>
                <div className="m-stat">
                  <span className="label">Courses</span>
                  <span className="value">{selectedMember.coursesCompleted}/10</span>
                </div>
                <div className="m-stat">
                  <span className="label">Status</span>
                  <span className="value">{selectedMember.certified ? 'Certified' : 'In Training'}</span>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="action-btn secondary"
                  onClick={() => handleSaveToNotepad(`Researching Member: ${selectedMember.name}\nRank: ${selectedMember.rank}\nTitle: ${selectedMember.title}`, 'Member Observations')}
                >
                  <Save size={16} /> Record Observation
                </button>
                <button className="action-btn primary">
                  <Users size={16} /> Send Connection Request
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommunityConstellation;
