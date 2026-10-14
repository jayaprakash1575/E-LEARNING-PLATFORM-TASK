import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Check, 
  ArrowRight, 
  Sparkles, 
  UserCheck 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loginAsDemo } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = login(email, password);
      setIsSubmitting(false);
      if (res.success) {
        addToast(`Namaste, ${res.user?.name || email.split('@')[0]}!`, 'success');
        navigate('/my-learning');
      } else {
        setErrorMessage(res.error || 'Authentication failed. Please check credentials.');
      }
    }, 350);
  };

  const handleDemoStudent = () => {
    loginAsDemo('student');
    addToast('Logged in as Student Demo (Karthik Subramanian)', 'success');
    navigate('/my-learning');
  };

  const handleDemoInstructor = () => {
    loginAsDemo('instructor');
    addToast('Logged in as Instructor Demo (Prof. R. Ananthakrishnan)', 'success');
    navigate('/my-learning');
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 overflow-hidden">
      {/* Background image with glass overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 dark:opacity-20 scale-105 pointer-events-none"
        style={{ backgroundImage: `url('/assets/tech_campus_bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-radial from-transparent via-slate-950/70 to-slate-950 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 rounded-3xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Left Brand Panel */}
        <div className="relative md:col-span-5 bg-gradient-to-br from-indigo-900/95 via-indigo-800/95 to-purple-900/95 p-8 sm:p-10 text-white flex flex-col justify-between overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
            style={{ backgroundImage: `url('/assets/cyber_mesh_bg.jpg')` }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                <span className="font-black text-base">JP</span>
              </div>
              <span className="font-extrabold text-2xl tracking-tight">JP Academy</span>
            </div>

            <h2 className="text-2xl font-extrabold leading-snug">
              Elevate your tech career to ₹40+ LPA.
            </h2>
            <p className="text-xs text-indigo-100 mt-3 leading-relaxed">
              Join 52,000+ engineers from IIT Madras, IISc, NIT Surathkal, and top South Indian tech hubs mastering production systems at scale.
            </p>

            <ul className="flex flex-col gap-3 my-8 text-xs text-indigo-50">
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Check size={12} />
                </div>
                <span>Bengaluru & Chennai tech architecture labs</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Check size={12} />
                </div>
                <span>Timestamped study notes & interactive quizzes</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Check size={12} />
                </div>
                <span>Verified credentials recognized by recruiters</span>
              </li>
            </ul>
          </div>

          <p className="relative z-10 text-[11px] text-indigo-200 italic border-t border-white/20 pt-4">
            "The gold standard for scaling to staff engineer in Bengaluru." — Freshworks Lead Architect
          </p>
        </div>

        {/* Right Form Panel */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Sign In</h2>
            <p className="text-xs text-slate-500 mt-1">Access your enrolled masterclasses and certificates.</p>
          </div>

          {/* 1-Click Demo Buttons */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 mb-6">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              ⚡ 1-Click Reviewer Demo Login
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button 
                type="button" 
                onClick={handleDemoStudent}
                className="py-2 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <UserCheck size={14} className="text-indigo-500" /> Karthik (Student)
              </button>
              <button 
                type="button" 
                onClick={handleDemoInstructor}
                className="py-2 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <Sparkles size={14} className="text-amber-500" /> Prof. Ananth (Mentor)
              </button>
            </div>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 mb-4">
              <AlertCircle size={15} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5" htmlFor="login-email">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                required
                placeholder="karthik.subramanian@iitm.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300" htmlFor="login-pass">
                  Password
                </label>
                <button 
                  type="button" 
                  onClick={() => alert("Use the 1-Click Demo buttons above or enter any password!")}
                  className="text-[11px] text-indigo-500 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative flex items-center">
                <input
                  id="login-pass"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  aria-label="Toggle password"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? "Authenticating..." : "Sign In to Dashboard"} <ArrowRight size={14} />
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-6">
            New to JP Academy? <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Create a free account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
