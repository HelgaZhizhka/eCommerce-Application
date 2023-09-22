import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { themeStore } from '../../stores';
import styles from './Logo.module.scss';
import { LogoVariant } from './Logo.enum';

type Props = {
  variant?: LogoVariant;
};

const Logo: React.FC<Props> = ({ variant = LogoVariant.DEFAULT }) => {
  const { darkMode } = themeStore;

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

export default observer(Logo);
