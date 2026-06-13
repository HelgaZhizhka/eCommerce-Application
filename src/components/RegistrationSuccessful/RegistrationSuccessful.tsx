import classNames from 'classnames';

import { useThemeStore } from '../../stores/theme';
import styles from './RegistrationSuccessful.module.scss';

const RegistrationSuccessful: React.FC = () => {
  const darkMode = useThemeStore((state) => state.darkMode);

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

export default RegistrationSuccessful;
