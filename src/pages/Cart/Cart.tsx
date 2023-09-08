import { observer } from 'mobx-react-lite';
import Container from '@mui/material/Container';

import { cartStore } from '../../stores';
import { ProductCartList } from '../../components/ProductCartList';
import styles from './Cart.module.scss';

const Cart: React.FC = () => {
  const { productsInCart, totalAmount } = cartStore;
  return (
    <Container maxWidth="xl">
      <div className={styles.root}>
        <ProductCartList productsInCart={productsInCart} />
        <div className={styles.totalAmount}>{totalAmount}</div>
      </div>
    </Container>
  );
};

export default observer(Cart);
