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
    currentPage,
    fetchProductsByCategory,
    categoryIdByName,
    fetchProductsTypeByCategory,
    getFilteredProducts,
    fetchSearchProducts,
    paginationNavigate,
    setCurrentPage,
    clearFilterData,
  } = productStore;

  const { categoryId, subcategoryId } = useParams<Params>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorElFilter, setAnchorElFilter] = useState<null | HTMLElement>(null);
  const [anchorElSort, setAnchorElSort] = useState<null | HTMLElement>(null);

  const getId = (): string | undefined => {
    if (!categoryId) {
      return '';
    }

    const idCategory = subcategoryId || categoryId;

    return categoryIdByName(idCategory);
  };

  const getProducts = (): void => {
    if (!categoryId) {
      return;
    }

    fetchProductsTypeByCategory(categoryId);

    const id = getId();

    if (id) {
      fetchProductsByCategory(id);
    }
  };

  useEffect(() => {
    if (!categoryId) {
      return;
    }

    setCurrentPage(1);
    clearFilterData();

    getProducts();
  }, [categoryId, subcategoryId]);

  if (!categoryId) {
    return <Navigate to={RoutePaths.ERROR} />;
  }

  const totalPages = Math.ceil(totalProducts / DEFAULT_LIMIT);

  const breadcrumbItems = [
    { text: 'Home', path: RoutePaths.MAIN },
    { text: categoryId, path: `${RoutePaths.MAIN}category/${categoryId}` },
  ];

  if (subcategoryId) {
    breadcrumbItems.push({ text: subcategoryId, path: `${RoutePaths.MAIN}category/${categoryId}/${subcategoryId}` });
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

  const handleFilterChange = (): void => {
    setCurrentPage(1);

    const id = getId();

    if (id) {
      getFilteredProducts(id);
    }
  };

  const handleResetFilters = (): void => {
    clearFilterData();
    setCurrentPage(1);
    getProducts();
  };

  const handleSearch = (): void => {
    setCurrentPage(1);
    const id = getId();

    if (id) {
      fetchSearchProducts(id);
    }
  };

  const handlePaginationChange = (page: number): void => {
    const id = getId();

    if (id) {
      paginationNavigate(page, id);
      window.scrollTo(0, 0);
    }
  };

  return (
    <Container maxWidth="xl">
      <div className={styles.root}>
        <div className={`${styles.sticky} ${styles.productsPanel}`}>
          <Breadcrumbs items={breadcrumbItems} className={styles.breadcrumb} />
          <Search onChange={handleSearch} className={styles.search} />
          {!isMobile ? (
            <Sorting onChange={handleFilterChange} />
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
                onChange={handleFilterChange}
              />
              <IconButton aria-label="filter" onClick={handleClickSort}>
                <SortIcon />
              </IconButton>
              <SortMobile anchorElSort={anchorElSort} handleCloseSort={handleCloseSort} onChange={handleFilterChange} />
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
                onChange={handleFilterChange}
              />
            </aside>
          )}
          <div className={styles.products}>
            <ProductList className={styles.productsList} categoryId={categoryId} subcategoryId={subcategoryId} />
            <div className={styles.pagination}>
              {totalPages > 1 && (
                <PaginationCatalog
                  handleChange={handlePaginationChange}
                  totalPages={totalPages}
                  currentPage={currentPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default observer(Catalog);
