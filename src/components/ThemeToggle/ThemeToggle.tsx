import { Moon, Sun } from 'lucide-react';

import { useThemeStore } from '../../stores/theme';

const ThemeToggle: React.FC = () => {
  const darkMode = useThemeStore((state) => state.darkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleDarkMode}
      className="inline-flex items-center justify-center rounded-full p-2 text-primary transition-colors hover:bg-black/5 dark:hover:bg-white/10"
    >
      {darkMode ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};

export default ThemeToggle;
