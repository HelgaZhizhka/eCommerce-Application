import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
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
    if (Object.keys(data).length > 7) {
      userStore.updateUserData(data);
    }
  }, [data]);

  return (
    <Container maxWidth="xl">
      <div className={classNames(styles.root)}>
        <div className={classNames(styles.loginWrap)}>
          <span className={classNames(styles.title)}>Welcome to YesCode!</span>
          {windowPage === 1 && <RegistrationForm userData={{ setWindowPage, setData }} />}
          {windowPage === 2 && <RegistrationFormSecondWindow userData={{ setWindowPage, setData }} />}
          {windowPage === 3 && <RegistrationFormThirdWindow userData={{ setWindowPage, setData, data }} />}
        </div>
        <div className={classNames(styles.posterWrap)}>
          <Poster />
        </div>
      </div>
    </Container>
  );
};

export default Registration;
