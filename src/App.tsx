import React from 'react';
import { useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Container, CssBaseline, createTheme } from '@mui/material';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { useTheme } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { darkTheme, lightTheme } from './theme';
import RoutesConfig from './routes';

const App: React.FC = () => {
  const location = useLocation();
  const nodeRef = React.useRef(null);
  const { darkMode } = useTheme();
  const theme = createTheme(darkMode ? darkTheme : lightTheme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Header />
        <TransitionGroup>
          <CSSTransition nodeRef={nodeRef} key={location.key} classNames="fade" timeout={300}>
            <Container component="main" ref={nodeRef} maxWidth="lg">
              <RoutesConfig />
            </Container>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    </MUIThemeProvider>
  );
};

export default App;
