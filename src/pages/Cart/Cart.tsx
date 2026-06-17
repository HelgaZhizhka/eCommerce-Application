import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useApplyPromoMutation, useCartQuery, useClearCartMutation, useRemovePromoMutation } from '../../queries/cart';
import { ProductCartList } from '../../components/ProductCartList';
import { EmptyCart } from '../../components/EmptyCart';
import { RoutePaths } from '../../routes/routes.enum';
import { Icon } from '../../components/baseComponents/Icon';
import { IconName } from '../../components/baseComponents/Icon/Icon.enum';
import { Breadcrumbs } from '../../components/baseComponents/Breadcrumbs';
import { PromoCode } from '../../components/baseComponents/PromoCode';
import { ModalConfirm } from '../../components/ModalConfirm';
import { Price } from '../../components/baseComponents/Price';
import { PageContainer } from '../../components/baseComponents/PageContainer';
import { getPriceValue } from '../../stores/productHelpers';
import { currency } from '../../constants';

const Cart: React.FC = () => {
  const { products: productsInCart, totalAmount, totalPrice, discount } = useCartQuery();
  const clearCart = useClearCartMutation();
  const applyPromo = useApplyPromoMutation();
  const removePromo = useRemovePromoMutation();

  const breadcrumbItems = [
    { text: 'Home', path: RoutePaths.MAIN },
    { text: 'Cart', path: `${RoutePaths.CART}` },
  ];

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalCheckout, setIsOpenModalCheckout] = useState(false);

  const totalPriceValue = getPriceValue(totalPrice);

  const modalCheckoutContent = (
    <div className="text-center">
      <p>Expect your favorite products to come to you soon!</p>
      <p>It will be...</p>
      <p>When we finalize the payment system.</p>
      <p>Stay with us!</p>
    </div>
  );

  const modalConfirmContent = (
    <div className="text-center">
      Are you sure you want to remove all those products?
      <p>
        <Link className="text-primary underline" to={RoutePaths.SALE}>
          Here
        </Link>{' '}
        is a list of our discounts, you may be interested in it.
      </p>
    </div>
  );

  return (
    <PageContainer>
      <ModalConfirm
        title="Delete all products"
        content={modalConfirmContent}
        onClose={(): void => setIsOpenModal(false)}
        isOpen={isOpenModal}
        onConfirm={(): void => {
          clearCart.mutate(undefined);
          setIsOpenModal(false);
        }}
      />
      <ModalConfirm
        title="We thank you for your wonderful choice!"
        content={modalCheckoutContent}
        onClose={(): void => setIsOpenModalCheckout(false)}
        isOpen={isOpenModalCheckout}
      />

      <Breadcrumbs items={breadcrumbItems} className="py-4" />

      {totalAmount ? (
        <>
          <ProductCartList productsInCart={productsInCart} />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={(): void => setIsOpenModal(true)}
              className="flex items-center gap-1 text-2xl text-danger"
            >
              Delete all products <Icon name={IconName.DELETE} width={30} height={30} color="var(--state-error)" />
            </button>
            <span className="flex items-center gap-2 text-2xl font-semibold">
              <span>TOTAL:</span>
              <Price currency={currency.value}>{totalPriceValue}</Price>
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <PromoCode onChange={(code): void => applyPromo.mutate(code)} />

            {discount && (
              <div className="flex items-center gap-2">
                <span>Active Promo Code:</span>
                <span className="font-semibold text-primary">{discount.name}</span>
                <button type="button" onClick={(): void => removePromo.mutate(discount.id)} aria-label="remove promo">
                  <Icon name={IconName.DELETE} width={30} height={30} color="var(--state-error)" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={(): void => setIsOpenModalCheckout(true)}
              className="w-full rounded bg-success px-6 py-2 text-xl text-white transition-opacity hover:opacity-90 md:w-[300px]"
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </PageContainer>
  );
};

export default Cart;
