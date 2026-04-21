"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'hacker';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ 
  children, 
  initialTheme = 'light' 
}: { 
  children: React.ReactNode, 
  initialTheme?: Theme 
}) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    if (newTheme === 'dark' || newTheme === 'hacker') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('busy-theme', newTheme);
  };

  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'hacker'];
    const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('busy-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(initialTheme);
    }
  }, [initialTheme]);

  // Handle system preference changes if needed
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    // Explicitly handle body too for total coverage
    document.body.setAttribute('data-theme', theme);
    
    if (theme === 'dark' || theme === 'hacker') {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
