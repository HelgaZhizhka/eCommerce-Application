import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../pages/Main/Main';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';

const mainPath = '';
const loginPath = 'login';
const registrationPath = 'registration';
const errorPath = '*';

const RouterConfig: React.FC = () => (
  <Routes>
    <Route path={mainPath} element={<Main />} />
    <Route path={loginPath} element={<Login />} />
    <Route path={registrationPath} element={<Registration />} />
    <Route path={errorPath} element={<ErrorPage />} />
  </Routes>
);

export default RouterConfig;
