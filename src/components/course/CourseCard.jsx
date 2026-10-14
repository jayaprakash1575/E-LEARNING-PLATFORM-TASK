import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Clock, 
  BookOpen, 
  Users, 
  Heart, 
  PlayCircle, 
  Award, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useCourse } from '../../context/CourseContext';

export const CourseCard = ({ course, viewMode = 'grid', showProgress = false, onViewCertificate }) => {
  const { isEnrolled, getCourseProgress, isWishlisted, toggleWishlist, enrollCourse } = useCourse();
  const navigate = useNavigate();

  const enrolled = isEnrolled(course.id);
  const progress = getCourseProgress(course.id);
  const wishlisted = isWishlisted(course.id);
  const isComplete = progress === 100;

  const handleEnrollClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    enrollCourse(course.id);
    navigate(`/learn/${course.id}`);
  };

  const handleResumeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/learn/${course.id}`);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(course.id);
  };

  const formatRupee = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  if (viewMode === 'list') {
    return (
      <div className="group flex flex-col md:flex-row bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
        <div className="relative md:w-72 aspect-video md:aspect-auto flex-shrink-0 overflow-hidden bg-slate-950">
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            loading="lazy" 
          />
          <button
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
              wishlisted ? 'bg-white text-rose-500 shadow-md' : 'bg-slate-950/60 text-white hover:bg-white hover:text-rose-500'
            }`}
            aria-label="Wishlist"
          >
            <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="flex-1 p-5 flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                {course.category}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star size={14} className="fill-amber-500 text-amber-500" />
                <span>{course.rating.toFixed(1)}</span>
                <span className="text-slate-400 font-normal">({course.ratingCount.toLocaleString()})</span>
              </div>
            </div>

            <Link to={`/courses/${course.id}`} className="font-bold text-lg text-slate-900 dark:text-white hover:text-indigo-500 transition-colors line-clamp-1">
              {course.title}
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {course.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-3">
            <div className="flex items-center gap-1.5">
              <img src={course.instructor.avatar} alt={course.instructor.name} className="w-5 h-5 rounded-full object-cover" />
              <span>{course.instructor.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={13} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={13} />
              <span>{course.studentsEnrolled.toLocaleString()}</span>
            </div>
          </div>

          {(showProgress || enrolled) && (
            <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-600 dark:text-slate-400">{isComplete ? "🎉 Completed" : "Progress"}</span>
                <span className={isComplete ? "text-emerald-500" : "text-indigo-500"}>{progress}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${isComplete ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`} style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
            <div>
              {enrolled ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  <CheckCircle2 size={13} /> Enrolled
                </span>
              ) : course.price === 0 ? (
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">Free / मुफ़्त</span>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white">{formatRupee(course.price)}</span>
                  {course.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">{formatRupee(course.originalPrice)}</span>
                  )}
                </div>
              )}
            </div>

            <div>
              {enrolled ? (
                isComplete && onViewCertificate ? (
                  <button onClick={() => onViewCertificate(course)} className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-1.5">
                    <Award size={14} /> Certificate
                  </button>
                ) : (
                  <button onClick={handleResumeClick} className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-indigo-500/20">
                    <PlayCircle size={14} /> {progress > 0 ? "Resume" : "Start"}
                  </button>
                )
              ) : (
                <button onClick={handleEnrollClick} className="px-3.5 py-1.5 rounded-xl border border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white text-xs font-bold transition-all flex items-center gap-1">
                  Enroll Now <ArrowRight size={13} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: Grid View
  return (
    <div className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/15 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-slate-950">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          loading="lazy" 
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
            {course.category}
          </span>
          {course.isBestseller && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all z-10 cursor-pointer ${
            wishlisted ? 'bg-white text-rose-500 shadow-lg' : 'bg-slate-950/60 text-white hover:bg-white hover:text-rose-500'
          }`}
          aria-label="Wishlist"
        >
          <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3.5">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1 font-bold text-amber-500">
            <Star size={14} className="fill-amber-500 text-amber-500" />
            <span>{course.rating.toFixed(1)}</span>
            <span className="text-slate-400 font-normal">({course.ratingCount.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-1 font-medium">
            <Users size={13} />
            <span>{course.studentsEnrolled.toLocaleString()}</span>
          </div>
        </div>

        <Link to={`/courses/${course.id}`} className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors line-clamp-2 leading-snug">
          {course.title}
        </Link>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {course.subtitle}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2 pt-1">
          <img src={course.instructor.avatar} alt={course.instructor.name} className="w-6 h-6 rounded-full object-cover ring-1 ring-indigo-500/30" />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{course.instructor.name}</span>
        </div>

        {/* Meta Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-3">
          <div className="flex items-center gap-1">
            <Clock size={13} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={13} />
            <span>{course.lessonsCount} lessons</span>
          </div>
        </div>

        {/* Enrolled Progress Bar */}
        {(showProgress || enrolled) && (
          <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-600 dark:text-slate-400">{isComplete ? "🎉 Completed" : "Progress"}</span>
              <span className={isComplete ? "text-emerald-500" : "text-indigo-500"}>{progress}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-500 ${isComplete ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`} style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Footer: Price & CTA */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <div>
            {enrolled ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                <CheckCircle2 size={13} /> Enrolled
              </span>
            ) : course.price === 0 ? (
              <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">Free / मुफ़्त</span>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-extrabold text-slate-900 dark:text-white">{formatRupee(course.price)}</span>
                {course.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">{formatRupee(course.originalPrice)}</span>
                )}
              </div>
            )}
          </div>

          <div>
            {enrolled ? (
              isComplete && onViewCertificate ? (
                <button onClick={() => onViewCertificate(course)} className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer">
                  <Award size={14} /> Certificate
                </button>
              ) : (
                <button onClick={handleResumeClick} className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-indigo-500/20 cursor-pointer">
                  <PlayCircle size={14} /> {progress > 0 ? "Resume" : "Start"}
                </button>
              )
            ) : (
              <button onClick={handleEnrollClick} className="px-3.5 py-1.5 rounded-xl border border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer">
                Enroll <ArrowRight size={13} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
