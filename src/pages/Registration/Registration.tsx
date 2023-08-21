import React, { useState, useEffect } from 'react';
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

const Registration: React.FC = () => {
  const [data, setData] = useState<Data>({});
  const [windowPage, setWindowPage] = useState(1);

  useEffect(() => {
    userStore.updateUserData(data);
  }, [data]);

  return (
    <Container maxWidth="xl">
      <div className={styles.root}>
        <div className={styles.loginWrap}>
          <span className={styles.title}>Welcome to YesCode!</span>
          {windowPage === 1 && <RegistrationForm setWindowPage={setWindowPage} setData={setData} userData={data} />}
          {windowPage === 2 && (
            <RegistrationFormSecondWindow setWindowPage={setWindowPage} setData={setData} userData={data} />
          )}
          {windowPage === 3 && <RegistrationFormThirdWindow setWindowPage={setWindowPage} setData={setData} />}
        </div>
        <div className={styles.posterWrap}>
          <Poster />
        </div>
      </div>
    </Container>
  );
};

export default Registration;
