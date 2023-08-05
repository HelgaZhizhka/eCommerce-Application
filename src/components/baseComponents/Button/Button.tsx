import classNames from 'classnames';
import { IBtnProps } from '../../../abstract/interface';
import styles from './button.module.scss';

// TODO:Реализовать SIze и Button вариант

export default function Button({ children, onClick, disabled, className }: IBtnProps): JSX.Element {
  return (
    <button
      className={classNames(styles.root, className, {
        [styles.disabled]: disabled,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
