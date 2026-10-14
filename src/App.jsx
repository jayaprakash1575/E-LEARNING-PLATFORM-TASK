import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailsPage } from './pages/CourseDetailsPage';
import { ClassroomPage } from './pages/ClassroomPage';
import { MyLearningPage } from './pages/MyLearningPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { WidescreenRails } from './components/common/WidescreenRails';

// Scroll restoration helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout wrapper that excludes Navbar & Footer in the focused classroom player
const AppLayout = () => {
  const location = useLocation();
  const isClassroom = location.pathname.startsWith('/learn/');

  return (
    <div className="relative flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors overflow-x-hidden">
      {/* 1. Global Full-Bleed Cyber Grid Blueprint Pattern */}
      <div className="fixed inset-0 bg-cyber-grid pointer-events-none z-0" />

      {/* 2. Global subtle tech background image */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-[0.05] dark:opacity-[0.09] pointer-events-none z-0 scale-105"
        style={{ backgroundImage: `url('/assets/cyber_mesh_bg.jpg')` }}
      />

      {/* 3. Left Side Glowing Ambient Aurora & Laser Rail (Eliminates Side Blank Void) */}
      <div className="fixed -left-10 top-0 bottom-0 w-[380px] bg-gradient-to-r from-indigo-600/20 via-purple-600/10 to-transparent pointer-events-none z-0 blur-3xl" />
      <div className="hidden 2xl:block fixed left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-indigo-500/10 to-transparent pointer-events-none z-0 border-r border-indigo-500/15" />
      <div className="hidden 2xl:block fixed left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent pointer-events-none z-0" />

      {/* 4. Right Side Glowing Ambient Aurora & Laser Rail (Eliminates Side Blank Void) */}
      <div className="fixed -right-10 top-0 bottom-0 w-[380px] bg-gradient-to-l from-purple-600/20 via-cyan-500/10 to-transparent pointer-events-none z-0 blur-3xl" />
      <div className="hidden 2xl:block fixed right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-purple-500/10 to-transparent pointer-events-none z-0 border-l border-purple-500/15" />
      <div className="hidden 2xl:block fixed right-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent pointer-events-none z-0" />

      {/* 5. Widescreen Interactive Cockpit HUD & Live Activity Rails */}
      {!isClassroom && <WidescreenRails />}

      <ScrollToTop />
      {!isClassroom && <Navbar />}
      <main className="relative z-10" style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailsPage />} />
          <Route path="/learn/:id" element={<ClassroomPage />} />
          <Route path="/my-learning" element={<MyLearningPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isClassroom && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CourseProvider>
            <Router>
              <AppLayout />
            </Router>
          </CourseProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
