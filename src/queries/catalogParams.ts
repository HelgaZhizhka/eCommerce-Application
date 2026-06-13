import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SortOption } from '../components/baseComponents/SortingList/SortList.enum';
import { initialPriceRange } from '../constants';

// Catalog state lives in the URL (phase 3.2): shareable, survives reload,
// and the products query key derives from it directly.

export type PriceRange = [number, number];

export type CatalogParams = {
  page: number;
  sort: SortOption;
  search: string;
  sizes: string[];
  colors: string[];
  price: PriceRange;
};

export const defaultPrice: PriceRange = [initialPriceRange.min, initialPriceRange.max];

const isSortOption = (value: string | null): value is SortOption =>
  Object.values(SortOption).includes(value as SortOption);

const parseList = (value: string | null): string[] => (value ? value.split(',').filter(Boolean) : []);

const parsePrice = (value: string | null): PriceRange => {
  const [min, max] = (value ?? '').split('-').map(Number);
  if (Number.isFinite(min) && Number.isFinite(max)) return [min as number, max as number];
  return defaultPrice;
};

export const hasActiveFilters = (params: CatalogParams): boolean =>
  params.sizes.length > 0 ||
  params.colors.length > 0 ||
  params.price[0] !== defaultPrice[0] ||
  params.price[1] !== defaultPrice[1] ||
  params.sort !== SortOption.Default;

type CatalogParamsApi = CatalogParams & {
  setPage: (page: number) => void;
  setSort: (sort: SortOption) => void;
  setSearch: (search: string) => void;
  setSizes: (sizes: string[]) => void;
  setColors: (colors: string[]) => void;
  setPrice: (price: PriceRange) => void;
  resetFilters: () => void;
};

export const useCatalogParams = (): CatalogParamsApi => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo<CatalogParams>(() => {
    const sort = searchParams.get('sort');
    return {
      page: Math.max(1, Number(searchParams.get('page')) || 1),
      sort: isSortOption(sort) ? sort : SortOption.Default,
      search: searchParams.get('search') ?? '',
      sizes: parseList(searchParams.get('sizes')),
      colors: parseList(searchParams.get('colors')),
      price: parsePrice(searchParams.get('price')),
    };
  }, [searchParams]);

  const update = useCallback(
    (changes: Record<string, string | null>) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          Object.entries(changes).forEach(([key, value]) => {
            if (value === null || value === '') next.delete(key);
            else next.set(key, value);
          });
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  // legacy semantics kept: search and filters are mutually exclusive,
  // and any change of criteria returns to page 1
  return {
    ...params,
    setPage: (page) => update({ page: page > 1 ? String(page) : null }),
    setSort: (sort) => update({ sort: sort === SortOption.Default ? null : sort, page: null }),
    setSearch: (search) =>
      update({ search: search.trim() || null, sizes: null, colors: null, price: null, page: null }),
    setSizes: (sizes) => update({ sizes: sizes.join(',') || null, search: null, page: null }),
    setColors: (colors) => update({ colors: colors.join(',') || null, search: null, page: null }),
    setPrice: (price) =>
      update({
        price: price[0] === defaultPrice[0] && price[1] === defaultPrice[1] ? null : `${price[0]}-${price[1]}`,
        search: null,
        page: null,
      }),
    resetFilters: () => update({ sizes: null, colors: null, price: null, sort: null, page: null }),
  };
};
