import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Clock, 
  BookOpen, 
  Users, 
  Globe, 
  Calendar, 
  CheckCircle2, 
  Play, 
  PlayCircle, 
  Heart, 
  Share2, 
  Award, 
  FileText, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft,
  X
} from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import { useToast } from '../context/ToastContext';
import { CourseCard } from '../components/course/CourseCard';

export const CourseDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, isEnrolled, enrollCourse, getCourseProgress, isWishlisted, toggleWishlist } = useCourse();
  const { addToast } = useToast();

  const [expandedModules, setExpandedModules] = useState({ 0: true });
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);

  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Masterclass not found</h2>
          <p className="text-slate-500 mb-6 text-sm">The course you are looking for may have been updated or moved.</p>
          <Link to="/courses" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);
  const progress = getCourseProgress(course.id);
  const wishlisted = isWishlisted(course.id);

  const toggleModule = (idx) => {
    setExpandedModules(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleEnroll = () => {
    enrollCourse(course.id);
    navigate(`/learn/${course.id}`);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast("🔗 Masterclass URL copied to clipboard!", "success");
  };

  const formatRupee = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const relatedCourses = courses.filter(c => c.category === course.category && c.id !== course.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-20">
      {/* Breadcrumb */}
      <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-4 flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-500">Home</Link>
        <span>/</span>
        <Link to="/courses" className="hover:text-indigo-500">Courses</Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-semibold truncate max-w-xs">{course.title}</span>
      </div>

      {/* Hero Section */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-10 md:py-14">
        <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {course.category}
                </span>
                {course.isBestseller && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500 text-slate-950">
                    Bestseller in India
                  </span>
                )}
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {course.level}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {course.subtitle}
              </p>

              {/* Meta Row */}
              <div className="flex items-center gap-6 flex-wrap text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-1 font-bold text-amber-500">
                  <Star size={15} className="fill-amber-500 text-amber-500" />
                  <span>{course.rating}</span>
                  <span className="text-slate-400 font-normal">({course.ratingCount.toLocaleString()} reviews)</span>
                </div>

                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{course.studentsEnrolled.toLocaleString()} learners</span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>Updated {course.updatedAt}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Globe size={14} />
                  <span>{course.language}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3 pt-3">
                <img 
                  src={course.instructor.avatar} 
                  alt={course.instructor.name} 
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/40" 
                />
                <div>
                  <p className="text-xs text-slate-400">Created by</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{course.instructor.name}</p>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{course.instructor.role}</p>
                </div>
              </div>
            </div>

            {/* Right Sticky Card */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
                {/* Trailer Preview */}
                <div 
                  className="relative aspect-video bg-black cursor-pointer group"
                  onClick={() => setTrailerModalOpen(true)}
                >
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play size={24} className="fill-white translate-x-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 left-3 text-[11px] font-bold text-white bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-md">
                    Preview Masterclass
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col gap-5">
                  {/* Price */}
                  <div>
                    {enrolled ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full">
                        <CheckCircle2 size={14} /> Currently Enrolled ({progress}%)
                      </span>
                    ) : course.price === 0 ? (
                      <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">Free / मुफ़्त (₹0)</span>
                    ) : (
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{formatRupee(course.price)}</span>
                        {course.originalPrice && (
                          <>
                            <span className="text-sm text-slate-400 line-through">{formatRupee(course.originalPrice)}</span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                              {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-2.5">
                    {enrolled ? (
                      <button 
                        onClick={() => navigate(`/learn/${course.id}`)} 
                        className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <PlayCircle size={18} /> {progress > 0 ? "Resume Learning" : "Start Masterclass"}
                      </button>
                    ) : (
                      <button 
                        onClick={handleEnroll} 
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 transition-all cursor-pointer"
                      >
                        Enroll Now — Start Learning
                      </button>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => toggleWishlist(course.id)} 
                        className={`py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          wishlisted 
                            ? 'border-rose-500/40 text-rose-500 bg-rose-50 dark:bg-rose-950/20' 
                            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Heart size={15} fill={wishlisted ? "currentColor" : "none"} />
                        {wishlisted ? "Wishlisted" : "Wishlist"}
                      </button>

                      <button 
                        onClick={handleShare} 
                        className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Share2 size={15} /> Share
                      </button>
                    </div>
                  </div>

                  {/* Highlights List */}
                  <ul className="flex flex-col gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                    <li className="flex items-center gap-2.5">
                      <Clock size={15} className="text-indigo-500 shrink-0" />
                      <span>{course.duration} on-demand architectural video</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <BookOpen size={15} className="text-indigo-500 shrink-0" />
                      <span>{course.lessonsCount} interactive lessons & modules</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <FileText size={15} className="text-indigo-500 shrink-0" />
                      <span>Timestamped study notes workspace</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Award size={15} className="text-indigo-500 shrink-0" />
                      <span>Certificate of completion (verifiable ID)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <ShieldCheck size={15} className="text-indigo-500 shrink-0" />
                      <span>30-day money-back guarantee (UPI refundable)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Body */}
      <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 flex flex-col gap-12">
            {/* 1. What You Will Learn */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6">
                What You'll Learn
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouWillLearn?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Course Description */}
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">Description</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* 3. Curriculum Accordion */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Curriculum & Syllabus</h3>
                <span className="text-xs text-slate-500">
                  {course.modules?.length} Modules • {course.lessonsCount} Lessons • {course.duration}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {course.modules?.map((module, mIdx) => {
                  const isExpanded = !!expandedModules[mIdx];
                  return (
                    <div key={module.id} className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                      <button 
                        onClick={() => toggleModule(mIdx)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      >
                        <div className="flex items-center gap-3">
                          {isExpanded ? <ChevronUp size={18} className="text-indigo-500" /> : <ChevronDown size={18} className="text-slate-400" />}
                          <span>{module.title}</span>
                        </div>
                        <span className="text-xs text-slate-400 font-normal">
                          {module.lessons?.length} lessons • {module.duration}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="bg-slate-50/70 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800/80 divide-y divide-slate-100 dark:divide-slate-800/60">
                          {module.lessons?.map(lesson => (
                            <div key={lesson.id} className="p-3.5 px-6 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                              <div className="flex items-center gap-2.5">
                                <PlayCircle size={15} className="text-indigo-500 shrink-0" />
                                <span>{lesson.title}</span>
                              </div>
                              <span className="font-mono text-slate-400">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Requirements */}
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">Prerequisites & Requirements</h3>
              <ul className="list-disc pl-5 flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
                {course.requirements?.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>

            {/* 5. Instructor Profile */}
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6">Instructor Profile</h3>
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-6 items-start">
                <img 
                  src={course.instructor.avatar} 
                  alt={course.instructor.name} 
                  className="w-24 h-24 rounded-2xl object-cover ring-2 ring-indigo-500/40 shrink-0" 
                />
                <div className="flex flex-col gap-2">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">{course.instructor.name}</h4>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{course.instructor.role}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 my-1">
                    <span><strong>{course.instructor.rating}★</strong> Rating</span>
                    <span><strong>{course.instructor.studentsCount.toLocaleString()}</strong> Learners</span>
                    <span><strong>{course.instructor.coursesCount}</strong> Courses</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{course.instructor.bio}</p>
                </div>
              </div>
            </div>

            {/* 6. Related Courses */}
            {relatedCourses.length > 0 && (
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6">Related Indian Masterclasses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedCourses.map(c => (
                    <CourseCard key={c.id} course={c} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trailer Video Modal */}
      {trailerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setTrailerModalOpen(false)}>
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-4 px-6 flex items-center justify-between bg-slate-950 border-b border-slate-800 text-white">
              <span className="font-bold text-sm truncate max-w-md">{course.title} — Video Preview</span>
              <button onClick={() => setTrailerModalOpen(false)} className="p-1 hover:text-indigo-400 cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <video 
                src={course.previewVideoUrl} 
                controls 
                autoPlay 
                className="w-full h-full object-contain" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
