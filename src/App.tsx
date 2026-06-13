import React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, useMediaQuery, CircularProgress } from '@mui/material';

import { darkTheme, lightTheme } from './theme';
import { useThemeStore } from './stores/theme';
import { useCategoriesQuery } from './queries/categories';
import RoutesConfig from './routes';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SnackBar } from './components/SnackBar';
import { Header } from './components/Header';
import { HeaderMobile } from './components/HeaderMobile';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const darkMode = useThemeStore((state) => state.darkMode);
  const theme = createTheme(darkMode ? darkTheme : lightTheme);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isLoading: isAppLoading } = useCategoriesQuery();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackBar />
      <div className="app">
        {isAppLoading ? (
          <Box
            sx={{
              width: '100%',
              height: 'var(--app-height)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {!isMobile ? <Header /> : <HeaderMobile />}
            <Box component="main" sx={{ position: 'relative', flex: '1', pb: 2 }}>
              <ErrorBoundary>
                <RoutesConfig />
              </ErrorBoundary>
            </Box>
            <Footer />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
