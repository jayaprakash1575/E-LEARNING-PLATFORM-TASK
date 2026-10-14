import React, { useState } from 'react';
import { Plus, Trash2, Clock, BookMarked } from 'lucide-react';
import { useCourse } from '../../context/CourseContext';

export const NotesSection = ({ courseId, activeLessonId }) => {
  const { getCourseEnrollment, addNote, deleteNote } = useCourse();
  const [noteText, setNoteText] = useState('');
  const [timestamp, setTimestamp] = useState('02:15');

  const enrollment = getCourseEnrollment(courseId);
  const notes = enrollment?.notes || [];

  const handleAdd = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    addNote(courseId, activeLessonId, noteText.trim(), timestamp);
    setNoteText('');
  };

  return (
    <div className="max-w-2xl flex flex-col gap-6">
      <form onSubmit={handleAdd} className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5 flex flex-col gap-3">
        <label className="text-sm font-bold text-slate-900 dark:text-white">
          Add a Timestamped Architectural Note
        </label>
        <textarea
          rows={3}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="e.g., Note down critical Razorpay webhook verification steps or Redis TTL rules..."
          className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock size={14} className="text-indigo-500" />
            <span>Lecture Timestamp:</span>
            <input 
              type="text" 
              value={timestamp} 
              onChange={(e) => setTimestamp(e.target.value)}
              className="w-16 px-2 py-1 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono text-slate-900 dark:text-white" 
            />
          </div>
          <button 
            type="submit" 
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus size={14} /> Save Note
          </button>
        </div>
      </form>

      <div className="flex flex-col gap-3">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookMarked size={16} className="text-indigo-500" />
          Saved Notes ({notes.length})
        </h4>

        {notes.length === 0 ? (
          <p className="text-xs text-slate-500 italic">
            No notes added yet for this course. Write your thoughts above while watching!
          </p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 shadow-sm hover:border-indigo-500/40 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    {note.timestamp}
                  </span>
                  <span className="text-[11px] text-slate-400">{note.createdAt}</span>
                </div>
                <p className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                  {note.text}
                </p>
              </div>
              <button 
                onClick={() => deleteNote(courseId, note.id)} 
                className="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg transition-colors cursor-pointer"
                title="Delete note"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
