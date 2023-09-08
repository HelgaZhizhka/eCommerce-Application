import { observer } from 'mobx-react-lite';

import { cartStore } from '../../stores';
import styles from './ProductCartList.module.scss';

type Props = {
  className?: string;
  productsInCart: typeof cartStore.productsInCart;
};

const ProductCartList: React.FC<Props> = ({ className, productsInCart }) => (
  <ul className={`${className} ${styles.root}`}>
    {productsInCart.map((product) => {
      const { key, productName, description } = product;
      return (
        <li className={styles.productItem} key={key}>
          <div className={styles.product}>
            <h4>{productName}</h4>
            <p
              className={`text-overflow ${styles.cardDescription}`}
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
          </div>
        </li>
      );
    })}
  </ul>
);

export default observer(ProductCartList);
