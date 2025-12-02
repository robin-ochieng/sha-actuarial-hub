import React, { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";

// SHA Brand Colors
const colors = {
  blue: "#0066B3",
  green: "#8BC53F",
  darkBlue: "#003D6B",
  purple: "#9D4EDD",
  cyan: "#00D4FF"
};

export default function WelcomeToast() {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if we should show welcome message
    const showWelcome = sessionStorage.getItem("showWelcome");
    const name = sessionStorage.getItem("welcomeName");

    if (showWelcome === "true" && name) {
      setUserName(name);
      setShow(true);
      
      // Clear the session storage so it doesn't show again on refresh
      sessionStorage.removeItem("showWelcome");
      sessionStorage.removeItem("welcomeName");

      // Auto-hide after 3 seconds (shorter duration)
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShow(false);
    }, 300);
  };

  if (!show) return null;

  return (
    <>
      {/* Toast - Centered at top */}
      <div 
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
          isExiting 
            ? 'opacity-0 -translate-y-4 scale-95' 
            : 'opacity-100 translate-y-0 scale-100'
        }`}
        style={{
          animation: !isExiting ? 'slideDown 0.3s ease-out' : undefined
        }}
      >
        <div 
          className="relative rounded-2xl px-6 py-4 backdrop-blur-xl border shadow-2xl flex items-center gap-4 min-w-[320px] max-w-md"
          style={{
            background: 'rgba(255, 255, 255, 0.98)',
            borderColor: `${colors.green}40`,
            boxShadow: `
              0 0 0 1px ${colors.green}20,
              0 10px 40px rgba(0, 0, 0, 0.12),
              0 0 80px ${colors.green}15
            `
          }}
        >
          {/* Gradient accent bar at top */}
          <div 
            className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
            style={{
              background: `linear-gradient(to right, ${colors.blue}, ${colors.green})`
            }}
          />

          {/* Icon */}
          <div 
            className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ 
              background: `linear-gradient(135deg, ${colors.blue}15, ${colors.green}15)`,
              border: `1.5px solid ${colors.green}30`
            }}
          >
            <Sparkles className="w-5 h-5" style={{ color: colors.green }} />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 
              className="text-base font-bold mb-0.5"
              style={{ color: colors.darkBlue }}
            >
              Welcome, {userName}!
            </h3>
            <p className="text-sm text-gray-600">
              You're all set to start learning
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1.5 rounded-lg transition-all duration-200 hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
}