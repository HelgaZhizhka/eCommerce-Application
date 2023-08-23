import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '@mui/material/Container';

import { Breadcrumbs } from '../../components/baseComponents/Breadcrumbs';
import { RoutePaths } from '../../routes/routes.enum';
import { Card } from '../../components/Card';
import { Filter } from '../../components/Filter';
import { cards } from '../../constants';
import styles from './Catalog.module.scss';
import { Sorting } from '../../components/Sorting';

type CatalogParams = {
  category: string;
};

const Catalog: React.FC = () => {
  const { category } = useParams<CatalogParams>();
  const number = 8;

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
              {cards.map((card) => (
                <li className={styles.productItem} key={card.id}>
                  <Link to={card.id}>
                    <Card
                      id={card.id}
                      productName={card.productName}
                      description={card.description}
                      cardImage={card.cardImage}
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

export default Catalog;
