import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './registration.module.scss';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import { Poster } from '../../components/Poster';
import { Data } from './reg.interface';
import RegistrationFormSecondWindow from '../../components/RegistrationForm/RegistrationFormSecondWindow';

const Registration: React.FC = () => {
  const [data, setData] = useState<Data>({});
  const [windowPage, setWindowPge] = useState(2);
  console.log(data);
  return (
    <div className={classNames(styles.root)}>
      <div className={classNames(styles.loginWrap)}>
        <span className={classNames(styles.title)}>Welcome to YesCode!</span>
        {windowPage === 1 && <RegistrationForm userData={{ setWindowPge, setData }} />}
        {windowPage === 2 && <RegistrationFormSecondWindow userData={{ setWindowPge, setData }} />}
      </div>
      <div className={classNames(styles.posterWrap)}>
        <Poster />
      </div>
    </div>
  );
};

export default Registration;
