import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

// import { useTheme } from '../../contexts/ThemeContext';
import { themeStore } from '../../stores/ThemeStore';
import styles from './Logo.module.scss';
import { LogoProps } from './Logo.interface';
import { LogoVariant } from './Logo.enum';

const Logo: React.FC<LogoProps> = ({ variant = LogoVariant.DEFAULT }) => {
  const { darkMode } = themeStore;

  const logoClasses = classNames(styles.root, {
    [styles.logoWhite]: variant === LogoVariant.WHITE,
    [styles.dark]: darkMode,
  });

  return (
    <Link to="/">
      <span className={classNames(styles.root, logoClasses)}></span>
    </Link>
  );
};

export default observer(Logo);
