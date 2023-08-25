import classNames from 'classnames';

import styles from './Price.module.scss';
import { VARIANT } from './Price.types';

type Props = {
  children?: string;
  className?: string;
  variant?: VARIANT;
  currency?: string;
};

const Price: React.FC<Props> = ({ children, currency, className, variant }) => {
  const classes = classNames(
    styles.root,
    {
      [styles.old]: variant === 'old',
      [styles.new]: variant === 'new',
    },
    className
  );
  return (
    <span className={classes}>
      <span className={styles.value}>{children}</span>
      <span className={styles.currency}>{currency}</span>
    </span>
  );
};

export default Price;
