
import React from 'react';
import { SunIcon, MoonIcon } from './icons';

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
      aria-label="Toggle theme"
    >
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
