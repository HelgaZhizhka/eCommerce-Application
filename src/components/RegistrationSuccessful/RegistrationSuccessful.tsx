import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import { themeStore } from '../../stores';
import styles from './RegistrationSuccessful.module.scss';

const RegistrationSuccessful: React.FC = () => {
  const { darkMode } = themeStore;

  const classes = classNames(styles.logo, {
    [styles.dark]: darkMode,
  });

  return (
    <div className={styles.root}>
      <h2>Thank you! Registration was successful!</h2>
      <span className={classes}></span>
    </div>
  );
};

export default observer(RegistrationSuccessful);
