import { useParams, Navigate } from 'react-router-dom';

import { Breadcrumbs } from '../../components/baseComponents/Breadcrumbs';
import { RoutePaths } from '../../routes/routes.enum';
import { Filter } from '../../components/Filter';
import { Sorting } from '../../components/Sorting';
import { ProductList } from '../../components/ProductList';
import { Search } from '../../components/baseComponents/Search';
import { PaginationCatalog } from '../../components/baseComponents/PaginationCatalog';
import { categoryIdByName, useCategoriesQuery } from '../../queries/categories';
import { useCatalogParams } from '../../queries/catalogParams';
import { useCatalogProductsQuery, useCategoryAttributesQuery } from '../../queries/products';
import { DEFAULT_LIMIT } from '../../constants';

type Params = {
  categoryId: string;
  subcategoryId?: string;
};

const Catalog: React.FC = () => {
  const { categoryId, subcategoryId } = useParams<Params>();

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
    <div className="mx-auto max-w-[1536px] px-4">
      <div className="flex flex-wrap items-center gap-2.5 py-4">
        <Breadcrumbs items={breadcrumbItems} className="mr-auto" />
        <Search onSearch={params.setSearch} value={params.search} className="w-full md:w-[400px] lg:w-[560px]" />
        <Sorting value={params.sort} onSelect={params.setSort} />
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <Filter {...filterControls} className="md:sticky md:top-4 md:self-start" />
        <div className="flex-1">
          <ProductList
            categoryId={categoryId}
            subcategoryId={subcategoryId}
            products={products}
            isLoading={isFetching}
          />
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <PaginationCatalog
                handleChange={handlePaginationChange}
                totalPages={totalPages}
                currentPage={params.page}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
