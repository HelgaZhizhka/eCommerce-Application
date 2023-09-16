import { LineItem } from '@commercetools/platform-sdk';

import { DiscountCodeType, ProductType } from './Store.types';

export const getCartProducts = (lineItems: LineItem[]): ProductType[] => {
  const products: ProductType[] = lineItems.reduce((acc, item) => {
    const obj = {} as ProductType;
    obj.variants = [];
    obj.lineItemId = `${item.id}`;
    obj.productId = `${item.productId}`;
    obj.productKey = `${item.productKey}`;
    obj.productName = `${item.name?.en}`;
    obj.variants.push(item.variant);
    obj.quantity = item.quantity;

    if (item.price) {
      obj.price = item.price?.value?.centAmount;
      obj.currency = item.price?.value.currencyCode;
      obj.isDiscount = Boolean(item.price?.discounted);
      obj.totalPrice = item.totalPrice.centAmount;

      if (obj.isDiscount) obj.priceDiscount = item.price?.discounted?.value.centAmount;
    }

    if (item.discountedPricePerQuantity.length) {
      obj.promoPrice = item.discountedPricePerQuantity[0].discountedPrice.value.centAmount;
      obj.isPromo = true;
    }

    acc.push(obj);

    return acc;
  }, [] as ProductType[]);
  return products;
};

export const getDiscountPromo = (lineItems: LineItem[], code: string, discountId: string): DiscountCodeType => {
  const discount: DiscountCodeType = lineItems.reduce((acc, item) => {
    acc.discountCodeName = code;
    acc.discountCodeId = `${discountId}`;
    acc.discountedAmount =
      item.discountedPricePerQuantity[0].discountedPrice.includedDiscounts[0].discountedAmount.centAmount;
    acc.discountedAmountCurrency = item.discountedPricePerQuantity[0].discountedPrice.includedDiscounts[0].discountedAmount.currencyCode;

    return acc;
  }, {} as DiscountCodeType);

  return discount;
};
