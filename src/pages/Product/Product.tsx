import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';

import { productStore } from '../../stores';
import { RoutePaths } from '../../routes/routes.enum';
import { Breadcrumbs } from '../../components/baseComponents/Breadcrumbs';
import { CurrentProduct } from '../../components/CurrentProduct';
import styles from './Product.module.scss';

type Params = {
  categoryId: string;
  subcategoryId?: string;
  productId: string;
};

const Product: React.FC = () => {
  const { categoryId, subcategoryId, productId } = useParams<Params>();

  useEffect(() => {
    if (!productId) {
      return;
    }
    productStore.fetchProduct(productId);
  }, [categoryId, subcategoryId, productId]);

  const breadcrumbItems = [{ text: 'Home', path: RoutePaths.MAIN }];

  if (categoryId) {
    breadcrumbItems.push({ text: categoryId, path: `${RoutePaths.MAIN}category/${categoryId}` as RoutePaths });
  }

  if (productId) {
    if (subcategoryId) {
      breadcrumbItems.push(
        {
          text: subcategoryId,
          path: `${RoutePaths.MAIN}category/${categoryId}/${subcategoryId}` as RoutePaths,
        },
        {
          text: productId,
          path: `${RoutePaths.MAIN}product/${categoryId}/${subcategoryId}/${productId}` as RoutePaths,
        }
      );
    } else {
      breadcrumbItems.push({
        text: productId,
        path: `${RoutePaths.MAIN}product/${categoryId}/${productId}` as RoutePaths,
      });
    }
  }

  return (
    <Container maxWidth="xl">
      <section className={styles.root}>
        <Breadcrumbs items={breadcrumbItems} className={styles.breadcrumb} />

        <CurrentProduct />
      </section>
    </Container>
  );
};

export default Product;
