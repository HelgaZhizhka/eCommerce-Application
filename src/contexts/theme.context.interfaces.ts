export interface ThemeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}
export interface ThemeProviderProps {
  children: React.ReactNode;
}
