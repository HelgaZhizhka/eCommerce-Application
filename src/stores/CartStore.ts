import { makeAutoObservable, runInAction } from 'mobx';

import { addItemToCart } from '../services/cartService';

import { productStore } from './ProductStore';
import { ProductType } from './Product.type';

type CartStoreType = {
  productsInCart: ProductType[];
  totalAmount: number;
  error: null | string;
  success: null | string;
  addToCart: (productId: string, variantId?: number, quantity?: number | undefined) => Promise<void>;
  removeFromCart: (productKey: string) => void;
  changeQuantity: (productKey: string, quantity: number) => void;
};

const createCartStore = (): CartStoreType => {
  const store = {
    productsInCart: [] as ProductType[],
    totalAmount: 1,
    error: null as null | string,
    success: null as null | string,

    async addToCart(productId: string, variantId?: number, quantity?: number | undefined): Promise<void> {
      try {
        const response = await addItemToCart(productId, variantId);

        runInAction(() => {
          if (response.statusCode === 200) {
            productStore.setProductInCartStatus(productId, true, quantity);
          }
          if (response.statusCode === 400) {
            throw new Error('Unexpected error');
          }
        });
      } catch (error) {
        runInAction(() => {
          store.error = 'Error fetching products';
        });
      }
    },

    removeFromCart(): void {},

    changeQuantity(): void {},
  };

  makeAutoObservable(store);

  return store;
};

export const cartStore = createCartStore();
