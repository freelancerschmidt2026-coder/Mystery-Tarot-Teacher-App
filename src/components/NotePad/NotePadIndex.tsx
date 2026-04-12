import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNotePadStore } from "../../state/NotePadState/notePadStore";
import { Book, ChevronRight, ChevronDown, FolderOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const CATEGORIES = [
  "Design Studio Creations",
  "Deck Projects",
  "Purchased Add-Ons",
  "Store Receipts",
  "Marketplace Purchases",
  "Reader Favorites",
  "Shadow Work Log",
  "Luna’s Shadow Insights",
  "Course Notes",
  "Lesson Notes",
  "Ritual Notes",
  "Dreamwork Notes",
  "Training Progress",
  "Spread Builder Creations",
  "Story Builder Creations",
  "Memory Drills",
  "Quick Tests",
  "Practice Templates",
  "What-If Scenarios",
  "Symbol Studies",
  "Tarot Language Notes",
  "Major Arcana Experiences",
  "Minor Arcana Experiences",
  "Showcase Achievements",
  "Luna Readings",
  "GateKeeper Notes (private)"
];

const NotePadIndex: React.FC = () => {
  const { notes } = useNotePadStore();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(CATEGORIES);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const notesByCategory = CATEGORIES.reduce((acc, category) => {
    acc[category] = notes.filter(n => n.category === category);
    return acc;
  }, {} as Record<string, typeof notes>);

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <header className="flex items-center gap-4 border-b border-white/10 pb-6">
        <div className="p-3 bg-purple-500/10 rounded-2xl">
          <Book className="w-8 h-8 text-purple-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">NotePad Index</h1>
          <p className="text-slate-400">Your mythic chronicle, categorized and preserved.</p>
        </div>
      </header>

      <div className="space-y-4">
        {CATEGORIES.map((category) => {
          const categoryNotes = notesByCategory[category];
          const isExpanded = expandedCategories.includes(category);

          return (
            <div key={category} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              <button 
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FolderOpen className={`w-5 h-5 ${categoryNotes.length > 0 ? 'text-purple-400' : 'text-slate-600'}`} />
                  <span className="font-semibold text-white">{category}</span>
                  <span className="text-xs px-2 py-0.5 bg-white/5 rounded-full text-slate-500">
                    {categoryNotes.length}
                  </span>
                </div>
                {isExpanded ? <ChevronDown className="w-5 h-5 text-slate-500" /> : <ChevronRight className="w-5 h-5 text-slate-500" />}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/5"
                  >
                    {categoryNotes.length > 0 ? (
                      <div className="divide-y divide-white/5">
                        {categoryNotes.map((note) => (
                          <Link 
                            key={note.id} 
                            to={`/notepad/page/${note.pageNumber}`}
                            className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg text-xs text-slate-400 group-hover:text-purple-400 transition-colors">
                                {note.pageNumber}
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">
                                  {note.title}
                                </h4>
                                <p className="text-[10px] text-slate-500">
                                  {new Date(note.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 transition-colors" />
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-xs text-slate-600 italic">
                        No entries in this category yet.
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotePadIndex;
