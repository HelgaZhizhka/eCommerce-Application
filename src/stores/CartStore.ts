import { makeAutoObservable, toJS } from 'mobx';

import { addItemToCart } from '../services/cartService'

import { ProductType } from './Product.type';


type CartStoreType = {
  productsInCart: ProductType[];
  totalAmount: number;
  addToCart: (productId: string, variantId?:number) => void;
  removeFromCart: (productKey: string) => void;
  changeQuantity: (productKey: string, quantity: number) => void;
};

const createCartStore = (): CartStoreType => {
  const store = {
    productsInCart: [] as ProductType[],
    totalAmount: 1,


    addToCart(productId: string, variantId?:number): void {
      // запрос на добавления товара в корзину
      // const { productId } = product.productId;
      // console.log(toJS(product));
      addItemToCart(productId, variantId);
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
