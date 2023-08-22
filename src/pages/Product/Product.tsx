import React from 'react';
import Container from '@mui/material/Container';

import { Breadcrumb } from '../../components/baseComponents/Breadcrumb';
import styles from './Product.module.scss';

type CatalogParams = {
  category: string;
};

const Product: React.FC = () => (
  <Container className={styles.root} maxWidth="xl">
    <Breadcrumb className={styles.breadcrumb} />
    <section className={styles.section}>
      <h2>Product</h2>
    </section>
  </Container>
);

export default Product;
