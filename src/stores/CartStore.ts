import { makeAutoObservable, runInAction } from 'mobx';
import { LineItem } from '@commercetools/platform-sdk';

import { addItemToCart, getActiveCart, setLineItemQuantity } from '../services/cartService';
import { ProductType } from './Store.types';

type CartStoreType = {
  productsInCart: ProductType[];
  productsInCartIds: Set<string>;
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
  clearCart: () => Promise<void>;
  clearError: () => void;
  clearSuccess: () => void;
};

const createCartStore = (): CartStoreType => {
  const store = {
    productsInCartIds: new Set<string>(),
    productsInCart: [] as ProductType[],
    totalAmount: 0,
    totalPrice: 0,
    error: null as null | string,
    success: null as null | string,

    async addToCart(productId: string, quantity?: number, variantId?: number, sku?: string): Promise<void> {
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
      const hasToken = localStorage.getItem('token');
      if (hasToken) {
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
      const hasToken = localStorage.getItem('token');
      if (hasToken) {
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
                obj.key = `${item.productKey}`;
                obj.productName = `${item.name?.en}`;

                if (item.price) {
                  obj.price = `${item.price?.value?.centAmount}`;
                  obj.currency = item.price?.value.currencyCode;
                  obj.isDiscount = Boolean(item.price?.discounted);
                  obj.totalPrice = `${item.totalPrice.centAmount}`;
                  obj.quantity = +`${item.quantity}`;
                  obj.variants.push(item.variant);

                  if (obj.isDiscount) obj.priceDiscount = `${item.price?.discounted?.value.centAmount}`;
                }

                // if (item.variant.images !== undefined) obj.images = [...item.variant.images];
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
      // store.productsInCartIds.delete(productId);
      try {
        const response = await setLineItemQuantity(lineItemId, 0);

        runInAction(() => {
          if (response.statusCode === 200) {
            // response.body.lineItems.forEach((item) => store.productsInCartIds.add(item.productId));
            store.productsInCart = store.productsInCart.filter((item) => item.lineItemId !== lineItemId);
            store.totalAmount = response.body.totalLineItemQuantity ? +`${response.body.totalLineItemQuantity}` : 0;
            store.totalPrice = +`${response.body.totalPrice.centAmount}`;
            store.success = 'Product removed  from cart successfully';
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
                changedItem.totalPrice = `${updatedProduct.totalPrice.centAmount}`;
              }
            });
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
    },

    async clearCart(): Promise<void> {
      const promises: Promise<void>[] = [];

      store.productsInCart.forEach((product) => {
        promises.push(store.removeFromCart(product.lineItemId));
      });

      try {
        await Promise.all(promises);
        runInAction(() => {
          store.productsInCart = [];
          store.totalAmount = 0;
          store.totalPrice = 0;
          store.success = 'Cart is cleared';
        });
      } catch (error) {
        runInAction(() => {
          store.error = 'Error clearing the cart';
        });
      }
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
