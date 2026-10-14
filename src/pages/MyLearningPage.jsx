import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  BookOpen, 
  Award, 
  Flame, 
  Clock, 
  Heart, 
  Sparkles, 
  Compass, 
  PlayCircle,
  MapPin
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCourse } from '../context/CourseContext';
import { CourseCard } from '../components/course/CourseCard';
import { CertificateModal } from '../components/learning/CertificateModal';

export const MyLearningPage = () => {
  const { user } = useAuth();
  const { 
    courses, 
    wishlist, 
    getEnrolledCoursesList, 
    getCompletedCoursesList, 
    getOverallStats 
  } = useCourse();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCertificateCourse, setSelectedCertificateCourse] = useState(null);

  const activeTab = searchParams.get('tab') || 'in-progress';

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  const enrolledList = getEnrolledCoursesList();
  const completedList = getCompletedCoursesList();
  const inProgressList = enrolledList.filter(c => c.realProgress < 100);
  const wishlistedCourses = courses.filter(c => wishlist.includes(c.id));
  const stats = getOverallStats();

  const getDisplayedCourses = () => {
    if (activeTab === 'in-progress') return inProgressList;
    if (activeTab === 'completed') return completedList;
    if (activeTab === 'wishlist') return wishlistedCourses;
    return enrolledList;
  };

  const displayedCourses = getDisplayedCourses();

  return (
    <div className="min-h-screen py-10 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        {/* Student Profile Banner */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
            style={{ backgroundImage: `url('/assets/tech_campus_bg.jpg')` }}
          />
          <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-indigo-500/15 via-purple-500/10 to-transparent pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10 text-center sm:text-left">
            <img 
              src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"} 
              alt={user?.name || "Student"} 
              className="w-20 h-20 rounded-full object-cover ring-4 ring-indigo-500/40 shadow-xl" 
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Vanakkam / Namaste, <span className="bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-500 bg-clip-text text-transparent">{user?.name || "Karthik Subramanian"}</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                <MapPin size={14} className="text-indigo-500" />
                <span>{user?.city || "Chennai, Tamil Nadu"}</span>
                <span>•</span>
                <span>Goal: <strong>{user?.learningGoal || "Full-Stack Web & AI Engineering"}</strong></span>
              </p>
              <div className="flex items-center gap-2 mt-3 justify-center sm:justify-start flex-wrap">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {user?.level || "Pro Scholar"}
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Member since {user?.joinedDate || "Oct 2025"}
                </span>
              </div>
            </div>
          </div>

          {/* Daily Streak & XP */}
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3.5 px-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
              <Flame size={28} className="fill-amber-500 text-amber-500" />
              <div>
                <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400 leading-tight">{user?.streakDays || 8} Days</p>
                <p className="text-[11px] text-slate-500 font-semibold">Study Streak</p>
              </div>
            </div>

            <div className="p-3.5 px-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-3">
              <Sparkles size={26} className="text-indigo-500" />
              <div>
                <p className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 leading-tight">{user?.xp || 1850} XP</p>
                <p className="text-[11px] text-slate-500 font-semibold">Total Karma XP</p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
              <BookOpen size={22} />
            </div>
            <div>
              <p className="text-2xl font-extrabold">{stats.totalEnrolled}</p>
              <p className="text-xs text-slate-500 font-medium">Enrolled Courses</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <PlayCircle size={22} />
            </div>
            <div>
              <p className="text-2xl font-extrabold">{stats.inProgressCount}</p>
              <p className="text-xs text-slate-500 font-medium">In Progress</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <Award size={22} />
            </div>
            <div>
              <p className="text-2xl font-extrabold">{stats.certificatesCount}</p>
              <p className="text-xs text-slate-500 font-medium">Certificates Earned</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
              <Clock size={22} />
            </div>
            <div>
              <p className="text-2xl font-extrabold">{stats.totalHoursLearned}h</p>
              <p className="text-xs text-slate-500 font-medium">Study Hours Logged</p>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto">
          <button 
            onClick={() => handleTabChange('in-progress')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'in-progress' ? 'text-indigo-600 dark:text-indigo-400 border-indigo-500' : 'text-slate-500 border-transparent hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <PlayCircle size={16} /> In Progress ({inProgressList.length})
          </button>

          <button 
            onClick={() => handleTabChange('completed')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'completed' ? 'text-indigo-600 dark:text-indigo-400 border-indigo-500' : 'text-slate-500 border-transparent hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Award size={16} /> Completed & Certificates ({completedList.length})
          </button>

          <button 
            onClick={() => handleTabChange('wishlist')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'wishlist' ? 'text-indigo-600 dark:text-indigo-400 border-indigo-500' : 'text-slate-500 border-transparent hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Heart size={16} /> Wishlist ({wishlistedCourses.length})
          </button>

          <button 
            onClick={() => handleTabChange('all')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'all' ? 'text-indigo-600 dark:text-indigo-400 border-indigo-500' : 'text-slate-500 border-transparent hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <BookOpen size={16} /> All Enrolled ({enrolledList.length})
          </button>
        </div>

        {/* Displayed Cards */}
        {displayedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                showProgress={true}
                onViewCertificate={(c) => setSelectedCertificateCourse(c)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl">
            <Compass size={44} className="mx-auto text-indigo-500 mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {activeTab === 'completed' 
                ? "No completed masterclasses yet" 
                : activeTab === 'wishlist' 
                ? "Your wishlist is empty" 
                : "No courses found"}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6 leading-relaxed">
              {activeTab === 'completed'
                ? "Complete 100% of your course modules and quizzes to automatically generate your verified certificate."
                : "Explore our rich catalog of masterclasses and save courses to your wishlist."}
            </p>
            <Link to="/courses" className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-indigo-500/25">
              Explore Masterclasses
            </Link>
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      {selectedCertificateCourse && (
        <CertificateModal 
          course={selectedCertificateCourse} 
          onClose={() => setSelectedCertificateCourse(null)} 
        />
      )}
    </div>
  );
};
