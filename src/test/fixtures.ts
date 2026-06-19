// Minimal commercetools response fixtures for MSW. Each carries only the fields
// the services / transforms actually read (see stores/productHelpers,
// stores/cartHelpers) — not full CT payloads. Typed loosely on purpose: the
// network boundary is untyped JSON, and over-typing against the huge SDK types
// adds noise without catching real bugs.

export const mainCategoryClothes = {
  id: 'cat-clothes',
  key: 'clothes',
  name: { en: 'Clothes' },
  slug: { en: 'clothes' },
  orderHint: '0.1',
  ancestors: [],
};

export const mainCategoryBags = {
  id: 'cat-bags',
  key: 'bags',
  name: { en: 'Bags' },
  slug: { en: 'bags' },
  orderHint: '0.2',
  ancestors: [],
};

export const subCategoryTshirts = {
  id: 'cat-tshirts',
  key: 'tshirts',
  name: { en: 'T-Shirts' },
  slug: { en: 't-shirts' },
  orderHint: '0.1',
  parent: { typeId: 'category', id: 'cat-clothes' },
  ancestors: [{ typeId: 'category', id: 'cat-clothes' }],
};

export const categoriesResponse = {
  limit: 20,
  offset: 0,
  count: 3,
  total: 3,
  results: [subCategoryTshirts, mainCategoryBags, mainCategoryClothes],
};

const priceEUR = (centAmount: number, discounted?: number) => ({
  id: `price-${centAmount}`,
  value: { type: 'centPrecision', currencyCode: 'EUR', centAmount, fractionDigits: 2 },
  ...(discounted
    ? {
        discounted: {
          value: { type: 'centPrecision', currencyCode: 'EUR', centAmount: discounted, fractionDigits: 2 },
        },
      }
    : {}),
});

export const redTeeProjection = {
  id: 'prod-red-tee',
  key: 'red-tee',
  version: 1,
  name: { en: 'Red Tee' },
  description: { en: 'A red t-shirt' },
  slug: { en: 'red-tee' },
  categories: [{ typeId: 'category', id: 'cat-tshirts' }],
  masterVariant: {
    id: 1,
    sku: 'RED-TEE-1',
    key: 'red-tee-1',
    prices: [priceEUR(2000)],
    images: [{ url: 'https://img.test/red-tee.png', dimensions: { w: 100, h: 100 } }],
    attributes: [],
  },
  variants: [],
};

export const blueTeeProjection = {
  id: 'prod-blue-tee',
  key: 'blue-tee',
  version: 1,
  name: { en: 'Blue Tee' },
  description: { en: 'A blue t-shirt, on sale' },
  slug: { en: 'blue-tee' },
  categories: [{ typeId: 'category', id: 'cat-tshirts' }],
  masterVariant: {
    id: 1,
    sku: 'BLUE-TEE-1',
    key: 'blue-tee-1',
    prices: [priceEUR(3000, 2500)],
    images: [{ url: 'https://img.test/blue-tee.png', dimensions: { w: 100, h: 100 } }],
    attributes: [],
  },
  variants: [],
};

export const searchResponse = (results: unknown[] = [redTeeProjection, blueTeeProjection], total = results.length) => ({
  limit: 8,
  offset: 0,
  count: results.length,
  total,
  results,
});

export const productsListResponse = {
  limit: 20,
  offset: 0,
  count: 1,
  total: 1,
  results: [
    {
      id: 'prod-red-tee',
      key: 'red-tee',
      version: 1,
      masterData: {
        current: {
          name: { en: 'Red Tee' },
          description: { en: 'A red t-shirt' },
          masterVariant: redTeeProjection.masterVariant,
          variants: [],
        },
      },
    },
  ],
};

export const productByKeyResponse = {
  id: 'prod-red-tee',
  key: 'red-tee',
  version: 1,
  masterData: {
    current: {
      name: { en: 'Red Tee' },
      description: { en: 'A red t-shirt' },
      masterVariant: redTeeProjection.masterVariant,
      variants: [],
    },
  },
};

export const productTypeResponse = {
  id: 'pt-clothes',
  key: 'Clothes',
  name: 'Clothes',
  attributes: [
    { name: 'color', label: { en: 'Color' }, type: { name: 'enum' } },
    { name: 'size-clothes', label: { en: 'Size' }, type: { name: 'enum' } },
    { name: 'material', label: { en: 'Material' }, type: { name: 'text' } },
  ],
};

const lineItem = {
  id: 'line-1',
  productId: 'prod-red-tee',
  name: { en: 'Red Tee' },
  variant: { id: 1, key: 'red-tee-1', sku: 'RED-TEE-1' },
  quantity: 2,
  price: { value: { currencyCode: 'EUR', centAmount: 2000 } },
  totalPrice: { currencyCode: 'EUR', centAmount: 4000 },
  discountedPricePerQuantity: [],
};

export const emptyCart = {
  id: 'cart-1',
  version: 1,
  lineItems: [],
  totalPrice: { currencyCode: 'EUR', centAmount: 0 },
  totalLineItemQuantity: 0,
  discountCodes: [],
};

export const cartWithItem = {
  id: 'cart-1',
  version: 2,
  lineItems: [lineItem],
  totalPrice: { currencyCode: 'EUR', centAmount: 4000 },
  totalLineItemQuantity: 2,
  discountCodes: [],
};

export const meCustomer = {
  id: 'customer-1',
  version: 1,
  email: 'shopper@test.dev',
  firstName: 'Test',
  lastName: 'Shopper',
  addresses: [{ id: 'addr-1', country: 'DE', city: 'Berlin' }],
};

export const customerSignInResult = (cart: unknown = cartWithItem) => ({
  customer: meCustomer,
  cart,
});
