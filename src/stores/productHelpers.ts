import { ProductProjection } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';

import { ExtendedCategory } from './ProductStore.interfaces';
import { ProductType } from './Product.type';

export const getFetchedProducts = (fetchedProducts: ProductProjection[]): ProductType[] => {
  const productsList: ProductType[] = fetchedProducts.reduce((acc, item) => {
    const obj = {} as ProductType;
    obj.key = `${item.key}`;
    obj.productName = `${item.name?.en}`;
    obj.description = `${item.description?.en}`;

    if (item.masterVariant.prices?.length) {
      obj.price = `${item.masterVariant.prices[0]?.value?.centAmount}`;
      obj.currency = item.masterVariant.prices[0]?.value.currencyCode;
      obj.isDiscount = Boolean(item.masterVariant.prices[0]?.discounted);
      obj.variants = [...item.variants];

      obj.isAddedToCart = false;
      obj.quantity = 1;

      if (obj.isDiscount) obj.priceDiscount = `${item.masterVariant.prices[0]?.discounted?.value.centAmount}`;
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
