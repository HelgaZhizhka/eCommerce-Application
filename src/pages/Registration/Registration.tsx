import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';

import {
  RegistrationForm,
  RegistrationFormSecondWindow,
  RegistrationFormThirdWindow,
} from '../../components/RegistrationForm';

import { userStore } from '../../stores';
import { Poster } from '../../components/Poster';
import styles from './Registration.module.scss';
import { Data } from './Registration.interface';
import { RegistrationSuccessful } from '../../components/RegistrationSuccessful';

const Registration: React.FC = () => {
  const [data, setData] = useState<Data>({});
  const [showSplash, setShowSplash] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [windowPage, setWindowPage] = useState(1);

  useEffect(() => {
    if (Object.keys(data).length > 7) {
      userStore.updateUserData(data);
    }
  }, [data]);

  //! Попробовать редиректить

  useEffect(() => {
    if (isLogin) {
      setTimeout(() => {
        setShowSplash(true);
      }, 2000);
    }
  }, [isLogin]);

  if (showSplash) {
    return <Navigate to={'/'} />;
  }

  return (
    <Container maxWidth="xl">
      {isLogin && <RegistrationSuccessful />}
      {!isLogin && (
        <div className={classNames(styles.root)}>
          <div className={classNames(styles.loginWrap)}>
            <span className={classNames(styles.title)}>Welcome to YesCode!</span>
            {windowPage === 1 && <RegistrationForm userData={{ setWindowPage, setData }} />}
            {windowPage === 2 && <RegistrationFormSecondWindow userData={{ setWindowPage, setData }} />}
            {windowPage === 3 && (
              <RegistrationFormThirdWindow userData={{ setWindowPage, setData, setIsLogin, data }} />
            )}
          </div>
          <div className={classNames(styles.posterWrap)}>
            <Poster />
          </div>
        </div>
      )}
    </Container>
  );
};

export default Registration;
