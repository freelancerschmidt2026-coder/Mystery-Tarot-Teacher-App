import React from 'react';
import { ChevronRight, Key, ScrollText } from 'lucide-react';
import DropdownMenu from './DropdownMenu';

export default function TopNav(props: any) {
  const { activeTab, setActiveTab = () => {} } = props || {};
  return (
    <header className="h-16 border-b border-white/5 flex items-center px-8 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-4 text-sm text-slate-400">
        <span>Mystery Tarot Luna</span>
        <ChevronRight size={14} />
        <span className="text-slate-200 font-medium capitalize">{activeTab}</span>
      </div>
      <div className="ml-auto flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20 text-xs font-bold uppercase">
          <Key size={12} /> <span>Gatekeeper Key</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 text-xs font-bold uppercase">
          <ScrollText size={12} /> <span>Stride One</span>
        </div>
        <DropdownMenu />
      </div>
    </header>
  );
}
