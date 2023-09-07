import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState, MouseEvent } from 'react';
import { observer } from 'mobx-react-lite';
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
import { FilterMobile } from '../../components/FilterMobile';
import { SortMobile } from '../../components/SortMobile';
import { Search } from '../../components/baseComponents/Search';
import { PaginationCatalog } from '../../components/baseComponents/PaginationCatalog';

import styles from './Catalog.module.scss';
import { DEFAULT_LIMIT } from '../../constants';

type Params = {
  categoryId: string;
  subcategoryId?: string;
};

const Catalog: React.FC = () => {
  const {
    isFilterSize,
    isFilterColor,
    totalProducts,
    fetchProductsByCategory,
    categoryIdByName,
    fetchProductsTypeByCategory,
    getFilteredProducts,
    fetchSearchProducts,
    clearFilterData,
    setCurrentPage,
    resetCurrentPage,
  } = productStore;

  const { categoryId, subcategoryId } = useParams<Params>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorElFilter, setAnchorElFilter] = useState<null | HTMLElement>(null);
  const [anchorElSort, setAnchorElSort] = useState<null | HTMLElement>(null);

  function getProducts(catId: string, subId: string | undefined): void {
    fetchProductsTypeByCategory(catId);

    let id = categoryIdByName(catId);

    if (subId) {
      id = categoryIdByName(subId);
    }

    if (id) {
      fetchProductsByCategory(id);
    }
  }

  useEffect(() => {
    if (!categoryId) {
      return;
    }
    resetCurrentPage();
    getProducts(categoryId, subcategoryId);
  }, [categoryId, subcategoryId]);

  if (!categoryId) {
    return <Navigate to={RoutePaths.ERROR} />;
  }

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

  const handleChange = (): void => {
    getFilteredProducts(subcategoryId || categoryId);
  };

  const handleResetFilters = (): void => {
    clearFilterData();
    getProducts(categoryId, subcategoryId);
  };

  const handleSearch = (): void => {
    fetchSearchProducts(subcategoryId || categoryId);
  };

  const totalPages = Math.floor(totalProducts / DEFAULT_LIMIT);

  const breadcrumbItems = [
    { text: 'Home', path: RoutePaths.MAIN },
    { text: categoryId, path: `${RoutePaths.MAIN}category/${categoryId}` },
  ];

  if (subcategoryId) {
    breadcrumbItems.push({ text: subcategoryId, path: `${RoutePaths.MAIN}category/${categoryId}/${subcategoryId}` });
  }

  const handlePaginationChange = (page: number): void => {
    setCurrentPage(page);
    getProducts(categoryId, subcategoryId);
  };

  return (
    <Container maxWidth="xl">
      <div className={styles.root}>
        <div className={`${styles.sticky} ${styles.productsPanel}`}>
          <Breadcrumbs items={breadcrumbItems} className={styles.breadcrumb} />
          <Search onChange={handleSearch} className={styles.search} />
          {!isMobile ? (
            <Sorting onChange={handleChange} />
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
                onReset={handleResetFilters}
                onChange={handleChange}
              />
              <IconButton aria-label="filter" onClick={handleClickSort}>
                <SortIcon />
              </IconButton>
              <SortMobile anchorElSort={anchorElSort} handleCloseSort={handleCloseSort} onChange={handleChange} />
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
                onReset={handleResetFilters}
                onChange={handleChange}
              />
            </aside>
          )}
          <div className={styles.products}>
            <ProductList className={styles.productsList} categoryId={categoryId} subcategoryId={subcategoryId} />
            {totalPages > 1 && <PaginationCatalog handleChange={handlePaginationChange} totalPages={totalPages} />}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default observer(Catalog);
