import { useParams, Navigate } from 'react-router-dom';
import { useState, MouseEvent } from 'react';
import { Container, useMediaQuery, useTheme, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';

import { Breadcrumbs } from '../../components/baseComponents/Breadcrumbs';
import { RoutePaths } from '../../routes/routes.enum';
import { Filter } from '../../components/Filter';
import { Sorting } from '../../components/Sorting';
import { ProductList } from '../../components/ProductList';
import { FilterMobile } from '../../components/FilterMobile';
import { SortMobile } from '../../components/SortMobile';
import { Search } from '../../components/baseComponents/Search';
import { PaginationCatalog } from '../../components/baseComponents/PaginationCatalog';
import { categoryIdByName, useCategoriesQuery } from '../../queries/categories';
import { useCatalogParams } from '../../queries/catalogParams';
import { useCatalogProductsQuery, useCategoryAttributesQuery } from '../../queries/products';
import { DEFAULT_LIMIT } from '../../constants';

import styles from './Catalog.module.scss';

type Params = {
  categoryId: string;
  subcategoryId?: string;
};

const Catalog: React.FC = () => {
  const { categoryId, subcategoryId } = useParams<Params>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorElFilter, setAnchorElFilter] = useState<null | HTMLElement>(null);
  const [anchorElSort, setAnchorElSort] = useState<null | HTMLElement>(null);

  // catalog state lives in the URL; the products query derives from it
  const params = useCatalogParams();
  const { data: categories } = useCategoriesQuery();
  const id = categoryId ? categoryIdByName(categories, subcategoryId ?? categoryId) : undefined;
  const { data: attributes } = useCategoryAttributesQuery(categoryId);
  const { data, isFetching } = useCatalogProductsQuery(id, params, attributes);

  if (!categoryId) {
    return <Navigate to={RoutePaths.ERROR} />;
  }

  const products = data?.products ?? [];
  const totalPages = Math.ceil((data?.total ?? 0) / DEFAULT_LIMIT);

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

  const handleClickSort = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorElSort(event.currentTarget);
  };

  const handlePaginationChange = (page: number): void => {
    params.setPage(page);
    window.scrollTo(0, 0);
  };

  const filterControls = {
    isFilterSize: !!attributes?.sizeAttribute,
    isFilterColor: !!attributes?.colorAttribute,
    sizes: params.sizes,
    colors: params.colors,
    price: params.price as number[],
    onSizesChange: params.setSizes,
    onColorsChange: params.setColors,
    onPriceChange: (price: number[]): void => params.setPrice([price[0] ?? 0, price[1] ?? 0]),
    onReset: params.resetFilters,
  };

  return (
    <Container maxWidth="xl">
      <div className={styles.root}>
        <div className={`${styles.sticky} ${styles.productsPanel}`}>
          <Breadcrumbs items={breadcrumbItems} className={styles.breadcrumb} />
          <Search onSearch={params.setSearch} value={params.search} className={styles.search} />
          {!isMobile ? (
            <Sorting value={params.sort} onSelect={params.setSort} />
          ) : (
            <div className={styles.actions}>
              <IconButton aria-label="filter" onClick={handleClickFilter}>
                <FilterListIcon />
              </IconButton>
              <FilterMobile
                {...filterControls}
                anchorElFilter={anchorElFilter}
                handleCloseFilter={(): void => setAnchorElFilter(null)}
              />
              <IconButton aria-label="sort" onClick={handleClickSort}>
                <SortIcon />
              </IconButton>
              <SortMobile
                anchorElSort={anchorElSort}
                handleCloseSort={(): void => setAnchorElSort(null)}
                value={params.sort}
                onSelect={params.setSort}
              />
            </div>
          )}
        </div>
        <div className={styles.container}>
          {!isMobile && (
            <aside>
              <Filter {...filterControls} className={`${styles.sticky} ${styles.filter}`} />
            </aside>
          )}
          <div className={styles.products}>
            <ProductList
              className={styles.productsList}
              categoryId={categoryId}
              subcategoryId={subcategoryId}
              products={products}
              isLoading={isFetching}
            />
            <div className={styles.pagination}>
              {totalPages > 1 && (
                <PaginationCatalog
                  handleChange={handlePaginationChange}
                  totalPages={totalPages}
                  currentPage={params.page}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Catalog;
