import React from 'react';
import { useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';

import { themeStore } from './stores';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { darkTheme, lightTheme } from './theme';
import RoutesConfig from './routes';

const App: React.FC = () => {
  const location = useLocation();
  const nodeRef = React.useRef(null);
  const { darkMode } = themeStore;
  const theme = createTheme(darkMode ? darkTheme : lightTheme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Header />
        {/* <TransitionGroup>
          <CSSTransition nodeRef={nodeRef} key={location.key} classNames="fade" timeout={300}> */}
        <Container component="main" ref={nodeRef} maxWidth="lg">
          <RoutesConfig />
        </Container>
        {/* </CSSTransition>
        </TransitionGroup> */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default observer(App);
