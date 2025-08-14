// theme-context.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { theme } from 'antd';

const { darkAlgorithm, defaultAlgorithm } = theme;

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  algorithm: typeof darkAlgorithm | typeof defaultAlgorithm;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(
    () => (localStorage.getItem('themeMode') as ThemeMode) || 'light'
  );

  // Handle system theme detection
  const [systemIsDark, setSystemIsDark] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // Determine if we should use dark theme
  const isDark = mode === 'dark' || (mode === 'system' && systemIsDark);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
        isDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeMode must be used within ThemeProvider');
  return ctx;
};