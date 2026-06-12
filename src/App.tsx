import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, CssBaseline, ThemeProvider, createTheme, useMediaQuery, CircularProgress } from '@mui/material';

import { darkTheme, lightTheme } from './theme';
import { themeStore } from './stores';
import { useCategoriesQuery } from './queries/categories';
import RoutesConfig from './routes';
import { SnackBar } from './components/SnackBar';
import { Header } from './components/Header';
import { HeaderMobile } from './components/HeaderMobile';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const { darkMode } = themeStore;
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
              <RoutesConfig />
            </Box>
            <Footer />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default observer(App);
