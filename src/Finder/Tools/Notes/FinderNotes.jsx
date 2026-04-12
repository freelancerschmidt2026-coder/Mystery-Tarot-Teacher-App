import React, { useState, useEffect } from 'react';
import { Book, BookOpen, ChevronRight, FileText, Trophy, History, CheckCircle, AlertCircle, Mic, PenTool, MessageSquare, Save, Bookmark, Sparkles, Award, GraduationCap, TrendingUp, BarChart3, BrainCircuit, Heart, Target, Library, Compass, Star } from 'lucide-react';
import { TAROT_CARDS } from '../../../FlashCards/TarotData';
import './finderNotes.css';

const FinderNotes = ({ onNavigate }) => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('finder_notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentNote, setCurrentNote] = useState('');
  const [view, setView] = useState('editor'); // 'editor' or 'index'
  const [selectedPage, setSelectedPage] = useState(null);
  const [testHistory, setTestHistory] = useState(() => {
    const saved = localStorage.getItem('luna_test_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('luna_test_history', JSON.stringify(testHistory));
  }, [testHistory]);

  useEffect(() => {
    localStorage.setItem('finder_notes', JSON.stringify(notes));
  }, [notes]);

  const handleSave = () => {
    if (currentNote.trim()) {
      setNotes([...notes, { id: Date.now(), text: currentNote, page: selectedPage }]);
      setCurrentNote('');
    }
  };

  const course1Pages = [
    { 
      id: 'c1-l1', 
      title: 'Lesson 1: History of Tarot', 
      subtopics: [
        { id: 'c1-l1-s1', title: 'Renaissance Roots' },
        { id: 'c1-l1-s2', title: 'Divination Shift' }
      ] 
    },
    { 
      id: 'c1-l2', 
      title: 'Lesson 2: First Decks', 
      subtopics: [
        { id: 'c1-l2-s1', title: 'Visconti-Sforza' },
        { id: 'c1-l2-s2', title: 'Marseilles' },
        { id: 'c1-l2-s3', title: 'RWS' }
      ] 
    },
    { 
      id: 'c1-l3', 
      title: 'Lesson 3: Major Arcana', 
      subtopics: [
        { id: 'c1-l3-s1', title: 'Archetypes' },
        { id: 'c1-l3-s2', title: 'The 22 Keys' }
      ] 
    },
    { 
      id: 'c1-l4', 
      title: 'Lesson 4: Minor Arcana', 
      subtopics: [
        { id: 'c1-l4-s1', title: 'Four Suits' },
        { id: 'c1-l4-s2', title: 'Court Cards' }
      ] 
    },
    { 
      id: 'c1-l5', 
      title: 'Lesson 5: Fool\'s Journey', 
      subtopics: [
        { id: 'c1-l5-s1', title: 'The Leap' },
        { id: 'c1-l5-s2', title: 'Spiritual Evolution' }
      ] 
    },
  ];

  const arcadePages = [
    { id: 'arc-match', title: 'Arcana Matching' },
    { id: 'arc-trivia', title: 'Tarot Trivia' },
    { id: 'arc-design', title: 'Design Synthesis' },
    { id: 'arc-symbol', title: 'Symbolic Insight' },
  ];

  const bookPages = [
    { id: 'course-book', title: 'Mystery Tarot Course Book', icon: <BookOpen size={14} /> },
  ];

  const workbookPages = [
    { id: 'course-workbook', title: 'Workbook Home', icon: <PenTool size={14} /> },
    ...[...Array(10)].map((_, i) => ({ id: `workbook-section-${i+1}`, title: `Section ${i+1}`, icon: <Book size={14} /> })),
    { id: 'workbook-saved', title: 'Saved Exercises', icon: <Save size={14} /> },
    { id: 'workbook-bookmarks', title: 'Bookmarked Exercises', icon: <Bookmark size={14} /> },
    { id: 'workbook-reflections', title: 'Reflection Archive', icon: <Sparkles size={14} /> },
  ];

  const masteryPages = [
    { id: 'major-mastery', title: 'Major Arcana Mastery', icon: <Trophy size={14} /> },
    { id: 'minor-mastery', title: 'Minor Arcana Mastery', icon: <Trophy size={14} /> },
    { id: 'test-history', title: 'Testing History', icon: <History size={14} /> },
    { id: 'passed-cards', title: 'Passed Cards', icon: <CheckCircle size={14} /> },
    { id: 'review-cards', title: 'Cards Needing Review', icon: <AlertCircle size={14} /> },
    { id: 'oral-exams', title: 'Oral Exam Attempts', icon: <Mic size={14} /> },
    { id: 'written-exams', title: 'Written Exam Attempts', icon: <PenTool size={14} /> },
    { id: 'feedback-archive', title: 'Luna Feedback Archive', icon: <MessageSquare size={14} /> },
    { id: 'final-exam-history', title: 'Final Exam History', icon: <History size={14} /> },
    { id: 'essay-archive', title: 'Essay Archive', icon: <PenTool size={14} /> },
    { id: 'passed-courses', title: 'Passed Courses', icon: <CheckCircle size={14} /> },
    { id: 'review-courses', title: 'Courses Needing Review', icon: <AlertCircle size={14} /> },
    { id: 'cert-progress', title: 'Certification Progress', icon: <Award size={14} /> },
    { id: 'capstone-archive', title: 'Capstone Archive', icon: <FileText size={14} /> },
    { id: 'practice-archive', title: 'Practice Reading Archive', icon: <MessageSquare size={14} /> },
    { id: 'ranking-progress', title: 'Ranking Progress', icon: <TrendingUp size={14} /> },
    { id: 'reading-stats', title: 'Reading Stats', icon: <BarChart3 size={14} /> },
    { id: 'achievements-index', title: 'Achievements', icon: <Award size={14} /> },
    { id: 'titles-index', title: 'Titles', icon: <Trophy size={14} /> },
    { id: 'badge-history', title: 'Badge History', icon: <History size={14} /> },
    { id: 'mentor-notes', title: 'Mentor Notes', icon: <BrainCircuit size={14} /> },
    { id: 'luna-recs', title: "Luna's Recommendations", icon: <Sparkles size={14} /> },
    { id: 'study-plans', title: 'Personalized Study Plans', icon: <Target size={14} /> },
    { id: 'support-archive', title: 'Emotional Support Archive', icon: <Heart size={14} /> },
  ];
  
  const libraryPages = [
    { id: 'tarot-library-cards', title: 'Saved Cards', icon: <Star size={14} />, section: 'Saved Cards' },
    { id: 'tarot-library-symbols', title: 'Saved Symbols', icon: <Compass size={14} />, section: 'Saved Symbols' },
    { id: 'tarot-library-research', title: 'Research Notes', icon: <BookOpen size={14} />, section: 'Research Notes' },
  ];

  const ritualPages = [
    { id: 'ritual-notes', title: 'Ritual Notes', icon: <Sparkles size={14} />, section: 'Ritual Notes' },
    { id: 'ritual-daily-log', title: 'Daily Ritual Log', icon: <Sun size={14} />, section: 'Daily Ritual Log' },
    { id: 'ritual-moon-archive', title: 'Moon Ritual Archive', icon: <Moon size={14} />, section: 'Moon Ritual Archive' },
  ];

  const encyclopediaPages = [
    { id: 'encyclopedia-notes', title: 'Encyclopedia Notes', icon: <Book size={14} />, section: 'Encyclopedia Notes' },
    { id: 'encyclopedia-comparisons', title: 'Saved Comparisons', icon: <Columns size={14} />, section: 'Saved Comparisons' },
    { id: 'encyclopedia-research', title: 'Symbol Research', icon: <Compass size={14} />, section: 'Symbol Research' },
  ];

  const profilePages = [
    { id: 'profile-notes', title: 'Profile Notes', icon: <User size={14} />, section: 'Profile Notes' },
    { id: 'profile-luna-insights', title: "Luna's Insights", icon: <BrainCircuit size={14} />, section: "Luna's Insights" },
    { id: 'profile-ritual-log', title: 'Ritual Log Archive', icon: <History size={14} />, section: 'Ritual Log Archive' },
  ];

  const constellationPages = [
    { id: 'constellation-notes', title: 'Constellation Notes', icon: <Star size={14} />, section: 'Constellation Notes' },
    { id: 'constellation-observations', title: 'Member Observations', icon: <Users size={14} />, section: 'Member Observations' },
  ];

  const dreamworkPages = [
    { id: 'dream-log', title: 'Dream Log', icon: <Moon size={14} />, section: 'Dream Log' },
    { id: 'symbol-map', title: 'Symbol Map', icon: <Search size={14} />, section: 'Symbol Map' },
    { id: 'dream-insights', title: "Luna's Dream Insights", icon: <BrainCircuit size={14} />, section: "Luna's Dream Insights" },
  ];

  const designPages = [
    { id: 'design-creations', title: 'Design Studio Creations', icon: <Palette size={14} />, section: 'Design Studio Creations' },
    { id: 'design-projects', title: 'Deck Projects', icon: <Layers size={14} />, section: 'Deck Projects' },
  ];

  const storePages = [
    { id: 'store-purchases', title: 'Purchased Add-Ons', icon: <ShoppingBag size={14} />, section: 'Purchased Add-Ons' },
    { id: 'store-receipts', title: 'Store Receipts', icon: <CreditCard size={14} />, section: 'Store Receipts' },
  ];

  const marketplacePages = [
    { id: 'market-purchases', title: 'Marketplace Purchases', icon: <ShoppingBag size={14} />, section: 'Marketplace Purchases' },
    { id: 'market-favorites', title: 'Reader Favorites', icon: <Heart size={14} />, section: 'Reader Favorites' },
  ];

  const cardTestPages = TAROT_CARDS.map(card => ({
    id: `test-${card.id}`,
    title: `Test: ${card.name}`,
    cardId: card.id
  }));

  const getPageTitle = (id) => {
    if (id?.startsWith('test-')) {
      const cardId = id.replace('test-', '');
      const card = TAROT_CARDS.find(c => c.id === cardId);
      return card ? `Card Test: ${card.name}` : 'Card Test';
    }
    for (const page of masteryPages) {
      if (page.id === id) return page.title;
    }
    for (const page of course1Pages) {
      if (page.id === id) return page.title;
      const sub = page.subtopics.find(s => s.id === id);
      if (sub) return `${page.title} - ${sub.title}`;
    }
    for (const page of arcadePages) {
      if (page.id === id) return `Arcade: ${page.title}`;
    }
    for (const page of workbookPages) {
      if (page.id === id) return page.title;
    }
    for (const page of bookPages) {
      if (page.id === id) return page.title;
    }
    for (const page of workbookPages) {
      if (page.id === id) return page.title;
    }
    if (id === 'final-exam-history') return 'Final Exam History';
    if (id === 'essay-archive') return 'Essay Archive';
    if (id === 'passed-courses') return 'Passed Courses';
    if (id === 'review-courses') return 'Courses Needing Review';
    if (id === 'cert-progress') return 'Certification Progress';
    if (id === 'capstone-archive') return 'Capstone Archive';
    if (id === 'practice-archive') return 'Practice Reading Archive';
    if (id === 'ranking-progress') return 'Ranking Progress';
    if (id === 'reading-stats') return 'Reading Stats';
    if (id === 'achievements-index') return 'Achievements';
    if (id === 'titles-index') return 'Titles';
    if (id === 'badge-history') return 'Badge History';
    if (id === 'mentor-notes') return 'Mentor Notes';
    if (id === 'luna-recs') return "Luna's Recommendations";
    if (id === 'study-plans') return 'Personalized Study Plans';
    if (id === 'support-archive') return 'Emotional Support Archive';
    if (id?.startsWith('tarot-library-')) {
      const page = libraryPages.find(p => p.id === id);
      return page ? `Library: ${page.title}` : 'Tarot Library';
    }
    if (id?.startsWith('ritual-')) {
      const page = ritualPages.find(p => p.id === id);
      return page ? `Ritual: ${page.title}` : 'Ritual Mode';
    }
    if (id?.startsWith('encyclopedia-')) {
      const page = encyclopediaPages.find(p => p.id === id);
      return page ? `Encyclopedia: ${page.title}` : 'Tarot Encyclopedia';
    }
    if (id?.startsWith('profile-')) {
      const page = profilePages.find(p => p.id === id);
      return page ? `Profile: ${page.title}` : 'Member Profile';
    }
    if (id?.startsWith('constellation-')) {
      const page = constellationPages.find(p => p.id === id);
      return page ? `Constellation: ${page.title}` : 'Community Constellation';
    }
    if (id?.startsWith('dream-') || id === 'symbol-map') {
      const page = dreamworkPages.find(p => p.id === id);
      return page ? `Dreamwork: ${page.title}` : 'Dreamwork';
    }
    if (id?.startsWith('design-')) {
      const page = designPages.find(p => p.id === id);
      return page ? `Design Studio: ${page.title}` : 'Design Studio';
    }
    if (id?.startsWith('store-')) {
      const page = storePages.find(p => p.id === id);
      return page ? `Mystery Store: ${page.title}` : 'Mystery Store';
    }
    if (id?.startsWith('market-')) {
      const page = marketplacePages.find(p => p.id === id);
      return page ? `Marketplace: ${page.title}` : 'Marketplace';
    }
    return 'General Notes';
  };

  const renderIndex = () => (
    <div className="notes-index">
      <h3 className="index-title"><Book size={18} /> Course 1 Index</h3>
      <div className="index-list">
        {course1Pages.map(page => (
          <div key={page.id} className="index-item-group">
            <button 
              className={`index-item ${selectedPage === page.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedPage(page.id);
                setView('editor');
              }}
            >
              <FileText size={14} />
              <span>{page.title}</span>
            </button>
            <div className="index-subtopics">
              {page.subtopics.map((sub) => (
                <button 
                  key={sub.id} 
                  className={`subtopic-btn ${selectedPage === sub.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedPage(sub.id);
                    setView('editor');
                  }}
                >
                  {sub.title}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h3 className="index-title mt-8"><Book size={18} /> Luna Training Arcade</h3>
      <div className="index-list">
        {arcadePages.map(page => (
          <button 
            key={page.id}
            className={`index-item ${selectedPage === page.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedPage(page.id);
              setView('editor');
            }}
          >
            <FileText size={14} />
            <span>{page.title}</span>
          </button>
        ))}
      </div>

      <h3 className="index-title mt-8"><BookOpen size={18} /> Reference Books</h3>
      <div className="index-list">
        {bookPages.map(page => (
          <button 
            key={page.id}
            className={`index-item ${selectedPage === page.id ? 'active' : ''}`}
            onClick={() => {
              if (onNavigate) {
                onNavigate(page.id);
              } else {
                setSelectedPage(page.id);
                setView('editor');
              }
            }}
          >
            {page.icon}
            <span>{page.title}</span>
          </button>
        ))}
        {workbookPages.map(page => (
          <button 
            key={page.id}
            className={`index-item ${selectedPage === page.id ? 'active' : ''}`}
            onClick={() => {
              if (onNavigate && (page.id === 'course-workbook' || page.id.startsWith('workbook-section-'))) {
                onNavigate(page.id);
              } else {
                setSelectedPage(page.id);
                setView('editor');
              }
            }}
          >
            {page.icon}
            <span>{page.title}</span>
          </button>
        ))}
      </div>

      <h3 className="index-title mt-8"><Trophy size={18} /> Tarot Knowledge Testing</h3>
      <div className="index-list">
        {masteryPages.map(page => (
          <button 
            key={page.id}
            className={`index-item ${selectedPage === page.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedPage(page.id);
              setView('editor');
            }}
          >
            {page.icon}
            <span>{page.title}</span>
          </button>
        ))}
      </div>

      <h3 className="index-title mt-8"><Library size={18} /> Tarot Library Archive</h3>
      <div className="index-list">
        {libraryPages.map(page => (
          <button 
            key={page.id}
            className={`index-item ${selectedPage === page.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedPage(page.id);
              setView('editor');
            }}
          >
            {page.icon}
            <span>{page.title}</span>
          </button>
        ))}
      </div>

      <h3 className="index-title mt-8"><Sparkles size={18} /> Ritual Mode Archive</h3>
      <div className="index-list">
        {ritualPages.map(page => (
          <button 
            key={page.id}
            className={`index-item ${selectedPage === page.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedPage(page.id);
              setView('editor');
            }}
          >
            {page.icon}
            <span>{page.title}</span>
          </button>
        ))}
      </div>

      <h3 className="index-title mt-8"><Book size={18} /> Tarot Encyclopedia Archive</h3>
      <div className="index-list">
        {encyclopediaPages.map(page => (
          <button 
            key={page.id}
            className={`index-item ${selectedPage === page.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedPage(page.id);
              setView('editor');
            }}
          >
            {page.icon}
            <span>{page.title}</span>
          </button>
        ))}
      </div>

      <h3 className="index-title mt-8"><User size={18} /> Member Profile Archive</h3>
      <div className="index-list">
        {profilePages.map(page => (
          <button 
            key={page.id}
            className={`index-item ${selectedPage === page.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedPage(page.id);
              setView('editor');
            }}
          >
            {page.icon}
            <span>{page.title}</span>
          </button>
        ))}
      </div>

      <h3 className="index-title mt-8"><Star size={18} /> Community Constellation Archive</h3>
      <div className="index-list">
        {constellationPages.map(page => (
          <button 
            key={page.id}
            className={`index-item ${selectedPage === page.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedPage(page.id);
              setView('editor');
            }}
          >
            {page.icon}
            <span>{page.title}</span>
          </button>
        ))}
      </div>

      <h3 className="index-title mt-8"><Moon size={18} /> Dreamwork Archive</h3>
      <div className="index-list">
        {dreamworkPages.map(page => (
          <button 
            key={page.id}
            className={`index-item ${selectedPage === page.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedPage(page.id);
              setView('editor');
            }}
          >
            {page.icon}
            <span>{page.title}</span>
          </button>
        ))}
      </div>

      <h3 className="index-title mt-8"><Palette size={18} /> Design Studio Archive</h3>
      <div className="index-list">
        {designPages.map(page => (
          <button 
            key={page.id}
            className={`index-item ${selectedPage === page.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedPage(page.id);
              setView('editor');
            }}
          >
            {page.icon}
            <span>{page.title}</span>
          </button>
        ))}
      </div>

      <h3 className="index-title mt-8"><ShoppingBag size={18} /> Mystery Store Archive</h3>
      <div className="index-list">
        {storePages.map(page => (
          <button 
            key={page.id}
            className={`index-item ${selectedPage === page.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedPage(page.id);
              setView('editor');
            }}
          >
            {page.icon}
            <span>{page.title}</span>
          </button>
        ))}
      </div>

      <h3 className="index-title mt-8"><ShoppingBag size={18} /> Marketplace Archive</h3>
      <div className="index-list">
        {marketplacePages.map(page => (
          <button 
            key={page.id}
            className={`index-item ${selectedPage === page.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedPage(page.id);
              setView('editor');
            }}
          >
            {page.icon}
            <span>{page.title}</span>
          </button>
        ))}
      </div>

      <h3 className="index-title mt-8"><FileText size={18} /> Card Test Pages</h3>
      <div className="index-list grid grid-cols-2 gap-2">
        {cardTestPages.map(page => (
          <button 
            key={page.id}
            className={`index-item text-xs ${selectedPage === page.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedPage(page.id);
              setView('editor');
            }}
          >
            <FileText size={12} />
            <span>{page.title.replace('Test: ', '')}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderSpecialView = () => {
    if (selectedPage === 'oral-exams' || selectedPage === 'written-exams') {
      const type = selectedPage === 'oral-exams' ? 'Oral' : 'Written';
      const filteredHistory = testHistory.filter(h => h.type.includes(type) || (type === 'Oral' && h.type === 'Luna Mastery'));
      
      return (
        <div className="special-view p-6 bg-black/40 rounded-xl border border-white/10">
          <h3 className="text-xl font-serif text-blue-200 mb-6 flex items-center gap-2">
            {selectedPage === 'oral-exams' ? <Mic size={20} /> : <PenTool size={20} />} {type} Exam Attempts
          </h3>
          {filteredHistory.length === 0 ? (
            <p className="opacity-50 italic">No {type.toLowerCase()} exam attempts recorded yet.</p>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((attempt) => (
                <div key={attempt.id} className="p-4 bg-white/5 rounded-lg border border-white/5 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-lg">{attempt.cardName}</div>
                    <div className="text-xs opacity-50">{new Date(attempt.date).toLocaleString()}</div>
                  </div>
                  <div className={`text-2xl font-bold ${attempt.score >= 80 ? 'text-green-400' : 'text-red-400'}`}>
                    {attempt.score}%
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    if (selectedPage === 'test-history') {
      return (
        <div className="special-view p-6 bg-black/40 rounded-xl border border-white/10">
          <h3 className="text-xl font-serif text-blue-200 mb-6 flex items-center gap-2">
            <History size={20} /> Testing History Archive
          </h3>
          {testHistory.length === 0 ? (
            <p className="opacity-50 italic">No tests have been recorded in the archives yet.</p>
          ) : (
            <div className="space-y-4">
              {testHistory.map((attempt) => (
                <div key={attempt.id} className="p-4 bg-white/5 rounded-lg border border-white/5 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-lg">{attempt.cardName}</div>
                    <div className="text-xs opacity-50">{new Date(attempt.date).toLocaleString()} • {attempt.type}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${attempt.score >= 80 ? 'text-green-400' : 'text-red-400'}`}>
                      {attempt.score}%
                    </div>
                    <div className="text-[10px] uppercase tracking-widest opacity-50">
                      {attempt.score >= 80 ? 'Mastered' : 'Practicing'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (selectedPage === 'workbook-saved' || selectedPage === 'workbook-bookmarks' || selectedPage === 'workbook-reflections' || selectedPage?.startsWith('tarot-library-')) {
      let filteredNotes = [];
      let title = "";
      let icon = null;

      if (selectedPage === 'workbook-saved') {
        filteredNotes = notes.filter(n => n.page === 'course-workbook' && n.section === 'Workbook Notes');
        title = "Saved Exercises";
        icon = <Save size={20} />;
      } else if (selectedPage === 'workbook-bookmarks') {
        const bookmarks = JSON.parse(localStorage.getItem('mystery_tarot_workbook_bookmarks') || '[]');
        filteredNotes = notes.filter(n => bookmarks.some(b => n.text.includes(b))); // Simple heuristic
        title = "Bookmarked Exercises";
        icon = <Bookmark size={20} />;
      } else if (selectedPage === 'workbook-reflections') {
        filteredNotes = notes.filter(n => n.section === 'Reflection Archive');
        title = "Reflection Archive";
        icon = <Sparkles size={20} />;
      } else if (selectedPage?.startsWith('tarot-library-') || selectedPage?.startsWith('ritual-') || selectedPage?.startsWith('encyclopedia-') || selectedPage?.startsWith('profile-') || selectedPage?.startsWith('constellation-') || selectedPage?.startsWith('dream-') || selectedPage === 'symbol-map' || selectedPage?.startsWith('design-') || selectedPage?.startsWith('store-') || selectedPage?.startsWith('market-')) {
        const libPage = libraryPages.find(p => p.id === selectedPage);
        const ritualPage = ritualPages.find(p => p.id === selectedPage);
        const encyclopediaPage = encyclopediaPages.find(p => p.id === selectedPage);
        const profilePage = profilePages.find(p => p.id === selectedPage);
        const constellationPage = constellationPages.find(p => p.id === selectedPage);
        const dreamPage = dreamworkPages.find(p => p.id === selectedPage);
        const designPage = designPages.find(p => p.id === selectedPage);
        const storePage = storePages.find(p => p.id === selectedPage);
        const marketPage = marketplacePages.find(p => p.id === selectedPage);
        const pageInfo = libPage || ritualPage || encyclopediaPage || profilePage || constellationPage || dreamPage || designPage || storePage || marketPage;
        
        filteredNotes = notes.filter(n => 
          (n.page === 'tarot-library' && n.section === pageInfo?.section) ||
          (n.page === 'ritual-mode' && n.section === pageInfo?.section) ||
          (n.page === 'tarot-encyclopedia' && n.section === pageInfo?.section) ||
          (n.page === 'member-profile' && n.section === pageInfo?.section) ||
          (n.page === 'community-constellation' && n.section === pageInfo?.section) ||
          (n.page === 'dreamwork' && n.section === pageInfo?.section) ||
          (n.page === 'design-studio' && n.section === pageInfo?.section) ||
          (n.page === 'mystery-store' && n.section === pageInfo?.section) ||
          (n.page === 'marketplace' && n.section === pageInfo?.section)
        );
        title = pageInfo?.title || "Archive Notes";
        icon = pageInfo?.icon || <Library size={20} />;
      }

      return (
        <div className="special-view p-6 bg-black/40 rounded-xl border border-white/10">
          <h3 className="text-xl font-serif text-yellow-200 mb-6 flex items-center gap-2">
            {icon} {title}
          </h3>
          {filteredNotes.length === 0 ? (
            <p className="opacity-50 italic">No entries found in this section of the workbook.</p>
          ) : (
            <div className="space-y-6">
              {filteredNotes.map((note) => (
                <div key={note.id} className="p-6 bg-white/5 rounded-lg border border-white/5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-xs opacity-50 uppercase tracking-widest">
                      {new Date(note.timestamp || note.id).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="whitespace-pre-wrap opacity-80 leading-relaxed">
                    {note.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (selectedPage === 'passed-cards') {
      const passedCards = TAROT_CARDS.filter(card => 
        testHistory.some(h => h.cardId === card.id && h.score >= 80)
      );
      return (
        <div className="special-view p-6 bg-black/40 rounded-xl border border-white/10">
          <h3 className="text-xl font-serif text-green-200 mb-6 flex items-center gap-2">
            <CheckCircle size={20} /> Passed Cards (Mastered)
          </h3>
          {passedCards.length === 0 ? (
            <p className="opacity-50 italic">No cards have reached mastery level yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {passedCards.map(card => (
                <div key={card.id} className="p-4 bg-green-900/10 border border-green-500/20 rounded-lg text-center">
                  <div className="font-serif text-lg">{card.name}</div>
                  <div className="text-[10px] uppercase text-green-400 mt-2">Mastered</div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (selectedPage === 'review-cards') {
      const reviewCards = TAROT_CARDS.filter(card => 
        !testHistory.some(h => h.cardId === card.id && h.score >= 80)
      );
      return (
        <div className="special-view p-6 bg-black/40 rounded-xl border border-white/10">
          <h3 className="text-xl font-serif text-amber-200 mb-6 flex items-center gap-2">
            <AlertCircle size={20} /> Cards Needing Review
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {reviewCards.map(card => {
              const lastAttempt = testHistory.find(h => h.cardId === card.id);
              return (
                <div key={card.id} className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg text-center">
                  <div className="font-serif text-lg">{card.name}</div>
                  <div className="text-[10px] uppercase text-amber-400 mt-2">
                    {lastAttempt ? `Last Score: ${lastAttempt.score}%` : 'No Attempts'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (selectedPage === 'major-mastery' || selectedPage === 'minor-mastery') {
      const type = selectedPage === 'major-mastery' ? 'major' : 'minor';
      const cards = TAROT_CARDS.filter(c => c.arcana === type);
      const masteredCount = cards.filter(card => 
        testHistory.some(h => h.cardId === card.id && h.score >= 80)
      ).length;
      const progress = Math.round((masteredCount / cards.length) * 100);

      return (
        <div className="special-view p-6 bg-black/40 rounded-xl border border-white/10">
          <h3 className="text-xl font-serif text-blue-200 mb-2 flex items-center gap-2">
            <Trophy size={20} /> {type === 'major' ? 'Major Arcana' : 'Minor Arcana'} Mastery
          </h3>
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Progress</span>
              <span>{masteredCount} / {cards.length} ({progress}%)</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-400 transition-all duration-1000" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {cards.map(card => {
              const isMastered = testHistory.some(h => h.cardId === card.id && h.score >= 80);
              return (
                <div key={card.id} className={`p-2 text-center rounded border text-xs ${isMastered ? 'bg-green-900/20 border-green-500/30 text-green-200' : 'bg-white/5 border-white/10 opacity-50'}`}>
                  {card.name}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (selectedPage === 'feedback-archive') {
      const feedbackItems = testHistory.filter(h => h.feedback);
      return (
        <div className="special-view p-6 bg-black/40 rounded-xl border border-white/10">
          <h3 className="text-xl font-serif text-blue-200 mb-6 flex items-center gap-2">
            <MessageSquare size={20} /> Luna Feedback Archive
          </h3>
          {feedbackItems.length === 0 ? (
            <p className="opacity-50 italic">Luna has not yet provided any archived feedback.</p>
          ) : (
            <div className="space-y-4">
              {feedbackItems.map((item) => (
                <div key={item.id} className="p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-blue-200">{item.cardName}</div>
                    <div className="text-[10px] opacity-50">{new Date(item.date).toLocaleDateString()}</div>
                  </div>
                  <p className="text-sm italic opacity-80">"{item.feedback}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (selectedPage === 'final-exam-history') {
      const history = JSON.parse(localStorage.getItem('luna_final_exam_history') || '[]');
      return (
        <div className="special-view p-6 bg-black/40 rounded-xl border border-white/10">
          <h3 className="text-xl font-serif text-amber-200 mb-6 flex items-center gap-2">
            <History size={20} /> Final Exam History
          </h3>
          {history.length === 0 ? (
            <p className="opacity-50 italic">No final exam records found.</p>
          ) : (
            <div className="space-y-4">
              {history.map((record, i) => (
                <div key={i} className={`p-4 rounded-lg border ${record.passed ? 'bg-green-900/10 border-green-500/20' : 'bg-red-900/10 border-red-500/20'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-bold text-amber-200">{record.courseTitle}</div>
                    <div className="text-[10px] opacity-50">{new Date(record.date).toLocaleDateString()}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded ${record.passed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {record.passed ? 'PASSED' : 'FAILED'}
                    </span>
                    <span className="font-mono text-lg">{record.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (selectedPage === 'passed-courses') {
      const passed = JSON.parse(localStorage.getItem('luna_passed_courses') || '[]');
      return (
        <div className="special-view p-6 bg-black/40 rounded-xl border border-white/10">
          <h3 className="text-xl font-serif text-green-200 mb-6 flex items-center gap-2">
            <CheckCircle size={20} /> Passed Courses
          </h3>
          {passed.length === 0 ? (
            <p className="opacity-50 italic">No courses mastered yet. The journey continues.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {passed.map((id, i) => (
                <div key={i} className="p-6 bg-green-900/10 border border-green-500/20 rounded-xl text-center flex flex-col items-center gap-3">
                  <GraduationCap size={32} className="text-yellow-500" />
                  <div className="font-serif text-lg">Course {id}</div>
                  <div className="text-[10px] uppercase text-green-400">Mastered</div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (selectedPage === 'cert-progress') {
      const passedCourses = JSON.parse(localStorage.getItem('luna_passed_courses') || '[]');
      const finalHistory = JSON.parse(localStorage.getItem('luna_final_exam_history') || '[]');
      const testHistory = JSON.parse(localStorage.getItem('luna_test_history') || '[]');
      const practiceReadings = JSON.parse(localStorage.getItem('luna_practice_readings') || '[]');
      const capstoneResult = JSON.parse(localStorage.getItem('luna_capstone_result') || 'null');

      const majorMastered = TAROT_CARDS.filter(c => c.arcana === 'major').filter(card => 
        testHistory.some(h => h.cardId === card.id && h.score >= 80)
      ).length;

      const minorMastered = TAROT_CARDS.filter(c => c.arcana === 'minor').filter(card => 
        testHistory.some(h => h.cardId === card.id && h.score >= 80)
      ).length;

      return (
        <div className="special-view p-6 bg-black/40 rounded-xl border border-white/10">
          <h3 className="text-xl font-serif text-blue-200 mb-6 flex items-center gap-2">
            <Award size={20} /> Certification Progress
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Courses (10 Required)</span>
              <span>{passedCourses.length} / 10</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Final Exams (10 Required)</span>
              <span>{finalHistory.filter(h => h.passed).length} / 10</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Major Arcana (22 Required)</span>
              <span>{majorMastered} / 22</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Minor Arcana (40 Required)</span>
              <span>{minorMastered} / 40</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Practice Readings (3 Required)</span>
              <span>{practiceReadings.length} / 3</span>
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="font-bold">Status:</span>
              <span className={`px-3 py-1 rounded-full text-xs ${capstoneResult?.passed ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {capstoneResult?.passed ? 'CERTIFIED' : 'IN PROGRESS'}
              </span>
            </div>
          </div>
        </div>
      );
    }

    if (selectedPage === 'capstone-archive') {
      const archives = JSON.parse(localStorage.getItem('luna_capstone_archive') || '[]');
      return (
        <div className="special-view p-6 bg-black/40 rounded-xl border border-white/10">
          <h3 className="text-xl font-serif text-amber-200 mb-6 flex items-center gap-2">
            <FileText size={20} /> Capstone Archive
          </h3>
          {archives.length === 0 ? (
            <p className="opacity-50 italic">No capstone attempts archived.</p>
          ) : (
            <div className="space-y-6">
              {archives.map((item, i) => (
                <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-amber-200">Attempt {i + 1}</span>
                    <span className="text-xs opacity-50">{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <div className="text-sm opacity-80 line-clamp-3 mb-4 italic">"{item.content}"</div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded ${item.passed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {item.passed ? 'PASSED' : 'FAILED'}
                    </span>
                    <span className="font-mono text-lg">{item.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (selectedPage === 'reading-stats') {
      const testHistory = JSON.parse(localStorage.getItem('luna_test_history') || '[]');
      const practiceReadings = JSON.parse(localStorage.getItem('luna_practice_readings') || '[]');
      const capstoneResult = JSON.parse(localStorage.getItem('luna_capstone_result') || 'null');
      
      const allScores = [
        ...testHistory.map(h => h.score),
        ...practiceReadings.map(r => r.score || 0),
        ...(capstoneResult ? [capstoneResult.score] : [])
      ];
      
      const avgScore = allScores.length > 0 
        ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) 
        : 0;

      return (
        <div className="special-view p-6 bg-black/40 rounded-xl border border-white/10">
          <h3 className="text-xl font-serif text-blue-200 mb-6 flex items-center gap-2">
            <BarChart3 size={20} /> Reading Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
              <div className="text-xs opacity-50 uppercase mb-1">Total Readings</div>
              <div className="text-2xl font-bold">{practiceReadings.length + (capstoneResult ? 1 : 0)}</div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
              <div className="text-xs opacity-50 uppercase mb-1">Average Score</div>
              <div className="text-2xl font-bold">{avgScore}%</div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
              <div className="text-xs opacity-50 uppercase mb-1">Tests Taken</div>
              <div className="text-2xl font-bold">{testHistory.length}</div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
              <div className="text-xs opacity-50 uppercase mb-1">Certification</div>
              <div className="text-2xl font-bold">{capstoneResult?.passed ? 'YES' : 'NO'}</div>
            </div>
          </div>
        </div>
      );
    }

    if (selectedPage === 'achievements-index' || selectedPage === 'badge-history') {
      const earnedBadges = JSON.parse(localStorage.getItem('luna_earned_badges') || '[]');
      const badgeHistory = JSON.parse(localStorage.getItem('luna_badge_history') || '[]');
      
      return (
        <div className="special-view p-6 bg-black/40 rounded-xl border border-white/10">
          <h3 className="text-xl font-serif text-yellow-200 mb-6 flex items-center gap-2">
            <Award size={20} /> {selectedPage === 'achievements-index' ? 'Earned Achievements' : 'Badge History'}
          </h3>
          {earnedBadges.length === 0 ? (
            <p className="opacity-50 italic">No achievements unlocked yet. The stars await your touch.</p>
          ) : (
            <div className="space-y-4">
              {selectedPage === 'achievements-index' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {earnedBadges.map((id) => (
                    <div key={id} className="p-4 bg-yellow-900/10 border border-yellow-500/20 rounded-lg text-center">
                      <div className="text-yellow-200 font-bold">{id.replace(/-/g, ' ').toUpperCase()}</div>
                      <div className="text-[10px] opacity-50 mt-1">Unlocked</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {badgeHistory.map((entry, i) => (
                    <div key={i} className="p-3 bg-white/5 rounded border border-white/10 flex justify-between items-center">
                      <div className="font-bold text-yellow-100">{entry.name}</div>
                      <div className="text-xs opacity-50">{new Date(entry.date).toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    if (selectedPage === 'support-archive') {
      const archive = JSON.parse(localStorage.getItem('luna_mentor_archive') || '[]');
      return (
        <div className="special-view p-6 bg-black/40 rounded-xl border border-white/10">
          <h3 className="text-xl font-serif text-blue-200 mb-6 flex items-center gap-2">
            <Heart size={20} /> Emotional Support Archive
          </h3>
          <div className="archive-list flex flex-col gap-4">
            {archive.length === 0 ? (
              <p className="opacity-40 italic">No support messages archived yet.</p>
            ) : (
              archive.map((item, i) => (
                <div key={i} className="archive-item p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-[10px] opacity-40 mb-2">{new Date(item.date).toLocaleString()}</div>
                  <div className="mb-2"><span className="text-blue-300 font-bold">You:</span> {item.user}</div>
                  <div><span className="text-yellow-200 font-bold">Luna:</span> {item.luna}</div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    if (selectedPage === 'luna-recs') {
      return (
        <div className="special-view p-6 bg-black/40 rounded-xl border border-white/10">
          <h3 className="text-xl font-serif text-blue-200 mb-6 flex items-center gap-2">
            <Sparkles size={20} /> Luna's Recommendations
          </h3>
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-blue-400/10 border border-blue-400/20 rounded-xl">
              <h4 className="text-blue-200 font-bold mb-2">Current Focus</h4>
              <p className="text-sm opacity-80">Mastering the Court Cards of the Minor Arcana.</p>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
              <h4 className="text-yellow-200 font-bold mb-2">Suggested Reading</h4>
              <p className="text-sm opacity-80">Revisit Lesson 4: The Elemental Dignities.</p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedPage === 'titles-index') {
      const activeTitle = localStorage.getItem('luna_active_title') || 'Student of the Arcana';
      const profile = JSON.parse(localStorage.getItem('reader_profile') || '{}');
      
      return (
        <div className="special-view p-6 bg-black/40 rounded-xl border border-white/10 text-center">
          <h3 className="text-xl font-serif text-blue-200 mb-6 flex items-center justify-center gap-2">
            <Trophy size={20} /> Current Title
          </h3>
          <div className="py-8 px-4 bg-blue-900/10 border border-blue-500/20 rounded-2xl inline-block mb-6">
            <div className="text-3xl font-serif text-blue-100 tracking-widest uppercase">
              {activeTitle}
            </div>
          </div>
          <p className="max-w-md mx-auto opacity-60 italic text-sm">
            This title is woven into your profile, visible to all who seek your wisdom in the marketplace.
          </p>
        </div>
      );
    }

    if (selectedPage?.startsWith('test-')) {
      const cardId = selectedPage.replace('test-', '');
      const card = TAROT_CARDS.find(c => c.id === cardId);
      if (!card) return null;

      return (
        <div className="special-view p-6 bg-black/40 rounded-xl border border-white/10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-serif text-blue-200">{card.name}</h3>
              <p className="text-xs opacity-50 uppercase tracking-widest">{card.arcana} arcana • {card.element}</p>
            </div>
            <div className={`px-4 py-1 rounded-full text-xs font-bold ${testHistory.some(h => h.cardId === card.id && h.score >= 80) ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
              {testHistory.some(h => h.cardId === card.id && h.score >= 80) ? 'MASTERED' : 'IN PROGRESS'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="text-xs font-bold text-blue-300 uppercase mb-3">Visual Description</h4>
              <p className="text-sm italic opacity-70">"{card.visualDescription}"</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="text-xs font-bold text-blue-300 uppercase mb-3">Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {card.keywords.map(k => (
                  <span key={k} className="px-2 py-1 bg-blue-900/30 rounded text-[10px] text-blue-200 border border-blue-500/20">{k}</span>
                ))}
              </div>
            </div>
          </div>

          <h4 className="text-xs font-bold text-blue-300 uppercase mb-4">Luna's Assessment History</h4>
          <div className="space-y-2">
            {testHistory.filter(h => h.cardId === card.id).length === 0 ? (
              <p className="text-xs opacity-50 italic">No attempts recorded yet for this card.</p>
            ) : (
              testHistory.filter(h => h.cardId === card.id).map((attempt, i) => (
                <div key={i} className="p-3 bg-white/5 rounded border border-white/10 flex justify-between items-center">
                  <div className="text-xs">
                    <div className="font-bold">{new Date(attempt.date).toLocaleDateString()}</div>
                    <div className="opacity-50">{attempt.type}</div>
                  </div>
                  <div className={`text-lg font-bold ${attempt.score >= 80 ? 'text-green-400' : 'text-red-400'}`}>
                    {attempt.score}%
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="finder-notes-editor">
          <textarea
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            placeholder={selectedPage ? `Write your insights for ${getPageTitle(selectedPage)}...` : "Write your general thoughts here..."}
            className="parchment-textarea"
          />
          <div className="editor-controls">
            {selectedPage && (
              <button className="clear-page-btn" onClick={() => setSelectedPage(null)}>
                Clear Page Selection
              </button>
            )}
            <button onClick={handleSave} className="finder-save-btn">
              Save Note
            </button>
          </div>
        </div>

        <div className="finder-notes-list">
          <h3>Saved Insights</h3>
          {notes.filter(n => !selectedPage || n.page === selectedPage).length === 0 ? (
            <p className="empty-notes">No insights recorded for this section yet.</p>
          ) : (
            notes.filter(n => !selectedPage || n.page === selectedPage).map((note) => (
              <div key={note.id} className="finder-note-item">
                <div className="note-meta">
                  {note.page && <span className="note-page-tag">{getPageTitle(note.page)}</span>}
                  <span className="note-date">{new Date(note.id).toLocaleDateString()}</span>
                </div>
                <div className="note-text">{note.text}</div>
              </div>
            ))
          )}
        </div>
      </>
    );
  };

  return (
    <div className="finder-notes-container">
      <header className="finder-notes-header">
        <div className="header-left">
          <h2>Finder's NotePad</h2>
          <p>{selectedPage ? `Recording insights for: ${getPageTitle(selectedPage)}` : 'Record your insights, Finder.'}</p>
        </div>
        <button className="index-toggle-btn" onClick={() => setView(view === 'index' ? 'editor' : 'index')}>
          {view === 'index' ? 'Back to Editor' : 'View Index'}
        </button>
      </header>

      {view === 'index' ? (
        renderIndex()
      ) : (
        renderSpecialView()
      )}
    </div>
  );
};

export default FinderNotes;
