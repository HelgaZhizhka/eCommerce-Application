import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';

import {
  RegistrationForm,
  RegistrationFormSecondWindow,
  RegistrationFormThirdWindow,
} from '../../components/RegistrationForm';

import { userStore } from '../../stores';
import { Data } from './Registration.types';
import { RegistrationWindows } from './Registration.enum';
import { Poster } from '../../components/Poster';
import styles from './Registration.module.scss';

const Registration: React.FC = () => {
  const [data, setData] = useState<Data>({});
  const [windowPage, setWindowPage] = useState(1);
  let CurrentWindowComponent;

  switch (windowPage) {
    case RegistrationWindows.FIRST_WINDOW:
      CurrentWindowComponent = <RegistrationForm setWindowPage={setWindowPage} setData={setData} userData={data} />;
      break;
    case RegistrationWindows.SECOND_WINDOW:
      CurrentWindowComponent = (
        <RegistrationFormSecondWindow setWindowPage={setWindowPage} setData={setData} userData={data} />
      );
      break;
    case RegistrationWindows.THIRD_WINDOW:
      CurrentWindowComponent = <RegistrationFormThirdWindow setWindowPage={setWindowPage} setData={setData} />;
      break;
    default:
      CurrentWindowComponent = null;
  }

  useEffect(() => {
    userStore.updateUserData(data);
  }, [data]);

  return (
    <Container maxWidth="xl">
      <div className={styles.root}>
        <div className={styles.loginWrap}>{CurrentWindowComponent}</div>
        <div className={styles.posterWrap}>
          <Poster />
        </div>
      </div>
    </Container>
  );
};

export default Registration;
