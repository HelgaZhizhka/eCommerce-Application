import { makeAutoObservable, toJS } from 'mobx';

import { ProductType } from './Product.type';



type CartStoreType = {
  productsInCart: ProductType[];
  totalAmount: number;
  addToCart: (product: ProductType) => void;
  removeFromCart: (productKey: string) => void;
  changeQuantity: (productKey: string, quantity: number) => void;
};

const createCartStore = (): CartStoreType => {
  const store = {
    productsInCart: [] as ProductType[],
    totalAmount: 0,


    addToCart(product: ProductType): void {
      // запрос на добавления товара в корзину 

      console.log(toJS(product));

    },

    removeFromCart(): void {

    },

    changeQuantity(): void {


    },
  };

  makeAutoObservable(store);

  return store;
};

export const cartStore = createCartStore();
