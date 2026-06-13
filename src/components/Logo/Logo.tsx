import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { useThemeStore } from '../../stores/theme';
import styles from './Logo.module.scss';
import { LogoVariant } from './Logo.enum';

type Props = {
  variant?: LogoVariant;
};

const Logo: React.FC<Props> = ({ variant = LogoVariant.DEFAULT }) => {
  const darkMode = useThemeStore((state) => state.darkMode);

  const logoClasses = classNames(styles.root, {
    [styles.logoWhite]: variant === LogoVariant.WHITE,
    [styles.dark]: darkMode,
  });

  return (
    <Link to="/">
      <span className={logoClasses}></span>
    </Link>
  );
};

export default Logo;
