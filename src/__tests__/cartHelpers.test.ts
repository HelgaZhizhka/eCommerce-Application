import { LineItem } from '@commercetools/platform-sdk';

import { getCartProducts } from '../stores/cartHelpers';

// Characterization tests (phase 0): pin the CURRENT mapping behavior,
// including its quirks, before the TanStack Query migration (phase 3).

const baseLineItem = {
  id: 'line-1',
  productId: 'prod-1',
  name: { en: 'Mug Everything Works' },
  quantity: 2,
  variant: { id: 1, key: 'mug-red', sku: 'MUG-RED' },
  price: {
    value: { centAmount: 700, currencyCode: 'EUR' },
  },
  totalPrice: { centAmount: 1400 },
  discountedPricePerQuantity: [],
};

const asLineItem = (overrides: object): LineItem => ({ ...baseLineItem, ...overrides }) as unknown as LineItem;

describe('getCartProducts (characterization)', () => {
  it('maps a regular line item', () => {
    const [product] = getCartProducts([asLineItem({})]);

    expect(product).toMatchObject({
      lineItemId: 'line-1',
      productId: 'prod-1',
      productKey: 'mug-red',
      productName: 'Mug Everything Works',
      quantity: 2,
      price: 700,
      currency: 'EUR',
      totalPrice: 1400,
      isDiscount: false,
    });
    expect(product.variants).toHaveLength(1);
    expect(product.variants[0].sku).toBe('MUG-RED');
    expect(product.priceDiscount).toBeUndefined();
    expect(product.isPromo).toBeUndefined();
  });

  it('maps discounted price into priceDiscount', () => {
    const [product] = getCartProducts([
      asLineItem({
        price: {
          value: { centAmount: 700, currencyCode: 'EUR' },
          discounted: { value: { centAmount: 490 } },
        },
      }),
    ]);

    expect(product.isDiscount).toBe(true);
    expect(product.priceDiscount).toBe(490);
  });

  it('maps promo discount from discountedPricePerQuantity', () => {
    const [product] = getCartProducts([
      asLineItem({
        discountedPricePerQuantity: [{ quantity: 2, discountedPrice: { value: { centAmount: 595 } } }],
      }),
    ]);

    expect(product.isPromo).toBe(true);
    expect(product.promoPrice).toBe(595);
  });

  // TODO(refactor): quirks pinned intentionally — revisit in phase 3
  it('QUIRK: missing price drops totalPrice too (set only inside the price branch)', () => {
    const [product] = getCartProducts([asLineItem({ price: undefined })]);

    expect(product.price).toBeUndefined();
    expect(product.totalPrice).toBeUndefined();
    expect(product.isDiscount).toBeUndefined();
  });

  it('QUIRK: missing variant key / name become the string "undefined"', () => {
    const [product] = getCartProducts([asLineItem({ variant: { id: 1, sku: 'X' }, name: undefined })]);

    expect(product.productKey).toBe('undefined');
    expect(product.productName).toBe('undefined');
  });
});
