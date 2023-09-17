import { observer } from 'mobx-react-lite';
import Box from '@mui/system/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { productStore } from '../../stores';
import { Card } from '../Card';
import styles from './ProductList.module.scss';

type Props = {
  className?: string;
  categoryId: string;
  subcategoryId?: string | null;
};

const ProductList: React.FC<Props> = ({ className, categoryId, subcategoryId }) => {
  const { products, isProductsLoading } = productStore;

  return isProductsLoading ? (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  ) : (
    <ul className={`${className} ${styles.root}`}>
      {products.map((product) => {
        const {
          productKey,
          productId,
          productName,
          productSku,
          description,
          price,
          priceDiscount,
          currency,
          images,
          isDiscount,
          variants,
        } = product;
        return (
          <li className={styles.productItem} key={productKey}>
            <Card
              categoryId={categoryId}
              subcategoryId={subcategoryId}
              productId={productId}
              productKey={productKey}
              productName={productName}
              productSku={productSku}
              description={description}
              images={images}
              price={price}
              priceDiscount={priceDiscount}
              currency={currency}
              variants={variants}
              isDiscount={isDiscount}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default observer(ProductList);
