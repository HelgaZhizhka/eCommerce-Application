import { observer } from 'mobx-react-lite';

import { cartStore } from '../../stores';
import { CardMini } from '../CardMini';
import styles from './ProductCartList.module.scss';

type Props = {
  className?: string;
  productsInCart: typeof cartStore.productsInCart;
};

const ProductCartList: React.FC<Props> = ({ className, productsInCart }) => (
  <ul className={`${className} ${styles.root}`}>
    {productsInCart.map((product) => {
      const { key, productName, images, price, currency, isDiscount, priceDiscount, totalPrice } = product;
      return (
        <li className={styles.productItem} key={key}>
          <CardMini
            productName={productName}
            images={images}
            price={price}
            currency={currency}
            isDiscount={isDiscount}
            priceDiscount={priceDiscount}
            totalPrice={totalPrice}
          />
        </li>
      );
    })}
  </ul>
);

export default observer(ProductCartList);
