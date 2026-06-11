import { ProductVariant } from '@commercetools/platform-sdk';

import {
  getPriceValue,
  extractSizesWithVariantId,
  getSku,
  transformFetchedCategories,
} from '../stores/productHelpers';
import { ExtendedCategory } from '../stores/ProductStore.interfaces';

// Characterization tests (phase 0): pin current behavior before phase 3.

describe('getPriceValue (characterization)', () => {
  it.each([
    [700, 7],
    [490, 4.9],
    [1234, 12.34],
    [999, 9.99],
    [0, 0],
  ])('converts %i cents to %f', (cents, expected) => {
    expect(getPriceValue(cents)).toBe(expected);
  });
});

describe('extractSizesWithVariantId (characterization)', () => {
  const variant = (id: number, label?: string): ProductVariant =>
    ({
      id,
      attributes: label ? [{ name: 'size-clothes', value: { label } }] : [],
    } as unknown as ProductVariant);

  it('extracts sizes with their variant ids', () => {
    expect(extractSizesWithVariantId([variant(1, 's'), variant(2, 'm')])).toEqual([
      { size: 's', variantId: 1 },
      { size: 'm', variantId: 2 },
    ]);
  });

  it('skips one-size variants and variants without the size attribute', () => {
    expect(extractSizesWithVariantId([variant(1, 'one-size'), variant(2)])).toEqual([]);
  });

  // TODO(refactor): quirk pinned intentionally — revisit in phase 3
  it('QUIRK: duplicate size labels keep the LAST variant id (Map overwrite)', () => {
    expect(extractSizesWithVariantId([variant(1, 'm'), variant(2, 'm')])).toEqual([
      { size: 'm', variantId: 2 },
    ]);
  });
});

describe('getSku (characterization)', () => {
  const variants = [{ id: 1, sku: 'SKU-1' }, { id: 2 }] as unknown as ProductVariant[];

  it('returns the sku of the matching variant', () => {
    expect(getSku(variants, 1)).toBe('SKU-1');
  });

  it('returns undefined when the variant has no sku', () => {
    expect(getSku(variants, 2)).toBeUndefined();
  });

  // TODO(refactor): bug pinned intentionally — fix in phase 3
  it('BUG: throws TypeError for an unknown variant id instead of returning undefined', () => {
    expect(() => getSku(variants, 99)).toThrow(TypeError);
  });
});

describe('transformFetchedCategories (characterization)', () => {
  const category = (id: string, orderHint: string, parentId?: string): ExtendedCategory =>
    ({
      id,
      orderHint,
      parent: parentId ? { id: parentId, typeId: 'category' } : undefined,
    } as unknown as ExtendedCategory);

  it('nests subcategories under their parents, both sorted by numeric orderHint', () => {
    const result = transformFetchedCategories([
      category('sub-b', '0.9', 'main-2'),
      category('main-2', '0.5'),
      category('main-1', '0.1'),
      category('sub-a', '0.2', 'main-1'),
    ]);

    expect(result.map((c) => c.id)).toEqual(['main-1', 'main-2']);
    expect(result[0].subcategories?.map((c) => c.id)).toEqual(['sub-a']);
    expect(result[1].subcategories?.map((c) => c.id)).toEqual(['sub-b']);
  });

  it('returns main categories with empty subcategories when none match', () => {
    const result = transformFetchedCategories([category('main-1', '0.1')]);

    expect(result[0].subcategories).toEqual([]);
  });
});
