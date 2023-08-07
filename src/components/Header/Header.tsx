import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Logo } from '../Logo';
import styles from './header.module.scss';

const Header: React.FC = () => (
  <div className={classNames(styles.root)}>
    <Container maxWidth="lg">
      <Logo />
      <Link className={classNames(styles.link)} to="/12">
        Error page
      </Link>
      <Link className={classNames(styles.link)} to="/login">
        Sign in
      </Link>
      <Link className={classNames(styles.link)} to="/registration">
        Sign up
      </Link>
    </Container>
  </div>
);

export default Header;
