import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';

import { darkTheme, lightTheme } from './theme';
import { themeStore, productStore } from './stores';
import RoutesConfig from './routes';
import { SnackBar } from './components/SnackBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const { darkMode } = themeStore;
  const theme = createTheme(darkMode ? darkTheme : lightTheme);

  useEffect(() => {
    productStore.fetchCategories();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackBar />
      <div className="app">
        <Header />
        <Box component="main" sx={{ position: 'relative', flex: '1' }}>
          <RoutesConfig />
        </Box>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default observer(App);
