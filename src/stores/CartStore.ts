import { makeAutoObservable, runInAction, toJS } from 'mobx';

import { ProductType } from './Product.type';
// import { productStore } from './ProductStore';



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


      // runInAction(() => {
      //   const existingProduct = store.productsInCart.find((p) => p.key === product.key);

      //   if (existingProduct && existingProduct.quantity) {
      //     existingProduct.quantity += 1;
      //   } else {
      //     store.productsInCart.push({ ...product, quantity: 1 });
      //   }
      //   productStore.toggleProductInCart(product.key);
      // });
    },

    removeFromCart(productKey: string): void {

      
      // runInAction(() => {
      //   store.productsInCart = store.productsInCart.filter((p) => p.key !== productKey);
      //   productStore.toggleProductInCart(productKey);
      // });
    },

    changeQuantity(productKey: string, quantity: number): void {


      // const product = store.productsInCart.find((p) => p.key === productKey);

      // if (product) {
      //   product.quantity = quantity;
      // } else {
      //   console.error(`Product with key ${productKey} not found in cart`);
      // }
    },
  };

  makeAutoObservable(store);

  return store;
};

export const cartStore = createCartStore();
