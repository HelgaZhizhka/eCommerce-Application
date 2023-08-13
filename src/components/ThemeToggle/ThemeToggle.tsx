import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { themeStore } from '../../stores';

const ThemeToggle: React.FC = () => {
  const { darkMode } = themeStore;

  return (
    <IconButton sx={{ color: 'primary.main' }} onClick={(): void => themeStore.toggleDarkMode()} color="inherit">
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeToggle;
