import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './logo.module.scss';

export default function Logo(): JSX.Element {
  return (
    <Link className={classNames(styles.link)} to="/">
      <div className={classNames(styles.logo)}>Logo</div>
    </Link>
  );
}
