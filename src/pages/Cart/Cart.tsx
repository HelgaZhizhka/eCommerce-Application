import { useEffect, useState } from 'react';
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
import { PromoCode } from '../../components/baseComponents/PromoCode';
import { getPriceValue } from '../../stores/productHelpers';
import styles from './Cart.module.scss';
import { ModalConfirm } from '../../components/ModalConfirm';

const Cart: React.FC = () => {
  const { productsInCart, totalAmount, totalPrice, getCart, clearCart } = cartStore;
  const breadcrumbItems = [
    { text: 'Home', path: RoutePaths.MAIN },
    { text: 'Cart', path: `${RoutePaths.CART}` },
  ];

  useEffect(() => {
    getCart();
  }, []);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const totalPriceValue = getPriceValue(totalPrice);

  const handlePromoCode = (code: string): void => {
    console.log('handlePromoCode', code);
  };

  const onCloseModal = (): void => {
    setIsOpenModal(false);
  };

  const onOpenModal = (): void => {
    setIsOpenModal(true);
  };

  const onDeleteItemsFromCart = (): void => {
    clearCart();
    setIsOpenModal(false);
  };

  return (
    <Container maxWidth="xl">
      <ModalConfirm
        title={'Delete all'}
        onClose={onCloseModal}
        isOpen={isOpenModal}
        deleteItemsFromCart={onDeleteItemsFromCart}
      />
      <div className={styles.root}>
        <Breadcrumbs items={breadcrumbItems} className={styles.breadcrumb} />
        {totalAmount ? (
          <>
            <ProductCartList productsInCart={productsInCart} />
            <div className={styles.footer}>
              <Button onClick={onOpenModal} sx={{ fontSize: '24px' }} color={'error'}>
                Delete all products{' '}
                <Icon name={IconName.DELETE} width={30} height={30} color="var(--state-error)" className="icon mr-1" />
              </Button>
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
