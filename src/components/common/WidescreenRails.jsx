import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  ChevronUp, 
  BookOpen, 
  Layers, 
  Award, 
  HelpCircle, 
  MessageSquareText, 
  Zap, 
  CheckCircle2, 
  PhoneCall 
} from 'lucide-react';

const LIVE_NOTIFICATIONS = [
  { text: "1,420+ Engineers coding now in Bengaluru & Chennai", icon: "⚡" },
  { text: "Karthik Subramanian (IITM) earned Next.js 15 Cert", icon: "🎓" },
  { text: "Zoho & Freshworks hiring 120+ Full-Stack engineers", icon: "💼" },
  { text: "New Masterclass: Agentic AI & RAG for UPI Banking", icon: "🚀" },
  { text: "94.8% Placement Rate across South Indian Tech Hubs", icon: "📈" }
];

export const WidescreenRails = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeNotificationIndex, setActiveNotificationIndex] = useState(0);
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);

  // Track window scroll for circular progress ring
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
        setShowScrollTop(window.scrollY > 300);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rotate live activity feed
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNotificationIndex((prev) => (prev + 1) % LIVE_NOTIFICATIONS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero-section', label: 'Top Overview', icon: <Zap size={14} /> },
    { id: 'tracks-section', label: 'Tech Tracks', icon: <Layers size={14} /> },
    { id: 'courses-section', label: 'Masterclasses', icon: <BookOpen size={14} /> },
    { id: 'advantage-section', label: 'JP Advantage', icon: <Terminal size={14} /> },
    { id: 'reviews-section', label: 'Engineer Reviews', icon: <Award size={14} /> },
    { id: 'faq-section', label: 'Academic FAQ', icon: <HelpCircle size={14} /> }
  ];

  return (
    <>
      {/* 1. Left Telemetry & Quick Navigation Rail (Visible on >= 1440px / 2xl) */}
      <aside 
        aria-label="Widescreen System HUD"
        className="hidden 2xl:flex fixed left-4 3xl:left-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 pointer-events-auto select-none"
      >
        <div className="p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl shadow-indigo-500/10 flex flex-col items-center gap-3">
          {/* Node Status Badge */}
          <div className="flex flex-col items-center gap-1 pb-2 border-b border-slate-200/60 dark:border-slate-800/60 w-full">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] font-black tracking-wider text-slate-500 dark:text-slate-400 uppercase font-mono">
              JP-NODE
            </span>
          </div>

          {/* Quick Jump Anchors */}
          <div className="flex flex-col gap-1.5 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="group relative w-8 h-8 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all cursor-pointer"
                title={item.label}
              >
                {item.icon}
                {/* Hover Tooltip on Left */}
                <span className="absolute left-10 px-2.5 py-1 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-bold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg z-50">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Telemetry info */}
          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col items-center gap-1 text-[8px] font-mono font-bold text-slate-400">
            <span>AWS-BOM</span>
            <span className="text-emerald-500">12ms</span>
          </div>
        </div>

        {/* Vertical Guide Coordinate */}
        <div className="text-[9px] font-mono text-slate-400/50 dark:text-slate-600 tracking-widest uppercase writing-vertical-lr rotate-180 self-center pl-1">
          SYS // SOUTH-IN // 13.0827°N
        </div>
      </aside>

      {/* 2. Right Live Activity & Quick Assistance Rail (Visible on >= 1440px / 2xl) */}
      <aside 
        aria-label="Widescreen Live Stream"
        className="hidden 2xl:flex fixed right-4 3xl:right-8 bottom-8 z-40 flex-col gap-3 items-end pointer-events-auto select-none"
      >
        {/* Rotating Live Activity Card */}
        <div className="max-w-[270px] p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-indigo-500/20 dark:border-indigo-500/30 shadow-2xl shadow-indigo-500/10 flex items-start gap-2.5 transition-all">
          <span className="text-base shrink-0">
            {LIVE_NOTIFICATIONS[activeNotificationIndex].icon}
          </span>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                South India Tech Pulse
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-snug mt-0.5">
              {LIVE_NOTIFICATIONS[activeNotificationIndex].text}
            </p>
          </div>
        </div>

        {/* Quick Academic Advisor Trigger */}
        <button
          onClick={() => setAdvisorModalOpen(true)}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-105 transition-all cursor-pointer"
        >
          <MessageSquareText size={14} className="group-hover:rotate-12 transition-transform" />
          <span>Talk to Advisor</span>
          <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[9px] font-mono">Free</span>
        </button>

        {/* Circular Scroll-to-Top Button with Progress Indicator */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="relative w-11 h-11 rounded-full bg-white dark:bg-slate-900 text-slate-800 dark:text-white flex items-center justify-center shadow-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all cursor-pointer group"
            title="Scroll to Top"
            aria-label="Scroll to top of page"
          >
            {/* SVG Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
              <path
                className="text-slate-200 dark:text-slate-800 stroke-current"
                strokeWidth="2.5"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-indigo-600 dark:text-indigo-400 stroke-current transition-all duration-150"
                strokeDasharray={`${scrollProgress}, 100`}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <ChevronUp size={18} className="group-hover:-translate-y-0.5 transition-transform text-indigo-600 dark:text-indigo-400" />
          </button>
        )}
      </aside>

      {/* Quick Academic Advisor Modal */}
      {advisorModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setAdvisorModalOpen(false)}
        >
          <div 
            className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <PhoneCall size={16} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    JP Academic Counseling
                  </h3>
                  <p className="text-[11px] text-slate-500">IIT Madras Research Park &amp; Koramangala Hub</p>
                </div>
              </div>
              <button 
                onClick={() => setAdvisorModalOpen(false)}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                <CheckCircle2 size={14} />
                <span>Advisors Online Now (Average response: 3 mins)</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Get 1-on-1 personalized course selection guidance for your career transition into top South Indian tech giants like Zoho, Freshworks, Swiggy, and Flipkart.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <a 
                href="https://wa.me/919876543210?text=Hi%20JP%20Academy%2C%20I%20would%20like%20guidance%20on%20Tech%20Tracks"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
              >
                <span>Connect via WhatsApp Direct</span>
              </a>
              <a 
                href="mailto:admissions@jp.edu?subject=Academic%20Counseling%20Inquiry"
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>Email IITM Admissions Desk</span>
              </a>
            </div>

            <div className="text-center text-[10px] text-slate-400">
              Free 15-minute consultation • Mon–Sat: 9:00 AM – 8:00 PM IST
            </div>
          </div>
        </div>
      )}
    </>
  );
};
