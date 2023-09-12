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
      const { key, productName, images } = product;
      return (
        <li className={styles.productItem} key={key}>
          <CardMini productName={productName} images={images} />
        </li>
      );
    })}
  </ul>
);

export default observer(ProductCartList);
