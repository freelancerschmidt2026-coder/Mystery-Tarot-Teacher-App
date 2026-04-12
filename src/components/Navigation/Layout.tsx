import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Book, 
  GraduationCap, 
  Trophy, 
  Moon, 
  Menu, 
  X,
  ChevronRight,
  Sparkles,
  Key,
  ScrollText,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { id: 'luna', label: 'Talk to Luna', icon: MessageSquare, color: 'text-purple-400', path: '/luna' },
    { id: 'signup', label: 'Sign Up', icon: GraduationCap, color: 'text-purple-400', path: '/signup' },
    { id: 'notepad', label: 'Note Pad', icon: Book, color: 'text-blue-400', path: '/notepad' },
    { id: 'training', label: 'Training Studio', icon: GraduationCap, color: 'text-purple-400', path: '/training' },
    { id: 'experience', label: 'Experience', icon: Sparkles, color: 'text-emerald-400', path: '/experience' },
    { id: 'showcase', label: 'Showcase Room', icon: Trophy, color: 'text-amber-400', path: '/showcase' },
    { id: 'gatekeeper', label: 'GateKeeper CRM', icon: ShieldCheck, color: 'text-amber-500', path: '/gatekeeper' },
  ];

  const activeTab = navItems.find(item => location.pathname.startsWith(item.path))?.id || 'luna';

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans selection:bg-purple-500/30">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full bg-[#0d0d14] border-r border-white/5 transition-all duration-300 z-50 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between">
            {isSidebarOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Moon className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold tracking-tight text-lg">Luna Studio</span>
              </motion.div>
            )}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all group ${
                  activeTab === item.id 
                    ? 'bg-white/5 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? item.color : 'group-hover:text-white'}`} />
                {isSidebarOpen && (
                  <span className="font-medium tracking-wide">{item.label}</span>
                )}
                {activeTab === item.id && isSidebarOpen && (
                  <motion.div layoutId="active-nav" className="ml-auto">
                    <ChevronRight size={16} className="text-slate-500" />
                  </motion.div>
                )}
              </Link>
            ))}
          </nav>

          <div className="p-6 border-t border-white/5">
            {isSidebarOpen ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center border border-white/10">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Member</p>
                    <p className="text-sm font-medium">Finder Luna</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'pl-64' : 'pl-20'}`}>
        <header className="h-16 border-b border-white/5 flex items-center px-8 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="hover:text-slate-200 cursor-pointer">Mystery Tarot Luna</span>
            <ChevronRight size={14} />
            <span className="text-slate-200 font-medium capitalize">{activeTab.replace('-', ' ')}</span>
          </div>
          
          <div className="ml-auto flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20 text-xs font-bold uppercase tracking-tighter">
              <Key size={12} />
              <span>Gatekeeper Key</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 text-xs font-bold uppercase tracking-tighter">
              <ScrollText size={12} />
              <span>Stride One</span>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
