import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors text-center">
      <div className="max-w-md flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-6">
          <Compass size={40} />
        </div>
        <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-2">404</h1>
        <h2 className="text-xl font-bold mb-3">Page Not Found</h2>
        <p className="text-xs text-slate-500 mb-8 max-w-sm leading-relaxed">
          The curriculum page you are seeking does not exist or has been relocated in the JP Academy directory.
        </p>
        <Link to="/" className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-indigo-500/25">
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </div>
    </div>
  );
};
