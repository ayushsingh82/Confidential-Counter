'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 w-8 h-8 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
      aria-label="Toggle theme"
    >
      {isLight ? '🌙' : '☀️'}
    </button>
  );
}

