import React from 'react';
import { observer } from 'mobx-react-lite/dist/index';
import { Routes, Route, Navigate } from 'react-router-dom';

import Main from '../pages/Main/Main';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import { userStore } from '../stores';
import { RoutePaths } from './routes.enum';

const RouterConfig: React.FC = () => {
  const { loggedIn } = userStore;

  return (
    <Routes>
      <Route path={RoutePaths.MAIN} element={<Main />} />
      <Route path={RoutePaths.LOGIN} element={loggedIn ? <Navigate to={RoutePaths.MAIN} replace /> : <Login />} />
      <Route
        path={RoutePaths.REGISTRATION}
        element={loggedIn ? <Navigate to={RoutePaths.MAIN} replace /> : <Registration />}
      />
      <Route path={RoutePaths.ERROR} element={<ErrorPage />} />
    </Routes>
  );
};

export default observer(RouterConfig);
