import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Main from '../pages/Main/Main';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import { userStore } from '../stores';
import { RoutePaths } from './routes.enum';

const RouterConfig: React.FC = () => {
  const { loggedIn } = userStore;

  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={1000} unmountOnExit>
        <div ref={nodeRef}>
          <Routes location={location}>
            <Route path={RoutePaths.MAIN} element={<Main />} />
            <Route path={RoutePaths.LOGIN} element={loggedIn ? <Navigate to={RoutePaths.MAIN} replace /> : <Login />} />
            <Route
              path={RoutePaths.REGISTRATION}
              element={loggedIn ? <Navigate to={RoutePaths.MAIN} replace /> : <Registration />}
            />
            <Route path={RoutePaths.ERROR} element={<ErrorPage />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default observer(RouterConfig);
