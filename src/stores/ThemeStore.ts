import { makeAutoObservable, reaction } from 'mobx';

class ThemeStore {
  public darkMode: boolean;

  constructor() {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('darkMode');
    this.darkMode = storedTheme ? JSON.parse(storedTheme) : prefersDarkMode;

    if (this.darkMode) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }

    makeAutoObservable(this);

    reaction(
      () => this.darkMode,
      (isDarkMode) => {
        if (isDarkMode) {
          document.body.setAttribute('data-theme', 'dark');
        } else {
          document.body.setAttribute('data-theme', 'light');
        }
      }
    );
  }

  public toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
  }
}

export const themeStore = new ThemeStore();
