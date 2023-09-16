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
import { ModalConfirm } from '../../components/ModalConfirm';
import { Price } from '../../components/baseComponents/Price';
import { getPriceValue } from '../../stores/productHelpers';
import { currency } from '../../constants';
import styles from './Cart.module.scss';

const Cart: React.FC = () => {
  const { productsInCart, totalAmount, totalPrice, discounts, getCart, clearCart, addPromoCodeToCart } = cartStore;
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
    addPromoCodeToCart(code);
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
      <ModalConfirm onClose={onCloseModal} isOpen={isOpenModal} deleteItemsFromCart={onDeleteItemsFromCart} />
      <div className={styles.root}>
        <Breadcrumbs items={breadcrumbItems} className={styles.breadcrumb} />
        {totalAmount ? (
          <>
            <ProductCartList productsInCart={productsInCart} />
            <div className={styles.footer}>
              <Button onClick={onOpenModal} sx={{ fontSize: '24px', p: 0 }} color={'error'}>
                Delete all products <Icon name={IconName.DELETE} width={30} height={30} color="var(--state-error)" />
              </Button>
              <span className={`${styles.flex} ${styles.totalPrice}}`}>
                <span>TOTAL:</span>
                <Price currency={currency.value}>{totalPriceValue}</Price>
              </span>
            </div>
            <div className={styles.footer}>
              <PromoCode className={styles.promo} onChange={handlePromoCode} />

              {discounts.length > 0 && (
                <div className={styles.flex}>
                  <span>Promo Code:</span>
                  <span>{discounts[0].discountCodesName}</span>
                </div>
              )}

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
