import { Switch } from '@mui/material';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return <Switch checked={darkMode} onChange={toggleDarkMode} />;
};

export default ThemeToggle;
