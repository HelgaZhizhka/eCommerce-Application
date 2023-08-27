import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Box from '@mui/system/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { productStore } from '../../stores';
import { RoutePaths } from '../../routes/routes.enum';
import { Card } from '../Card';
import styles from './ProductList.module.scss';

type Props = {
  className?: string;
  categoryId: string;
};

const ProductList: React.FC<Props> = ({ className, categoryId }) => {
  const { products, isProductsLoading } = productStore;

  const generateProductPath = (catId: string, productId: string): string =>
    RoutePaths.PRODUCT.replace(':categoryId', catId).replace(':productId', productId);

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
      {products.map((card) => {
        const { slug, productName, description, price, priceDiscount, currency, images, isDiscount } = card;
        return (
          <li className={styles.productItem} key={slug}>
            <Link to={generateProductPath(categoryId, slug.toString())}>
              <Card
                productName={productName}
                description={description}
                cardImages={images}
                price={price}
                priceDiscount={priceDiscount}
                currency={currency}
                isDiscount={isDiscount}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default observer(ProductList);
