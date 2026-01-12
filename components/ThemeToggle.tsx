'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-4 right-4 z-50 p-3 border rounded-sm transition-all ${
        isLight
          ? 'border-[#03D9DC] bg-white text-[#011623] hover:bg-[#03D9DC]/10'
          : 'border-[#CC4420] bg-zinc-900 text-white hover:bg-[#CC4420]/10'
      }`}
      aria-label="Toggle theme"
    >
      {isLight ? '🌙' : '☀️'}
    </button>
  );
}

