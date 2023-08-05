import classNames from 'classnames';
import styles from './header.module.scss';
import Button from '../baseComponents/Button/Button';

export default function Header(): JSX.Element {
  return (
    <div className={classNames(styles.root)}>
      <h1>Header</h1>
      <Button>Sign in</Button>
      <Button>Sign up</Button>
    </div>
  );
}
