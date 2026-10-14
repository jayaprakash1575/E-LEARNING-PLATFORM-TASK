import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Check, 
  ArrowRight 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Bengaluru, Karnataka');
  const [password, setPassword] = useState('');
  const [learningGoal, setLearningGoal] = useState('Full-Stack Web (Flipkart Scale)');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score++;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass) && pass.length >= 8) score++;
    return Math.max(1, score);
  };

  const strength = calculateStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim() || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = register({ 
        name: name.trim(), 
        email: email.trim(), 
        password, 
        learningGoal,
        city
      });
      setIsSubmitting(false);

      if (res.success) {
        addToast(`🎉 Account created! Welcome to JP Academy, ${name}!`, 'success');
        navigate('/courses');
      } else {
        setErrorMessage(res.error || 'Failed to create account.');
      }
    }, 400);
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 overflow-hidden">
      {/* Background image overlay */}
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
              Begin your South Indian Tech Mastery.
            </h2>
            <p className="text-xs text-indigo-100 mt-3 leading-relaxed">
              Equipping software engineers and researchers across Bengaluru, Chennai, and Hyderabad with production architecture roadmaps.
            </p>

            <ul className="flex flex-col gap-3 my-8 text-xs text-indigo-50">
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Check size={12} />
                </div>
                <span>Free intro courses & interactive quizzes</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Check size={12} />
                </div>
                <span>Curated by IISc, IIT Madras alums & Principal Architects</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Check size={12} />
                </div>
                <span>Official certificates shareable on LinkedIn</span>
              </li>
            </ul>
          </div>

          <p className="relative z-10 text-[11px] text-indigo-200 border-t border-white/20 pt-4">
            Free membership • Instant access
          </p>
        </div>

        {/* Right Form Panel */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Create Account</h2>
            <p className="text-xs text-slate-500 mt-1">Start tracking your masterclass progress today.</p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 mb-4">
              <AlertCircle size={15} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1" htmlFor="reg-name">
                Full Name
              </label>
              <input
                id="reg-name"
                type="text"
                required
                placeholder="e.g. Karthik Subramanian"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1" htmlFor="reg-email">
                Email Address
              </label>
              <input
                id="reg-email"
                type="email"
                required
                placeholder="karthik.subramanian@iitm.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1" htmlFor="reg-city">
                  Location (India)
                </label>
                <select
                  id="reg-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="Bengaluru, Karnataka">Bengaluru, Karnataka</option>
                  <option value="Hyderabad, Telangana">Hyderabad, Telangana</option>
                  <option value="Pune, Maharashtra">Pune, Maharashtra</option>
                  <option value="Gurugram, Haryana">Gurugram, Haryana</option>
                  <option value="Noida, Uttar Pradesh">Noida, Uttar Pradesh</option>
                  <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                  <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
                  <option value="Delhi, NCR">Delhi, NCR</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1" htmlFor="reg-track">
                  Primary Tech Track
                </label>
                <select
                  id="reg-track"
                  value={learningGoal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="Full-Stack Web (Flipkart Scale)">Full-Stack (Flipkart Scale)</option>
                  <option value="Generative AI & LLM Agents">Generative AI & LLMs</option>
                  <option value="DevOps (Kubernetes & AWS)">DevOps (AWS Mumbai)</option>
                  <option value="FinTech UI/UX (CRED Style)">FinTech UI/UX (CRED Style)</option>
                  <option value="Banking & UPI Cyber Security">Banking & UPI Cyber Security</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1" htmlFor="reg-pass">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  id="reg-pass"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="At least 6 characters"
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

              {password && (
                <div className="mt-2 flex flex-col gap-1">
                  <div className="flex gap-1.5 h-1">
                    <div className={`flex-1 rounded-full ${strength >= 1 ? (strength === 1 ? 'bg-rose-500' : strength === 2 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-slate-200 dark:bg-slate-700'}`} />
                    <div className={`flex-1 rounded-full ${strength >= 2 ? (strength === 2 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-slate-200 dark:bg-slate-700'}`} />
                    <div className={`flex-1 rounded-full ${strength >= 3 ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                  </div>
                  <span className={`text-[10px] font-bold ${strength === 1 ? 'text-rose-500' : strength === 2 ? 'text-amber-500' : 'text-emerald-500'}`}>
                    {strength === 1 ? 'Weak' : strength === 2 ? 'Moderate' : 'Strong password'}
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? "Creating Account..." : "Create Free Student Account"} <ArrowRight size={14} />
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-6">
            Already registered? <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
