import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_COURSES } from '../data/coursesData';
import { useToast } from './ToastContext';

const CourseContext = createContext();

const INITIAL_ENROLLMENTS = {
  "course-1": {
    enrolledAt: "2026-03-10",
    completedLessons: ["l1", "l2", "l3"],
    completedQuizzes: { "q1": 100 },
    notes: [
      {
        id: "note-1",
        lessonId: "l1",
        text: "React 19 Server Components significantly boost initial load speed on Indian 4G/5G mobile networks by cutting JS bundle weight.",
        timestamp: "04:30",
        createdAt: "2 days ago"
      },
      {
        id: "note-2",
        lessonId: "l2",
        text: "Always verify Razorpay webhook signatures with crypto.createHmac before crediting orders to avoid replay exploits.",
        timestamp: "12:15",
        createdAt: "Yesterday"
      }
    ],
    lastLessonId: "l3",
    progress: 33
  },
  "course-5": {
    enrolledAt: "2026-02-15",
    completedLessons: ["l5-1", "l5-2"],
    completedQuizzes: { "q5-1": 100 },
    notes: [
      {
        id: "note-3",
        lessonId: "l5-1",
        text: "Swiggy order route optimization: Apache Parquet column storage saves over 70% RAM during peak dinner order surges.",
        timestamp: "08:12",
        createdAt: "1 month ago"
      }
    ],
    lastLessonId: "l5-2",
    progress: 100,
    completedAt: "2026-03-01",
    certificateId: "SHIKSHA-SETU-IN-2026-9842"
  }
};

const INITIAL_WISHLIST = ["course-2", "course-4"];

export const CourseProvider = ({ children }) => {
  const { addToast } = useToast();
  const [courses] = useState(INITIAL_COURSES);

  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('jp_enrollments') || localStorage.getItem('shikshasetu_enrollments');
      if (saved) return JSON.parse(saved);
      return INITIAL_ENROLLMENTS;
    } catch {
      return INITIAL_ENROLLMENTS;
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('jp_wishlist') || localStorage.getItem('shikshasetu_wishlist');
      if (saved) return JSON.parse(saved);
      return INITIAL_WISHLIST;
    } catch {
      return INITIAL_WISHLIST;
    }
  });

  useEffect(() => {
    localStorage.setItem('jp_enrollments', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem('jp_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const getTotalLessonsCount = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return 1;
    let count = 0;
    course.modules?.forEach(m => {
      count += m.lessons?.length || 0;
    });
    return count || 1;
  };

  const isEnrolled = (courseId) => {
    return Boolean(enrolledCourses[courseId]);
  };

  const getCourseEnrollment = (courseId) => {
    return enrolledCourses[courseId] || null;
  };

  const getCourseProgress = (courseId) => {
    const enrollment = enrolledCourses[courseId];
    if (!enrollment) return 0;
    const total = getTotalLessonsCount(courseId);
    const completed = enrollment.completedLessons?.length || 0;
    const calculated = Math.round((completed / total) * 100);
    return Math.min(100, calculated);
  };

  const enrollCourse = (courseId) => {
    if (enrolledCourses[courseId]) {
      addToast("You are already enrolled! Resuming classroom...", "info");
      return true;
    }

    const course = courses.find(c => c.id === courseId);
    const firstLessonId = course?.modules?.[0]?.lessons?.[0]?.id || "";

    const newEnrollment = {
      enrolledAt: new Date().toISOString().split('T')[0],
      completedLessons: [],
      completedQuizzes: {},
      notes: [],
      lastLessonId: firstLessonId,
      progress: 0
    };

    setEnrolledCourses(prev => ({
      ...prev,
      [courseId]: newEnrollment
    }));

    addToast(`🎉 Enrolled in "${course?.title || 'Course'}"! Welcome aboard!`, 'success');
    return true;
  };

  const markLessonComplete = (courseId, lessonId) => {
    setEnrolledCourses(prev => {
      const current = prev[courseId] || {
        enrolledAt: new Date().toISOString().split('T')[0],
        completedLessons: [],
        completedQuizzes: {},
        notes: [],
        lastLessonId: lessonId,
        progress: 0
      };

      const completed = new Set(current.completedLessons || []);
      completed.add(lessonId);
      const updatedLessons = Array.from(completed);
      const total = getTotalLessonsCount(courseId);
      const newProgress = Math.min(100, Math.round((updatedLessons.length / total) * 100));

      const isJustCompleted = newProgress === 100 && (current.progress < 100);
      const certificateId = current.certificateId || (isJustCompleted ? `SHIKSHA-IN-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}` : undefined);

      return {
        ...prev,
        [courseId]: {
          ...current,
          completedLessons: updatedLessons,
          lastLessonId: lessonId,
          progress: newProgress,
          completedAt: isJustCompleted ? new Date().toISOString().split('T')[0] : current.completedAt,
          certificateId
        }
      };
    });

    addToast("✨ Lesson marked complete! (+50 XP)", "success");
  };

  const markLessonIncomplete = (courseId, lessonId) => {
    setEnrolledCourses(prev => {
      const current = prev[courseId];
      if (!current) return prev;
      const updatedLessons = (current.completedLessons || []).filter(id => id !== lessonId);
      const total = getTotalLessonsCount(courseId);
      const newProgress = Math.min(100, Math.round((updatedLessons.length / total) * 100));

      return {
        ...prev,
        [courseId]: {
          ...current,
          completedLessons: updatedLessons,
          progress: newProgress
        }
      };
    });
  };

  const toggleLessonCompletion = (courseId, lessonId) => {
    const current = enrolledCourses[courseId];
    if (current?.completedLessons?.includes(lessonId)) {
      markLessonIncomplete(courseId, lessonId);
    } else {
      markLessonComplete(courseId, lessonId);
    }
  };

  const saveQuizResult = (courseId, quizId, score) => {
    setEnrolledCourses(prev => {
      const current = prev[courseId] || { completedQuizzes: {} };
      return {
        ...prev,
        [courseId]: {
          ...current,
          completedQuizzes: {
            ...current.completedQuizzes,
            [quizId]: score
          }
        }
      };
    });
    addToast(`🏆 Quiz score saved: ${score}%!`, "success");
  };

  const addNote = (courseId, lessonId, text, timestamp = "00:00") => {
    const noteItem = {
      id: "note-" + Date.now(),
      lessonId,
      text,
      timestamp,
      createdAt: "Just now"
    };

    setEnrolledCourses(prev => {
      const current = prev[courseId] || { notes: [] };
      return {
        ...prev,
        [courseId]: {
          ...current,
          notes: [noteItem, ...(current.notes || [])]
        }
      };
    });

    addToast("📝 Note saved to lesson notebook!", "success");
    return noteItem;
  };

  const deleteNote = (courseId, noteId) => {
    setEnrolledCourses(prev => {
      const current = prev[courseId];
      if (!current) return prev;
      return {
        ...prev,
        [courseId]: {
          ...current,
          notes: (current.notes || []).filter(n => n.id !== noteId)
        }
      };
    });
    addToast("Note removed.", "info");
  };

  const toggleWishlist = (courseId) => {
    setWishlist(prev => {
      const exists = prev.includes(courseId);
      if (exists) {
        addToast("Removed from wishlist", "info");
        return prev.filter(id => id !== courseId);
      } else {
        addToast("❤️ Added to saved wishlist!", "success");
        return [...prev, courseId];
      }
    });
  };

  const isWishlisted = (courseId) => {
    return wishlist.includes(courseId);
  };

  const getEnrolledCoursesList = () => {
    return courses
      .filter(c => !!enrolledCourses[c.id])
      .map(c => ({
        ...c,
        enrollment: enrolledCourses[c.id],
        realProgress: getCourseProgress(c.id)
      }));
  };

  const getCompletedCoursesList = () => {
    return getEnrolledCoursesList().filter(c => c.realProgress === 100);
  };

  const getOverallStats = () => {
    const enrolledList = getEnrolledCoursesList();
    const completedList = enrolledList.filter(c => c.realProgress === 100);
    const inProgressList = enrolledList.filter(c => c.realProgress < 100);

    const totalHoursLearned = enrolledList.reduce((acc, c) => {
      const pct = (c.realProgress || 0) / 100;
      return acc + Math.round((c.totalDurationHours || 20) * pct);
    }, 0);

    let totalNotes = 0;
    Object.values(enrolledCourses).forEach(e => {
      totalNotes += e.notes?.length || 0;
    });

    return {
      totalEnrolled: enrolledList.length,
      completedCount: completedList.length,
      inProgressCount: inProgressList.length,
      totalHoursLearned: Math.max(14, totalHoursLearned),
      certificatesCount: completedList.length,
      totalNotesCount: totalNotes,
      streakDays: 8
    };
  };

  return (
    <CourseContext.Provider value={{
      courses,
      enrolledCourses,
      wishlist,
      isEnrolled,
      getCourseEnrollment,
      getCourseProgress,
      enrollCourse,
      markLessonComplete,
      markLessonIncomplete,
      toggleLessonCompletion,
      saveQuizResult,
      addNote,
      deleteNote,
      toggleWishlist,
      isWishlisted,
      getEnrolledCoursesList,
      getCompletedCoursesList,
      getOverallStats
    }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    return {
      courses: [],
      enrolledCourses: {},
      wishlist: [],
      isEnrolled: () => false,
      getCourseEnrollment: () => null,
      getCourseProgress: () => 0,
      enrollCourse: () => false,
      markLessonComplete: () => {},
      markLessonIncomplete: () => {},
      toggleLessonCompletion: () => {},
      saveQuizResult: () => {},
      addNote: () => {},
      deleteNote: () => {},
      toggleWishlist: () => {},
      isWishlisted: () => false,
      getEnrolledCoursesList: () => [],
      getCompletedCoursesList: () => [],
      getOverallStats: () => ({
        totalEnrolled: 0,
        completedCount: 0,
        inProgressCount: 0,
        totalHoursLearned: 0,
        certificatesCount: 0,
        totalNotesCount: 0,
        streakDays: 8
      })
    };
  }
  return context;
};
