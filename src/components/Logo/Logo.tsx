import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './logo.module.scss';

const Logo: React.FC = () => (
  <Link className={classNames(styles.link)} to="/">
    <span className={classNames(styles.logo)}>Logo</span>
  </Link>
);

export default Logo;
