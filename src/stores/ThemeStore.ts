import { makeAutoObservable, reaction } from 'mobx';

interface ThemeStore {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const createThemeStore = (): ThemeStore => {
  const store = {
    darkMode: ((): boolean => {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const storedTheme = localStorage.getItem('darkMode');
      return storedTheme ? JSON.parse(storedTheme) : prefersDarkMode;
    })(),

    toggleDarkMode(): void {
      store.darkMode = !store.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(store.darkMode));
    },
  };

  if (store.darkMode) {
    document.body.setAttribute('data-theme', 'dark');
  } else {
    document.body.setAttribute('data-theme', 'light');
  }

  makeAutoObservable(store);

  reaction(
    () => store.darkMode,
    (isDarkMode) => {
      if (isDarkMode) {
        document.body.setAttribute('data-theme', 'dark');
      } else {
        document.body.setAttribute('data-theme', 'light');
      }
    }
  );

  return store;
};

export const themeStore = createThemeStore();
