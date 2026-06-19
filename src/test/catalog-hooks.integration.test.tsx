import { describe, expect, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import { useCategoriesQuery } from '../queries/categories';
import { useCatalogProductsQuery, useCategoryAttributesQuery } from '../queries/products';
import type { CatalogParams } from '../queries/catalogParams';
import { SortOption } from '../components/baseComponents/SortingList/SortList.enum';
import { recordRequests } from './server';
import { createWrapper } from './utils';

const attributes = { colorAttribute: 'color', sizeAttribute: 'size-clothes' };

const params = (overrides: Partial<CatalogParams> = {}): CatalogParams => ({
  page: 1,
  sort: SortOption.Default,
  search: '',
  sizes: [],
  colors: [],
  price: [1, 50],
  ...overrides,
});

const lastSearchFilters = (calls: Request[]): string[] => {
  const call = [...calls].reverse().find((c) => c.url.includes('/product-projections/search'));
  return call ? new URL(call.url).searchParams.getAll('filter') : [];
};

describe('catalog query hooks (TanStack Query + MSW)', () => {
  it('useCategoriesQuery nests subcategories under sorted main categories', async () => {
    const { result } = renderHook(() => useCategoriesQuery(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const cats = result.current.data!;
    expect(cats.map((c) => c.name.en)).toEqual(['Clothes', 'Bags']); // sorted by orderHint
    expect(cats[0]!.subcategories?.map((s) => s.name.en)).toEqual(['T-Shirts']);
  });

  it('useCategoryAttributesQuery resolves the color/size attribute names for a category', async () => {
    const { result } = renderHook(() => useCategoryAttributesQuery('clothes'), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ colorAttribute: 'color', sizeAttribute: 'size-clothes' });
  });

  it('plain browse → category subtree only, transformed into products', async () => {
    const calls = recordRequests();
    const { result } = renderHook(() => useCatalogProductsQuery('cat-clothes', params(), attributes), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.total).toBe(2);
    expect(result.current.data?.products.map((p) => p.productName)).toEqual(['Red Tee', 'Blue Tee']);

    const filters = lastSearchFilters(calls);
    expect(filters).toEqual(['categories.id:subtree("cat-clothes")']);
  });

  it('search term routes to a text.en search', async () => {
    const calls = recordRequests();
    const { result } = renderHook(() => useCatalogProductsQuery('cat-clothes', params({ search: 'tee' }), attributes), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const call = [...calls].reverse().find((c) => c.url.includes('/product-projections/search'));
    expect(new URL(call!.url).searchParams.get('text.en')).toBe('tee');
  });

  it('active size filter routes to an attribute-filtered search', async () => {
    const calls = recordRequests();
    const { result } = renderHook(
      () => useCatalogProductsQuery('cat-clothes', params({ sizes: ['m', 'l'] }), attributes),
      { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(lastSearchFilters(calls)).toContain('variants.attributes.size-clothes.key:"m","l"');
  });
});
