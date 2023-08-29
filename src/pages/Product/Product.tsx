import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';

import { productStore } from '../../stores';
import { RoutePaths } from '../../routes/routes.enum';
import { Breadcrumbs } from '../../components/baseComponents/Breadcrumbs';
import { CurrentProduct } from '../../components/CurrentProduct';
import styles from './Product.module.scss';

type Params = {
  category: string;
  productId: string;
};

const Product: React.FC = () => {
  const { category, productId } = useParams<Params>();

  useEffect(() => {
    if (!productId) {
      return;
    }
    productStore.fetchProduct(productId);
  }, [category, productId]);

  const breadcrumbItems = [
    { text: 'Home', path: RoutePaths.MAIN },
    // { text: category, path: `${RoutePaths.MAIN}category/${category}` },
    // { text: productId, path: `${RoutePaths.MAIN}product/${productId}` },
  ];

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
