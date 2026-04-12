import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import DropdownMenu from './DropdownMenu';

export default function Sidebar(props: any) {
  const { navItems, activeTab, setActiveTab = () => {}, isOpen, setIsOpen } = props || {};
  return (
    <aside 
      className={`fixed top-0 left-0 h-full bg-[#0d0d14] border-r border-white/5 transition-all duration-300 z-50 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-6 flex items-center justify-between">
          {isOpen && <span className="font-bold tracking-tight text-lg">Luna Studio</span>}
          <div className="flex items-center gap-2">
            <DropdownMenu />
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              {isOpen ? 'X' : 'M'}
            </button>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item: any) => (
            <button
              key={item.id}
              onClick={() => { if (setActiveTab) setActiveTab(item.id); }}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all group ${
                activeTab === item.id ? 'bg-white/5 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? item.color : ''}`} />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
