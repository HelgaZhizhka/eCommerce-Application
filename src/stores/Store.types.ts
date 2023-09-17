import { ProductVariant } from '@commercetools/platform-sdk';
import { Image } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';

export type ProductType = {
  lineItemId: string;
  productId: string;
  productKey: string;
  slug: string;
  productName: string;
  description: string;
  price: number;
  priceDiscount?: number;
  currency: string;
  images: Image[];
  isDiscount: boolean;
  variants: ProductVariant[];
  productSku?: string;
  totalPrice?: number;
  quantity?: number;
  promoPrice?: number;
  isPromo?: boolean;
};

export type DiscountCodeType = {
  discountCodeName: string;
  discountCodeId: string;
};
