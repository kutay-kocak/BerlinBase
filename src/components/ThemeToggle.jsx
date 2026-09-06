import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('berlinbase_theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('berlinbase_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isLight = theme === 'light';

  return (
    <div className="flex items-center space-x-1.5" title="Toggle Dark / Light Mode">
      {/* Switch Form Toggle */}
      <label 
        htmlFor="theme-mode-switch" 
        className="relative inline-flex items-center cursor-pointer select-none"
      >
        <input
          type="checkbox"
          id="theme-mode-switch"
          role="switch"
          aria-label="Dark and light theme switch"
          checked={isLight}
          onChange={toggleTheme}
          className="sr-only peer"
        />
        {/* Track */}
        <div className="w-14 h-7 bg-[#23242E] border border-white/15 peer-focus:outline-none rounded-full peer peer-checked:bg-amber-100 peer-checked:border-amber-300 transition-colors duration-300 flex items-center justify-between px-1.5 shadow-inner">
          {/* Moon Icon on the Left */}
          <Moon className="w-3.5 h-3.5 text-blue-300" />
          {/* Sun Icon on the Right */}
          <Sun className="w-3.5 h-3.5 text-amber-500" />
        </div>
        {/* Sliding Thumb Knob */}
        <div className="absolute top-[3px] left-[3px] bg-bvg-yellow w-[22px] h-[22px] rounded-full transition-transform duration-300 ease-out flex items-center justify-center shadow-md peer-checked:translate-x-7 peer-checked:bg-amber-500">
          {isLight ? (
            <Sun className="w-3 h-3 text-white fill-white" />
          ) : (
            <Moon className="w-3 h-3 text-bvg-dark fill-bvg-dark" />
          )}
        </div>
      </label>
    </div>
  );
}
