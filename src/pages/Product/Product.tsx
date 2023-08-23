import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';

import { RoutePaths } from '../../routes/routes.enum';
import { Breadcrumbs } from '../../components/baseComponents/Breadcrumbs';
import { Price } from '../../components/baseComponents/Price';
import { cards } from '../../constants';
import styles from './Product.module.scss';

const Product: React.FC = () => {
  const { category, id } = useParams();
  const card = cards.find((item) => item.id === id);
  const { productName, description, cardImage, price, priceDiscount, currency } = card || {};

  if (!card) {
    return <Navigate to={RoutePaths.ERROR} />;
  }

  return (
    <Container maxWidth="xl">
      <section className={styles.root}>
        <Breadcrumbs
          items={[
            { text: 'Home', path: RoutePaths.MAIN },
            { text: `${category}`, path: `${RoutePaths.MAIN}${category}` },
            { text: `${productName}` },
          ]}
          className={styles.breadcrumb}
        />
        <div className={styles.container}>
          <div className={styles.column}>
            <img src={cardImage} alt={productName} />
          </div>
          <div className={styles.column}>
            <h2 className={styles.title}>{productName}</h2>
            <p>{description}</p>
            <p>
              <strong>Material:</strong>
              <span>100% Organic Cotton</span>
            </p>
            <div>
              {priceDiscount ? (
                <>
                  <Price variant="old" currency={currency}>
                    {price}
                  </Price>
                  <Price variant="new" currency={currency}>
                    {priceDiscount}
                  </Price>
                </>
              ) : (
                <Price currency={currency}>{price}</Price>
              )}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Product;
