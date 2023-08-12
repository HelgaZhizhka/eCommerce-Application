import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './registration.module.scss';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import { Poster } from '../../components/Poster';
import { Data } from './reg.interface';

const Registration: React.FC = () => {
  const [data, setData] = useState<Data>({});
  console.log(data);
  return (
    <div className={classNames(styles.root)}>
      <div className={classNames(styles.loginWrap)}>
        <span className={classNames(styles.title)}>Welcome to YesCode!</span>
        <RegistrationForm userData={{ data, setData }} />
      </div>
      <div className={classNames(styles.posterWrap)}>
        <Poster />
      </div>
    </div>
  );
};

export default Registration;
