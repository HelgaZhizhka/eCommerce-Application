import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

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
    <header className={classNames(styles.root)}>
      {!isMobile && (
        <>
          <Container sx={{ display: 'grid' }} className={styles.container} maxWidth="xl">
            <div className={classNames(styles.logo)}>
              <Logo variant={LogoVariant.DEFAULT} />
            </div>
            <div className={classNames(styles.flex, styles.top)}>
              <InfoPanel />
              <PhoneNumber className="ml-auto">(+380) 68 018 45 67</PhoneNumber>
            </div>
            <div className={styles.flex}>
              <Search className={styles.search} />
              <div className={classNames('ml-auto', styles.flex)}>
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
                  <Button
                    onClick={(): void => {
                      userStore.logout();
                    }}
                    sx={{ fontSize: '1.25rem', mr: '10px' }}
                    variant="contained"
                    color="primary"
                  >
                    Sign out
                  </Button>
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
              <div className={classNames('ml-auto', styles.flex)}>
                <Link className={classNames(styles.link)} to={RoutePaths.ABOUT}>
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
          <Container maxWidth="xl">
            <div className={classNames(styles.flex, styles.top)}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleNavBar}
              >
                <MenuIcon />
              </IconButton>
              <div className={classNames(styles.logo)}>
                <Logo variant={LogoVariant.DEFAULT} />
              </div>
              <div className={classNames('ml-auto', styles.flex)}>
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
                <Link to={RoutePaths.CART}>
                  <Icon name={IconName.CART} width={40} height={40} color="var(--color-text)" className="icon mr-1" />
                </Link>
                <SelectCurrency />
              </div>
            </div>
            <Search className={styles.search} />
          </Container>
          <NavBarMobile onClose={toggleNavBar} isOpen={isNavBarOpen} />
        </>
      )}
    </header>
  );
};

export default observer(Header);
