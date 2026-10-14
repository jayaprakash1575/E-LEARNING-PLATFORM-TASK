import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Heart, 
  BookOpen, 
  Award, 
  LogOut, 
  Menu, 
  X, 
  Flame, 
  Compass, 
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourse } from '../../context/CourseContext';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { wishlist, getEnrolledCoursesList } = useCourse();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const enrolledCount = getEnrolledCoursesList().length;
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/85 dark:bg-slate-900/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
            <span className="font-black text-base tracking-tight">JP</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              JP<span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 bg-clip-text text-transparent font-bold text-lg ml-1">Academy</span>
            </span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              HQ
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => `text-sm font-semibold transition-colors flex items-center gap-1.5 py-1 ${
              isActive ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-500' : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}
          >
            Home
          </NavLink>

          <NavLink 
            to="/courses" 
            className={({ isActive }) => `text-sm font-semibold transition-colors flex items-center gap-1.5 py-1 ${
              isActive ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-500' : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}
          >
            <Compass size={16} />
            Explore Courses
          </NavLink>

          <NavLink 
            to="/my-learning" 
            className={({ isActive }) => `text-sm font-semibold transition-colors flex items-center gap-1.5 py-1 ${
              isActive ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-500' : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}
          >
            <BookOpen size={16} />
            My Learning
            {enrolledCount > 0 && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-500 text-white">
                {enrolledCount}
              </span>
            )}
          </NavLink>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Wishlist Button */}
          <Link 
            to="/my-learning?tab=wishlist" 
            className="relative w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart size={18} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center shadow-md">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-slate-700 transition-transform active:rotate-45"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User Auth */}
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(prev => !prev)}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all cursor-pointer"
                aria-expanded={dropdownOpen}
                aria-label="User Profile"
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/50" 
                />
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 max-w-[90px] truncate hidden sm:inline">
                  {user.name.split(' ')[0]}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                  <Flame size={12} className="fill-amber-500 text-amber-500" />
                  {user.streakDays}d
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-bold text-sm text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    <p className="text-[11px] font-medium text-indigo-500 mt-1">📍 {user.city || 'Bengaluru, India'}</p>
                  </div>

                  <Link 
                    to="/my-learning" 
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <LayoutDashboard size={16} className="text-indigo-500" />
                    Student Dashboard
                  </Link>

                  <Link 
                    to="/my-learning?tab=completed" 
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Award size={16} className="text-amber-500" />
                    Certificates of Completion
                  </Link>

                  <Link 
                    to="/my-learning?tab=wishlist" 
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Heart size={16} className="text-rose-500" />
                    Wishlist ({wishlistCount})
                  </Link>

                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors text-left w-full mt-1 border-t border-slate-100 dark:border-slate-800"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-sm font-semibold px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-indigo-600 transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="text-sm font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-500/25 transition-all hover:scale-105">
                Join Free
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed right-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <span className="font-extrabold text-xl text-slate-900 dark:text-white">JP Academy</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white">
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                Home
              </Link>
              <Link to="/courses" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                Explore Courses
              </Link>
              <Link to="/my-learning" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between">
                <span>My Learning</span>
                {enrolledCount > 0 && <span className="bg-indigo-500 text-white text-xs px-2 py-0.5 rounded-full">{enrolledCount}</span>}
              </Link>
              <Link to="/my-learning?tab=wishlist" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between">
                <span>Wishlist</span>
                {wishlistCount > 0 && <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">{wishlistCount}</span>}
              </Link>
            </nav>

            <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              {isAuthenticated ? (
                <button onClick={handleLogout} className="w-full py-2.5 px-4 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold text-sm">
                  Sign Out
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full py-2.5 px-4 text-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm">
                    Sign In
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full py-2.5 px-4 text-center rounded-xl bg-indigo-600 text-white font-bold text-sm">
                    Join Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
