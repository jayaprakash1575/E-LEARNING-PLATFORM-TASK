import React, { useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Award, Printer, Copy, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const CertificateModal = ({ course, onClose }) => {
  const { user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });
      }, 300);
    } catch {}
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    const certUrl = `${window.location.origin}/certificate/${course.id}`;
    navigator.clipboard?.writeText(certUrl);
    addToast("📋 Certificate verification URL copied to clipboard!", "success");
  };

  const recipientName = user?.name || "Karthik Subramanian";

  const certificateId = useMemo(() => {
    return course?.enrollment?.certificateId || `JP-ACAD-${Math.floor(100000 + Math.random() * 900000)}`;
  }, [course?.enrollment?.certificateId]);

  const completionDate = useMemo(() => {
    return course?.enrollment?.completedAt || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  }, [course?.enrollment?.completedAt]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Top Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
            <Award className="text-amber-500" size={20} />
            <span>Verified Indian Tech Credential</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopyLink} 
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Copy size={14} /> Share
            </button>
            <button 
              onClick={handlePrint} 
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Printer size={14} /> Print / Save PDF
            </button>
            <button 
              onClick={onClose} 
              className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Canvas Certificate */}
        <div className="p-6 md:p-10 overflow-y-auto max-h-[80vh] flex justify-center bg-slate-100 dark:bg-slate-950">
          <div 
            id="printable-certificate"
            className="w-full max-w-3xl bg-amber-50/40 text-slate-900 p-8 md:p-12 border-8 border-double border-amber-700/80 rounded-2xl relative shadow-xl overflow-hidden"
          >
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] select-none text-8xl font-black tracking-widest text-amber-950 rotate-[-25deg]">
              JP ACADEMY
            </div>

            {/* Header */}
            <div className="text-center relative z-10 mb-8">
              <div className="flex items-center justify-center gap-2.5 text-amber-900 mb-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-800 text-white font-black flex items-center justify-center text-lg shadow-md">
                  JP
                </div>
                <span className="font-extrabold text-2xl tracking-tight">JP National Academy of Technology</span>
              </div>
              <p className="text-xs uppercase tracking-widest text-slate-600 font-bold">
                South Indian Center for Advanced Software Engineering &amp; AI
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-amber-900 uppercase tracking-wider mt-4 font-serif">
                Certificate of Mastery
              </h1>
              <p className="text-xs tracking-widest text-amber-800 font-semibold uppercase mt-1">
                Executive Engineering Credential
              </p>
            </div>

            {/* Body */}
            <div className="text-center relative z-10 my-8">
              <p className="text-sm italic text-slate-600 mb-2">This is to certify that</p>
              <div className="inline-block border-b-2 border-amber-800 pb-1 px-8 mb-4">
                <span className="text-3xl md:text-4xl font-extrabold text-slate-900 font-serif">
                  {recipientName}
                </span>
              </div>
              <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                has diligently fulfilled all curriculum requirements, architectural assessments, and high-concurrency coding labs for
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-amber-900 mt-2">
                {course?.title}
              </h2>
            </div>

            {/* Footer / Signatures / Seal */}
            <div className="mt-12 pt-6 border-t border-amber-800/20 flex items-end justify-between relative z-10 gap-4">
              <div className="text-center w-40">
                <div className="font-serif italic text-lg text-slate-800 border-b border-slate-400 pb-1 mb-1">
                  {course?.instructor?.name || "Prof. R. Ananthakrishnan"}
                </div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                  Lead Instructor
                </p>
              </div>

              {/* Gold / Saffron Seal */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-600 border-4 border-dashed border-white shadow-xl flex items-center justify-center text-white">
                  <ShieldCheck size={40} />
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-2 font-bold tracking-wider">
                  ID: {certificateId}
                </div>
                <div className="text-[10px] text-slate-500">
                  Verified: {completionDate}
                </div>
              </div>

              <div className="text-center w-40">
                <div className="font-serif italic text-lg text-slate-800 border-b border-slate-400 pb-1 mb-1">
                  Dr. K. Radhakrishnan
                </div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                  Director of Accreditation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
