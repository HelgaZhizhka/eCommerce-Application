import classNames from 'classnames';
import styles from './footer.module.scss';

export default function Footer(): JSX.Element {
  return (
    <div className={classNames(styles.root)}>
      <h1>Footer</h1>
    </div>
  );
}
