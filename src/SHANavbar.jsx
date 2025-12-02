// src/SHANavbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  ChevronDown,
  LogOut,
  Menu,
  X,
  BookOpen,
  FileText,
  Wrench,
  Globe,
  PieChart,
  BarChart3,
  ClipboardList
} from "lucide-react";

// SHA Brand Colors
const colors = {
  blue: "#0066B3",
  green: "#8BC53F",
  darkBlue: "#003D6B",
  purple: "#9D4EDD",
  cyan: "#00D4FF",
  orange: "#FF6B35"
};

export default function SHANavbar({ userProfile }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('showWelcome');
    sessionStorage.removeItem('welcomeName');
    navigate('/');
  };

  // Check if current path is active
  const isActive = (path) => location.pathname === path;

  const toolsItems = [
    { name: "Industry Insights", icon: <Globe className="w-4 h-4" />, color: colors.blue, link: "/insights" },
    { name: "Resources", icon: <FileText className="w-4 h-4" />, color: colors.green, link: "/resources" },
    { name: "Training Links", icon: <BookOpen className="w-4 h-4" />, color: colors.purple, link: "/SHA-training-links" },
    { name: "Claims Dashboard", icon: <PieChart className="w-4 h-4" />, color: colors.cyan, link: "/claims-dashboard" },
    { name: "VBA Claims Plot", icon: <BarChart3 className="w-4 h-4" />, color: colors.orange, link: "/vba-claims" }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 py-3">
        {/* Left Side - Navigation Links */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-1">
            <Link 
              to="/SHADashboard" 
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition font-medium ${
                isActive('/SHADashboard') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="w-4 h-4" /> Home
            </Link>

            {/* Tools Dropdown */}
            <div 
              className="relative" 
              onMouseEnter={() => setToolsOpen(true)} 
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button 
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-700 hover:bg-gray-100 transition font-medium"
              >
                <Wrench className="w-4 h-4" /> Tools 
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div 
                className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                  toolsOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
                }`}
              >
                <div className="p-2">
                  {toolsItems.map((item, i) => (
                    <Link 
                      key={i} 
                      to={item.link}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition group"
                    >
                      <div 
                        className="p-2 rounded-lg transition-all group-hover:scale-110" 
                        style={{ background: `${item.color}15`, color: item.color }}
                      >
                        {item.icon}
                      </div>
                      <span className="text-gray-700 font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link 
              to="/SHAmodules" 
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition font-medium ${
                isActive('/SHAmodules') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ClipboardList className="w-4 h-4" /> Training Modules
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="lg:hidden p-2.5 rounded-xl text-gray-700 hover:bg-gray-100"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Center - SHA Logo (Hidden on mobile, shown on desktop) */}
        <Link to="/SHADashboard" className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex items-center gap-3">
          <div className="relative group">
            <div 
              className="absolute -inset-1 rounded-xl opacity-75 blur transition group-hover:opacity-100"
              style={{ background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})` }} 
            />
            <div 
              className="relative w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-lg"
              style={{ background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})` }}
            >
              SHA
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-lg leading-tight text-gray-800">Actuarial Hub</div>
            <div className="text-xs text-gray-500">Professional Training</div>
          </div>
        </Link>

        {/* Right Side - User/Logout */}
        <div className="flex items-center gap-3">
          {user && user.name ? (
            <>
              <div className="hidden md:flex items-center gap-3 mr-2">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: `linear-gradient(135deg, ${colors.purple}, ${colors.blue})` }}
                >
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-800">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition font-medium"
              >
                <LogOut className="w-4 h-4" /> 
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/" 
                className="px-4 py-2.5 rounded-xl text-gray-700 hover:bg-gray-100 transition font-medium"
              >
                Login
              </Link>
              <Link 
                to="/" 
                className="px-5 py-2.5 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})`,
                  boxShadow: `0 4px 20px ${colors.blue}50`
                }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${mobileOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="bg-white border-t border-gray-100 py-4 px-6 space-y-2">
          {/* Mobile Logo */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-md"
              style={{ background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})` }}>
              SHA
            </div>
            <div>
              <div className="font-bold text-gray-800">Actuarial Hub</div>
              <div className="text-xs text-gray-500">Professional Training</div>
            </div>
          </div>

          <Link 
            to="/SHADashboard" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700"
            onClick={() => setMobileOpen(false)}
          >
            <Home className="w-5 h-5" style={{ color: colors.blue }} /> Home
          </Link>
          
          <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Tools</div>
          
          {toolsItems.map((item, i) => (
            <Link 
              key={i} 
              to={item.link}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700"
              onClick={() => setMobileOpen(false)}
            >
              <span style={{ color: item.color }}>{item.icon}</span> {item.name}
            </Link>
          ))}
          
          <Link 
            to="/SHAmodules" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700"
            onClick={() => setMobileOpen(false)}
          >
            <ClipboardList className="w-5 h-5" style={{ color: colors.green }} /> Training Modules
          </Link>
          
          {/* Auth Buttons for Mobile */}
          {user && user.name ? (
            <>
              <div className="px-4 py-3">
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ background: `linear-gradient(135deg, ${colors.purple}, ${colors.blue})` }}
                  >
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-800">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </div>
                <button 
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 w-full"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-2 px-4 pt-4 border-t border-gray-100">
              <Link 
                to="/" 
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 w-full"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/" 
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-white w-full"
                style={{
                  background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})`
                }}
                onClick={() => setMobileOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}