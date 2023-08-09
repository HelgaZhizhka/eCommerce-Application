import { createTheme } from '@mui/material/styles';


const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

const getCSSVariableValue = (name: string): string => getComputedStyle(document.documentElement).getPropertyValue(name).trim()
const colorOrange = getCSSVariableValue('--color-orange');
const colorOrangeLight = getCSSVariableValue('--color-orange-light');
const colorWhite = getCSSVariableValue('--color-white');
const colorBlack = getCSSVariableValue('--color-black');
const colorGreen = getCSSVariableValue('--color-green');
const colorBlue = getCSSVariableValue('--color-blue');
const colorLightBlue = getCSSVariableValue('--light-blue');
const stateDanger = getCSSVariableValue('--state-danger');
const stateSuccess = getCSSVariableValue('--state-success');

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: 'none',
          color: colorOrange,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
        },
      },
      defaultProps: {
        disableElevation: true,
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            color: colorWhite,
            '&:hover': {
              backgroundColor: colorOrangeLight,
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            borderColor: colorBlack,
            color: colorBlack,
            '&:hover': {
              backgroundColor: colorLightBlue,
              borderColor: colorBlack,
            },
            '&:active': {
              borderColor: colorBlue,
              color: colorWhite,
              backgroundColor: colorBlue,
            },
          },
        },
      ],
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1024,
      lg: 1400,
      xl: 1680,
    },
  },
  typography: {
    fontFamily: 'var(--font-family)',
  },
  palette: {
    mode: prefersDarkMode ? 'dark' : 'light',
    primary: {
      main: colorOrange,
    },
    secondary: {
      main: colorGreen,
    },
    error: {
      main: stateDanger,
    },
    success: {
      main: stateSuccess,
    },
  },
});

export default theme;