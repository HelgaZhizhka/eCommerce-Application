import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { redirect } from 'react-router-dom';

import {
  RegistrationForm,
  RegistrationFormSecondWindow,
  RegistrationFormThirdWindow,
} from '../../components/RegistrationForm';

import { Poster } from '../../components/Poster';
import styles from './Registration.module.scss';
import { Data } from './Registration.interface';
import { RegistrationSuccessful } from '../../components/RegistrationSuccessful';

const Registration: React.FC = () => {
  const [data, setData] = useState<Data>({});
  const [showSplash, setShowSplash] = useState(false);
  const [windowPage, setWindowPage] = useState(1);
  console.log(data);

  //! Попробовать редиректить
  // const redirectToHome = (): void => {
  //   window.location.href = '/';
  // };

  // useEffect(() => {
  //   if (showSplash) {
  //     setTimeout(() => {
  //       setShowSplash(false);
  //       redirectToHome();
  //     }, 2000);
  //   }
  // }, [showSplash]);

  if (showSplash) {
    redirect('');
    return null;
  }

  return (
    <>
      {showSplash && <RegistrationSuccessful />}
      {!showSplash && (
        <div className={classNames(styles.root)}>
          <div className={classNames(styles.loginWrap)}>
            <span className={classNames(styles.title)}>Welcome to YesCode!</span>
            {windowPage === 1 && <RegistrationForm userData={{ setWindowPage, setData }} />}
            {windowPage === 2 && <RegistrationFormSecondWindow userData={{ setWindowPage, setData }} />}
            {windowPage === 3 && <RegistrationFormThirdWindow userData={{ setWindowPage, setData, setShowSplash }} />}
          </div>
          <div className={classNames(styles.posterWrap)}>
            <Poster />
          </div>
        </div>
      )}
    </>
  );
};

export default Registration;
