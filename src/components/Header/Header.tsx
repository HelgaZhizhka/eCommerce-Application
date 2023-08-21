import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { RoutePaths } from '../../routes/routes.enum';
import { IconName } from '../baseComponents/Icon/Icon.enum';
import { Icon } from '../baseComponents/Icon';
import { Search } from '../baseComponents/Search';
import { PhoneNumber } from '../baseComponents/PhoneNumber';
import { ThemeToggle } from '../ThemeToggle';
import { LogoVariant } from '../Logo/Logo.enum';
import { MenuCategories } from '../MenuCategories';
import { SelectCurrency } from '../SelectCurrency';
import { InfoPanel } from '../InfoPanel';
import { NavBarMobile } from '../NavBarMobile';
import { userStore } from '../../stores';
import { Logo } from '../Logo';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { loggedIn } = userStore;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const toggleNavBar = (): void => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  return (
    <header className={styles.root}>
      {!isMobile && (
        <>
          <Container sx={{ display: 'grid' }} className={styles.container} maxWidth="xl">
            <div className={styles.logo}>
              <Logo variant={LogoVariant.DEFAULT} />
            </div>
            <div className={styles.top}>
              <InfoPanel />
              <PhoneNumber className="ml-auto">(+380) 68 018 45 67</PhoneNumber>
              {loggedIn && (
                <Link
                  to={RoutePaths.MAIN}
                  onClick={(): void => {
                    userStore.logout();
                  }}
                >
                  <Button sx={{ fontSize: '1.25rem', ml: '10px' }} variant="outlined" color="primary">
                    Exit
                  </Button>
                </Link>
              )}
            </div>
            <div className={styles.flex}>
              <Search className={styles.search} />
              <div className={`ml-auto ${styles.flex}`}>
                {!loggedIn && (
                  <>
                    <Link to={RoutePaths.LOGIN}>
                      <Button sx={{ fontSize: '1.25rem', mr: '10px' }} variant="outlined" color="primary">
                        <span>Sign in</span>
                      </Button>
                    </Link>
                    <Link to={RoutePaths.REGISTRATION}>
                      <Button sx={{ fontSize: '1.25rem', mr: '10px' }} variant="contained" color="primary">
                        Sign up
                      </Button>
                    </Link>
                  </>
                )}
                {loggedIn && (
                  <Link to={RoutePaths.PROFILE}>
                    <Icon name={IconName.USER} width={40} height={40} color="var(--color-text)" className="icon mr-1" />
                  </Link>
                )}
                <Link to={RoutePaths.CART}>
                  <Icon name={IconName.CART} width={40} height={40} color="var(--color-text)" className="icon mr-1" />
                </Link>
                <SelectCurrency />
              </div>
            </div>
          </Container>
          <nav className={styles.navbar}>
            <Container sx={{ display: 'flex', alignItems: 'center' }} maxWidth="xl">
              <MenuCategories size={'l'} variant={'horizontal'} />
              <div className={`ml-auto ${styles.flex}`}>
                <Link className={styles.link} to={RoutePaths.ABOUT}>
                  About Us
                </Link>
                <ThemeToggle />
              </div>
            </Container>
          </nav>
        </>
      )}
      {isMobile && (
        <>
          <Container>
            <div className={styles.top}>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={toggleNavBar}>
                <MenuIcon />
              </IconButton>
              <div className={styles.logo}>
                <Logo variant={LogoVariant.DEFAULT} />
              </div>
              <div className={`ml-auto ${styles.flex}`}>
                {loggedIn && (
                  <Link to={RoutePaths.PROFILE}>
                    <Icon name={IconName.USER} width={40} height={40} color="var(--color-text)" className="icon mr-1" />
                  </Link>
                )}
                <Link to={RoutePaths.CART}>
                  <Icon name={IconName.CART} width={40} height={40} color="var(--color-text)" className="icon mr-1" />
                </Link>
                <SelectCurrency />
                {!loggedIn && (
                  <Link to={RoutePaths.LOGIN}>
                    <LoginIcon sx={{ ml: '10px' }} fontSize="large" />
                  </Link>
                )}
                {loggedIn && (
                  <Link
                    to={RoutePaths.MAIN}
                    onClick={(): void => {
                      userStore.logout();
                    }}
                  >
                    <LogoutIcon sx={{ ml: '10px' }} fontSize="large" />
                  </Link>
                )}
              </div>
            </div>
            <div className={styles.flex}>
              <Search className={styles.search} />
              <ThemeToggle />
            </div>
          </Container>
          <NavBarMobile onClose={toggleNavBar} isOpen={isNavBarOpen} />
        </>
      )}
    </header>
  );
};

export default observer(Header);
