import React from 'react';
import { useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Container } from '@mui/material';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import RoutesConfig from './routes';

const App: React.FC = () => {
  const location = useLocation();
  const nodeRef = React.useRef(null);

  return (
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
  );
};

export default App;
