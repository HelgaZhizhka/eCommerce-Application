import { create } from 'zustand';

const initialDarkMode = (): boolean => {
  const stored = localStorage.getItem('darkMode');
  if (stored) return JSON.parse(stored) as boolean;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const applyTheme = (darkMode: boolean): void => {
  document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
};

type ThemeState = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const useThemeStore = create<ThemeState>((set, get) => {
  const darkMode = initialDarkMode();
  applyTheme(darkMode);

  return {
    darkMode,
    toggleDarkMode: (): void => {
      const next = !get().darkMode;
      localStorage.setItem('darkMode', JSON.stringify(next));
      applyTheme(next);
      set({ darkMode: next });
    },
  };
});
