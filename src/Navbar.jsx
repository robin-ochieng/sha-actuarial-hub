// src/Navbar.jsx
import React, { useState, useEffect } from "react";
import { FaHome, FaTasks, FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import ResourcesDropdown from "./ResourcesDropdown";

export default function Navbar({ userProfile }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Add background when scrolled past 50px
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Check initial scroll position
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check if current path is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-gray-900/80 backdrop-blur-xl border-b border-white/10 shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          {/* Home Link */}
          <Link
            to="/"
            aria-label="Home"
            className={`flex items-center gap-2 transition ${
              isActive('/') 
                ? "text-[#00E5FF]" 
                : isScrolled 
                  ? "text-white hover:text-[#00E5FF]" 
                  : "text-gray-200 hover:text-[#00E5FF]"
            }`}
          >
            <FaHome className="w-5 h-5" />
          </Link>

          {/* Resources Dropdown */}
          <div className="hidden md:inline-flex items-center gap-2">
            <ResourcesDropdown isScrolled={isScrolled} isActive={isActive('/resources')} />
          </div>

          {/* Modules Link */}
          <Link
            to="/modules"
            className={`hidden md:inline-flex items-center gap-2 transition ${
              isActive('/modules') 
                ? "text-[#00E5FF]" 
                : isScrolled 
                  ? "text-white hover:text-[#00E5FF]" 
                  : "text-gray-300 hover:text-[#00E5FF]"
            }`}
          >
            <FaTasks /> <span className="ml-1">Modules</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {userProfile ? (
            userProfile
          ) : (
            <button 
              className={`transition ${
                isScrolled 
                  ? "text-white hover:text-[#00E5FF]" 
                  : "text-gray-300 hover:text-[#00E5FF]"
              }`}
            >
              <FaUserCircle className="w-7 h-7" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}