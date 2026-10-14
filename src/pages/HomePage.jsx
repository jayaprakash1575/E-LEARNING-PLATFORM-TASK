import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  PlayCircle, 
  Code2, 
  Cpu, 
  Palette, 
  Cloud, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle, 
  Flame, 
  Star, 
  Award, 
  Zap, 
  Users, 
  BookOpen, 
  ChevronDown, 
  ChevronUp,
  Building2
} from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import { CATEGORIES, TESTIMONIALS, FAQS, TOP_HIRING_PARTNERS } from '../data/coursesData';
import { CourseCard } from '../components/course/CourseCard';

export const HomePage = () => {
  const { courses } = useCourse();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('trending');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/courses');
    }
  };

  const handleChipClick = (term) => {
    navigate(`/courses?search=${encodeURIComponent(term)}`);
  };

  const filteredCourses = courses.filter(c => {
    if (activeTab === 'trending') return c.isTrending;
    if (activeTab === 'bestseller') return c.isBestseller;
    if (activeTab === 'free') return c.price === 0;
    return true;
  });

  const categoryIcons = {
    "Web Development": <Code2 size={24} />,
    "AI & Machine Learning": <Cpu size={24} />,
    "UI/UX Design": <Palette size={24} />,
    "Cloud & DevOps": <Cloud size={24} />,
    "Mobile Development": <Smartphone size={24} />,
    "Cybersecurity": <ShieldCheck size={24} />,
    "all": <Zap size={24} />
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* 1. Hero Section */}
      <section id="hero-section" className="relative overflow-hidden pt-12 pb-20 md:py-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-radial-[at_top] from-indigo-500/10 via-transparent to-transparent">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 dark:opacity-25 pointer-events-none scale-105 transition-opacity"
          style={{ backgroundImage: `url('/assets/tech_campus_bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/70 dark:via-slate-950/80 to-slate-50 dark:to-slate-950 pointer-events-none" />

        {/* Glow Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold shadow-md shadow-indigo-500/10 w-fit">
                <Sparkles size={14} className="text-amber-500" />
                <span>JP — South India's Premier High-Concurrency Tech &amp; AI Academy</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                Master In-Demand <br />
                <span className="bg-gradient-to-r from-amber-500 via-indigo-600 to-emerald-500 bg-clip-text text-transparent">
                  Tech, AI &amp; Architecture
                </span> <br />
                From South India's Top Leaders
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                Step-by-step masterclasses engineered for scale — Zoho, Flipkart, Freshworks, Swiggy, Razorpay &amp; CRED. Learn through hands-on labs, live note-taking, interactive quizzes, and earn verifiable career credentials.
              </p>

              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} className="flex items-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-300 dark:border-slate-700 rounded-2xl p-2 shadow-xl shadow-indigo-500/5 max-w-xl focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                <Search size={20} className="text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="What do you want to master? (e.g. React 19, UPI RAG Agents, Kubernetes...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-transparent text-slate-900 dark:text-white focus:outline-none"
                  aria-label="Search masterclasses"
                />
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md shadow-indigo-500/25 shrink-0 cursor-pointer">
                  Search
                </button>
              </form>

              {/* Quick Search Chips */}
              <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Trending in Bengaluru &amp; Chennai:</span>
                {["React 19 & Next.js", "AI & LLM Agents", "Kubernetes (AWS Mumbai)", "CRED UI/UX", "Zoho & Freshworks Scale"].map(chip => (
                  <button 
                    key={chip} 
                    type="button"
                    onClick={() => handleChipClick(chip)}
                    className="px-2.5 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800/80 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-300/40 dark:border-slate-700/60 transition-colors cursor-pointer backdrop-blur-sm"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-2 flex-wrap">
                <Link to="/courses" className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 transition-all hover:scale-105 flex items-center gap-2">
                  Explore All Courses <ArrowRight size={16} />
                </Link>
                <Link to="/courses?filter=free" className="px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-indigo-500 text-slate-800 dark:text-slate-200 font-bold text-sm transition-all hover:-translate-y-0.5">
                  Try Free Masterclasses (₹0)
                </Link>
              </div>
            </div>

            {/* Right Card Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-4 -right-4 z-20 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-xl shadow-amber-500/30">
                <Flame size={15} className="fill-white" />
                <span>48,500+ Engineers Enrolled</span>
              </div>

              <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden group">
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img 
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" 
                    alt="React 19 Architecture"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-500/50 group-hover:scale-110 transition-transform">
                      <PlayCircle size={32} />
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      Flipkart Scale Architecture
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <Star size={14} className="fill-amber-500 text-amber-500" />
                      <span>4.9 (4,820 reviews)</span>
                    </div>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug">
                    Full-Stack Web Architecture 2026: React 19, Next.js & Node.js
                  </h3>

                  <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Curriculum Milestone</span>
                      <span className="text-indigo-500">72% Completed</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full" style={{ width: '72%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Floating Shield */}
              <div className="absolute -bottom-6 -left-6 z-20 p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Award size={22} />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white">AICTE Aligned Credential</p>
                  <p className="text-[11px] text-slate-500">100% Verifiable & Shareable on LinkedIn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Top Hiring Partners Ticker */}
      <section className="py-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-center gap-2">
            <Building2 size={15} /> Top Tech Giants Hiring JP Graduates Across South India &amp; Global Hubs
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            {TOP_HIRING_PARTNERS.map((company, idx) => (
              <span key={idx} className="font-extrabold text-sm md:text-base text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Metric Stats Strip */}
      <section className="py-12 bg-slate-100/60 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                48,000+
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Engineers Upskilled</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-amber-500 to-rose-500 bg-clip-text text-transparent">
                ₹42+ LPA
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Top Placement CTC</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                98.6%
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Course Satisfaction</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
                21,000+
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Verified Certificates</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Discipline Explorer */}
      <section id="tracks-section" className="py-20">
        <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              High-Growth Engineering Tracks
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4">
              Explore High-Demand <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Specializations</span>
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Curated roadmaps designed by Principal Architects in Bengaluru and Hyderabad.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
              <Link 
                key={cat.id} 
                to={`/courses?category=${encodeURIComponent(cat.name)}`}
                className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  {categoryIcons[cat.name] || <Code2 size={24} />}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{cat.count} Production Masterclasses</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Masterclasses */}
      <section id="courses-section" className="py-20 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              Curated Curriculum
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4">
              Featured <span className="bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-500 bg-clip-text text-transparent">Masterclasses</span>
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Industry projects with Razorpay webhook integrations, Swiggy data models, and AWS Mumbai cloud deployments.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
            {[
              { id: 'trending', label: 'Trending Now' },
              { id: 'bestseller', label: 'Bestsellers' },
              { id: 'free', label: 'Free (मुफ़्त) Courses' },
              { id: 'all', label: `All Courses (${courses.length})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25' 
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.slice(0, 6).map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/courses" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-500 text-indigo-600 dark:text-indigo-400 font-bold text-sm hover:bg-indigo-600 hover:text-white transition-all shadow-md">
              View All {courses.length} Masterclasses <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Why JP: Pillars */}
      <section id="advantage-section" className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none scale-105"
          style={{ backgroundImage: `url('/assets/cyber_mesh_bg.jpg')` }}
        />
        <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              The JP Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4">
              Engineered for <span className="bg-gradient-to-r from-emerald-500 to-indigo-500 bg-clip-text text-transparent">South Indian Tech Retention</span>
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Built specifically around high-concurrency systems demanded by Bengaluru, Chennai &amp; Hyderabad unicorns.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 backdrop-blur-md flex flex-col gap-3.5 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PlayCircle size={24} />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-500">
                  0.75x–2.0x
                </span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Custom Video Player</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Speed adjustments, keyboard timeline scrubber, and offline mobile syncing tailored for Indian tech learners.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 backdrop-blur-md flex flex-col gap-3.5 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen size={24} />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-500">
                  Instant Sync
                </span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Timestamped Notebook</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Capture thoughts pinned to the exact second in the lecture, stored persistently on your local device.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 backdrop-blur-md flex flex-col gap-3.5 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle size={24} />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500">
                  Realtime Test
                </span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Interactive Quizzes</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Self-graded assessment checks with deep architectural explanations to crack tier-1 product engineering interviews.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 backdrop-blur-md flex flex-col gap-3.5 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Award size={24} />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500">
                  QR Verified
                </span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Verifiable Certificates</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Printable credentials with unique IDs and QR verification upon 100% completion for LinkedIn and recruiters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Student Testimonials */}
      <section id="reviews-section" className="py-20 bg-slate-100/60 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              Indian Developer Success
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4">
              Trusted by Engineers at <span className="bg-gradient-to-r from-amber-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Top Indian Tech Firms</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col gap-4 shadow-sm hover:shadow-xl transition-all">
                <div className="flex gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed">
                  "{t.text}"
                </p>
                <div className="mt-auto flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</h4>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ 2-Column Wide Layout with Advisor Support Box */}
      <section id="faq-section" className="py-20">
        <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Heading + Counseling Card */}
            <div className="lg:col-span-5 flex flex-col gap-6 sticky top-28">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  Frequently Asked Questions
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight leading-tight">
                  Everything You Need to Know About <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 bg-clip-text text-transparent">JP Academy</span>
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                  Got questions about curriculums, assessments, verifiable credentials, or campus access in Bengaluru and Chennai? We are here to help.
                </p>
              </div>

              {/* Support & Counseling Card Box */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-slate-900/80 border border-indigo-500/30 backdrop-blur-xl shadow-xl flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Academic Counselors Online
                  </span>
                </div>
                <h3 className="font-extrabold text-lg text-white">
                  Need Help Choosing the Right Tech Track?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Book a free 15-minute roadmap consultation with our curriculum advisors from IIT Madras Research Park.
                </p>
                <div className="flex flex-col gap-2 pt-2 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400 font-bold">📍 Regional HQs:</span>
                    <span>Chennai Taramani &amp; Bengaluru Koramangala</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">⚡ Response Time:</span>
                    <span>Instant assistance during 9 AM - 8 PM IST</span>
                  </div>
                </div>
                <div className="pt-2 flex items-center gap-3 flex-wrap">
                  <Link 
                    to="/courses" 
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
                  >
                    <span>Browse Catalog</span>
                    <ArrowRight size={14} />
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all"
                  >
                    Register Free
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: FAQ Accordion Boxes */}
            <div className="lg:col-span-7 flex flex-col gap-3.5">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={index} 
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen 
                        ? 'bg-white dark:bg-slate-900 border-indigo-500/50 shadow-lg shadow-indigo-500/5' 
                        : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <button 
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      className="w-full p-5 text-left font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="leading-snug">{faq.q}</span>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-indigo-500/10 text-indigo-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}>
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3.5">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 9. South Indian Tech Career CTA (Full-Bleed Panoramic Widescreen Banner) */}
      <section className="relative w-full py-20 sm:py-24 border-y border-indigo-500/30 overflow-hidden bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950">
        {/* Full-bleed tech campus background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none scale-105"
          style={{ backgroundImage: `url('/assets/tech_campus_bg.jpg')` }}
        />
        {/* Edge-to-edge cyber matrix grid overlay */}
        <div className="absolute inset-0 bg-cyber-grid opacity-50 pointer-events-none" />
        
        {/* Ambient Side Auroras spanning the screen */}
        <div className="absolute -left-20 top-0 bottom-0 w-[450px] bg-gradient-to-r from-indigo-500/25 via-purple-500/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -right-20 top-0 bottom-0 w-[450px] bg-gradient-to-l from-purple-500/25 via-cyan-500/15 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Alumni & Placement Metrics Box */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <div className="p-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-indigo-500/30 shadow-2xl flex flex-col gap-3">
                <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs">
                  <Users size={18} />
                  <span>52,400+ Alumni Network</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Upskilled developers coding in Zoho, Freshworks, Swiggy, Flipkart, CRED &amp; Razorpay.
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>PLACEMENT RATE</span>
                  <span className="text-emerald-400 font-bold">94.8%</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 backdrop-blur-md flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-xs text-indigo-200">
                  New Cohort: <strong>Oct 2026 Batch</strong> filling fast in Bengaluru &amp; Chennai
                </span>
              </div>
            </div>

            {/* Center Column: Core CTA Message & Actions */}
            <div className="lg:col-span-6 text-center flex flex-col items-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-indigo-300 text-xs font-bold border border-white/20 mb-4 backdrop-blur-md shadow-lg">
                <Sparkles size={14} className="text-amber-400" /> Executive Engineering Cohorts
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Ready to Accelerate Your Tech Career with <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300 bg-clip-text text-transparent">JP Academy</span>?
              </h2>
              <p className="text-sm sm:text-base text-indigo-100/90 max-w-xl mx-auto mt-4 mb-8 leading-relaxed">
                Join 52,000+ ambitious developers mastering modern React 19, AI agents, and AWS Mumbai cloud scale across Bengaluru, Chennai, and Hyderabad.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link to="/register" className="px-8 py-4 rounded-2xl bg-white text-indigo-950 font-black text-sm shadow-2xl hover:scale-105 transition-all">
                  Get Started For Free
                </Link>
                <Link to="/courses" className="px-8 py-4 rounded-2xl bg-indigo-600/80 hover:bg-indigo-600 border border-white/20 text-white font-bold text-sm transition-all backdrop-blur-md shadow-xl">
                  Browse Full Catalog
                </Link>
              </div>
            </div>

            {/* Right Column: Salary & Certification Box */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <div className="p-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 shadow-2xl flex flex-col gap-3">
                <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs">
                  <Award size={18} />
                  <span>₹18.5 LPA Avg CTC</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Verified salary upgrades reported by alumni transitioning from service to tier-1 product roles.
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>HIGHEST OFFER</span>
                  <span className="text-amber-400 font-bold">₹44.0 LPA</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20 backdrop-blur-md flex items-center gap-3">
                <ShieldCheck size={18} className="text-purple-400 shrink-0" />
                <span className="text-xs text-purple-200">
                  AICTE &amp; ISO 9001:2015 Aligned Curriculum Certification
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
