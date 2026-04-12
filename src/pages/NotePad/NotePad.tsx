import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Brain, 
  FileText, 
  PenTool, 
  Layers, 
  ShieldCheck,
  ArrowRight,
  Clock,
  Star,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  ChevronLeft
} from 'lucide-react';
import { NoteEntry } from '../../types';
import { EXERCISE_TEMPLATES } from '../../data/Templates/exercises';

interface NotePadSection {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

import { useNotePadStore } from '../../state/NotePadState/notePadStore';

export default function NotePad() {
  const { notes, addNote: storeAddNote, deleteNote } = useNotePadStore();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  const sections: NotePadSection[] = [
    { id: 'Flash of Fate', title: 'Flash of Fate', icon: Zap, description: 'Quick identification tests for rapid recall.', color: 'text-yellow-400' },
    { id: 'Recall the Montra', title: 'Recall the Montra', icon: Brain, description: 'Memory drills to solidify your foundational knowledge.', color: 'text-blue-400' },
    { id: 'Mystery Work Pages', title: 'Mystery Work Pages', icon: FileText, description: 'Personal practice templates and study notes.', color: 'text-emerald-400' },
    { id: 'Glyph of Knowing', title: 'Glyph of Knowing', icon: PenTool, description: 'Master the symbols and visual language of tarot.', color: 'text-purple-400' },
    { id: 'Archetype Stride One', title: 'Archetype Stride One', icon: Layers, description: 'Tools specifically for the first 10 Major Arcana.', color: 'text-rose-400' },
    { id: 'Seals of Ascension', title: 'Seals of Ascension', icon: ShieldCheck, description: 'Your earned achievements and milestones.', color: 'text-amber-400' },
  ];

  const addNote = (category: string, title: string = 'New Entry', content: string = '', templateId?: string) => {
    const newNote: NoteEntry = {
      id: crypto.randomUUID(),
      title,
      content,
      category,
      createdAt: new Date().toISOString(),
      pageNumber: 0, // Will be assigned by store
      templateId
    };
    storeAddNote(newNote);
    setIsEditing(newNote.id);
    setEditTitle(newNote.title);
    setEditContent(newNote.content);
    setShowTemplateSelector(false);
  };

  const saveNote = () => {
    if (!isEditing) return;
    const noteToUpdate = notes.find(n => n.id === isEditing);
    if (noteToUpdate) {
      useNotePadStore.getState().deleteNote(isEditing);
      storeAddNote({ ...noteToUpdate, title: editTitle, content: editContent });
    }
    setIsEditing(null);
  };

  const filteredNotes = activeSection ? notes.filter(n => n.category === activeSection) : [];

  if (activeSection) {
    const sectionInfo = sections.find(s => s.id === activeSection)!;
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setActiveSection(null)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <ChevronLeft size={16} />
            <span>Back to Workspace</span>
          </button>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowTemplateSelector(true)}
              className="px-4 py-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-purple-500/20 transition-all flex items-center gap-2"
            >
              <Plus size={14} /> Use Template
            </button>
            <button 
              onClick={() => addNote(activeSection)}
              className="px-4 py-2 bg-white text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-purple-400 transition-all flex items-center gap-2"
            >
              <Plus size={14} /> New Entry
            </button>
          </div>
        </div>

        <header className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${sectionInfo.color}`}>
            <sectionInfo.icon size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{sectionInfo.title}</h1>
            <p className="text-slate-400 text-sm">{sectionInfo.description}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence>
            {filteredNotes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-[#0d0d14] border border-white/5 rounded-2xl p-6 group hover:border-white/10 transition-all"
              >
                {isEditing === note.id ? (
                  <div className="space-y-4">
                    <input 
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white font-bold focus:outline-none focus:border-purple-500"
                      placeholder="Entry Title"
                    />
                    <textarea 
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-slate-300 min-h-[200px] focus:outline-none focus:border-purple-500"
                      placeholder="Write your notes here..."
                    />
                    <div className="flex justify-end gap-3">
                      <button onClick={() => setIsEditing(null)} className="px-4 py-2 text-slate-400 hover:text-white font-bold text-sm">Cancel</button>
                      <button onClick={saveNote} className="px-6 py-2 bg-purple-500 text-white rounded-lg font-bold text-sm flex items-center gap-2">
                        <Save size={16} /> Save Entry
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-white">{note.title}</h3>
                        {note.templateId && (
                          <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-[10px] font-bold uppercase">Template</span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm whitespace-pre-wrap">{note.content || 'No content yet...'}</p>
                      <div className="flex items-center gap-4 pt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <span className="flex items-center gap-1"><Clock size={10} /> {new Date(note.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => {
                          setIsEditing(note.id);
                          setEditTitle(note.title);
                          setEditContent(note.content);
                        }}
                        className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => deleteNote(note.id)}
                        className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredNotes.length === 0 && (
            <div className="py-20 text-center space-y-4 border-2 border-dashed border-white/5 rounded-3xl">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-600">
                <FileText size={32} />
              </div>
              <div className="space-y-1">
                <p className="text-slate-400 font-medium">No entries in this section yet.</p>
                <p className="text-slate-600 text-sm">Start your practice by creating a new entry or using a template.</p>
              </div>
            </div>
          )}
        </div>

        {/* Template Selector Modal */}
        <AnimatePresence>
          {showTemplateSelector && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowTemplateSelector(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-[#0d0d14] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">Select a Template</h2>
                  <button onClick={() => setShowTemplateSelector(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                    <X size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {EXERCISE_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => addNote(activeSection, template.title, `Template: ${template.description}\n\n[Your practice notes here]`, template.id)}
                      className="text-left p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-purple-500/30 hover:bg-purple-500/5 transition-all group"
                    >
                      <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors mb-1">{template.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{template.description}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
          Members' Personal Workspace
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          Your NotePad is the sacred space where you store templates, quick tests, memory drills, 
          and practice pages. It evolves with your mastery.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, idx) => {
          const count = notes.filter(n => n.category === section.id).length;
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setActiveSection(section.id)}
              className="group relative p-6 bg-[#0d0d14] border border-white/5 rounded-2xl hover:border-white/10 transition-all hover:bg-[#12121c] cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${section.color}`}>
                <section.icon size={24} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                  {section.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {section.description}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                  <Clock size={12} />
                  <span>{count} Items</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-all">
                  <ArrowRight size={16} />
                </div>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Star size={14} className="text-amber-500/50" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <section className="mt-16 p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Ready for your next drill?</h2>
            <p className="text-slate-400 max-w-md">
              The Gatekeeper suggests focusing on "Glyph of Knowing" to improve your symbol recognition speed.
            </p>
            <button 
              onClick={() => setActiveSection('Glyph of Knowing')}
              className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-purple-400 transition-colors flex items-center gap-2"
            >
              Start Session <ArrowRight size={18} />
            </button>
          </div>
          <div className="w-48 h-48 bg-white/5 rounded-full flex items-center justify-center border border-white/10 animate-pulse">
            <Brain size={64} className="text-purple-400" />
          </div>
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-500/5 blur-[100px] pointer-events-none" />
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
}
