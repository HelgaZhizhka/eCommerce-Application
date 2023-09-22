import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const {
    productsInCart,
    totalAmount,
    totalPrice,
    discountPromo,
    getCart,
    clearCart,
    addPromoCodeToCart,
    deletePromoCode,
  } = cartStore;
  const breadcrumbItems = [
    { text: 'Home', path: RoutePaths.MAIN },
    { text: 'Cart', path: `${RoutePaths.CART}` },
  ];

  useEffect(() => {
    getCart();
  }, []);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [isOpenModalCheckout, setIsOpenModalCheckout] = useState(false);

  const totalPriceValue = getPriceValue(totalPrice);

  const modalCheckoutContent = (
    <div className={styles.modalContent}>
      <p>Expect your favorite products to come to you soon!</p>
      <p>It will be...</p>
      <p>When we finalize the payment system.</p>
      <p>Stay with us!</p>
    </div>
  );

  const modalConfirmContent = (
    <div className={styles.modalContent}>
      Are you sure you want to remove all those products?
      <p>
        <Link to={RoutePaths.SALE}>Here</Link> is a list of our discounts, you may be interested in it.
      </p>
    </div>
  );

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

  const onCheckoutCart = (): void => {
    setIsOpenModalCheckout(true);
  };

  const onCloseModalCheckout = (): void => {
    setIsOpenModalCheckout(false);
  };

  return (
    <Container maxWidth="xl">
      <ModalConfirm
        title={'Delete all products'}
        content={modalConfirmContent}
        onClose={onCloseModal}
        isOpen={isOpenModal}
        onConfirm={onDeleteItemsFromCart}
      />
      <ModalConfirm
        title={'We thank you for your wonderful choice!'}
        content={modalCheckoutContent}
        onClose={onCloseModalCheckout}
        isOpen={isOpenModalCheckout}
      />
      <div className={styles.root}>
        <Breadcrumbs items={breadcrumbItems} className={styles.breadcrumb} />
        {totalAmount ? (
          <>
            <ProductCartList productsInCart={productsInCart} />
            <div className={styles.footer}>
              <Button onClick={onOpenModal} sx={{ fontSize: '24px', p: 0 }} color={'error'}>
                Delete all products <Icon name={IconName.DELETE} width={30} height={30} color="var(--state-error)" />
              </Button>
              <span className={`${styles.flex} ${styles.totalPrice}`}>
                <span>TOTAL:</span>
                <Price className={styles.totalPrice} currency={currency.value}>
                  {totalPriceValue}
                </Price>
              </span>
            </div>
            <div className={styles.footer}>
              <PromoCode className={styles.promo} onChange={handlePromoCode} />

              {discountPromo.discountCodeName && (
                <div className={styles.flex}>
                  <span>Active Promo Code:</span>
                  <span className={styles.promoCode}>{discountPromo.discountCodeName}</span>
                  <Button onClick={deletePromoCode} sx={{ p: 0, minWidth: '30px' }} color={'error'}>
                    <Icon name={IconName.DELETE} width={30} height={30} color="var(--state-error)" />
                  </Button>
                </div>
              )}

              <Button
                onClick={onCheckoutCart}
                sx={{ fontSize: '1.25rem', width: { md: '300px', xs: 'auto' }, mt: { md: '0', xs: '20px' } }}
                variant="contained"
                color="success"
              >
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
