import { useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Container from '@mui/material/Container';

import { Breadcrumbs } from '../../components/baseComponents/Breadcrumbs';
import { RoutePaths } from '../../routes/routes.enum';
import { Filter } from '../../components/Filter';
import { Sorting } from '../../components/Sorting';
import { ProductList } from '../../components/ProductList';
import { productStore } from '../../stores';
import styles from './Catalog.module.scss';

type Params = {
  categoryId: string;
};

const Catalog: React.FC = () => {
  const { categoryId } = useParams<Params>();
  const number = 8;

  useEffect(() => {
    productStore.fetchProducts();
  }, []);

  if (!categoryId) {
    return <Navigate to={RoutePaths.ERROR} />;
  }

  const categoryPath = `${RoutePaths.CATEGORY.replace(':categoryId', categoryId)}`;

  return (
    <Container maxWidth="xl">
      <div className={styles.root}>
        <Breadcrumbs
          items={[
            { text: 'Home', path: RoutePaths.MAIN },
            { text: categoryId, path: categoryPath },
          ]}
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
            <ProductList className={styles.productsList} categoryId={categoryId} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Catalog;
