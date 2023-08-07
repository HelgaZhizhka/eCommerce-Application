import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1024,
      lg: 1400,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: 'Mukta, sans-serif',
  },
  palette: {
    primary: {
      main: '#F2760F',
    },
    secondary: {
      main: '#009444',
    },
    error: {
      main: '#F61717',
    },
    success: {
      main: '#009444',
    },
  },
});

export default theme;
