import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite/dist/index';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Main from '../pages/Main/Main';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import Catalog from '../pages/Catalog/Catalog';
import { About } from '../pages/About';
import { Profile } from '../pages/Profile';
import { Cart } from '../pages/Cart';
import { userStore } from '../stores';
import { RoutePaths } from './routes.enum';

const pageTransition = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.65, ease: 'easeIn' } },
  exit: { opacity: 0, transition: { duration: 0 } },
};

const RouterConfig: React.FC = () => {
  const { loggedIn } = userStore;
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path={RoutePaths.MAIN}
          element={
            <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
              <Main />
            </motion.div>
          }
        />
        <Route
          path={RoutePaths.LOGIN}
          element={
            loggedIn ? (
              <Navigate to={RoutePaths.MAIN} replace />
            ) : (
              <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
                <Login />
              </motion.div>
            )
          }
        />
        <Route
          path={RoutePaths.REGISTRATION}
          element={
            loggedIn ? (
              <Navigate to={RoutePaths.MAIN} replace />
            ) : (
              <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
                <Registration />
              </motion.div>
            )
          }
        />
        <Route
          path={RoutePaths.ERROR}
          element={
            <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
              <ErrorPage />
            </motion.div>
          }
        />
        <Route
          path={RoutePaths.CATALOG}
          element={
            <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
              <Catalog />
            </motion.div>
          }
        />
        <Route
          path={RoutePaths.ABOUT}
          element={
            <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
              <About />
            </motion.div>
          }
        />
        <Route
          path={RoutePaths.PROFILE}
          element={
            <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
              <Profile />
            </motion.div>
          }
        />
        <Route
          path={RoutePaths.CART}
          element={
            <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
              <Cart />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default observer(RouterConfig);
