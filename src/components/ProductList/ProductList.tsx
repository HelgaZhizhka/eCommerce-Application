import { Box, CircularProgress } from '@mui/material';

import { ProductType } from '../../stores/Store.types';
import { Card } from '../Card';
import styles from './ProductList.module.scss';

type Props = {
  className?: string;
  categoryId: string;
  subcategoryId?: string | null;
  products: ProductType[];
  isLoading: boolean;
};

const ProductList: React.FC<Props> = ({ className, categoryId, subcategoryId, products, isLoading }) => {
  return isLoading ? (
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

export default ProductList;
