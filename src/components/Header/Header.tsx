import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, LogOut, Menu } from 'lucide-react';

import { RoutePaths } from '../../routes/routes.enum';
import { currency, contacts } from '../../constants';
import { IconName } from '../baseComponents/Icon/Icon.enum';
import { Icon } from '../baseComponents/Icon';
import { PhoneNumber } from '../baseComponents/PhoneNumber';
import { ThemeToggle } from '../ThemeToggle';
import { LogoVariant } from '../Logo/Logo.enum';
import { Categories } from '../Categories';
import { InfoPanel } from '../InfoPanel';
import { NavBarMobile } from '../NavBarMobile';
import { useAuthStore } from '../../stores/authStore';
import { useCartQuery } from '../../queries/cart';
import { getPriceValue } from '../../stores/productHelpers';
import { Logo } from '../Logo';

// Adaptive header (5.3): one component replaces the Header/HeaderMobile fork.
// Desktop layout shows on md+, the mobile bar below — toggled by CSS, not a
// JS media query.

const CartIcon: React.FC<{ count: number; size: number }> = ({ count, size }) => (
  <span className="relative inline-flex">
    <Icon name={IconName.CART} width={size} height={size} color="var(--color-text)" className="icon" />
    {count > 0 && (
      <span className="absolute -right-2 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-xs font-semibold text-white">
        {count}
      </span>
    )}
  </span>
);

const Header: React.FC = () => {
  const loggedIn = useAuthStore((state) => state.loggedIn);
  const logout = useAuthStore((state) => state.logout);
  const { totalAmount, totalPrice } = useCartQuery();
  const totalPriceValue = getPriceValue(totalPrice);

  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const toggleNavBar = (): void => setIsNavBarOpen((open) => !open);

  return (
    <header className="relative text-[20px]">
      {/* desktop */}
      <div className="hidden md:block">
        <div className="mx-auto grid max-w-[1536px] grid-cols-[auto_1fr] items-start gap-2.5 px-4 py-5">
          <div className="row-span-2 mr-5 lg:mr-24">
            <Logo variant={LogoVariant.DEFAULT} />
          </div>
          <div className="flex items-center">
            <InfoPanel />
            <PhoneNumber className="ml-auto">{contacts.phone}</PhoneNumber>
            {loggedIn && (
              <Link
                to={RoutePaths.MAIN}
                onClick={logout}
                className="ml-2.5 rounded border border-primary px-4 py-1 text-xl text-primary transition-colors hover:bg-primary hover:text-white"
              >
                Exit
              </Link>
            )}
          </div>
          <div className="flex">
            <div className="ml-auto flex items-center gap-2.5">
              {!loggedIn ? (
                <>
                  <Link
                    to={RoutePaths.LOGIN}
                    className="rounded border border-primary px-4 py-1 text-xl text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    Sign in
                  </Link>
                  <Link
                    to={RoutePaths.REGISTRATION}
                    className="rounded bg-primary px-4 py-1 text-xl text-white transition-colors hover:bg-primary/85"
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <Link to={RoutePaths.PROFILE}>
                  <Icon name={IconName.USER} width={40} height={40} color="var(--color-text)" className="icon" />
                </Link>
              )}
              <Link to={RoutePaths.CART}>
                <CartIcon count={totalAmount} size={40} />
              </Link>
              {totalPriceValue > 0 && (
                <span className="ml-2.5 text-2xl font-semibold">
                  {totalPriceValue} <span className="ml-1">{currency.value}</span>
                </span>
              )}
            </div>
          </div>
        </div>
        <nav className="flex min-h-[68px] items-center bg-black">
          <div className="mx-auto flex w-full max-w-[1536px] items-center px-4">
            <Categories size="l" variant="horizontal" />
            <div className="ml-auto flex items-center">
              <Link className="mx-4 text-2xl transition-colors hover:text-orange-light" to={RoutePaths.ABOUT}>
                About Us
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>

      {/* mobile */}
      <div className="md:hidden">
        <div className="flex items-center px-4 py-3">
          <button type="button" aria-label="menu" onClick={toggleNavBar} className="p-2">
            <Menu size={32} />
          </button>
          <div className="ml-1">
            <Logo variant={LogoVariant.DEFAULT} />
          </div>
          <div className="ml-auto flex items-center gap-2">
            {loggedIn && (
              <Link to={RoutePaths.PROFILE} aria-label="profile">
                <Icon name={IconName.USER} width={30} height={30} color="var(--color-text)" className="icon" />
              </Link>
            )}
            <Link to={RoutePaths.CART} aria-label="cart">
              <CartIcon count={totalAmount} size={30} />
            </Link>
            {!loggedIn ? (
              <Link to={RoutePaths.LOGIN} aria-label="login">
                <LogIn size={32} />
              </Link>
            ) : (
              <Link to={RoutePaths.MAIN} onClick={logout} aria-label="logout">
                <LogOut size={32} />
              </Link>
            )}
            <ThemeToggle />
          </div>
        </div>
        <NavBarMobile onClose={toggleNavBar} isOpen={isNavBarOpen} />
      </div>
    </header>
  );
};

export default Header;
