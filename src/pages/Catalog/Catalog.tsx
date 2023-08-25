import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Container from '@mui/material/Container';

import { Breadcrumbs } from '../../components/baseComponents/Breadcrumbs';
import { RoutePaths } from '../../routes/routes.enum';
import { Card } from '../../components/Card';
import { Filter } from '../../components/Filter';
import { cards } from '../../constants';
import styles from './Catalog.module.scss';
import { Sorting } from '../../components/Sorting';
import { productStore } from '../../stores';

type CatalogParams = {
  category: string;
};

const Catalog: React.FC = () => {
  const { category } = useParams<CatalogParams>();
  const number = 8;
  const { products } = productStore;

  return (
    <Container maxWidth="xl">
      <div className={styles.root}>
        <Breadcrumbs
          items={[{ text: 'Home', path: RoutePaths.MAIN }, { text: `${category}` }]}
          className={styles.breadcrumb}
        />
        <div className={styles.container}>
          <aside>
            <Filter />
          </aside>
          <div className={styles.products}>
            <div className={styles.productsPanel}>
              <div className={styles.panelColLeft}>Display: {number} per page</div>
              <div className={styles.panelColRight}>
                <Sorting />
              </div>
            </div>
            <ul className={`list ${styles.productsList}`}>
              {/* const { id, productName, description, price, priceDiscount, currency, images, isDiscount } = products; */}
              {products.map((card) => (
                <li className={styles.productItem} key={card.id}>
                  <Link to={card.id}>
                    <Card
                      id={card.id}
                      productName={card.productName}
                      description={card.description}
                      cardImages={card.images}
                      price={card.price}
                      priceDiscount={card.priceDiscount}
                      currency={card.currency}
                      isDiscount={card.isDiscount}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default observer(Catalog);
