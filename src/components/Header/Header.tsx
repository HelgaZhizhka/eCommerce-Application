import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';

import { RoutePaths } from '../../routes/routes.enum';
import { currency, contacts } from '../../constants';
import { IconName } from '../baseComponents/Icon/Icon.enum';
import { Icon } from '../baseComponents/Icon';
import { PhoneNumber } from '../baseComponents/PhoneNumber';
import { ThemeToggle } from '../ThemeToggle';
import { LogoVariant } from '../Logo/Logo.enum';
import { Categories } from '../Categories';
import { InfoPanel } from '../InfoPanel';
import { cartStore, userStore } from '../../stores';
import { getPriceValue } from '../../stores/productHelpers';
import { Logo } from '../Logo';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { loggedIn } = userStore;
  const { totalAmount, totalPrice } = cartStore;

  const totalPriceValue = getPriceValue(totalPrice);

  return (
    <header className={styles.root}>
      <Container sx={{ display: 'grid' }} className={styles.container} maxWidth="xl">
        <div className={styles.logo}>
          <Logo variant={LogoVariant.DEFAULT} />
        </div>
        <div className={styles.top}>
          <InfoPanel />
          <PhoneNumber className="ml-auto">{contacts.phone}</PhoneNumber>
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
          <div className={`ml-auto ${styles.flex}`}>
            {!loggedIn ? (
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
            ) : (
              <Link to={RoutePaths.PROFILE}>
                <Icon name={IconName.USER} width={40} height={40} color="var(--color-text)" className="icon mr-1" />
              </Link>
            )}
            <Link to={RoutePaths.CART}>
              <Badge badgeContent={totalAmount} color="secondary">
                <Icon name={IconName.CART} width={40} height={40} color="var(--color-text)" className="icon mr-1" />
              </Badge>
            </Link>
            <span className={styles.totalPriceValue}>{totalPriceValue}</span>
            <span className={styles.currency}>{currency.value}</span>
          </div>
        </div>
      </Container>
      <nav className={styles.navbar}>
        <Container sx={{ display: 'flex', alignItems: 'center' }} maxWidth="xl">
          <Categories size={'l'} variant={'horizontal'} />
          <div className={`ml-auto ${styles.flex}`}>
            <Link className={styles.link} to={RoutePaths.ABOUT}>
              About Us
            </Link>
            <ThemeToggle />
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default observer(Header);
