import React, { useState } from 'react';
import classNames from 'classnames';

import {
  RegistrationForm,
  RegistrationFormSecondWindow,
  RegistrationFormThirdWindow,
} from '../../components/RegistrationForm';
import { Poster } from '../../components/Poster';
import styles from './Registration.module.scss';
import { Data } from './Registration.interface';

const Registration: React.FC = () => {
  const [data, setData] = useState<Data>({});
  const [windowPage, setWindowPge] = useState(3);
  console.log(data);
  return (
    <div className={classNames(styles.root)}>
      <div className={classNames(styles.loginWrap)}>
        <span className={classNames(styles.title)}>Welcome to YesCode!</span>
        {windowPage === 1 && <RegistrationForm userData={{ setWindowPge, setData }} />}
        {windowPage === 2 && <RegistrationFormSecondWindow userData={{ setWindowPge, setData }} />}
        {windowPage === 3 && <RegistrationFormThirdWindow userData={{ setWindowPge, setData }} />}
      </div>
      <div className={classNames(styles.posterWrap)}>
        <Poster />
      </div>
    </div>
  );
};

export default Registration;
