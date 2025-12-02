// src/components/ThemeToggle.jsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, toggleTheme }) {
  const shaBlue = "#0066B3";
  const shaGreen = "#8BC53F";
  const shaDarkBlue = "#003D6B";

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-110"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 61, 107, 0.9), rgba(0, 51, 89, 0.8))',
        borderColor: 'rgba(255, 255, 255, 0.2)',
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-6 h-6 text-blue-300" />
      ) : (
        <Sun className="w-6 h-6 text-yellow-300" />
      )}
    </button>
  );
}