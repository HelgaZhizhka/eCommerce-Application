import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './logo.module.scss';
import { LogoProps } from './logo.interface';
import { LogoVariant } from './logo.enum';

const Logo: React.FC<LogoProps> = ({ variant = LogoVariant.DEFAULT }) => (
  <Link className={classNames(styles.link)} to="/">
    <span className={classNames(styles.root, variant === LogoVariant.WHITE && styles.logoWhite)}></span>
  </Link>
);

export default Logo;
