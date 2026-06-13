import { ProductType } from '../../stores/Store.types';
import { useChangeQuantityMutation, useRemoveLineItemMutation } from '../../queries/cart';
import { CardMini } from '../CardMini';
import styles from './ProductCartList.module.scss';

type Props = {
  className?: string;
  productsInCart: ProductType[];
};

const ProductCartList: React.FC<Props> = ({ productsInCart }) => {
  const removeLineItem = useRemoveLineItemMutation();
  const changeQuantity = useChangeQuantityMutation();

  const deleteItemFromCart = (lineItemId: string): void => {
    removeLineItem.mutate(lineItemId);
  };

  const onChangeQuantity = (lineItemId: string, quantity: number): void => {
    changeQuantity.mutate({ lineItemId, quantity });
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

export default ProductCartList;
