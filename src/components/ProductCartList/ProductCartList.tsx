import { observer } from 'mobx-react-lite';

import { cartStore } from '../../stores';
import { CardMini } from '../CardMini';
import styles from './ProductCartList.module.scss';

type Props = {
  className?: string;
  productsInCart: typeof cartStore.productsInCart;
};

const ProductCartList: React.FC<Props> = ({ productsInCart }) => {
  const deleteItemFromCart = (lineItemId: string): void => {
    cartStore.removeFromCart(lineItemId);
  };

  const onChangeQuantity = (lineItemId: string, quantity: number): void => {
    cartStore.changeQuantity(lineItemId, quantity);
  };

  return (
    <ul className={styles.root}>
      {productsInCart.map((product) => {
        const {
          lineItemId,
          productKey,
          productName,
          variants,
          price,
          currency,
          isDiscount,
          priceDiscount,
          quantity,
          totalPrice,
          isPromo,
          promoPrice,
        } = product;
        return (
          <li className={styles.productItem} key={productKey}>
            <CardMini
              lineItemId={lineItemId}
              productName={productName}
              images={variants[0].images || []}
              variant={variants[0]}
              price={price}
              currency={currency}
              isDiscount={isDiscount}
              priceDiscount={priceDiscount}
              totalPrice={totalPrice}
              quantity={quantity}
              isPromo={isPromo}
              promoPrice={promoPrice}
              onDelete={deleteItemFromCart}
              onChangeQuantity={onChangeQuantity}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default observer(ProductCartList);
