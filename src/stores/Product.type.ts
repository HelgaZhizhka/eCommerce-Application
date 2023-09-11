import { ProductVariant } from '@commercetools/platform-sdk';
import { Image } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';


export type ProductType = {
  productId: string;
  key: string;
  slug: string;
  productName: string;
  description: string;
  price: string;
  priceDiscount?: string;
  currency: string;
  images: Image[];
  isDiscount: boolean;
  variants: ProductVariant[];
  isAddedToCart: boolean;
  quantity: number;
};
