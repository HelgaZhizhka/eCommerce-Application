import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

import { IconName } from '../baseComponents/Icon/Icon.enum';
import { Icon } from '../baseComponents/Icon';
import { RoutePaths } from '../../routes/routes.enum';
import { ThemeToggle } from '../ThemeToggle';
import { LogoVariant } from '../Logo/Logo.enum';
import { MenuCategories } from '../MenuCategories';
import { SelectCurrency } from '../SelectCurrensy';
import { Logo } from '../Logo';
import styles from './Header.module.scss';

const Header: React.FC = () => (
  <header className={classNames(styles.root)}>
    <Container sx={{ display: 'grid' }} className={styles.container} maxWidth="lg">
      <div className={classNames(styles.logo)}>
        <Logo variant={LogoVariant.DEFAULT} />
      </div>
      <div className={classNames(styles.wrapper, styles.top)}>
        <span className={classNames(styles.flex)}>
          <span className={classNames(styles.badge)}>%</span>
          Free shipping on everything DrinkWare this month!
        </span>
        <span className={classNames('ml-auto', styles.flex)}>
          <Icon name={IconName.PHONE} width={32} height={32} className={classNames('icon', styles.icon)} />
          <a className="text-inherit" href="tel:+38068588284186">
            (+380) 68 018 45 67
          </a>
        </span>
        <ThemeToggle />
      </div>
      <div className={styles.wrapper}>
        <Input
          className={styles.search}
          type="search"
          startAdornment={
            <InputAdornment position="start">
              <Icon name={IconName.SEARCH} width={20} height={20} color="var(--gray)" className="icon" />
            </InputAdornment>
          }
        />
        <div className={classNames('ml-auto', styles.flex)}>
          <Link className={classNames(styles.link)} to={RoutePaths.ABOUT}>
            About Us
          </Link>
          <Link to={RoutePaths.LOGIN}>
            <Button sx={{ fontSize: '1.25rem', mr: '10px' }} variant="outlined" color="primary">
              <Icon name={IconName.USER} width={32} height={32} color="var(--color-text)" className="icon mr-1" />
              <span>Sign in</span>
            </Button>
          </Link>
          <Link to={RoutePaths.REGISTRATION}>
            <Button sx={{ fontSize: '1.25rem', mr: '10px' }} variant="outlined" color="primary">
              Sign up
            </Button>
          </Link>
          <Link to={RoutePaths.CART}>
            <Icon name={IconName.CART} width={40} height={40} color="var(--color-text)" className="icon mr-1" />
          </Link>
          <SelectCurrency />
        </div>
      </div>
    </Container>
    <nav className={styles.navbar}>
      <Container maxWidth="lg">
        <MenuCategories size={'l'} variant={'horizontal'} />
      </Container>
    </nav>
  </header>
);

export default Header;
