import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';

import { IconName } from '../baseComponents/Icon/Icon.enum';
import { Icon } from '../baseComponents/Icon';
import { ThemeToggle } from '../ThemeToggle';
import { LogoVariant } from '../Logo/Logo.enum';
import { Logo } from '../Logo';
import styles from './Header.module.scss';

const Header: React.FC = (): JSX.Element => (
  <header className={classNames(styles.root)}>
    <Container maxWidth="lg">
      <ThemeToggle />
      <Logo variant={LogoVariant.DEFAULT} />
      <Icon name={IconName.USER} width={32} height={32} color="var(--orange)" className="icon" />

      <Link className={classNames(styles.link)} to="/12">
        Error page
      </Link>
      <Link className={classNames(styles.link)} to="/login">
        Sign in
      </Link>
      <Link className={classNames(styles.link)} to="/registration">
        Sign up
      </Link>
    </Container>
  </header>
);

export default Header;
