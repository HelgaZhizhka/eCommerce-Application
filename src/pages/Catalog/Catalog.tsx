import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState, MouseEvent } from 'react';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';

import { Breadcrumbs } from '../../components/baseComponents/Breadcrumbs';
import { RoutePaths } from '../../routes/routes.enum';
import { Filter } from '../../components/Filter';
import { Sorting } from '../../components/Sorting';
import { ProductList } from '../../components/ProductList';
import { productStore } from '../../stores';
import styles from './Catalog.module.scss';
import { FilterMobile } from '../../components/FilterMobile';
import { SortMobile } from '../../components/SortMobile';

type Params = {
  categoryId: string;
  subcategoryId?: string;
};

const Catalog: React.FC = () => {
  const { isFilterSize, isFilterColor } = productStore;
  const [anchorElFilter, setAnchorElFilter] = useState<null | HTMLElement>(null);
  const [anchorElSort, setAnchorElSort] = useState<null | HTMLElement>(null);

  const handleClickFilter = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorElFilter(event.currentTarget);
  };
  const handleCloseFilter = (): void => {
    setAnchorElFilter(null);
  };

  const handleClickSort = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorElSort(event.currentTarget);
  };
  const handleCloseSort = (): void => {
    setAnchorElSort(null);
  };

  const { categoryId, subcategoryId } = useParams<Params>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (!categoryId) {
      return;
    }

    let id = productStore.categoryIdByName(categoryId);

    if (subcategoryId) {
      id = productStore.categoryIdByName(subcategoryId);
    }

    if (id) {
      productStore.fetchProductsByCategory(id);
    }
  }, [categoryId, subcategoryId]);

  if (!categoryId) {
    return <Navigate to={RoutePaths.ERROR} />;
  }

  const breadcrumbItems = [
    { text: 'Home', path: RoutePaths.MAIN },
    { text: categoryId, path: `${RoutePaths.MAIN}category/${categoryId}` },
  ];

  if (subcategoryId) {
    breadcrumbItems.push({ text: subcategoryId, path: `${RoutePaths.MAIN}category/${categoryId}/${subcategoryId}` });
  }

  return (
    <Container maxWidth="xl">
      <div className={styles.root}>
        <div className={`${styles.sticky} ${styles.productsPanel}`}>
          <Breadcrumbs items={breadcrumbItems} className={styles.breadcrumb} />
          {!isMobile ? (
            <Sorting />
          ) : (
            <div className={styles.actions}>
              <IconButton aria-label="sort" onClick={handleClickFilter}>
                <FilterListIcon />
              </IconButton>
              <FilterMobile
                isFilterSize={isFilterSize}
                isFilterColor={isFilterColor}
                anchorElFilter={anchorElFilter}
                handleCloseFilter={handleCloseFilter}
                categoryId={categoryId}
              />
              <IconButton aria-label="filter" onClick={handleClickSort}>
                <SortIcon />
              </IconButton>
              <SortMobile anchorElSort={anchorElSort} handleCloseSort={handleCloseSort} />
            </div>
          )}
        </div>
        <div className={styles.container}>
          {!isMobile && (
            <aside>
              <Filter
                isFilterSize={isFilterSize}
                isFilterColor={isFilterColor}
                className={`${styles.sticky} ${styles.filter}`}
                categoryId={categoryId}
              />
            </aside>
          )}
          <div className={styles.products}>
            <ProductList className={styles.productsList} categoryId={categoryId} subcategoryId={subcategoryId} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Catalog;
