import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNotePadStore } from "../../state/NotePadState/notePadStore";
import { NoteEntry } from "../../types";
import ReactMarkdown from "react-markdown";
import { ChevronLeft, Calendar, Tag, Loader2, Folder } from "lucide-react";

const NotePadPageView: React.FC = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const [note, setNote] = useState<NoteEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const { notes } = useNotePadStore();

  useEffect(() => {
    setLoading(true);
    const foundNote = notes.find(n => n.pageNumber === parseInt(pageNumber || "0"));
    setNote(foundNote || null);
    setLoading(false);
  }, [notes, pageNumber]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin mr-3" />
        Opening NotePad...
      </div>
    );
  }

  if (!note) {
    return (
      <div className="p-8 text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
        <p className="text-slate-400">This page hasn't been written yet.</p>
        <Link to="/notepad" className="inline-block px-6 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
          Back to Index
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <header className="flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-6">
          <Link 
            to="/notepad" 
            className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">{note.title}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(note.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                Page {note.pageNumber}
              </div>
              <div className="flex items-center gap-1">
                <Folder className="w-4 h-4" />
                {note.category}
              </div>
            </div>
          </div>
        </div>
      </header>

      <article className="prose prose-invert max-w-none bg-white/5 p-10 rounded-3xl border border-white/10 shadow-2xl">
        <ReactMarkdown>{note.content}</ReactMarkdown>
      </article>

      <footer className="flex justify-between pt-8 border-t border-white/10">
        {note.pageNumber > 2 && (
          <Link 
            to={`/notepad/page/${note.pageNumber - 1}`}
            className="px-6 py-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous Page
          </Link>
        )}
        <Link 
          to={`/notepad/page/${note.pageNumber + 1}`}
          className="px-6 py-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 ml-auto"
        >
          Next Page
          <ChevronLeft className="w-5 h-5 rotate-180" />
        </Link>
      </footer>
    </div>
  );
};

export default NotePadPageView;
