import type { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { categoryIdByName } from '../queries/categories';
import { hasActiveFilters, useCatalogParams } from '../queries/catalogParams';
import { notify, subscribeToToasts } from '../queries/notifications';
import { queryClient } from '../queries/queryClient';
import { transformFetchedCategories } from '../stores/productHelpers';
import { SortOption } from '../components/baseComponents/SortingList/SortList.enum';
import { categoriesResponse } from './fixtures';
import type { ExtendedCategory } from '../stores/ProductStore.interfaces';

const cats = transformFetchedCategories(categoriesResponse.results as unknown as ExtendedCategory[]);

describe('categoryIdByName', () => {
  it('finds a main category by name', () => {
    expect(categoryIdByName(cats, 'clothes')).toBe('cat-clothes');
  });
  it('finds a subcategory by name', () => {
    expect(categoryIdByName(cats, 't-shirts')).toBe('cat-tshirts');
  });
  it('returns undefined for an unknown name or missing categories', () => {
    expect(categoryIdByName(cats, 'nope')).toBeUndefined();
    expect(categoryIdByName(undefined, 'clothes')).toBeUndefined();
  });
});

describe('hasActiveFilters', () => {
  const base = {
    page: 1,
    sort: SortOption.Default,
    search: '',
    sizes: [],
    colors: [],
    price: [1, 50] as [number, number],
  };
  it('is false for default params', () => {
    expect(hasActiveFilters(base)).toBe(false);
  });
  it('is true when a size, sort or price is set', () => {
    expect(hasActiveFilters({ ...base, sizes: ['m'] })).toBe(true);
    expect(hasActiveFilters({ ...base, sort: SortOption.PriceLowToHigh })).toBe(true);
    expect(hasActiveFilters({ ...base, price: [10, 30] })).toBe(true);
  });
});

describe('useCatalogParams', () => {
  const wrap = (url: string) => ({
    wrapper: ({ children }: { children: ReactNode }) => <MemoryRouter initialEntries={[url]}>{children}</MemoryRouter>,
  });

  it('parses page, sort, search, sizes and price from the query string', () => {
    const { result } = renderHook(() => useCatalogParams(), wrap('/?page=2&sort=Name%2C%20A-Z&sizes=m,l&price=10-30'));
    expect(result.current.page).toBe(2);
    expect(result.current.sort).toBe(SortOption.NameAZ);
    expect(result.current.sizes).toEqual(['m', 'l']);
    expect(result.current.price).toEqual([10, 30]);
  });

  it('falls back to defaults for missing/invalid params', () => {
    const { result } = renderHook(() => useCatalogParams(), wrap('/?sort=bogus'));
    expect(result.current.page).toBe(1);
    expect(result.current.sort).toBe(SortOption.Default);
    expect(result.current.price).toEqual([1, 50]);
  });

  it('setters update the parsed params (search clears active filters)', () => {
    const { result } = renderHook(() => useCatalogParams(), wrap('/?sizes=m'));
    act(() => result.current.setSearch('hoodie'));
    expect(result.current.search).toBe('hoodie');
    expect(result.current.sizes).toEqual([]);

    act(() => result.current.setSizes(['l']));
    expect(result.current.sizes).toEqual(['l']);
    expect(result.current.search).toBe('');

    act(() => result.current.setSort(SortOption.PriceHighToLow));
    expect(result.current.sort).toBe(SortOption.PriceHighToLow);

    act(() => result.current.resetFilters());
    expect(hasActiveFilters(result.current)).toBe(false);
  });
});

describe('notifications bus', () => {
  it('notifies subscribers until they unsubscribe', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToToasts(listener);

    notify({ type: 'success', message: 'hi' });
    expect(listener).toHaveBeenCalledWith({ type: 'success', message: 'hi' });

    unsubscribe();
    notify({ type: 'error', message: 'bye' });
    expect(listener).toHaveBeenCalledTimes(1);
  });
});

describe('queryClient', () => {
  it('disables retries and focus refetch to match legacy fetch-once behavior', () => {
    const defaults = queryClient.getDefaultOptions();
    expect(defaults.queries?.retry).toBe(false);
    expect(defaults.queries?.refetchOnWindowFocus).toBe(false);
  });
});
