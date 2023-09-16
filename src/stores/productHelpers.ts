import { Product, ProductProjection } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';

import { ExtendedCategory } from './ProductStore.interfaces';
import { ProductType } from './Store.types';

export const getFetchedProducts = (fetchedProducts: ProductProjection[]): ProductType[] => {
  const productsList: ProductType[] = fetchedProducts.reduce((acc, item) => {
    const obj = {} as ProductType;
    obj.productId = `${item.id}`;
    obj.productKey = `${item.key}`;
    obj.productName = `${item.name?.en}`;
    obj.description = `${item.description?.en}`;

    if (item.masterVariant.prices?.length) {
      obj.price = item.masterVariant.prices[0]?.value?.centAmount;
      obj.currency = item.masterVariant.prices[0]?.value.currencyCode;
      obj.isDiscount = Boolean(item.masterVariant.prices[0]?.discounted);
      obj.variants = [...item.variants];

      if (obj.isDiscount) obj.priceDiscount = item.masterVariant.prices[0]?.discounted?.value.centAmount;
    }

    if (item.masterVariant.images !== undefined) obj.images = [...item.masterVariant.images];
    acc.push(obj);

    return acc;
  }, [] as ProductType[]);

  return productsList;
};

export const transformFetchedCategories = (fetchedCategories: ExtendedCategory[]): ExtendedCategory[] => {
  const mainCategories = fetchedCategories
    .filter((item) => !item.parent)
    .sort((a, b) => parseFloat(a.orderHint) - parseFloat(b.orderHint));

  const subCategories = fetchedCategories
    .filter((item) => item.parent)
    .sort((a, b) => parseFloat(a.orderHint) - parseFloat(b.orderHint));

  const extendedMainCategories = mainCategories.map((mainCategory) => ({
    ...mainCategory,
    subcategories: subCategories.filter((sub) => sub.parent?.id === mainCategory.id),
  }));

  return extendedMainCategories;
};

export const getFetchedProduct = (fetchedProduct: Product): ProductType => {
  const product = {} as ProductType;
  const data = fetchedProduct.masterData?.current;
  product.productId = `${fetchedProduct.id}`;
  product.productKey = `${fetchedProduct.key}`;
  product.productName = `${data.name?.en}`;
  product.description = `${data.description?.en}`;
  product.variants = [...data.variants];

  if (data.masterVariant.prices?.length) {
    product.price = data.masterVariant.prices[0]?.value?.centAmount;
    product.currency = data.masterVariant.prices[0]?.value.currencyCode;
    product.isDiscount = Boolean(data.masterVariant.prices[0]?.discounted);

    if (product.isDiscount) product.priceDiscount = data.masterVariant.prices[0]?.discounted?.value.centAmount;
  }

  if (data.masterVariant.images !== undefined) product.images = [...data.masterVariant.images];

  return product;
};

export function getPriceValue(value: number): number {
  return value ? +(value / 100).toFixed(2) : 0;
}