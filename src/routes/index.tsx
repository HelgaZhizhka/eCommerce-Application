import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../pages/Main/Main';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import { RoutePaths } from './routes.enum';

const RouterConfig: React.FC = () => (
  <Routes>
    <Route path={RoutePaths.MAIN} element={<Main />} />
    <Route path={RoutePaths.LOGIN} element={<Login />} />
    <Route path={RoutePaths.REGISTRATION} element={<Registration />} />
    <Route path={RoutePaths.ERROR} element={<ErrorPage />} />
  </Routes>
);

export default RouterConfig;
