import React, { createContext, useContext, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProviderProps, ThemeContextProps } from './theme.context.interfaces';

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const storedTheme = localStorage.getItem('darkMode');
  const initialDarkMode = storedTheme ? JSON.parse(storedTheme) : prefersDarkMode;
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  const toggleDarkMode = (): void => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  return <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
