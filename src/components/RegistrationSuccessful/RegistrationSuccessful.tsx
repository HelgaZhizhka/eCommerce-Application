import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import styles from './RegistrationSuccessful.module.scss';
import { themeStore } from '../../stores';

const RegistrationSuccessful: React.FC = () => {
  const { darkMode } = themeStore;

  const logoClasses = classNames(styles.logo, {
    [styles.dark]: darkMode,
  });

  return (
    <div className={classNames(styles.root)}>
      <h2>Thank you! Registration was successful!</h2>
      <span className={classNames(logoClasses)}></span>
    </div>
  );
};

export default observer(RegistrationSuccessful);
