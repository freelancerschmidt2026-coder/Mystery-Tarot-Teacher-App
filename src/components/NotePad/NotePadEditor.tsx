import React from 'react';
import { Save } from 'lucide-react';

export default function NotePadEditor({ title, content, setTitle, setContent, onSave, onCancel }: any) {
  return (
    <div className="space-y-4">
      <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white font-bold focus:outline-none focus:border-purple-500"
        placeholder="Entry Title"
      />
      <textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-slate-300 min-h-[200px] focus:outline-none focus:border-purple-500"
        placeholder="Write your notes here..."
      />
      <div className="flex justify-end gap-3">
        <button onClick={onCancel} className="px-4 py-2 text-slate-400 hover:text-white font-bold text-sm">Cancel</button>
        <button onClick={onSave} className="px-6 py-2 bg-purple-500 text-white rounded-lg font-bold text-sm flex items-center gap-2">
          <Save size={16} /> Save Entry
        </button>
      </div>
    </div>
  );
}
