import { makeAutoObservable, runInAction } from 'mobx';

import { addItemToCart } from '../services/cartService';

import { ProductType } from './Store.types';

type CartStoreType = {
  productsInCart: ProductType[];
  productsInCartIds: Set<string>;
  totalAmount: number;
  error: null | string;
  success: null | string;
  addToCart: (
    productId: string,
    variantId?: number,
    size?: string | undefined,
    quantity?: number | undefined
  ) => Promise<void>;
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
    totalAmount: 1,
    error: null as null | string,
    success: null as null | string,

    async addToCart(productId: string, variantId?: number, size?: string, quantity?: number | undefined): Promise<void> {
      try {
        console.log(size, quantity)
        const response = await addItemToCart(productId, variantId);

        runInAction(() => {
          if (response.statusCode === 200) {
            store.success = 'Product added to cart successfully';
            store.productsInCartIds.add(productId);
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
