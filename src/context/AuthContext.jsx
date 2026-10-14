import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEMO_STUDENT = {
  id: "user-101",
  name: "Karthik Subramanian",
  email: "karthik.subramanian@iitm.ac.in",
  role: "student",
  city: "Chennai, Tamil Nadu",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  streakDays: 8,
  xp: 1850,
  level: "Pro Scholar",
  learningGoal: "Full-Stack Web & AI Engineering",
  joinedDate: "October 2025"
};

const DEMO_INSTRUCTOR = {
  id: "user-102",
  name: "Prof. R. Ananthakrishnan",
  email: "ananthakrishnan@jp.edu",
  role: "instructor",
  city: "Bengaluru, Karnataka",
  avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
  streakDays: 45,
  xp: 9400,
  level: "Master Mentor",
  learningGoal: "System Architecture & High Concurrency",
  joinedDate: "August 2024"
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('jp_user') || localStorage.getItem('shikshasetu_user');
      if (saved) return JSON.parse(saved);
      return DEMO_STUDENT;
    } catch {
      return DEMO_STUDENT;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('jp_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('jp_user');
      localStorage.removeItem('shikshasetu_user');
    }
  }, [user]);

  const login = (email, password) => {
    if (!email || !password) {
      return { success: false, error: "Please enter both email and password." };
    }
    
    const accounts = JSON.parse(localStorage.getItem('jp_registered_users') || localStorage.getItem('shikshasetu_registered_users') || '[]');
    const found = accounts.find(a => a.email.toLowerCase() === email.toLowerCase());

    if (found) {
      if (found.password === password) {
        const loggedUser = {
          id: found.id,
          name: found.name,
          email: found.email,
          role: found.role || 'student',
          city: found.city || 'Chennai, Tamil Nadu',
          avatar: found.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
          streakDays: 1,
          xp: 150,
          level: "Scholar",
          learningGoal: found.learningGoal || "Full-Stack Development",
          joinedDate: "October 2026"
        };
        setUser(loggedUser);
        return { success: true, user: loggedUser };
      }
      return { success: false, error: "Invalid password. Try again or use 1-Click Demo Login." };
    }

    if (email.toLowerCase().includes('ananth') || email.toLowerCase().includes('rajesh') || email.toLowerCase().includes('instructor')) {
      setUser(DEMO_INSTRUCTOR);
      return { success: true, user: DEMO_INSTRUCTOR };
    }

    const formattedName = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const fallbackUser = {
      ...DEMO_STUDENT,
      email: email,
      name: formattedName
    };
    setUser(fallbackUser);
    return { success: true, user: fallbackUser };
  };

  const register = ({ name, email, password, learningGoal, city = "Bengaluru, Karnataka" }) => {
    if (!name || !email || !password) {
      return { success: false, error: "Please fill all required fields." };
    }

    const accounts = JSON.parse(localStorage.getItem('jp_registered_users') || localStorage.getItem('shikshasetu_registered_users') || '[]');
    if (accounts.some(a => a.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists." };
    }

    const newUser = {
      id: "user-" + Date.now(),
      name,
      email,
      password,
      city,
      role: 'student',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      streakDays: 1,
      xp: 250,
      level: "Scholar",
      learningGoal: learningGoal || "Full-Stack Development",
      joinedDate: "October 2026"
    };

    accounts.push(newUser);
    localStorage.setItem('jp_registered_users', JSON.stringify(accounts));
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const loginAsDemo = (type = 'student') => {
    const demo = type === 'instructor' ? DEMO_INSTRUCTOR : DEMO_STUDENT;
    setUser(demo);
    return demo;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      loginAsDemo,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
