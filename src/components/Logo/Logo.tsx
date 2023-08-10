import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './logo.module.scss';
import { LogoProps } from './logo.interface';
import { LogoVariant } from './logo.enum';
import { useTheme } from '../../contexts/ThemeContext';

const Logo: React.FC<LogoProps> = ({ variant = LogoVariant.DEFAULT }) => {
  const { darkMode } = useTheme();

  return (
    <Link to="/">
      <span
        className={classNames(styles.root, variant === LogoVariant.WHITE && styles.logoWhite, darkMode && styles.dark)}
      ></span>
    </Link>
  );
};

export default Logo;
