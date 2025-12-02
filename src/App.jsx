import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SHANavbar from "./SHANavbar";
import HomePage from "./HomePage";
import SHADashboard from "./SHADashboard";
import SHALandingpage from "./SHALandingpage";
import SHAAuthPage from "./components/Auth/SHAAuthPage"; // ADD THIS IMPORT
import TrainingLinks from "./TrainingLinks";
import SHATrainingLinks from "./SHATrainingLinks";
import Modules from "./Modules";
import SHAModules from "./SHAModules";
import Module1 from "./Module1";
import UserProfile from "./components/UserProfile";
import AdminDashboard from "./components/Admin/AdminDashboard";
import { TutorialProvider } from "./contexts/TutorialContext";
import ModulesTutorial from "./components/Tutorial/ModulesTutorial";
import Module1Tutorial from "./components/Tutorial/Module1Tutorial";
import ThemeToggle from "./components/ThemeToggle";
import WelcomeToast from "./components/WelcomeToast";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('user');
        setUser(null);
      }
    }
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    setLoading(false);
  }, []);

  const handleAuthSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('showWelcome');
    sessionStorage.removeItem('welcomeName');
    setUser(null);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const isAdmin = user && user.role === 'admin';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#001529' }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-white text-2xl mx-auto mb-4 animate-pulse"
            style={{ background: 'linear-gradient(135deg, #0066B3, #8BC53F)' }}>
            SHA
          </div>
          <div className="text-white text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <TutorialProvider>
      <Router>
        <div className="min-h-screen bg-var(--bg-primary) text-var(--text-primary) transition-colors duration-300">
          {/* Welcome Toast - Shows after login */}
          {/* <WelcomeToast /> */}
          
          {user && <ThemeToggle theme={theme} toggleTheme={toggleTheme} />}
          
          <Routes>
            {/* Landing Page - Public access */}
            <Route path="/" element={<SHALandingpage />} />

            {/* Auth Page - ADD THIS ROUTE */}
            <Route 
              path="/SHAAuth" 
              element={
                user ? <Navigate to="/SHADashboard" replace /> : <SHAAuthPage onAuthSuccess={handleAuthSuccess} />
              } 
            />

            {/* SHA Dashboard - Requires login */}
            <Route
              path="/SHADashboard"
              element={
                user ? <SHADashboard /> : <Navigate to="/SHAAuth" replace />
              }
            />

            {/* Kenbright Dashboard (Legacy) - Updated to use SHANavbar */}
            <Route
              path="/dashboard"
              element={
                user ? (
                  <>
                    <SHANavbar />
                    <HomePage />
                  </>
                ) : <Navigate to="/SHAAuth" replace />
              }
            />

            {/* Modules - Updated to use SHANavbar */}
            <Route
              path="/modules"
              element={
                user ? (
                  <>
                    <SHANavbar />
                    <Modules />
                    <ModulesTutorial />
                  </>
                ) : <Navigate to="/SHAAuth" replace />
              }
            />

            {/* SHA Modules */}
            <Route
              path="/SHAmodules"
              element={
                user ? <SHAModules /> : <Navigate to="/SHAAuth" replace />
              }
            />

            {/* Training Links - Updated to use SHANavbar */}
            <Route
              path="/training-links"
              element={
                user ? (
                  <>
                    <SHANavbar />
                    <TrainingLinks />
                  </>
                ) : <Navigate to="/SHAAuth" replace />
              }
            />

            {/* SHA Training Links */}
            <Route
              path="/SHA-training-links"
              element={
                user ? <SHATrainingLinks /> : <Navigate to="/SHAAuth" replace />
              }
            />

            {/* Admin Dashboard - Updated to use SHANavbar */}
            <Route
              path="/admin"
              element={
                isAdmin ? (
                  <>
                    <SHANavbar />
                    <AdminDashboard />
                  </>
                ) : <Navigate to="/SHADashboard" replace />
              }
            />

            {/* Module 1 - Updated to use SHANavbar */}
            <Route
              path="/modules/1"
              element={
                user ? (
                  <>
                    <SHANavbar />
                    <Module1 />
                    <Module1Tutorial />
                  </>
                ) : <Navigate to="/SHAAuth" replace />
              }
            />

            {/* Catch-all - redirect to landing page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </TutorialProvider>
  );
}

export default App;