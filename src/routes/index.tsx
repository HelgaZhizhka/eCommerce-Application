import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite/dist/index';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Main from '../pages/Main/Main';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import Catalog from '../pages/Catalog/Catalog';
import { About } from '../pages/About';
import { Sale } from '../pages/Sale';
import { Profile } from '../pages/Profile';
import { Cart } from '../pages/Cart';
import { Product } from '../pages/Product';
import { RoutePaths } from './routes.enum';
import Secure from './Secure';
import MotionWrapper from './MotionWrapper';

const RouterConfig: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path={RoutePaths.MAIN}
          element={
            <MotionWrapper>
              <Main />
            </MotionWrapper>
          }
        />
        <Route
          path={RoutePaths.LOGIN}
          element={
            <Secure reverse>
              <MotionWrapper>
                <Login />
              </MotionWrapper>
            </Secure>
          }
        />
        <Route
          path={RoutePaths.REGISTRATION}
          element={
            <Secure reverse>
              <MotionWrapper>
                <Registration />
              </MotionWrapper>
            </Secure>
          }
        />

        <Route
          path={RoutePaths.CATEGORY}
          element={
            <MotionWrapper>
              <Catalog />
            </MotionWrapper>
          }
        />
        <Route
          path={RoutePaths.PRODUCT}
          element={
            <MotionWrapper>
              <Product />
            </MotionWrapper>
          }
        />
        <Route
          path={RoutePaths.ABOUT}
          element={
            <MotionWrapper>
              <About />
            </MotionWrapper>
          }
        />
        <Route
          path={RoutePaths.SALE}
          element={
            <MotionWrapper>
              <Sale />
            </MotionWrapper>
          }
        />
        <Route
          path={RoutePaths.PROFILE}
          element={
            <Secure>
              <MotionWrapper>
                <Profile />
              </MotionWrapper>
            </Secure>
          }
        />
        <Route
          path={RoutePaths.CART}
          element={
            <MotionWrapper>
              <Cart />
            </MotionWrapper>
          }
        />
        <Route
          path={RoutePaths.ERROR}
          element={
            <MotionWrapper>
              <ErrorPage />
            </MotionWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default observer(RouterConfig);
