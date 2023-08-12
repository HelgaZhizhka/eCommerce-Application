import classNames from 'classnames';
import styles from './registration.module.scss';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import { Poster } from '../../components/Poster';

const Registration: React.FC = () => (
  <div className={classNames(styles.root)}>
    <div className={classNames(styles.loginWrap)}>
      <span className={classNames(styles.title)}>Welcome to YesCode!</span>
      <RegistrationForm />
    </div>
    <div className={classNames(styles.posterWrap)}>
      <Poster />
    </div>
  </div>
);

export default Registration;
