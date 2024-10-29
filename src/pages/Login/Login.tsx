import Container from '@mui/material/Container';

import poster1 from '../../assets/images/fon1.png';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Poster } from '../../components/Poster';
import styles from './Login.module.scss';

const Login: React.FC = () => (
  <Container maxWidth="xl">
    <div className={styles.root}>
      <div className={styles.loginWrap}>
        <span className={styles.title}>Welcome back to YesCode!</span>
        <LoginForm />
      </div>
      <div className={styles.posterWrap}>
        <Poster />
      </div>
      <img className={styles.fontImg} src={poster1} alt="font" />
    </div>
  </Container>
);

export default Login;
