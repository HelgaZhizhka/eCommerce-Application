import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Box from '@mui/system/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { cartStore, productStore } from '../../stores';
import { RoutePaths } from '../../routes/routes.enum';
import { Card } from '../Card';
import styles from './ProductList.module.scss';

type Props = {
  className?: string;
  categoryId: string;
  subcategoryId?: string | null;
};

const ProductList: React.FC<Props> = ({ className, categoryId, subcategoryId }) => {
  const { products, isProductsLoading } = productStore;
  const { addToCart } = cartStore;

  const generateProductPath = (catId: string, subCatId: string | null | undefined, productId: string): string => {
    let path = RoutePaths.PRODUCT.replace(':categoryId', catId).replace(':productId', productId);
    if (subCatId) {
      path = path.replace(':subcategoryId?', subCatId);
    } else {
      path = path.replace(':subcategoryId?/', '');
    }
    return path;
  };

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
        const { key, productName, description, price, priceDiscount, currency, images, isDiscount, productId } =
          product;
        return (
          <li className={styles.productItem} key={key}>
            <Link to={generateProductPath(categoryId, subcategoryId, key.toString())}>
              <Card
                productName={productName}
                description={description}
                images={images}
                price={price}
                priceDiscount={priceDiscount}
                currency={currency}
                isDiscount={isDiscount}
                isInCart={cartStore.isProductInCart(productId)}
                onAddToCart={(): Promise<void> => addToCart(productId)}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default observer(ProductList);
