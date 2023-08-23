import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';

import { Breadcrumbs } from '../../components/baseComponents/Breadcrumbs';
import { RoutePaths } from '../../routes/routes.enum';
import { cards } from '../../constants';
import styles from './Product.module.scss';

const Product: React.FC = () => {
  const { category, id } = useParams();
  const card = cards.find((item) => item.id === id);
  const { productName, description, cardImage, price, priceOld, priceDiscount, currency } = card || {};

  if (!card) {
    return <Navigate to={RoutePaths.ERROR} />;
  }

  return (
    <Container className={styles.root} maxWidth="xl">
      <Breadcrumbs
        items={[
          { text: 'Home', path: RoutePaths.MAIN },
          { text: `${category}`, path: `${RoutePaths.MAIN}${category}` },
          { text: `${productName}` },
        ]}
        className={styles.breadcrumb}
      />
      <section className={styles.section}>
        <h2>{productName}</h2>
        <p>{description}</p>
        <img src={cardImage} alt={productName} />
        <div>
          {price && (
            <span className={styles.cardPrice}>
              <span className={styles.value}>{price}</span>
              <span className={styles.currency}>{currency}</span>
            </span>
          )}
          {priceOld && (
            <span className={styles.cardPriceOld}>
              <span className={styles.value}>{priceOld}</span>
              <span className={styles.currency}>{currency}</span>
            </span>
          )}
          {priceDiscount && (
            <span className={styles.cardPriceDiscount}>
              <span className={styles.value}>{priceDiscount}</span>
              <span className={styles.currency}>{currency}</span>
            </span>
          )}
        </div>
      </section>
    </Container>
  );
};

export default Product;
