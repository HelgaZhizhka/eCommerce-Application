import classNames from 'classnames';
import styles from './button.module.scss';
import { BtnProps } from './type';

const Button: React.FC<BtnProps> = ({ children, onClick, disabled, className }) => (
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

export default Button;
