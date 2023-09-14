import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { cartStore } from '../../stores';
import { ProductCartList } from '../../components/ProductCartList';
import { EmptyCart } from '../../components/EmptyCart';
import { RoutePaths } from '../../routes/routes.enum';
import { Icon } from '../../components/baseComponents/Icon';
import { IconName } from '../../components/baseComponents/Icon/Icon.enum';
import { Breadcrumbs } from '../../components/baseComponents/Breadcrumbs';
import styles from './Cart.module.scss';
import { PromoCode } from '../../components/baseComponents/PromoCode';

function getPriceValue(value: number): number | undefined {
  return value ? +(value / 100).toFixed(2) : undefined;
}

const Cart: React.FC = () => {
  const { productsInCart, totalAmount, totalPrice, getCart } = cartStore;
  const breadcrumbItems = [
    { text: 'Home', path: RoutePaths.MAIN },
    { text: 'Cart', path: `${RoutePaths.CART}` },
  ];

  useEffect(() => {
    getCart();
  }, []);

  const totalPriceValue = getPriceValue(totalPrice);

  const handlePromoCode = (code: string): void => {
    console.log('handlePromoCode', code);
  };

  return (
    <Container maxWidth="xl">
      <div className={styles.root}>
        <Breadcrumbs items={breadcrumbItems} className={styles.breadcrumb} />
        {totalAmount ? (
          <>
            <ProductCartList productsInCart={productsInCart} />
            <div className={styles.footer}>
              <span className={styles.link}>
                Delete all products{' '}
                <Icon name={IconName.DELETE} width={30} height={30} color="var(--state-error)" className="icon mr-1" />
              </span>
              <span className={styles.total}>
                <span>TOTAL:</span>
                {totalPriceValue}
              </span>
            </div>
            <div className={styles.footer}>
              <span>
                <PromoCode onChange={handlePromoCode} />
              </span>
              <Button sx={{ fontSize: '1.25rem', width: '300px' }} variant="contained" color="success">
                <span>Checkout</span>
              </Button>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
    </Container>
  );
};

export default observer(Cart);
