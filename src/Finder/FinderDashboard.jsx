import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, BookOpen, Pocket, Layers, Palette, LogOut, Map, MessageSquare, GraduationCap, Settings as SettingsIcon, UserCircle, Gamepad2, Sparkles, CreditCard, Award, FileText, Trophy, PenTool, BrainCircuit, Library, User, Star, Moon, ShoppingBag, Layout } from 'lucide-react';
import { userStore } from "../state/UserState/userStore";
import FinderNotes from './Tools/Notes/FinderNotes';
import FinderBackPocket from './Tools/BackPocket/FinderBackPocket';
import FinderDecks from './Tools/Decks/FinderDecks';
import FinderStudio from './Tools/Studio/FinderStudio';
import FinderDeckBuilder from './Tools/DeckBuilder/FinderDeckBuilder';
import FinderJourneyMap from './Journey/FinderJourneyMap';
import StudyBuddy from './Tools/StudyBuddy/StudyBuddy';
import FlashCardMastery from '../FlashCards/FlashCardMastery';
import ReaderProfile from '../Readers/ReaderProfile';
import MemberPlatform from '../Readings/MemberPlatform';
import MysteryTarotCourseBook from '../Books/CourseBook/MysteryTarotCourseBook';
import MysteryTarotWorkbook from '../Books/Workbook/MysteryTarotWorkbook';
import LunaTestingMajorMinor from '../Books/Testing/LunaTestingMajorMinor';
import CertificationEngine from '../Certification/CertificationEngine';
import ReaderRanking from '../Readers/Ranking/ReaderRanking';
import AchievementSystem from '../Achievements/AchievementSystem';
import LunaMentorSystem from '../Luna/Mentor/LunaMentorSystem';
import TarotLibrary from '../Library/TarotLibrary';
import FinderSanctuary from './Sanctuary/FinderSanctuary';
import LunaRitualMode from '../Luna/RitualMode/LunaRitualMode';
import TarotEncyclopedia from '../Encyclopedia/TarotEncyclopedia';
import MemberProfile from '../Profile/MemberProfile';
import CommunityConstellation from '../Community/Constellation/CommunityConstellation';
import LunaDreamwork from '../Luna/Dreamwork/LunaDreamwork';
import TarotDesignStudio from '../Luna/DesignStudio/TarotDesignStudio';
import AddOnsStore from '../Store/AddOnsStore';
import Marketplace from '../Marketplace/Marketplace';
import LunaMenu from '../Luna/LunaMenu';
import AskLunaReading from '../Luna/AskLuna/AskLunaReading';
import Worksheet from '../Courses/Worksheets/Worksheet';
import GameArcade from '../Games/GameArcade';
import { COURSE_COMPONENTS } from '../Courses/CourseRegistry';
import { COURSE_DATA } from '../Courses/CourseData';
import './finderDashboard.css';

const FinderDashboard = ({ onLogout = () => {} }) => {
  const user = userStore.getState().user || { name: "Member", level: 1 };
  const finderName = user.name;
  const [activeTool, setActiveTool] = useState('dashboard'); // dashboard, notes, backpocket, decks, studio, deckbuilder, journey, chat, courses, settings, preferences, studybuddy, reader-profile, member-platform, course-book, course-workbook
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [selectedWorksheetId, setSelectedWorksheetId] = useState(null);
  const [selectedWorkbookSection, setSelectedWorkbookSection] = useState(null);
  const [courseViewMode, setCourseViewMode] = useState('overview'); // 'overview', 'syllabus', 'lesson', 'worksheet'
  const [decks, setDecks] = useState([]);
  const [editingDeck, setEditingDeck] = useState(null);
  const [finderProgress, setFinderProgress] = useState({
    arrival: true,
    becameFinder: true,
    firstDeck: false,
    cardArt: false,
    deckPreview: false,
    nextSteps: false
  });

  const updateProgress = (key) => {
    if (!finderProgress[key]) {
      setFinderProgress(prev => ({ ...prev, [key]: true }));
    }
  };

  const handleSaveDeck = (newDeck) => {
    if (editingDeck) {
      setDecks(decks.map(d => d.id === editingDeck.id ? newDeck : d));
      updateProgress('cardArt'); // Assume editing a deck involves card art
    } else {
      setDecks([...decks, newDeck]);
      updateProgress('firstDeck');
    }
    setEditingDeck(null);
    setActiveTool('decks');
  };

  const handleCreateDeck = () => {
    setEditingDeck(null);
    setActiveTool('deckbuilder');
  };

  const handleEditDeck = (deck) => {
    setEditingDeck(deck);
    setActiveTool('deckbuilder');
  };

  const handleOpenPreview = () => {
    updateProgress('deckPreview');
    // For now, just show a message or stay on decks
    alert("Deck Preview Awakening...");
  };

  const handleMenuNavigate = (id) => {
    // Map menu IDs to dashboard tool IDs
    const idMap = {
      'dashboard': 'dashboard',
      'notepad': 'notes',
      'backpocket': 'backpocket',
      'flashcards': 'flashcards',
      'arcade': 'arcade',
      'design-room': 'studio',
      'show-room': 'decks',
      'live-chat': 'chat',
      'courses': 'courses',
      'reader-profile': 'reader-profile',
      'member-platform': 'member-platform',
      'public-marketplace': 'public-marketplace',
      'course-book': 'course-book',
      'course-workbook': 'course-workbook',
      'achievements': 'achievements',
      'tarot-library': 'tarot-library',
      'luna-mentor': 'luna-mentor',
      'luna-ask': 'luna-ask',
      'ranking': 'ranking',
      'certification': 'certification',
      'journey': 'journey',
      'spread-builder': 'spread-builder',
      'ritual-mode': 'ritual-mode',
      'settings': 'settings',
      'preferences': 'preferences'
    };

    if (id === 'course-book' || id === 'course-workbook' || id === 'luna-testing' || id.startsWith('workbook-section-')) {
      if (id.startsWith('workbook-section-')) {
        const sectionNum = parseInt(id.replace('workbook-section-', ''));
        setActiveTool('course-workbook');
        setSelectedWorkbookSection(sectionNum);
      } else {
        setActiveTool(id);
      }
      return;
    }

    if (id.startsWith('course-')) {
      const parts = id.split('-');
      const courseNum = parseInt(parts[1]);
      setSelectedCourseId(courseNum);
      
      if (parts[2] === 'lesson') {
        setSelectedLessonId(parseInt(parts[3]));
        setCourseViewMode('lesson');
      } else if (parts[2] === 'worksheet') {
        setSelectedWorksheetId(parseInt(parts[3]));
        setCourseViewMode('worksheet');
      } else if (parts[2] === 'syllabus') {
        setCourseViewMode('syllabus');
      } else {
        setCourseViewMode('overview');
      }
      
      setActiveTool('courses');
      return;
    }

    const mappedId = idMap[id] || id;
    if (mappedId === 'public-marketplace') {
      window.open('/marketplace', '_blank');
      return;
    }
    
    setActiveTool(mappedId);
    if (id === 'courses' && !selectedCourseId) {
      setSelectedCourseId(1);
      setCourseViewMode('overview');
    }
  };

  const [courseProgress, setCourseProgress] = useState(() => {
    const saved = localStorage.getItem('finder_course_progress');
    return saved ? JSON.parse(saved) : {};
  });

  const updateCourseProgress = (courseId, completed = true) => {
    const newProgress = { ...courseProgress, [courseId]: completed };
    setCourseProgress(newProgress);
    localStorage.setItem('finder_course_progress', JSON.stringify(newProgress));
  };

  const renderCourseContent = () => {
    if (!selectedCourseId || !COURSE_COMPONENTS[selectedCourseId]) {
      return (
        <div className="p-20 text-center">
          <h1 className="text-3xl mb-4 font-serif">Mystery Tarot Courses</h1>
          <p className="opacity-50 italic">Select a path from the Luna menu to begin your study.</p>
        </div>
      );
    }

    if (courseViewMode === 'worksheet') {
      const worksheetData = COURSE_DATA[selectedCourseId]?.worksheets?.[selectedWorksheetId];
      return (
        <Worksheet 
          data={worksheetData}
          onBack={() => setCourseViewMode('syllabus')}
          onComplete={(score) => {
            console.log(`Worksheet completed with score: ${score}`);
            if (score >= 80) updateCourseProgress(selectedCourseId);
            setCourseViewMode('syllabus');
          }}
        />
      );
    }

    let CourseComp;
    if (courseViewMode === 'overview') {
      CourseComp = COURSE_COMPONENTS[selectedCourseId].overview;
    } else if (courseViewMode === 'syllabus') {
      CourseComp = COURSE_COMPONENTS[selectedCourseId].syllabus;
    } else if (courseViewMode === 'lesson') {
      CourseComp = COURSE_COMPONENTS[selectedCourseId].lessons[selectedLessonId];
    } else if (courseViewMode === 'final-exam') {
      CourseComp = COURSE_COMPONENTS[selectedCourseId].finalExam;
    }

    return (
      <Suspense fallback={<div className="p-20 text-center opacity-50">The wisdom is manifesting...</div>}>
        <CourseComp 
          courseId={selectedCourseId}
          onStart={() => {
            setCourseViewMode('syllabus');
          }}
          onViewSyllabus={() => setCourseViewMode('syllabus')}
          onStartFinal={() => setCourseViewMode('final-exam')}
          onBack={() => setCourseViewMode('overview')}
          onNavigate={(tool) => setActiveTool(tool)}
          onComplete={() => {
            updateCourseProgress(selectedCourseId);
            setCourseViewMode('syllabus');
          }}
          onSelectLesson={(lessonId) => {
            setSelectedLessonId(lessonId);
            setCourseViewMode('lesson');
          }}
          onSelectWorksheet={(worksheetId) => {
            setSelectedWorksheetId(worksheetId);
            setCourseViewMode('worksheet');
          }}
          onSelectArcade={() => setActiveTool('arcade')}
        />
      </Suspense>
    );
  };

  const tools = [
    { id: 'notes', name: 'Notes', icon: <Book size={24} />, component: <FinderNotes onNavigate={handleMenuNavigate} /> },
    { id: 'backpocket', name: 'BackPocket', icon: <Pocket size={24} />, component: <FinderBackPocket /> },
    { id: 'decks', name: 'Decks', icon: <Layers size={24} />, component: <FinderDecks decks={decks} onCreateDeck={handleCreateDeck} onEditDeck={handleEditDeck} onOpenPreview={handleOpenPreview} /> },
    { id: 'studio', name: 'Studio', icon: <Palette size={24} />, component: <FinderStudio /> },
    { id: 'arcade', name: 'Arcade', icon: <Gamepad2 size={24} />, component: <GameArcade /> },
    { id: 'flashcards', name: 'Flash Cards', icon: <CreditCard size={24} />, component: <FlashCardMastery /> },
    { id: 'reader-profile', name: 'Reader Profile', icon: <UserCircle size={24} />, component: <ReaderProfile /> },
    { id: 'member-platform', name: 'Member Readings', icon: <MessageSquare size={24} />, component: <MemberPlatform /> },
    { id: 'course-book', name: 'Course Book', icon: <BookOpen size={24} />, component: <MysteryTarotCourseBook onNavigate={handleMenuNavigate} /> },
    { id: 'course-workbook', name: 'Course Workbook', icon: <PenTool size={24} />, component: <MysteryTarotWorkbook onNavigate={handleMenuNavigate} initialSection={selectedWorkbookSection} /> },
    { id: 'luna-testing', name: 'Testing Out', icon: <GraduationCap size={24} />, component: <LunaTestingMajorMinor onNavigate={handleMenuNavigate} /> },
    { id: 'final-exams', name: 'Final Exams', icon: <GraduationCap size={24} />, component: renderCourseContent() },
    { id: 'journey', name: 'Your Journey', icon: <Map size={24} />, component: <FinderJourneyMap progress={finderProgress} onReturn={() => setActiveTool('dashboard')} /> },
    { id: 'deckbuilder', name: 'Deck Builder', icon: <Layers size={24} />, component: <FinderDeckBuilder onSave={handleSaveDeck} onCancel={() => setActiveTool('decks')} initialDeck={editingDeck} /> },
    { id: 'chat', name: 'Live Chat', icon: <MessageSquare size={24} />, component: <div className="p-20 text-center"><h1>Mystery Members Live Chat</h1><p className="opacity-50 mt-4 italic">The collective voice awakens soon...</p></div> },
    { id: 'studybuddy', name: 'Study Buddy', icon: <Sparkles size={24} />, component: <StudyBuddy onNavigate={handleMenuNavigate} /> },
    { id: 'courses', name: 'Courses', icon: <GraduationCap size={24} />, component: renderCourseContent() },
    { id: 'settings', name: 'Settings', icon: <SettingsIcon size={24} />, component: <div className="p-20 text-center"><h1>Settings</h1><p className="opacity-50 mt-4 italic">Fine-tuning the sanctuary...</p></div> },
    { id: 'preferences', name: 'Luna Preferences', icon: <UserCircle size={24} />, component: <div className="p-20 text-center"><h1>Luna Preferences</h1><p className="opacity-50 mt-4 italic">Luna is listening to your heart's desires...</p></div> },
    { id: 'certification', name: 'Certification', icon: <Award size={24} />, component: <CertificationEngine onNavigate={setActiveTool} /> },
    { id: 'ranking', name: 'Reader Ranking', icon: <Trophy size={24} />, component: <ReaderRanking onNavigate={setActiveTool} /> },
    { id: 'achievements', name: 'Achievements', icon: <Award size={24} />, component: <AchievementSystem onNavigate={setActiveTool} /> },
    { id: 'tarot-library', name: 'Tarot Library', icon: <Library size={24} />, component: <TarotLibrary onNavigate={handleMenuNavigate} /> },
    { id: 'tarot-encyclopedia', name: 'Tarot Encyclopedia', icon: <Book size={24} />, component: <TarotEncyclopedia onNavigate={handleMenuNavigate} /> },
    { id: 'member-profile', name: 'Member Profile', icon: <User size={24} />, component: <MemberProfile onNavigate={handleMenuNavigate} /> },
    { id: 'community-constellation', name: 'Community Constellation', icon: <Star size={24} />, component: <CommunityConstellation onNavigate={handleMenuNavigate} /> },
    { id: 'dreamwork', name: 'Dreamwork', icon: <Moon size={24} />, component: <LunaDreamwork onNavigate={handleMenuNavigate} /> },
    { id: 'design-studio', name: 'Design Studio', icon: <Palette size={24} />, component: <TarotDesignStudio onNavigate={handleMenuNavigate} /> },
    { id: 'addons-store', name: 'Add-Ons Store', icon: <ShoppingBag size={24} />, component: <AddOnsStore onNavigate={handleMenuNavigate} /> },
    { id: 'marketplace', name: 'Marketplace', icon: <ShoppingBag size={24} />, component: <Marketplace onNavigate={handleMenuNavigate} /> },
    { id: 'spread-builder', name: 'Spread Builder', icon: <Layout size={24} />, component: <div className="p-20 text-center"><h1>Spread Builder</h1><p className="opacity-50 mt-4 italic">Architecting the sacred patterns...</p></div> },
    { id: 'ritual-mode', name: 'Ritual Mode', icon: <Sparkles size={24} />, component: <LunaRitualMode onNavigate={handleMenuNavigate} /> },
    { id: 'luna-mentor', name: 'Luna Mentor', icon: <BrainCircuit size={24} />, component: <LunaMentorSystem /> },
    { id: 'luna-ask', name: 'Ask Luna Reading', icon: <Sparkles size={24} />, component: <AskLunaReading /> },
  ];

  const renderContent = () => {
    if (activeTool === 'dashboard') {
      return (
        <FinderSanctuary 
          finderName={finderName} 
          onNavigate={handleMenuNavigate}
        />
      );
    }

    const tool = tools.find(t => t.id === activeTool);
    if (activeTool === 'journey') return tool.component;

    return (
      <div className="finder-tool-view">
        <button className="back-to-dashboard" onClick={() => setActiveTool('dashboard')}>
          ← Back to Sanctuary
        </button>
        {tool.component}
      </div>
    );
  };

  return (
    <div className="finder-dashboard-container">
      <nav className="finder-top-nav">
        <div className="finder-logo">Finder Sanctuary</div>
        <div className="flex items-center gap-6">
          <button className="finder-logout-btn" onClick={onLogout}>
            <LogOut size={20} />
            <span>Leave Sanctuary</span>
          </button>
        </div>
      </nav>

      <main className="finder-main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTool}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default FinderDashboard;
