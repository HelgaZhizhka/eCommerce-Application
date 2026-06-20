import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import {
  getCategories,
  getProductByKey,
  getProductsByCategory,
  getProductsByFilter,
  getProductsTypeByCategory,
  getSearchProducts,
} from '../services/productService';
import { SortDetails, SortOption } from '../components/baseComponents/SortingList/SortList.enum';
import { CT } from './handlers';
import { server, recordRequests } from './server';
import { redTeeProjection, searchResponse } from './fixtures';

const lastSearch = (calls: Request[]): URL => {
  const call = [...calls].reverse().find((c) => c.url.includes('/product-projections/search'));
  if (!call) throw new Error('no product-projections/search request was made');
  return new URL(call.url);
};

describe('catalog + filters (CT API via MSW)', () => {
  it('fetches the category tree', async () => {
    const categories = await getCategories();
    expect(categories.map((c) => c.id)).toContain('cat-clothes');
    expect(categories).toHaveLength(3);
  });

  it('lists a category page with subtree filter, limit and offset', async () => {
    const calls = recordRequests();
    const { results, total } = await getProductsByCategory('cat-clothes', 2);

    expect(results).toHaveLength(2);
    expect(total).toBe(2);

    const url = lastSearch(calls);
    expect(url.searchParams.getAll('filter')).toContain('categories.id:subtree("cat-clothes")');
    expect(url.searchParams.get('limit')).toBe('8');
    expect(url.searchParams.get('offset')).toBe('8'); // page 2 → 1 * DEFAULT_LIMIT
  });

  it('builds attribute, price-range and sort query args for a filtered search', async () => {
    const calls = recordRequests();
    await getProductsByFilter(
      'cat-clothes',
      1,
      [{ color: ['red', 'blue'] }, { 'size-clothes': ['m'] }],
      [10, 30],
      SortDetails[SortOption.PriceLowToHigh]
    );

    const filters = lastSearch(calls).searchParams.getAll('filter');
    expect(filters).toContain('categories.id:subtree("cat-clothes")');
    expect(filters).toContain('variants.attributes.color.key:"red","blue"');
    expect(filters).toContain('variants.attributes.size-clothes.key:"m"');
    // price is converted euros → cents (×100)
    expect(filters).toContain('variants.price.centAmount:range(1000 to 3000)');
    expect(lastSearch(calls).searchParams.get('sort')).toBe('price asc');
  });

  it('maps the name sort key to name.en', async () => {
    const calls = recordRequests();
    await getProductsByFilter('cat-clothes', 1, [], undefined, SortDetails[SortOption.NameAZ]);
    expect(lastSearch(calls).searchParams.get('sort')).toBe('name.en asc');
  });

  it('passes the search term as text.en alongside the category filter', async () => {
    const calls = recordRequests();
    await getSearchProducts('cat-clothes', 1, 'hoodie');

    const url = lastSearch(calls);
    expect(url.searchParams.get('text.en')).toBe('hoodie');
    expect(url.searchParams.getAll('filter')).toContain('categories.id:subtree("cat-clothes")');
  });

  it('returns the totals the server reports (pagination)', async () => {
    server.use(
      http.get(`${CT}/product-projections/search`, () => HttpResponse.json(searchResponse([redTeeProjection], 42)))
    );
    const { results, total } = await getProductsByCategory('cat-clothes', 1);
    expect(results).toHaveLength(1);
    expect(total).toBe(42);
  });

  it('fetches a product by key and the attributes of a category product type', async () => {
    const product = await getProductByKey('red-tee');
    expect(product.key).toBe('red-tee');

    const attributes = await getProductsTypeByCategory('Clothes');
    expect(attributes?.map((a) => a.name)).toEqual(expect.arrayContaining(['color', 'size-clothes']));
  });
});
