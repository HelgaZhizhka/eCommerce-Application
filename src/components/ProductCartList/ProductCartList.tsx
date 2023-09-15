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
          key,
          productName,
          variants,
          price,
          currency,
          isDiscount,
          priceDiscount,
          quantity,
          totalPrice,
        } = product;
        return (
          <li className={styles.productItem} key={key}>
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
