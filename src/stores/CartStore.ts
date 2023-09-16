import { makeAutoObservable, runInAction } from 'mobx';
import { LineItem } from '@commercetools/platform-sdk';

import { addItemToCart, addPromoCode, deleteCart, getActiveCart, setLineItemQuantity } from '../services/cartService';
import { DiscountCodesType, ProductType } from './Store.types';

type CartStoreType = {
  productsInCart: ProductType[];
  productsInCartIds: Set<string>;
  discounts: DiscountCodesType[];
  totalAmount: number;
  totalPrice: number;
  error: null | string;
  success: null | string;
  initCart: () => Promise<void>;
  getCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number, variantId?: number) => Promise<void>;
  removeFromCart: (lineItemId: string) => Promise<void>;
  changeQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  isProductInCart: (id: string) => boolean;
  addPromoCodeToCart: (code: string) => Promise<void>;
  clearCart: () => Promise<void>;
  deletePromoCodeFromCart: (codeId: string) => Promise<void>;
  clearError: () => void;
  clearSuccess: () => void;
};

const createCartStore = (): CartStoreType => {
  const store = {
    productsInCartIds: new Set<string>(),
    productsInCart: [] as ProductType[],
    discounts: [] as DiscountCodesType[],
    totalAmount: 0,
    totalPrice: 0,
    error: null as null | string,
    success: null as null | string,

    async addToCart(productId: string, quantity?: number, variantId?: number): Promise<void> {
      try {
        const response = await addItemToCart(productId, quantity, variantId);

        runInAction(() => {
          if (response.statusCode === 200) {
            store.success = 'Product added to cart successfully';
            store.totalAmount = response.body.totalLineItemQuantity ? +`${response.body.totalLineItemQuantity}` : 0;
            store.totalPrice = +`${response.body.totalPrice.centAmount}`;
          }

          if (response.statusCode === 400) {
            throw new Error('Unexpected error');
          }
        });
      } catch (error) {
        runInAction(() => {
          store.error = 'Error adding product to cart';
        });
      }
    },

    async initCart(): Promise<void> {
      const hasCartId = localStorage.getItem('cartId');

      if (hasCartId) {
        try {
          const response = await getActiveCart();

          runInAction(() => {
            if (response.statusCode === 200) {
              store.totalAmount = response.body.totalLineItemQuantity ? +`${response.body.totalLineItemQuantity}` : 0;
              store.totalPrice = +`${response.body.totalPrice.centAmount}`;
            }
            if (response.statusCode === 400) {
              throw new Error('Unexpected error');
            }
          });
        } catch (error) {
          runInAction(() => {
            store.error = 'Error get cart';
          });
        }
      }
    },

    async getCart(): Promise<void> {
      const hasCartId = localStorage.getItem('cartId');

      if (hasCartId) {
        try {
          const response = await getActiveCart();

          runInAction(() => {
            if (response.statusCode === 200) {
              const lineItems: LineItem[] = [...response.body.lineItems];
              store.totalAmount = response.body.totalLineItemQuantity ? +`${response.body.totalLineItemQuantity}` : 0;
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
                  obj.promoPrices = item.discountedPricePerQuantity.map(
                    (price) => price.discountedPrice.value.centAmount
                  );
                  obj.isPromo = true;
                }

                acc.push(obj);

                return acc;
              }, [] as ProductType[]);

              store.productsInCart = [...products];
            }
            if (response.statusCode === 400) {
              throw new Error('Unexpected error');
            }
          });
        } catch (error) {
          runInAction(() => {
            store.error = 'Error loading cart';
          });
        }
      }
    },

    isProductInCart(id: string): boolean {
      return store.productsInCartIds.has(id);
    },

    async removeFromCart(lineItemId: string): Promise<void> {
      try {
        const response = await setLineItemQuantity(lineItemId, 0);

        runInAction(() => {
          if (response.statusCode === 200) {
            store.productsInCart = store.productsInCart.filter((item) => item.lineItemId !== lineItemId);
            store.totalAmount = response.body.totalLineItemQuantity ? response.body.totalLineItemQuantity : 0;
            store.totalPrice = response.body.totalPrice.centAmount;
            store.success = 'Product removed from cart successfully';
          }

          if (response.statusCode === 400) {
            throw new Error('Unexpected error');
          }
        });
      } catch (error) {
        runInAction(() => {
          store.error = 'Error remove product from cart';
        });
      }
    },

    async changeQuantity(lineItemId: string, quantity: number): Promise<void> {
      try {
        const response = await setLineItemQuantity(lineItemId, quantity);

        runInAction(() => {
          if (response.statusCode === 200) {
            const updatedProduct = response.body.lineItems.filter((item) => item.id === lineItemId)[0];

            store.productsInCart.forEach((item) => {
              if (item.lineItemId === lineItemId) {
                const changedItem = item;
                changedItem.quantity = updatedProduct.quantity;
                changedItem.totalPrice = updatedProduct.totalPrice.centAmount;
              }
            });
            store.totalAmount = response.body.totalLineItemQuantity ? response.body.totalLineItemQuantity : 0;
            store.totalPrice = response.body.totalPrice.centAmount;
          }

          if (response.statusCode === 400) {
            throw new Error('Unexpected error');
          }
        });
      } catch (error) {
        runInAction(() => {
          store.error = 'Error get cart';
        });
      }
    },

    async clearCart(): Promise<void> {
      try {
        const response = await deleteCart();

        runInAction(() => {
          if (response.statusCode === 200) {
            store.success = 'All products removed from cart successfully';
            store.productsInCart = [];
            store.totalAmount = 0;
            store.totalPrice = 0;
          }
        });
      } catch (err) {
        runInAction(() => {
          store.error = 'Error delete all products from cart';
        });
      }
    },

    async addPromoCodeToCart(code: string): Promise<void> {
      try {
        const response = await addPromoCode(code);
        runInAction(() => {
          if (response.statusCode === 200) {
            const lineItemsDiscounted: LineItem[] = [...response.body.lineItems].filter(
              (item) => item.discountedPricePerQuantity
            );

            const discounts: DiscountCodesType[] = lineItemsDiscounted.reduce((acc, item) => {
              const obj = {} as DiscountCodesType;
              obj.discountCodesName = code;
              obj.discountCodesId = `${item.discountedPricePerQuantity[0].discountedPrice.includedDiscounts[0].discount.id}`;
              obj.discountedAmount =
                item.discountedPricePerQuantity[0].discountedPrice.includedDiscounts[0].discountedAmount.centAmount;

              acc.push(obj);

              return acc;
            }, [] as DiscountCodesType[]);

            store.discounts = [...discounts];

            store.success = 'Promo code successfully applied';
          }
        });

        store.getCart();
      } catch (err) {
        runInAction(() => {
          store.error = 'Error adding promo code';
        });
      }
    },

    async deletePromoCodeFromCart(codeId: string): Promise<void> {
      console.log(codeId);
    },

    clearError(): void {
      store.error = null;
    },

    clearSuccess(): void {
      store.success = null;
    },
  };

  makeAutoObservable(store);

  return store;
};

export const cartStore = createCartStore();
