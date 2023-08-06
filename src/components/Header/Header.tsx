import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';
import Logo from '../Logo/Logo';

export default function Header(): JSX.Element {
  return (
    <div className={classNames(styles.root)}>
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
    </div>
  );
}
