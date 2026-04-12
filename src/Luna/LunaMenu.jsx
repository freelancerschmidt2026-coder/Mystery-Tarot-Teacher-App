import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Book, 
  Pocket, 
  Palette, 
  Tv, 
  MessageSquare, 
  GraduationCap, 
  Settings, 
  UserCircle, 
  LogOut,
  ChevronRight,
  Moon,
  Gamepad2,
  Sparkles,
  CreditCard,
  Globe,
  Award,
  Trophy,
  BrainCircuit,
  Library,
  Wind,
  Mic,
  ShoppingBag,
  Star,
  User
} from 'lucide-react';
import './lunaMenu.css';
import DropdownMenu from '../components/Navigation/DropdownMenu';

const LunaMenu = ({ onLogout = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowCourses(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <Home size={18} />, path: '/dashboard' },
    { id: 'notepad', name: 'NotePad', icon: <Book size={18} />, path: '/notepad' },
    { id: 'backpocket', name: 'BackPocket', icon: <Pocket size={18} />, path: '/back-pocket' },
    { id: 'design-studio', name: 'Design Studio', icon: <Palette size={18} />, path: '/design-studio' },
    { id: 'dreamwork', name: 'Dreamwork', icon: <Moon size={18} />, path: '/luna/dreamwork' },
    { id: 'ritual-mode', name: 'Ritual Mode', icon: <Wind size={18} />, path: '/luna/rituals' },
    { id: 'luna-mentor', name: 'Luna Mentor', icon: <BrainCircuit size={18} />, path: '/luna/mentor' },
    { id: 'luna-ask', name: 'Ask Luna Reading', icon: <Sparkles size={18} />, path: '/luna/ask' },
    { id: 'luna-voice-settings', name: 'Luna Voice Settings', icon: <Mic size={18} />, path: '/luna/voice-settings' },
    { id: 'logout', name: 'Logout', icon: <LogOut size={18} />, isDestructive: true },
  ];

  const handleItemClick = (item) => {
    if (item.id === 'logout') {
      onLogout();
    } else if (item.path) {
      navigate(item.path);
    }
    setIsOpen(false);
  };

  return (
    <div className="luna-menu-wrapper" ref={menuRef}>
      <div className="flex items-center gap-4">
        <DropdownMenu />
        <motion.button
          className={`luna-trigger ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Moon className="luna-icon" size={28} />
          <div className="luna-glow"></div>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="luna-dropdown"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <div className="luna-dropdown-header">
              <span>Luna Command Ribbon</span>
            </div>
            <div className="luna-dropdown-content">
              {menuItems.map((item) => (
                <div key={item.id} className="menu-item-container">
                  <button
                    className={`menu-item ${item.isDestructive ? 'destructive' : ''} ${item.id === 'courses' && showCourses ? 'active' : ''}`}
                    onClick={() => handleItemClick(item)}
                  >
                    <span className="item-icon">{item.icon}</span>
                    <span className="item-name">{item.name}</span>
                    {item.hasSubmenu && (
                      <ChevronRight 
                        size={14} 
                        className={`submenu-arrow ${showCourses ? 'rotated' : ''}`} 
                      />
                    )}
                  </button>

                  {item.id === 'courses' && showCourses && (
                    <motion.div 
                      className="submenu"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      {[...Array(10)].map((_, i) => {
                        const courseNum = i + 1;
                        return (
                          <div key={i} className="course-submenu-group">
                            <button 
                              className="submenu-item course-title-btn"
                              onClick={() => {
                                onNavigate(`course-${courseNum}`);
                                setIsOpen(false);
                              }}
                            >
                              Course {courseNum}
                            </button>
                            {courseNum === 1 && (
                              <div className="course-details-submenu">
                                <button 
                                  className="detail-item"
                                  onClick={() => {
                                    onNavigate(`course-1-syllabus`);
                                    setIsOpen(false);
                                  }}
                                >
                                  • Syllabus
                                </button>
                                {[1, 2, 3, 4, 5].map(lessonNum => (
                                  <button 
                                    key={lessonNum}
                                    className="detail-item"
                                    onClick={() => {
                                      onNavigate(`course-1-lesson-${lessonNum}`);
                                      setIsOpen(false);
                                    }}
                                  >
                                    • Lesson {lessonNum}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                      <div className="course-submenu-group mt-4 pt-4 border-t border-white/10">
                        <button 
                          className="submenu-item course-title-btn"
                          onClick={() => {
                            onNavigate('course-book');
                            setIsOpen(false);
                          }}
                        >
                          Course Book
                        </button>
                        <button 
                          className="submenu-item course-title-btn"
                          onClick={() => {
                            onNavigate('course-workbook');
                            setIsOpen(false);
                          }}
                        >
                          Course Workbook
                        </button>
                        <button 
                          className="submenu-item course-title-btn"
                          onClick={() => {
                            onNavigate('luna-testing');
                            setIsOpen(false);
                          }}
                        >
                          Testing Out
                        </button>
                        <button 
                          className="submenu-item course-title-btn"
                          onClick={() => {
                            onNavigate('final-exams');
                            setIsOpen(false);
                          }}
                        >
                          Final Exams
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LunaMenu;
