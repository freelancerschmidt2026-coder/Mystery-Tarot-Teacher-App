import React from 'react';
import { Clock } from 'lucide-react';

export default function NotePadEntry({ note, onEdit, onDelete }: any) {
  return (
    <div className="bg-[#0d0d14] border border-white/5 rounded-2xl p-6 group hover:border-white/10 transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <h3 className="text-xl font-bold text-white">{note.title}</h3>
          <p className="text-slate-400 text-sm whitespace-pre-wrap">{note.content || 'No content yet...'}</p>
          <div className="flex items-center gap-4 pt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span className="flex items-center gap-1"><Clock size={10} /> {new Date(note.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
