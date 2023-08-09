import classNames from 'classnames';
import LoginForm from './LoginForm';
import styles from './login.module.scss';
import { Poster } from '../../components/Poster';
import poster1 from '../../assets/images/fon1.png';

const Login: React.FC = () => (
  <div className={classNames(styles.root)}>
    <div className={classNames(styles.loginWrap)}>
      <span className={classNames(styles.title)}>Welcome back to YesCode!</span>
      <LoginForm />
    </div>
    <div className={classNames(styles.posterWrap)}>
      <Poster />
    </div>
    <img className={classNames(styles.fontImg)} src={poster1} alt="font" />
  </div>
);

export default Login;
