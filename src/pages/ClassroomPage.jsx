import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  HelpCircle, 
  Download, 
  Award, 
  PlayCircle, 
  SkipBack, 
  SkipForward, 
  BookOpen
} from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import { VideoPlayer } from '../components/learning/VideoPlayer';
import { NotesSection } from '../components/learning/NotesSection';
import { QuizModule } from '../components/learning/QuizModule';
import { CertificateModal } from '../components/learning/CertificateModal';

export const ClassroomPage = () => {
  const { id } = useParams();
  const { 
    courses, 
    isEnrolled, 
    enrollCourse, 
    getCourseEnrollment, 
    getCourseProgress, 
    markLessonComplete, 
    toggleLessonCompletion 
  } = useCourse();

  const [activeTab, setActiveTab] = useState('overview');
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [openModules, setOpenModules] = useState({ 0: true });

  const course = courses.find(c => c.id === id);

  useEffect(() => {
    if (course && !isEnrolled(course.id)) {
      enrollCourse(course.id);
    }
  }, [course, isEnrolled, enrollCourse]);

  const allLessons = [];
  course?.modules?.forEach((module, mIdx) => {
    module.lessons?.forEach((lesson) => {
      allLessons.push({
        ...lesson,
        moduleIndex: mIdx,
        moduleTitle: module.title,
        quiz: module.quiz
      });
    });
  });

  const enrollment = getCourseEnrollment(course?.id);
  const initialLessonId = enrollment?.lastLessonId || allLessons[0]?.id || "";
  const [currentLessonId, setCurrentLessonId] = useState(initialLessonId);

  const activeLesson = allLessons.find(l => l.id === currentLessonId) || allLessons[0];
  const activeLessonIdx = allLessons.findIndex(l => l.id === activeLesson?.id);
  const activeModule = course?.modules?.[activeLesson?.moduleIndex || 0];

  const progress = getCourseProgress(course?.id || "");
  const isLessonCompleted = enrollment?.completedLessons?.includes(activeLesson?.id);
  const isCourseComplete = progress === 100;

  const handleLessonChange = (lessonId, moduleIdx) => {
    setCurrentLessonId(lessonId);
    setOpenModules(prev => ({ ...prev, [moduleIdx]: true }));
  };

  const handleNextLesson = () => {
    if (activeLessonIdx < allLessons.length - 1) {
      const nextLesson = allLessons[activeLessonIdx + 1];
      setCurrentLessonId(nextLesson.id);
      setOpenModules(prev => ({ ...prev, [nextLesson.moduleIndex]: true }));
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIdx > 0) {
      const prevLesson = allLessons[activeLessonIdx - 1];
      setCurrentLessonId(prevLesson.id);
      setOpenModules(prev => ({ ...prev, [prevLesson.moduleIndex]: true }));
    }
  };

  const toggleModuleOpen = (idx) => {
    setOpenModules(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-xl font-bold mb-4">Masterclass not found</h2>
          <Link to="/courses" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link 
            to={`/courses/${course.id}`} 
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Exit Classroom"
          >
            <ArrowLeft size={18} />
          </Link>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-slate-400">Classroom Mode • {course.category}</p>
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white truncate max-w-md">{course.title}</h2>
          </div>
        </div>

        {/* Progress Pill */}
        <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 whitespace-nowrap">
            Progress: <strong className={isCourseComplete ? "text-emerald-500" : "text-indigo-500"}>{progress}%</strong>
          </span>
          <div className="w-24 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${isCourseComplete ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`} 
              style={{ width: `${progress}%` }} 
            />
          </div>

          {isCourseComplete && (
            <button 
              onClick={() => setShowCertificateModal(true)} 
              className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-[11px] flex items-center gap-1 shadow-sm hover:scale-105 transition-all cursor-pointer"
            >
              <Award size={13} /> View Certificate
            </button>
          )}
        </div>
      </header>

      {/* Main Body Split */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left: Video & Tabs */}
        <main className="lg:col-span-8 flex flex-col overflow-y-auto bg-slate-50 dark:bg-slate-950">
          <VideoPlayer 
            videoUrl={activeLesson?.videoUrl || course.previewVideoUrl}
            lessonTitle={activeLesson?.title}
            onLessonEnd={() => {
              if (!isLessonCompleted) markLessonComplete(course.id, activeLesson.id);
            }}
          />

          {/* Lesson Header */}
          <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">{activeLesson?.title}</h2>
              <p className="text-xs text-slate-500 mt-1">
                {activeLesson?.moduleTitle} • {activeLesson?.duration}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrevLesson}
                disabled={activeLessonIdx === 0}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Previous"
              >
                <SkipBack size={16} />
              </button>

              <button 
                onClick={() => toggleLessonCompletion(course.id, activeLesson.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isLessonCompleted 
                    ? 'border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20' 
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/25'
                }`}
              >
                {isLessonCompleted ? (
                  <>
                    <CheckCircle2 size={15} /> Completed
                  </>
                ) : (
                  <>
                    <Circle size={15} /> Mark Complete
                  </>
                )}
              </button>

              <button 
                onClick={handleNextLesson}
                disabled={activeLessonIdx === allLessons.length - 1}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Next"
              >
                <SkipForward size={16} />
              </button>
            </div>
          </div>

          {/* Workspace Tabs */}
          <div className="flex items-center gap-6 px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
                activeTab === 'overview' ? 'text-indigo-600 dark:text-indigo-400 border-indigo-500' : 'text-slate-500 border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen size={15} /> Overview & Resources
            </button>

            <button 
              onClick={() => setActiveTab('notes')}
              className={`py-3.5 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
                activeTab === 'notes' ? 'text-indigo-600 dark:text-indigo-400 border-indigo-500' : 'text-slate-500 border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText size={15} /> Timestamped Notes ({enrollment?.notes?.length || 0})
            </button>

            {activeModule?.quiz && (
              <button 
                onClick={() => setActiveTab('quiz')}
                className={`py-3.5 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === 'quiz' ? 'text-indigo-600 dark:text-indigo-400 border-indigo-500' : 'text-slate-500 border-transparent hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <HelpCircle size={15} /> Module Quiz
              </button>
            )}
          </div>

          {/* Workspace Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="max-w-2xl flex flex-col gap-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Lesson Overview</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {activeLesson?.summary || "Deep dive into architectural patterns and implementation details."}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                    <Download size={14} className="text-indigo-500" /> Lesson Resources & Code Assets
                  </h4>
                  <div className="flex flex-col gap-2">
                    {(activeLesson?.resources || ["Starter Code Repository", "Architecture Blueprint", "Cheatsheet Summary"]).map((res, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{res}</span>
                        <button 
                          onClick={() => alert(`Downloading "${res}"...`)} 
                          className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <Download size={13} /> Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <NotesSection courseId={course.id} activeLessonId={activeLesson?.id} />
            )}

            {activeTab === 'quiz' && activeModule?.quiz && (
              <QuizModule 
                courseId={course.id}
                quiz={activeModule.quiz}
                onCompleteQuiz={(score) => {
                  if (score >= 70 && !isLessonCompleted) {
                    markLessonComplete(course.id, activeLesson.id);
                  }
                }}
              />
            )}
          </div>
        </main>

        {/* Right: Curriculum Accordion */}
        <aside className="lg:col-span-4 bg-white dark:bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 flex flex-col max-h-[85vh] lg:max-h-[calc(100vh-65px)] overflow-y-auto">
          <div className="p-4 px-5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Curriculum & Syllabus</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {enrollment?.completedLessons?.length || 0} of {allLessons.length} lessons completed
            </p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {course.modules?.map((module, mIdx) => {
              const isOpen = openModules[mIdx] !== false;
              const moduleCompleted = module.lessons?.filter(l => enrollment?.completedLessons?.includes(l.id))?.length || 0;

              return (
                <div key={module.id} className="flex flex-col">
                  <button 
                    onClick={() => toggleModuleOpen(mIdx)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
                  >
                    <div>
                      <p className="font-bold text-xs text-slate-900 dark:text-white">{module.title}</p>
                      <span className="text-[11px] text-slate-400">{moduleCompleted}/{module.lessons?.length} completed</span>
                    </div>
                    {isOpen ? <ChevronUp size={16} className="text-indigo-500" /> : <ChevronDown size={16} className="text-slate-400" />}
                  </button>

                  {isOpen && (
                    <div className="bg-slate-50/50 dark:bg-slate-950/40 divide-y divide-slate-100 dark:divide-slate-800/60">
                      {module.lessons?.map(lesson => {
                        const isCurrent = lesson.id === activeLesson?.id;
                        const isDone = enrollment?.completedLessons?.includes(lesson.id);

                        return (
                          <div 
                            key={lesson.id}
                            onClick={() => handleLessonChange(lesson.id, mIdx)}
                            className={`p-3 px-4 flex items-center gap-3 cursor-pointer text-xs transition-colors ${
                              isCurrent 
                                ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold border-l-4 border-indigo-500' 
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            <span 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLessonCompletion(course.id, lesson.id);
                              }}
                              className="shrink-0 text-slate-400 hover:text-emerald-500"
                            >
                              {isDone ? (
                                <CheckCircle2 size={16} className="text-emerald-500" />
                              ) : (
                                <Circle size={16} />
                              )}
                            </span>

                            <div className="flex-1 min-w-0">
                              <p className="truncate">{lesson.title}</p>
                              <span className="text-[10px] font-mono text-slate-400">{lesson.duration}</span>
                            </div>

                            {isCurrent && <PlayCircle size={14} className="text-indigo-500 shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <CertificateModal 
          course={{ ...course, enrollment }}
          onClose={() => setShowCertificateModal(false)}
        />
      )}
    </div>
  );
};
