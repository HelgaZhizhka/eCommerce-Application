import { useQuery } from '@tanstack/react-query';

import {
  getProductByKey,
  getProductsByCategory,
  getProductsByFilter,
  getProductsTypeByCategory,
  getSearchProducts,
} from '../services/productService';
import { getFetchedProduct, getFetchedProducts } from '../stores/productHelpers';
import { SortDetails, SortOption } from '../components/baseComponents/SortingList/SortList.enum';
import { CatalogParams, defaultPrice } from './catalogParams';

export type CategoryAttributes = {
  colorAttribute: string;
  sizeAttribute: string;
};

// Which filterable attributes the category's product type defines.
// Keyed by the top-level category slug, capitalized — the legacy convention
// for product-type keys in the CT project.
export const useCategoryAttributesQuery = (categorySlug: string | undefined) =>
  useQuery({
    queryKey: ['categoryAttributes', categorySlug],
    enabled: !!categorySlug,
    staleTime: Infinity,
    queryFn: async (): Promise<CategoryAttributes> => {
      const key = `${categorySlug![0].toUpperCase()}${categorySlug!.slice(1)}`;
      const productTypes = await getProductsTypeByCategory(key);
      return {
        colorAttribute: productTypes?.filter((atr) => atr.name.includes('color'))[0]?.name ?? '',
        sizeAttribute: productTypes?.filter((atr) => atr.name.includes('size'))[0]?.name ?? '',
      };
    },
  });

const buildFilterAttributes = (
  attributes: CategoryAttributes | undefined,
  params: CatalogParams
): Record<string, string[]>[] => {
  const options: Record<string, string[]>[] = [];
  if (attributes?.colorAttribute && params.colors.length > 0)
    options.push({ [attributes.colorAttribute]: params.colors });
  if (attributes?.sizeAttribute && params.sizes.length > 0) options.push({ [attributes.sizeAttribute]: params.sizes });
  return options;
};

// One query replaces fetchProductsByCategory / fetchSearchProducts /
// getFilteredProducts and the paginationNavigate dispatch: the branch is a
// pure function of the URL params. (Legacy quirk fixed by construction:
// pagination used to forget the sort order when no filters were active.)
export const useCatalogProductsQuery = (
  categoryId: string | undefined,
  params: CatalogParams,
  attributes: CategoryAttributes | undefined
) =>
  useQuery({
    queryKey: [
      'products',
      categoryId,
      params.page,
      params.search,
      params.sizes,
      params.colors,
      params.price,
      params.sort,
    ],
    enabled: !!categoryId,
    queryFn: async () => {
      const id = categoryId!;
      if (params.search.trim()) {
        return getSearchProducts(id, params.page, params.search);
      }

      const hasCriteria =
        params.sizes.length > 0 ||
        params.colors.length > 0 ||
        params.price[0] !== defaultPrice[0] ||
        params.price[1] !== defaultPrice[1] ||
        params.sort !== SortOption.Default;

      if (hasCriteria) {
        return getProductsByFilter(
          id,
          params.page,
          buildFilterAttributes(attributes, params),
          params.price,
          SortDetails[params.sort]
        );
      }

      return getProductsByCategory(id, params.page);
    },
    select: ({ results, total }) => ({
      products: getFetchedProducts(results),
      total: total ?? 0,
    }),
  });

export const useProductQuery = (productKey: string | undefined) =>
  useQuery({
    queryKey: ['product', productKey],
    enabled: !!productKey,
    queryFn: () => getProductByKey(productKey!),
    select: getFetchedProduct,
  });
