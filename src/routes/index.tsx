import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Box, CircularProgress } from '@mui/material';

import { RoutePaths } from './routes.enum';
import Secure from './Secure';
import MotionWrapper from './MotionWrapper';

// Route-level code splitting (5.4): each page is its own chunk.
const Main = lazy(() => import('../pages/Main/Main'));
const ErrorPage = lazy(() => import('../pages/ErrorPage/ErrorPage'));
const Login = lazy(() => import('../pages/Login/Login'));
const Registration = lazy(() => import('../pages/Registration/Registration'));
const Catalog = lazy(() => import('../pages/Catalog/Catalog'));
const About = lazy(() => import('../pages/About').then((m) => ({ default: m.About })));
const Sale = lazy(() => import('../pages/Sale').then((m) => ({ default: m.Sale })));
const Profile = lazy(() => import('../pages/Profile').then((m) => ({ default: m.Profile })));
const Cart = lazy(() => import('../pages/Cart').then((m) => ({ default: m.Cart })));
const Product = lazy(() => import('../pages/Product').then((m) => ({ default: m.Product })));

const PageFallback: React.FC = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
    <CircularProgress color="secondary" />
  </Box>
);

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
    <Suspense fallback={<PageFallback />}>
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
    </Suspense>
  );
};

export default RouterConfig;
