import { observer } from 'mobx-react-lite';
import Container from '@mui/material/Container';

import { cartStore } from '../../stores';
import { ProductCartList } from '../../components/ProductCartList';
import styles from './Cart.module.scss';
import { EmptyCart } from '../../components/EmptyCart';

const Cart: React.FC = () => {
  const { productsInCart, totalAmount } = cartStore;
  console.log(`TOTAL : ${totalAmount}`);
  return (
    <Container maxWidth="xl">
      {totalAmount && (
        <div className={styles.root}>
          <ProductCartList productsInCart={productsInCart} />
          <div className={styles.totalAmount}>{totalAmount}</div>
        </div>
      )}
      {!totalAmount && <EmptyCart />}
    </Container>
  );
};

export default observer(Cart);
