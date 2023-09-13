import { makeAutoObservable, runInAction } from 'mobx';
import { LineItem } from '@commercetools/platform-sdk';

import { addItemToCart, getActiveCart } from '../services/cartService';
import { ProductType } from './Store.types';


type CartStoreType = {
  productsInCart: ProductType[];
  productsInCartIds: Set<string>;
  totalAmount: number;
  error: null | string;
  success: null | string;
  initCart: () => Promise<void>;
  getCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number, variantId?: number) => Promise<void>;
  removeFromCart: (productId: string) => void;
  changeQuantity: (productId: string, quantity: number) => void;
  isProductInCart: (productId: string) => boolean;
  clearError: () => void;
  clearSuccess: () => void;
};

const createCartStore = (): CartStoreType => {
  const store = {
    productsInCartIds: new Set<string>(),
    productsInCart: [] as ProductType[],
    totalAmount: 0,
    error: null as null | string,
    success: null as null | string,

    async addToCart(productId: string, quantity?: number, variantId?: number): Promise<void> {
      try {
        const response = await addItemToCart(productId, quantity, variantId);

        runInAction(() => {
          if (response.statusCode === 200) {
            store.success = 'Product added to cart successfully';
            store.productsInCartIds.add(productId);
            store.totalAmount = +`${response.body.totalLineItemQuantity}`;
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
              response.body.lineItems.forEach((item) => store.productsInCartIds.add(item.productId));
              store.totalAmount = +`${response.body.totalLineItemQuantity}`;
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
              store.totalAmount = +`${response.body.totalLineItemQuantity}`;
              const products: ProductType[] = lineItems.reduce((acc, item) => {
                const obj = {} as ProductType;
                obj.productId = `${item.id}`;
                obj.productName = `${item.name?.en}`;

                if (item.price) {
                  obj.price = `${item.price?.value?.centAmount}`;
                  obj.currency = item.price?.value.currencyCode;
                  obj.isDiscount = Boolean(item.price?.discounted);
                  obj.totalPrice = `${item.totalPrice.centAmount}`;

                  if (obj.isDiscount) obj.priceDiscount = `${item.price?.discounted?.value.centAmount}`;
                }

                if (item.variant.images !== undefined) obj.images = [...item.variant.images];
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

    isProductInCart(productId: string): boolean {
      return store.productsInCartIds.has(productId);
    },

    removeFromCart(productId: string): void {
      store.productsInCartIds.delete(productId);
    },

    changeQuantity(): void {},

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
