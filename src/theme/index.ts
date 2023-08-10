import { createTheme } from '@mui/material/styles';

const getCSSVariableValue = (name: string): string => getComputedStyle(document.documentElement).getPropertyValue(name).trim()
const colorOrange = getCSSVariableValue('--orange');
const colorOrangeLight = getCSSVariableValue('--orange-light');
const colorWhite = getCSSVariableValue('--white');
const colorLightWhite  = getCSSVariableValue('--light-white');
const colorBlack = getCSSVariableValue('--black');
const colorGreen = getCSSVariableValue('--green');
const colorBlue = getCSSVariableValue('--blue');
const colorLightBlue = getCSSVariableValue('--light-blue');
const stateDanger = getCSSVariableValue('--state-danger');
const stateSuccess = getCSSVariableValue('--state-success');

const lightTheme = createTheme({
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
              backgroundColor: 'rgba(240, 248, 255, .36)',
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
    mode: 'light',
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


const darkTheme = createTheme({
  ...lightTheme,
  palette: {
    mode: 'dark',
  },
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
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            color: colorWhite,
            backgroundColor: colorOrange,
            '&:hover': {
              backgroundColor: colorOrangeLight,
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            borderColor: colorLightWhite,
            color: colorLightWhite,
            '&:hover': {
              backgroundColor: 'rgba(240, 248, 255, .36)',
              borderColor: colorLightBlue,
              color: colorBlack,
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
});


export { lightTheme, darkTheme };