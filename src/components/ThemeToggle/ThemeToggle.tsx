import Switch from '@mui/material/Switch';

import { themeStore } from '../../stores';

const ThemeToggle: React.FC = () => {
  const { darkMode } = themeStore;

  return <Switch checked={darkMode} onChange={(): void => themeStore.toggleDarkMode()} />;
};

export default ThemeToggle;
