import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Users, 
  Award, 
  Building2, 
  Code2, 
  Cpu, 
  Cloud, 
  Palette, 
  Lock
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please provide a valid email address.', 'error');
      return;
    }
    addToast('🎉 Welcome to JP Academy! Check your inbox for South Indian Tech Career Guides.', 'success');
    setEmail('');
  };

  return (
    <footer className="relative bg-slate-950 text-slate-100 border-t border-slate-800/80 transition-colors pt-16 pb-12 overflow-hidden">
      {/* Background Image Layer with Deep Dark Gradient Mask */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none scale-105"
        style={{ backgroundImage: `url('/assets/cyber_mesh_bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/95 to-slate-950 pointer-events-none" />

      {/* Full-width cyber matrix pattern */}
      <div className="absolute inset-0 bg-cyber-grid opacity-40 pointer-events-none" />

      {/* Side Ambient Glowing Auras */}
      <div className="absolute -left-20 top-1/4 w-[450px] h-[450px] bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 top-1/4 w-[450px] h-[450px] bg-purple-500/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 relative z-10">

        {/* 1. TOP DATA IN BOXES STRIP: Regional Hubs & Performance Metrics */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
              JP Academy Platform Highlights &amp; South Indian Tech Hubs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Box 1 */}
            <div className="p-4 rounded-2xl bg-white/5 dark:bg-slate-900/60 border border-slate-700/60 backdrop-blur-md shadow-lg flex items-center gap-4 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Users size={22} />
              </div>
              <div>
                <p className="text-2xl font-black text-white tracking-tight">52,400+</p>
                <p className="text-xs font-bold text-slate-300">Active Engineers</p>
                <p className="text-[11px] text-slate-400">Bengaluru • Chennai • Hyderabad</p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="p-4 rounded-2xl bg-white/5 dark:bg-slate-900/60 border border-slate-700/60 backdrop-blur-md shadow-lg flex items-center gap-4 hover:border-emerald-500/50 hover:bg-slate-900/80 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Building2 size={22} />
              </div>
              <div>
                <p className="text-2xl font-black text-white tracking-tight">4 Tech Hubs</p>
                <p className="text-xs font-bold text-slate-300">Regional Campuses</p>
                <p className="text-[11px] text-slate-400">IITM Park, OMR, Koramangala</p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="p-4 rounded-2xl bg-white/5 dark:bg-slate-900/60 border border-slate-700/60 backdrop-blur-md shadow-lg flex items-center gap-4 hover:border-amber-500/50 hover:bg-slate-900/80 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Award size={22} />
              </div>
              <div>
                <p className="text-2xl font-black text-white tracking-tight">94.8% Placement</p>
                <p className="text-xs font-bold text-slate-300">Average ₹18.5 LPA</p>
                <p className="text-[11px] text-slate-400">Zoho, Freshworks, Swiggy, CRED</p>
              </div>
            </div>

            {/* Box 4 */}
            <div className="p-4 rounded-2xl bg-white/5 dark:bg-slate-900/60 border border-slate-700/60 backdrop-blur-md shadow-lg flex items-center gap-4 hover:border-purple-500/50 hover:bg-slate-900/80 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <ShieldCheck size={22} />
              </div>
              <div>
                <p className="text-2xl font-black text-white tracking-tight">AICTE &amp; ISO</p>
                <p className="text-xs font-bold text-slate-300">Verified Credentials</p>
                <p className="text-[11px] text-slate-400">QR Code &amp; LinkedIn Authenticated</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. MAIN FOOTER CONTENT IN BOXES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 pb-12 border-b border-slate-800">
          
          {/* BOX 1: Brand & Regional Identity Card (lg:col-span-4) */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex flex-col justify-between shadow-xl">
            <div className="flex flex-col gap-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                  <span className="font-black text-lg tracking-tight">JP</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-white tracking-tight">
                    JP<span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-400 bg-clip-text text-transparent font-bold ml-1">Academy</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                    South India's Premier Tech Academy
                  </span>
                </div>
              </Link>

              <p className="text-xs text-slate-300 leading-relaxed">
                Empowering developers, students, and research engineers across Bengaluru, Chennai, Hyderabad, and Kochi to build world-class, high-concurrency software and production AI agents.
              </p>

              {/* Badges in Mini Boxes */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  <ShieldCheck size={16} className="shrink-0" />
                  <span>AICTE &amp; ISO 9001 Aligned Curriculum</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
                  <span className="text-sm">🇮🇳</span>
                  <span>Made with Pride in South India</span>
                </div>
              </div>
            </div>

            {/* Regional HQ in Box */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-start gap-2.5 text-slate-400 text-xs">
              <MapPin size={16} className="text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-200">Regional Centers:</p>
                <p className="text-[11px] text-slate-400 leading-normal">
                  IIT Madras Research Park (Chennai) • Koramangala (Bengaluru) • HITEC City (Hyderabad)
                </p>
              </div>
            </div>
          </div>

          {/* BOX 2: Platform Links in Interactive Boxes (lg:col-span-2) */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                Platform
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold">
                5 Links
              </span>
            </div>

            <ul className="flex flex-col gap-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Course Catalog', path: '/courses' },
                { name: 'Student Dashboard', path: '/my-learning' },
                { name: 'Reviewer Demo Login', path: '/login' },
                { name: 'Register Free', path: '/register' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path}
                    className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-indigo-600/20 border border-slate-700/60 hover:border-indigo-500/40 text-xs text-slate-300 hover:text-white flex items-center justify-between transition-all group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight size={13} className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* BOX 3: Flagship Tech Tracks in Boxed Cards (lg:col-span-3) */}
          <div className="lg:col-span-3 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                Tech Tracks
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                Top Rated
              </span>
            </div>

            <ul className="flex flex-col gap-2">
              {[
                { name: 'Full-Stack Web (Zoho Scale)', path: '/courses?category=Web+Development', icon: <Code2 size={14} className="text-indigo-400" /> },
                { name: 'Generative AI & LLMs (IISc)', path: '/courses?category=AI+%26+Machine+Learning', icon: <Cpu size={14} className="text-purple-400" /> },
                { name: 'DevOps (AWS Mumbai)', path: '/courses?category=Cloud+%26+DevOps', icon: <Cloud size={14} className="text-sky-400" /> },
                { name: 'FinTech UI/UX (CRED Style)', path: '/courses?category=UI%2FUX+Design', icon: <Palette size={14} className="text-rose-400" /> },
                { name: 'Banking & UPI Security', path: '/courses?category=Cybersecurity', icon: <Lock size={14} className="text-emerald-400" /> },
              ].map((track, idx) => (
                <li key={idx}>
                  <Link 
                    to={track.path}
                    className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/40 text-xs text-slate-300 hover:text-white flex items-center gap-2.5 transition-all group"
                  >
                    <span className="p-1 rounded-lg bg-slate-900/80">{track.icon}</span>
                    <span className="truncate">{track.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* BOX 4: South Indian Tech Dispatch & Community Box (lg:col-span-3) */}
          <div className="lg:col-span-3 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex flex-col justify-between gap-4 shadow-xl">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Tech Dispatch
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold">
                  Weekly
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Weekly system design blueprints from Bengaluru &amp; Chennai engineering leaders.
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-1">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="karthik@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    aria-label="Email address"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
                >
                  <span>Subscribe Dispatch</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>

            {/* Community Links in Box */}
            <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px]">
                <p className="font-extrabold text-white">18,500+</p>
                <p className="text-[10px] text-slate-400">Discord Devs</p>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px]">
                <p className="font-extrabold text-white">24,000+</p>
                <p className="text-[10px] text-slate-400">Telegram Hub</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. ACCEPTED PAYMENTS IN STYLIZED BOX BADGES */}
        <div className="pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
            <span className="text-xs font-bold text-slate-300 mr-1">Accepted Indian Payments:</span>
            {["BHIM UPI", "RuPay", "Google Pay", "PhonePe", "NetBanking", "Razorpay Secure"].map((pay, i) => (
              <span 
                key={i} 
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold shadow-sm"
              >
                {pay}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        {/* 4. BOTTOM BAR & LEGAL DATA IN MINI BOXES */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {CURRENT_YEAR} JP EdTech India Pvt. Ltd. (Chennai &amp; Bengaluru). All rights reserved.
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-800/80 text-[11px]">Privacy Policy</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-800/80 text-[11px]">Terms of Service</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-800/80 text-[11px]">Honor Code</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-800/80 text-[11px]">Security Verification</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
