import { makeAutoObservable, runInAction } from 'mobx';
import { LineItem } from '@commercetools/platform-sdk';

import { addItemToCart, addPromoCode, deleteCart, getActiveCart, removePromoCode, setLineItemQuantity } from '../services/cartService';
import { promoCode } from '../constants';
import { DiscountCodeType, ProductType } from './Store.types';
import { getCartProducts, getDiscountPromo } from './cartHelpers';

type CartStoreType = {
  productsInCart: ProductType[];
  productsInCartIds: Set<string>;
  discountPromo: DiscountCodeType;
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
  deletePromoCode: () => Promise<void>;
  resetCart: () => void;
  clearError: () => void;
  clearSuccess: () => void;
};

const createCartStore = (): CartStoreType => {
  const store = {
    productsInCartIds: new Set<string>(),
    productsInCart: [] as ProductType[],
    discountPromo: {} as DiscountCodeType,
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
            store.totalAmount = response.body.totalLineItemQuantity ? response.body.totalLineItemQuantity : 0;
            store.totalPrice = response.body.totalPrice.centAmount;
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
              store.totalAmount = response.body.totalLineItemQuantity ? response.body.totalLineItemQuantity : 0;

              store.totalPrice = response.body.totalPrice.centAmount;

              let discountId = '';

              if (response.body.discountCodes.length > 0) {
                discountId = response.body.discountCodes[0].discountCode.id;
              }

              const lineItemsDiscounted: LineItem[] = [...response.body.lineItems].filter(
                (item) => item.discountedPricePerQuantity.length > 0
              );

              const discount = getDiscountPromo(lineItemsDiscounted, promoCode, discountId);

              const products = getCartProducts(lineItems);

              store.discountPromo = { ...discount };

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
            store.resetCart();
            store.success = 'All products removed from cart successfully';
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
            store.getCart();
            store.success = 'Promo code successfully applied';
          }

          if (response.statusCode === 400) {
            throw new Error('Unexpected error');
          }
        });
      } catch (err) {
        runInAction(() => {
          store.error = 'Error adding promo code';
        });
      }
    },

    async deletePromoCode(): Promise<void> {
      try {
        const promoCodeId = store.discountPromo.discountCodeId;
        const response = await removePromoCode(promoCodeId);

        runInAction(() => {
          if (response.statusCode === 200) {
            store.getCart();
            store.success = 'Promo code successfully removed';
          }

          if (response.statusCode === 400) {
            throw new Error('Unexpected error');
          }
        });
      } catch (err) {
        runInAction(() => {
          store.error = 'Error removing promo code';
        });
      }
    },

    resetCart(): void {
      store.discountPromo = {} as DiscountCodeType;
      store.productsInCart = [] as ProductType[];
      store.totalAmount = 0;
      store.totalPrice = 0;
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
