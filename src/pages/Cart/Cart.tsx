import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@mui/material/Container';

import { cartStore } from '../../stores';
import { ProductCartList } from '../../components/ProductCartList';
import { EmptyCart } from '../../components/EmptyCart';
import { RoutePaths } from '../../routes/routes.enum';
import { Breadcrumbs } from '../../components/baseComponents/Breadcrumbs';
import styles from './Cart.module.scss';

const Cart: React.FC = () => {
  const { productsInCart, totalAmount, getCart } = cartStore;
  const breadcrumbItems = [
    { text: 'Home', path: RoutePaths.MAIN },
    { text: 'Cart', path: `${RoutePaths.CART}` },
  ];

  useEffect(() => {
    getCart();
  }, []);

  return (
    <Container maxWidth="xl">
      <div className={styles.root}>
        <Breadcrumbs items={breadcrumbItems} className={styles.breadcrumb} />
        {totalAmount ? (
          <>
            <ProductCartList productsInCart={productsInCart} />
            <div className={styles.totalAmount}>{totalAmount}</div>
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
    </Container>
  );
};

export default observer(Cart);
